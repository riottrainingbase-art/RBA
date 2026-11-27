import { programmes, isProgrammeActive, type Programme, type ProgrammeId } from "@/components/programme-data";

const programmePrefectures: Record<ProgrammeId, readonly string[]> = {
  "miyako": ["岩手県"],
  "kagoshima-nov29": ["鹿児島県"],
  "okinawa-december-camp": ["沖縄県"],
  "okinawa-nov14": ["沖縄県"],
  "sendai-u15": ["宮城県"],
  "yaima": ["沖縄県"],
  "kawasaki": ["神奈川県"],
  "saga-fukuoka": ["佐賀県", "福岡県"],
  "saga-winter-20261228": ["佐賀県", "福岡県"],
  "backbone-chiba": ["千葉県"],
  "yamagata": ["山形県"],
  "shizugawa": ["宮城県"],
  "kobe": ["兵庫県"],
  "torsten": [],
};

export function isLocalProgramme(programme: Programme, region: string | null): boolean {
  return Boolean(region && programmePrefectures[programme.id].includes(region));
}

export function upcomingLocalProgrammes(region: string | null, now = new Date()) {
  return programmes.filter(p => isProgrammeActive(p, now) && isLocalProgramme(p, region));
}
