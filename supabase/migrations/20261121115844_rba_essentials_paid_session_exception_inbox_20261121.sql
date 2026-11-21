-- Applied to Supabase HOMECOURT production at version 20261121115844.
-- An unexpected *paid* Stripe hosted checkout is NOT an accepted RBA order
-- unless the associated merchant terms, prices, garment sizes and dates validate.
-- No personal details or buyer address are saved in this exception inbox.
BEGIN;
CREATE TABLE public.rba_essentials_payment_exceptions (
  stripe_checkout_session_id text PRIMARY KEY CHECK (stripe_checkout_session_id ~ '^cs_live_[A-Za-z0-9]{20,220}$'),
  stripe_event_id text NOT NULL,
  stripe_payment_intent_id text,
  stripe_payment_link_id text,
  amount_total_jpy integer NOT NULL CHECK (amount_total_jpy >= 0),
  reason text NOT NULL CHECK (reason IN (
    'unsupported_payment_link','unapproved_contract_terms',
    'incorrect_line_items_or_amount','invalid_garment_sizes','unexpected_product_metadata'
  )),
  review_state text NOT NULL DEFAULT 'needs_review' CHECK (review_state IN ('needs_review','reviewed')),
  first_detected_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz
);
ALTER TABLE public.rba_essentials_payment_exceptions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.rba_essentials_payment_exceptions FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON public.rba_essentials_payment_exceptions TO service_role;
CREATE INDEX rba_essentials_payment_exceptions_review_idx
  ON public.rba_essentials_payment_exceptions (review_state,first_detected_at DESC);
COMMENT ON TABLE public.rba_essentials_payment_exceptions IS
 'Private RBA STORE paid-session exceptions. Stripe is authoritative; no buyer PII and no claims of booked/refunded orders. Service role only.';
COMMIT;
