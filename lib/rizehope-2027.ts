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
  payments: {
    /**
     * Future publisher workflow:
     * 1. Confirm organiser, game regulations and eligibility.
     * 2. Publish price, tax display and cancellation/refund terms for the exact plan.
     * 3. Obtain a verified live payment destination for that same plan.
     * 4. Set status to "open" only after the above, and rerun project QA.
     * There is deliberately no checkout route or charge in the current release.
     */
    status: "not-open" as "not-open" | "open",
    verifiedCheckoutUrl: null as string | null,
    priceAndTaxPublished: false,
    cancellationAndRefundTermsPublished: false,
    organiserApprovedPaidRegistration: false,
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

export function isRizehopePaymentOpen(): boolean {
  const {payments,programme}=rizehopeProject;
  return payments.status==="open"
    && Boolean(payments.verifiedCheckoutUrl?.startsWith("https://"))
    && payments.priceAndTaxPublished
    && payments.cancellationAndRefundTermsPublished
    && payments.organiserApprovedPaidRegistration
    && programme.finalOrganizerCreditsApproved
    && programme.finalAgeRulesPublished
    && programme.finalParticipationFeePublished;
}

export function approvedRizehopeGallery() {
  return rizehopeProject.gallery.filter(photo=>
    photo.usageRightsConfirmed &&
    photo.childrensPhotoConsentConfirmed &&
    photo.src.startsWith("/media/rizehope-2027/") &&
    Boolean(photo.altJa&&photo.altEn&&photo.credit)
  );
}
