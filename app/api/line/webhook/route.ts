import { NextResponse } from "next/server";
import { generateRbaLineReply } from "@/lib/line/ai";
import {
  isLineTextMessageEvent,
  replyToLine,
  type LineWebhookBody,
  verifyLineSignature,
} from "@/lib/line/messaging";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function configurationState() {
  return {
    lineChannelSecret: Boolean(process.env.LINE_CHANNEL_SECRET),
    lineChannelAccessToken: Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN),
    openAiApiKey: Boolean(process.env.OPENAI_API_KEY),
    openAiModel: process.env.OPENAI_MODEL?.trim() || "gpt-5.6-luna",
  };
}

export async function GET() {
  const configured = configurationState();

  return NextResponse.json(
    {
      ok: true,
      service: "RBA LINE AI webhook",
      configured,
      ready:
        configured.lineChannelSecret &&
        configured.lineChannelAccessToken &&
        configured.openAiApiKey,
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

  const jobs = events
    .filter(isLineTextMessageEvent)
    .map(async (event) => {
      try {
        const reply = await generateRbaLineReply(event.message.text);
        await replyToLine(event.replyToken, reply);
      } catch (error) {
        console.error("[line-webhook] message processing failed", error);

        // If OpenAI fails but LINE itself is configured, send a safe fallback.
        try {
          await replyToLine(
            event.replyToken,
            "現在、自動案内を利用できません。お手数ですが、RBA公式サイト（https://riotbasketballacademy.com/ja）をご確認いただくか、riot.training.base@gmail.com までお問い合わせください。",
          );
        } catch (fallbackError) {
          console.error("[line-webhook] fallback reply failed", fallbackError);
        }
      }
    });

  await Promise.allSettled(jobs);

  return NextResponse.json({ ok: true });
}
