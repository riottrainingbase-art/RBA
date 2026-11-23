/**
 * Public RBA corporate relationship directory.
 *
 * Only details already published by RBA are seeded here. This is NOT a
 * prospect/CRM database, a billing ledger or proof of a currently paid contract.
 * All future entries require agreement evidence, copy approval and logo rights
 * before publication. Do not store emails, amounts, receipts or private notes.
 */
export type PublishedSponsor = {
  id: string;
  legalName: string;
  description: string;
  publicWebsite: string;
  category: "existing_profile" | "completed_sponsorship";
  categoryLabel: string;
  scope: string;
  periodLabel: string;
  previouslyPublished: boolean;
  newEntryAgreementVerified: boolean;
  newEntryWordingApproved: boolean;
  newEntryPublicationConsentVerified: boolean;
  logoPath: string | null;
  logoUsageApproved: boolean;
};

const records: readonly PublishedSponsor[] = [
  {
    id: "khm-existing-profile",
    legalName: "合同会社KHM",
    description: "既存のRBA公式パートナー紹介ページに掲載されている地域連携企業。個別の協賛金額や現行の契約期間は、この紹介では示していません。",
    publicWebsite: "https://khm-ecrin.com/",
    category: "existing_profile",
    categoryLabel: "既存の公式掲載先",
    scope: "地域の活動協力・連携紹介",
    periodLabel: "既存の公式ページに掲載中",
    previouslyPublished: true,
    newEntryAgreementVerified: false,
    newEntryWordingApproved: false,
    newEntryPublicationConsentVerified: false,
    logoPath: null,
    logoUsageApproved: false,
  },
  {
    id: "nakagami-completed-2026",
    legalName: "有限会社 中神工務店",
    description: "2026年3〜8月にRBAの育成活動を支えた企業協賛実績。11月の月額企業広告の申込は別契約であり、ここでは広告掲載開始済みとは表示しません。",
    publicWebsite: "https://nakagamiandco.com/",
    category: "completed_sponsorship",
    categoryLabel: "過去の企業協賛実績",
    scope: "2026年の育成活動支援",
    periodLabel: "2026年3月〜8月（終了）",
    previouslyPublished: true,
    newEntryAgreementVerified: true,
    newEntryWordingApproved: true,
    newEntryPublicationConsentVerified: true,
    logoPath: null,
    logoUsageApproved: false,
  },
];

export function mayPublishSponsor(record: PublishedSponsor): boolean {
  // The pre-existing public listing may be referenced without adding new
  // sponsor claims. For a new company, all three evidence gates must pass.
  return record.previouslyPublished || (
    record.newEntryAgreementVerified &&
    record.newEntryWordingApproved &&
    record.newEntryPublicationConsentVerified
  );
}

export function sponsorLogoForPublic(record: PublishedSponsor): string | null {
  return mayPublishSponsor(record) &&
    record.logoUsageApproved &&
    record.logoPath?.startsWith("/brand-logos/")
      ? record.logoPath
      : null;
}

export function publishedSponsorRecords(): readonly PublishedSponsor[] {
  return records.filter(mayPublishSponsor);
}
