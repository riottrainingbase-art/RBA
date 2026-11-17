create unique index if not exists kobe_u14_one_open_application_per_email_and_subject
on public.kobe_u14_deposit_applications(lower(contact_email),lower(participant_or_team))
where status in ('awaiting_deposit','deposit_paid','balance_approved','fully_paid','refund_pending','needs_review');
