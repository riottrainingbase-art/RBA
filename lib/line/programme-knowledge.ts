import { isProgrammeActive, programmes } from "@/components/programme-data";

function formatProgramme(programme: (typeof programmes)[number]) {
  const title = programme.title[1];
  const date = programme.date[1];
  const place = programme.place[1];
  const price = programme.price[1];
  const audience = programme.audience[1];
  const payment = programme.payment[1];
  const url = programme.applicationUrl;

  return [
    `- ${title}`,
    `  日程: ${date}`,
    `  場所: ${place}`,
    `  対象: ${audience}`,
    `  料金: ${price}`,
    `  申込/支払: ${payment}`,
    `  URL: ${url}`,
  ].join("\n");
}

export function currentRbaProgrammeKnowledge(now = new Date()) {
  const active = programmes.filter((programme) => isProgrammeActive(programme, now));

  if (active.length === 0) {
    return "現在、programme-data上で受付可能なRBAプログラムは登録されていません。";
  }

  return [
    "RBA公式サイトのprogramme-data.tsを正本とする現在の受付可能プログラム:",
    ...active.map(formatProgramme),
    "",
    "重要:",
    "- この一覧にある日程・場所・対象・料金・申込URLは、LINE回答でもこの値を優先する。",
    "- registrationClosed=true のプログラムは案内候補から除外されている。",
    "- 受付枠の残数、個別の申込完了、決済完了はprogramme-dataでは確認できないため断定しない。",
  ].join("\n");
}
