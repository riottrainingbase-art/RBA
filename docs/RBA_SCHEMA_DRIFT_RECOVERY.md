# RBA Production Schema Drift Recovery

## Current risk

The production Supabase project contains applied migrations and database objects that are not represented by the migration files currently present in GitHub main.

Application source control is therefore not yet a complete reproducible description of production.

**Do not add structural production automation until this is reconciled.**

## Recovery objective

Create a reviewed migration baseline in GitHub that reproduces the intended production schema without destroying production data.

## Recovery sequence

1. Freeze non-emergency production schema edits.
2. Pull/export the remote schema into a dedicated recovery branch with the current Supabase CLI workflow.
3. Compare the pulled schema with GitHub migrations, generated schema and production functions/policies/cron.
4. Inventory production-only automation functions, management views, reminder functions, D-HUB project objects, CMS objects and cron jobs.
5. Review exposed-schema RLS, grants, SECURITY DEFINER functions, storage policies and key handling.
6. Generate a clean recovery migration set.
7. Apply it to an isolated preview/development database.
8. Run build and workflow smoke tests.
9. Run Supabase security/performance advisors.
10. Review schema diff and migration history.
11. Merge the recovery PR.
12. Resume structural production automation only after the baseline is reproducible.

## Release gate after recovery

A database-affecting release must prove:
- migration exists in Git;
- preview migration succeeds from the accepted baseline;
- required RLS/grants are explicit;
- application build passes;
- checkout/webhook paths pass;
- required cron/functions are present;
- recovery/rollback is documented.

## Capacity blocker

Current production exception detection reports published capacity-controlled offers without authoritative capacity.

The fix is **not** to guess a number.

For each active offer:
1. Operations supplies authoritative capacity or explicitly marks the offer as not capacity-controlled.
2. Record it in the authoritative event/offer object.
3. Confirm the exception clears.
4. Only then allow automated checkout.

Completed/historical offers should be closed or archived according to lifecycle rules so obsolete data-quality exceptions do not pollute the live queue.
