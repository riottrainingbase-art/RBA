export type StaffAlertCategory = "billing" | "health" | "schedule" | "human";

export type StaffAlertPayload = {
  category: StaffAlertCategory;
  serviceHint: "RTB" | "RBA" | "UNKNOWN";
  webhookEventId?: string | null;
};

function labelForCategory(category: StaffAlertCategory) {
  switch (category) {
    case "billing":
      return "決済・返金";
    case "health":
      return "怪我・体調";
    case "schedule":
      return "予約・日程";
    default:
      return "スタッフ相談";
  }
}

export function buildStaffAlert(payload: StaffAlertPayload) {
  return {
    source: "riot-line",
    kind: "staff-handoff",
    category: payload.category,
    serviceHint: payload.serviceHint,
    webhookEventId: payload.webhookEventId ?? null,
    occurredAt: new Date().toISOString(),
    text: `RIOT LINE｜要スタッフ確認：${labelForCategory(payload.category)}｜${payload.serviceHint}\nLINE Official Accountのチャットを確認してください。`,
  };
}

export async function sendStaffAlert(payload: StaffAlertPayload) {
  const url = process.env.RIOT_STAFF_ALERT_WEBHOOK_URL?.trim();
  if (!url) return { sent: false as const, reason: "not_configured" as const };

  const body = buildStaffAlert(payload);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.RIOT_STAFF_ALERT_BEARER_TOKEN
        ? { Authorization: `Bearer ${process.env.RIOT_STAFF_ALERT_BEARER_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Staff alert webhook failed with ${response.status}`);
  }

  return { sent: true as const };
}
