import { NextResponse } from "next/server";
import { generateRiotLineReply } from "@/lib/line/ai";
import { deterministicLineReply } from "@/lib/line/direct-replies";
import { inferAmbiguousTopic, inferConciergeRoute, inferServiceHint, inferStaffCategory, isMenuRequest } from "@/lib/line/intents";
import { OFFICIAL_LINKS } from "@/lib/line/knowledge";
import { privateRateLimitKey, SlidingWindowRateLimiter } from "@/lib/line/rate-limit";
import { sendStaffAlert } from "@/lib/line/staff-alert";
import {
  getLineWebhookEventId,
  isLineFollowEvent,
  isLineMessageEvent,
  isLineTextMessageEvent,
  replyToLine,
  type LineWebhookBody,
  type QuickReplyItem,
  verifyLineSignature,
} from "@/lib/line/messaging";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const completedWebhookEventIds = new Set<string>();
const inFlightWebhookEventIds = new Set<string>();
const completedWebhookEventOrder: string[] = [];
const MAX_RECENT_WEBHOOK_EVENTS = 500;
const AI_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const parsedAiRateLimit = Number.parseInt(process.env.LINE_AI_MAX_PER_10_MIN ?? "20", 10);
const AI_RATE_LIMIT_MAX = Number.isFinite(parsedAiRateLimit) && parsedAiRateLimit > 0
  ? parsedAiRateLimit
  : 20;
const aiRateLimiter = new SlidingWindowRateLimiter(
  AI_RATE_LIMIT_MAX,
  AI_RATE_LIMIT_WINDOW_MS,
  2000,
);

const MENU_QUICK_REPLIES: QuickReplyItem[] = [
  { label: "RTB｜パーソナル", text: "RTBのパーソナルトレーニングについて相談したい" },
  { label: "RBA｜バスケ", text: "RBAのバスケットボール活動について知りたい" },
  { label: "RBA｜指導者", text: "RBAの指導者向け活動について知りたい" },
  { label: "スタッフ相談", text: "スタッフに確認してほしいことがあります" },
];

const WELCOME_TEXT = `お問い合わせありがとうございます。

このLINEは、
🏋️ Riot Training Base（RTB）
🏀 Riot Basketball Academy（RBA）
の共通窓口です。

RTB：パーソナル／S&C／筋力・ウエイトトレーニング
RBA：U12・U15育成／クリニック／キャンプ／指導者教育／交流

相談内容をそのまま文章で送ってください。内容に合わせてご案内します。`;

const AMBIGUOUS_TEXT = `ありがとうございます。
どちらについてのお問い合わせでしょうか？

🏋️ RTB：パーソナル・S&C・トレーニング
🏀 RBA：バスケットボールの育成・クリニック・キャンプ等`;

function ambiguousQuickReplies(userText: string): QuickReplyItem[] {
  const topic = inferAmbiguousTopic(userText);

  switch (topic) {
    case "price":
      return [
        { label: "RTBの料金", text: "RTBの料金について知りたい" },
        { label: "RBAの料金", text: "RBAの料金について知りたい" },
        { label: "スタッフ相談", text: "スタッフに確認してほしいことがあります" },
      ];

    case "booking":
      return [
        { label: "RTBの予約", text: "RTBの予約・空き状況について知りたい" },
        { label: "RBAの空き", text: "RBAの参加可能な活動・空き状況について知りたい" },
        { label: "スタッフ相談", text: "スタッフに確認してほしいことがあります" },
      ];

    case "application":
      return [
        { label: "RTB体験・申込", text: "RTBの体験・申込方法について知りたい" },
        { label: "RBA参加申込", text: "RBAの参加申込方法について知りたい" },
        { label: "スタッフ相談", text: "スタッフに確認してほしいことがあります" },
      ];

    case "location":
      return [
        { label: "RTBの場所", text: "RTBの場所について知りたい" },
        { label: "RBAの会場", text: "RBAの活動会場について知りたい" },
        { label: "スタッフ相談", text: "スタッフに確認してほしいことがあります" },
      ];

    default:
      return MENU_QUICK_REPLIES;
  }
}

const STAFF_TEXT = {
  billing: `決済・返金についてはスタッフ確認が必要です。

このトークに、
・お名前
・RTB / RBA どちらについてか
・対象の予約／イベント
・確認したい内容
・わかれば決済時期
を送ってください。

決済用の秘密情報は送らないでください。`,

  health: `怪我・痛み・体調面については、安全のため自動案内では判断しません。

このトークに、
・RTB / RBA どちらについてか
・年代
・参加予定の活動／トレーニング
・運動時に配慮が必要な点
を必要な範囲で送ってください。

詳細な医療資料は送らず、症状が強い場合や緊急性がある場合は医療機関へご相談ください。`,

  schedule: `予約・欠席・キャンセル・日程変更はスタッフ確認が必要です。

このトークに、
・お名前
・RTB / RBA どちらについてか
・対象の予約／イベント
・元の日程
・希望する変更内容
を送ってください。`,

  human: `スタッフ確認が必要な内容として承ります。

このトークに、
・RTB / RBA どちらについてか
・確認したい内容
・必要であればお名前
を、必要な範囲だけ送ってください。`,
} as const;

const NON_TEXT_TEXT = `ありがとうございます。
現在の自動案内はテキストを中心に対応しています。

画像やファイルについて確認が必要な場合は、何を確認してほしいかを文章でも一言添えてください。`;

const RATE_LIMIT_TEXT = `自動案内の連続利用が多いため、少し時間をおいてからもう一度お試しください。

返金・予約変更・怪我や体調・その他スタッフ確認が必要な内容は、「スタッフ相談」と送っていただければ人対応の案内へ切り替わります。`;

const FALLBACK_TEXT = `現在、自動案内を一時的に利用できません。

RTB：${OFFICIAL_LINKS.rtbLinktree}
RBA：${OFFICIAL_LINKS.rbaWebsite}

お急ぎの場合は、このトークに要件を残していただくか、${OFFICIAL_LINKS.contactEmail} までご連絡ください。`;

function configurationState() {
  return {
    lineChannelSecret: Boolean(process.env.LINE_CHANNEL_SECRET),
    lineChannelAccessToken: Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN),
    openAiApiKey: Boolean(process.env.OPENAI_API_KEY),
    openAiModel: process.env.OPENAI_MODEL?.trim() || "gpt-6-luna",
    staffAlertWebhook: Boolean(process.env.RIOT_STAFF_ALERT_WEBHOOK_URL),
  };
}

async function processEvent(event: unknown) {
  if (isLineFollowEvent(event)) {
    await replyToLine(event.replyToken, WELCOME_TEXT, MENU_QUICK_REPLIES);
    return;
  }

  if (!isLineMessageEvent(event)) return;

  // This account is designed as a one-to-one customer contact, not a group-chat bot.
  if (event.source?.type && event.source.type !== "user") return;

  if (!isLineTextMessageEvent(event)) {
    await replyToLine(event.replyToken, NON_TEXT_TEXT, MENU_QUICK_REPLIES);
    return;
  }

  const userText = event.message.text.trim();

  if (isMenuRequest(userText)) {
    await replyToLine(event.replyToken, WELCOME_TEXT, MENU_QUICK_REPLIES);
    return;
  }

  const route = inferConciergeRoute(userText);

  if (route === "staff") {
    const staffCategory = inferStaffCategory(userText);
    const serviceHint = inferServiceHint(userText);
    await replyToLine(event.replyToken, STAFF_TEXT[staffCategory], MENU_QUICK_REPLIES);

    try {
      await sendStaffAlert({
        category: staffCategory,
        serviceHint,
        webhookEventId: getLineWebhookEventId(event),
      });
    } catch (error) {
      console.error("[line-webhook] staff alert failed", error);
    }
    return;
  }

  if (route === "ambiguous") {
    await replyToLine(event.replyToken, AMBIGUOUS_TEXT, ambiguousQuickReplies(userText));
    return;
  }

  const directReply = deterministicLineReply(userText);
  if (directReply) {
    await replyToLine(event.replyToken, directReply, MENU_QUICK_REPLIES);
    return;
  }

  const lineUserId = event.source?.userId;
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (lineUserId && channelSecret) {
    const key = privateRateLimitKey(lineUserId, channelSecret);
    const limit = aiRateLimiter.check(key);
    if (!limit.allowed) {
      await replyToLine(event.replyToken, RATE_LIMIT_TEXT, MENU_QUICK_REPLIES);
      return;
    }
  }

  try {
    const reply = await generateRiotLineReply(userText, route);
    await replyToLine(event.replyToken, reply, MENU_QUICK_REPLIES);
  } catch (error) {
    console.error("[line-webhook] message processing failed", error);

    try {
      await replyToLine(event.replyToken, FALLBACK_TEXT, MENU_QUICK_REPLIES);
    } catch (fallbackError) {
      console.error("[line-webhook] fallback reply failed", fallbackError);
      throw fallbackError;
    }
  }
}

function rememberCompletedEvent(eventId: string) {
  if (completedWebhookEventIds.has(eventId)) return;
  completedWebhookEventIds.add(eventId);
  completedWebhookEventOrder.push(eventId);

  while (completedWebhookEventOrder.length > MAX_RECENT_WEBHOOK_EVENTS) {
    const oldest = completedWebhookEventOrder.shift();
    if (oldest) completedWebhookEventIds.delete(oldest);
  }
}

async function processEventOnce(event: unknown) {
  const eventId = getLineWebhookEventId(event);

  if (eventId && (completedWebhookEventIds.has(eventId) || inFlightWebhookEventIds.has(eventId))) {
    return;
  }

  if (eventId) inFlightWebhookEventIds.add(eventId);

  try {
    await processEvent(event);
    if (eventId) rememberCompletedEvent(eventId);
  } finally {
    if (eventId) inFlightWebhookEventIds.delete(eventId);
  }
}

async function processEvents(events: unknown[]) {
  const results = await Promise.allSettled(events.map((event) => processEventOnce(event)));
  const failures = results.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );

  if (failures.length > 0) {
    throw new AggregateError(
      failures.map((failure) => failure.reason),
      "One or more LINE webhook events failed",
    );
  }
}

export async function GET() {
  const configured = configurationState();

  return NextResponse.json(
    {
      ok: true,
      service: "RIOT LINE concierge (RTB + RBA)",
      version: "2",
      configured,
      ready:
        configured.lineChannelSecret &&
        configured.lineChannelAccessToken &&
        configured.openAiApiKey,
      deployment: {
        environment: process.env.VERCEL_ENV ?? null,
        gitCommit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ?? null,
      },
      privacy: {
        conversationStorage: false,
        lineUserIdStorage: false,
        rateLimitKey: "HMAC in-memory only",
      },
      aiRateLimit: {
        maxPerTenMinutes: AI_RATE_LIMIT_MAX,
        windowMinutes: 10,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (!channelSecret) {
    console.error("[line-webhook] LINE_CHANNEL_SECRET is not configured");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const rawBody = await request.text();

  if (rawBody.length > 512_000) {
    console.warn("[line-webhook] rejected oversized request");
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  const signature = request.headers.get("x-line-signature");

  if (!verifyLineSignature(rawBody, signature, channelSecret)) {
    console.warn("[line-webhook] rejected invalid signature");
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: LineWebhookBody;
  try {
    body = JSON.parse(rawBody) as LineWebhookBody;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const events = Array.isArray(body.events) ? body.events : [];

  // LINE sends a valid POST with events: [] when the webhook URL is verified.
  if (events.length === 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    await processEvents(events);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[line-webhook] event batch failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
