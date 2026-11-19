/**
 * Single source of truth for the RIZEHOPE international-exchange project.
 *
 * Edit only after the event operator has verified the change.
 * Do not treat venue reservation or staging permission as confirmation of team entry,
 * overseas invitations, a fully agreed organizer contract, or payment terms.
 */
export const rizehopeProject = {
  year: 2027,
  dateJa: "2027年2月27日（土）・28日（日）",
  dateEn: "February 27 (Sat)–28 (Sun), 2027",
  venue: {
    ja: "柴田町総合体育館",
    en: "Shibata Town Gymnasium",
    addressJa: "宮城県柴田郡柴田町船岡字上大原65-1",
    addressEn: "65-1 Kamiohara, Funaoka, Shibata, Shibata District, Miyagi, Japan",
    map: "https://maps.app.goo.gl/fWD68Coj9T56gnTX8",
    reservedForBothDays: true,
    presentationPermitsObtained: true,
    courtAllocationFinal: false,
    sessionHoursFinal: false,
  },
  outreach: {
    // Public Jotform links; free expressions of interest, NOT confirmed entries.
    overseasTeam: "https://form.jotform.com/263221234159047",
    japanTeam: "https://form.jotform.com/263220855042046",
    unitedPlayer: "https://form.jotform.com/263221266794057",
    contactEmail: "riot.training.base@gmail.com",
  },
  programme: {
    invitationStatus: "inviting" as "inviting" | "confirmed",
    finalOrganizerCreditsApproved: false,
    finalAgeRulesPublished: false,
    gameFormatFinal: false,
    finalParticipationFeePublished: false,
    unitedTeamConfirmed: false,
  },
  /**
   * Three INDEPENDENT payment tracks. Never use one team's payment link for
   * individual players or for another team's contract.
   * All tracks are closed until the exact price, terms and operator approval are verified.
   */
  payments: {
    overseasTeam: {
      status: "not-open" as "not-open" | "open",
      verifiedCheckoutUrl: null as string | null,
      displayPrice: null as string | null,
      officialEntryTermsUrl: null as string | null,
      officialRefundTermsUrl: null as string | null,
      priceAndTaxPublished: false as boolean,
      cancellationAndRefundTermsPublished: false as boolean,
      organiserApprovedPaidRegistration: false as boolean,
    },
    japanTeam: {
      status: "not-open" as "not-open" | "open",
      verifiedCheckoutUrl: null as string | null,
      displayPrice: null as string | null,
      officialEntryTermsUrl: null as string | null,
      officialRefundTermsUrl: null as string | null,
      priceAndTaxPublished: false as boolean,
      cancellationAndRefundTermsPublished: false as boolean,
      organiserApprovedPaidRegistration: false as boolean,
    },
    unitedPlayer: {
      status: "not-open" as "not-open" | "open",
      verifiedCheckoutUrl: null as string | null,
      displayPrice: null as string | null,
      officialEntryTermsUrl: null as string | null,
      officialRefundTermsUrl: null as string | null,
      priceAndTaxPublished: false as boolean,
      cancellationAndRefundTermsPublished: false as boolean,
      organiserApprovedPaidRegistration: false as boolean,
    },
  },
  /**
   * Future photo workflow: put consent-cleared images in
   * public/media/rizehope-2027/; include dates, alt text, credits, and consent.
   * Images from other tournaments must never be presented as RIZEHOPE results.
   */
  gallery: [
    {
      src: "/media/rizehope-2027/01-rizehope-banner.webp",
      altJa: "RIZEHOPEのロゴが掲げられた体育館の大型バナー",
      altEn: "Large RIZEHOPE banner inside an indoor basketball venue",
      captionJa: "RIZEHOPEの大型バナー",
      captionEn: "RIZEHOPE venue banner",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
    {
      src: "/media/rizehope-2027/02-sideline-audience.webp",
      altJa: "照明演出のある体育館で試合を見守る選手・関係者",
      altEn: "Players and spectators watching from the sideline under blue lighting",
      captionJa: "会場の風景",
      captionEn: "Event atmosphere",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
    {
      src: "/media/rizehope-2027/03-team-huddle.webp",
      altJa: "試合前に円陣を組むジュニアバスケットボールチーム",
      altEn: "Youth basketball players gathered in a team huddle",
      captionJa: "チームの円陣",
      captionEn: "Team huddle",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
    {
      src: "/media/rizehope-2027/04-court-gathering.webp",
      altJa: "体育館のコートに集まった複数のジュニアチーム",
      altEn: "Youth basketball teams assembled on an indoor court",
      captionJa: "コートに集う選手たち",
      captionEn: "Gathering on court",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
    {
      src: "/media/rizehope-2027/05-orange-team-energy.webp",
      altJa: "赤系ユニフォームを着たジュニア選手たちの演出シーン",
      altEn: "Young basketball players in orange jerseys during an event presentation",
      captionJa: "演出と選手たち",
      captionEn: "Event presentation",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
    {
      src: "/media/rizehope-2027/06-court-high-five.webp",
      altJa: "コートでハイタッチを交わすジュニア選手とスタッフ",
      altEn: "Young players and staff exchanging high-fives on the court",
      captionJa: "ハイタッチ",
      captionEn: "High-fives",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
    {
      src: "/media/rizehope-2027/07-team-talk.webp",
      altJa: "青緑色の照明のもと集まる白いユニフォームのチーム",
      altEn: "Young basketball players in white jerseys gathered under blue-green lighting",
      captionJa: "チームのひとこま",
      captionEn: "Team moment",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
    {
      src: "/media/rizehope-2027/08-friendship-moment.webp",
      altJa: "コート上で笑顔を見せるジュニアバスケットボール選手たち",
      altEn: "Young basketball players enjoying a moment on the court",
      captionJa: "選手同士の交流",
      captionEn: "A shared moment",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
    {
      src: "/media/rizehope-2027/09-team-celebration.webp",
      altJa: "演出照明の下で並ぶジュニア選手たち",
      altEn: "Young basketball players standing together under colored event lights",
      captionJa: "コート上の選手たち",
      captionEn: "Players together",
      credit: "撮影者・権利元確認待ち / Photographer and rights verification pending",
      usageRightsConfirmed: false,
      childrensPhotoConsentConfirmed: false,
    },
  ] as ReadonlyArray<{
    src: string;
    altJa: string;
    altEn: string;
    captionJa: string;
    captionEn: string;
    credit: string;
    usageRightsConfirmed: boolean;
    childrensPhotoConsentConfirmed: boolean;
  }>,
} as const;

export type RizehopePaymentAudience = "overseasTeam" | "japanTeam" | "unitedPlayer";

export function isRizehopePaymentOpen(audience: RizehopePaymentAudience): boolean {
  const {payments, programme} = rizehopeProject;
  const p = payments[audience];
  return p.status === "open"
    && Boolean(p.verifiedCheckoutUrl?.startsWith("https://"))
    && Boolean(p.displayPrice)
    && Boolean(p.officialEntryTermsUrl?.startsWith("https://"))
    && Boolean(p.officialRefundTermsUrl?.startsWith("https://"))
    && p.priceAndTaxPublished
    && p.cancellationAndRefundTermsPublished
    && p.organiserApprovedPaidRegistration
    && programme.finalOrganizerCreditsApproved
    && programme.finalAgeRulesPublished
    && (audience !== "unitedPlayer" || programme.unitedTeamConfirmed);
}

export function approvedRizehopeGallery() {
  return rizehopeProject.gallery.filter(photo=>
    photo.usageRightsConfirmed &&
    photo.childrensPhotoConsentConfirmed &&
    photo.src.startsWith("/media/rizehope-2027/") &&
    Boolean(photo.altJa&&photo.altEn&&photo.credit)
  );
}
