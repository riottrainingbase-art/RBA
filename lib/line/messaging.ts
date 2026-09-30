import { createHmac, timingSafeEqual } from "node:crypto";

const LINE_REPLY_URL = "https://api.line.me/v2/bot/message/reply";

export type LineTextMessageEvent = {
  type: "message";
  replyToken: string;
  source?: {
    type?: string;
    userId?: string;
    groupId?: string;
    roomId?: string;
  };
  message: {
    type: "text";
    id?: string;
    text: string;
  };
};

export type LineWebhookBody = {
  destination?: string;
  events?: unknown[];
};

export function verifyLineSignature(
  rawBody: string,
  signature: string | null,
  channelSecret: string,
): boolean {
  if (!signature) return false;

  const expected = createHmac("sha256", channelSecret)
    .update(rawBody, "utf8")
    .digest("base64");

  const actualBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (actualBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export function isLineTextMessageEvent(value: unknown): value is LineTextMessageEvent {
  if (!value || typeof value !== "object") return false;

  const event = value as Partial<LineTextMessageEvent>;
  return (
    event.type === "message" &&
    typeof event.replyToken === "string" &&
    event.message?.type === "text" &&
    typeof event.message.text === "string"
  );
}

export async function replyToLine(replyToken: string, text: string): Promise<void> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not configured");
  }

  const response = await fetch(LINE_REPLY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages: [
        {
          type: "text",
          text: text.slice(0, 5000),
        },
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `LINE reply failed with ${response.status}${detail ? `: ${detail.slice(0, 500)}` : ""}`,
    );
  }
}
