import { createHmac, timingSafeEqual } from "node:crypto";

const LINE_REPLY_URL = "https://api.line.me/v2/bot/message/reply";

export type QuickReplyItem = {
  label: string;
  text: string;
};

export type LineSource = {
  type?: string;
  userId?: string;
  groupId?: string;
  roomId?: string;
};

export type LineWebhookEventBase = {
  webhookEventId?: string;
  deliveryContext?: {
    isRedelivery?: boolean;
  };
};

export type LineTextMessageEvent = LineWebhookEventBase & {
  type: "message";
  replyToken: string;
  source?: LineSource;
  message: {
    type: "text";
    id?: string;
    text: string;
  };
};

export type LineGenericMessageEvent = LineWebhookEventBase & {
  type: "message";
  replyToken: string;
  source?: LineSource;
  message: {
    type: string;
    id?: string;
  };
};

export type LineFollowEvent = LineWebhookEventBase & {
  type: "follow";
  replyToken: string;
  source?: LineSource;
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

export function getLineWebhookEventId(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const id = (value as LineWebhookEventBase).webhookEventId;
  return typeof id === "string" && id.length > 0 ? id : null;
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

export function isLineMessageEvent(value: unknown): value is LineGenericMessageEvent {
  if (!value || typeof value !== "object") return false;

  const event = value as Partial<LineGenericMessageEvent>;
  return (
    event.type === "message" &&
    typeof event.replyToken === "string" &&
    typeof event.message?.type === "string"
  );
}

export function isLineFollowEvent(value: unknown): value is LineFollowEvent {
  if (!value || typeof value !== "object") return false;

  const event = value as Partial<LineFollowEvent>;
  return event.type === "follow" && typeof event.replyToken === "string";
}

function createQuickReply(items: QuickReplyItem[]) {
  const normalized = items
    .slice(0, 13)
    .map((item) => ({
      type: "action" as const,
      action: {
        type: "message" as const,
        label: item.label.slice(0, 20),
        text: item.text.slice(0, 300),
      },
    }));

  return normalized.length > 0 ? { items: normalized } : undefined;
}

export async function replyToLine(
  replyToken: string,
  text: string,
  quickReplies: QuickReplyItem[] = [],
): Promise<void> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not configured");
  }

  const quickReply = createQuickReply(quickReplies);
  const message = {
    type: "text",
    text: text.slice(0, 5000),
    ...(quickReply ? { quickReply } : {}),
  };

  const response = await fetch(LINE_REPLY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages: [message],
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `LINE reply failed with ${response.status}${detail ? `: ${detail.slice(0, 500)}` : ""}`,
    );
  }
}
