type AcademicEvent = { grade: string; kind: string };
const dayMs = 86400000;
const dateValue = (s: string) => Date.parse(s + "T00:00:00Z");
export const validDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(dateValue(s)) && new Date(dateValue(s)).toISOString().slice(0,10) === s;
export function relation(start: string, end: string, eventStart: string, eventEnd: string, preparationDays: number): "overlap" | "prepare" | "none" {
  const a = dateValue(start), b = dateValue(end), c = dateValue(eventStart), d = dateValue(eventEnd);
  if (a <= d && b >= c) return "overlap";
  if (preparationDays > 0 && a < c && b >= c - preparationDays * dayMs) return "prepare";
  return "none";
}
export const prefectures = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];
export const gradeOptions = ["すべて","小学生","中1","中2","中3","高校生","高校受験者"];
export function gradeMatches(e: AcademicEvent, grade: string, includeConditional: boolean) {
  if (e.grade === "該当受験者") return includeConditional && (grade === "すべて" || grade === "中3" || grade === "高校受験者");
  if (grade === "すべて") return true;
  if (e.grade === "高校受験者") return grade === "中3" || grade === "高校受験者";
  if (e.grade === "関係する学年") return grade.startsWith("中");
  if (grade === "高校受験者") return e.grade === "中学生" || e.grade === "中3";
  if (grade === "高校生") return e.grade.startsWith("高") || e.grade === "高校生";
  if (grade.startsWith("中")) return e.grade === "中学生" || e.grade === grade || (e.grade === "中1・2" && (grade === "中1" || grade === "中2"));
  return e.grade === grade;
}
export const buffer = (e: AcademicEvent, days: number) => e.kind === "試験" || e.kind === "入試" ? days : 0;
export const kindLabel = { overlap: "日程重複", prepare: "試験前の準備期間", none: "この掲載日程とは重複なし" } as const;

