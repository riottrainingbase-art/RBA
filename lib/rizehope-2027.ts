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
    japanTeam: "https://form.jotform.com/263223566035050",
    japanTeamInterest: "https://form.jotform.com/263220855042046",
    japanTeamWaitingList: "https://form.jotform.com/263223619546056",
    sponsorInterest: "https://form.jotform.com/263222129730046",
    unitedPlayer: "https://form.jotform.com/263221266794057",
    contactEmail: "riot.training.base@gmail.com",
  },
  intake: {
    maximumTeamCount: 10,
    countsAcross: "all-teams-including-overseas-and-rba-united",
    // No automatic reservation for the RBA-affiliated team: same ten-team capacity.
    reservedUnitedTeamSlots: 0,
    domesticTeamFeeJpy: 66000,
    domesticTeamFeeIncludesTax: true,
    domesticTeamFeeCovers: "two-days-per-team",
    domesticTeamRegistrationMethod: "first-submitted-and-verified",
    // Jotform configuration cannot be independently verified as an atomic 10-slot cap;
    // staff must reconcile all three team intake channels and accepted registrations.
    automaticCapacityLockVerified: false,
    bookingConfirmationRequires: "written-acceptance-and-confirmed-payment",
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
  gallery: [] as ReadonlyArray<{
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
