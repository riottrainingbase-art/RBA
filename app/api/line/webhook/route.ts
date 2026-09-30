import { after, NextResponse } from "next/server";
import { generateRiotLineReply } from "@/lib/line/ai";
import { inferConciergeRoute, inferStaffCategory, isMenuRequest } from "@/lib/line/intents";
import { OFFICIAL_LINKS } from "@/lib/line/knowledge";
import {
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

const FALLBACK_TEXT = `現在、自動案内を一時的に利用できません。

RTB：${OFFICIAL_LINKS.rtbLinktree}
RBA：${OFFICIAL_LINKS.rbaWebsite}

お急ぎの場合は、このトークに要件を残していただくか、${OFFICIAL_LINKS.contactEmail} までご連絡ください。`;

function configurationState() {
  return {
    lineChannelSecret: Boolean(process.env.LINE_CHANNEL_SECRET),
    lineChannelAccessToken: Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN),
    openAiApiKey: Boolean(process.env.OPENAI_API_KEY),
    openAiModel: process.env.OPENAI_MODEL?.trim() || "gpt-5.6-luna",
  };
}

async function processEvent(event: unknown) {
  if (isLineFollowEvent(event)) {
    await replyToLine(event.replyToken, WELCOME_TEXT, MENU_QUICK_REPLIES);
    return;
  }

  if (!isLineMessageEvent(event)) return;

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
    await replyToLine(event.replyToken, STAFF_TEXT[staffCategory], MENU_QUICK_REPLIES);
    return;
  }

  if (route === "ambiguous") {
    await replyToLine(event.replyToken, AMBIGUOUS_TEXT, MENU_QUICK_REPLIES);
    return;
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
    }
  }
}

async function processEvents(events: unknown[]) {
  await Promise.allSettled(events.map((event) => processEvent(event)));
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
      privacy: {
        conversationStorage: false,
        lineUserIdStorage: false,
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

  // Return 200 quickly and perform message replies after the response.
  after(async () => {
    await processEvents(events);
  });

  return NextResponse.json({ ok: true });
}
