# RBA deployment workflow

RBA uses a deployment-budget workflow. The goal is to keep Vercel Deployment Storage and daily deployment counts low while preserving safe releases.

## Core rule

**Normal code work must not create a Vercel deployment.**

The standard release path is:

```
feature/* work
  ↓
GitHub PR + static preflight
  ↓
one explicit preview-rba checkpoint
  ↓
one Vercel Preview
  ↓
verify
  ↓
merge approved code to main
  ↓
promote the verified Preview artifact to Production
```

Production should normally use the exact Preview artifact. Do not rebuild the same release for Production unless promotion is unavailable or there is an emergency.

## Branches

- `feature/*`, `work/*`, and all ordinary branches: **Vercel disabled**
- `main`: **Vercel Git deployment disabled**
- `preview-rba`: the only Git branch allowed to create a Vercel deployment

## Working changes

Make as many code/content commits as needed on a feature branch. These commits should be reviewed and combined before Vercel is involved.

GitHub PR checks run TypeScript and ESLint without creating a Vercel deployment.

Do not use Vercel as a compile check.

## Preview checkpoint

Only create a Preview after the release candidate is assembled.

1. Merge or sync all intended changes into the release candidate.
2. Create one checkpoint commit whose message contains `[preview]`.
3. Move/update `preview-rba` to that checkpoint.
4. Wait for the single Vercel Preview to reach READY.
5. Verify the complete user journey on that Preview.

Example:

`[preview] RBA platform weekly release candidate`

A normal commit on `preview-rba` without `[preview]` is ignored by the build gate.

## Fixes after Preview

If Preview reveals a problem:

1. Return to the feature/release branch.
2. Batch all fixes there.
3. Run GitHub static checks.
4. Create **one new** `[preview]` checkpoint only when the fixes are ready.

Do not deploy each individual fix.

## Production

After the Preview is verified:

1. Merge the approved code into `main`.
2. Do **not** expect a Git-triggered Production build from `main`.
3. Promote the already verified Preview deployment to Production.

Preferred command when CLI access is available:

```bash
vercel promote <verified-preview-url-or-id>
```

Promotion reuses the same deployment artifact and avoids a second build.

If promotion is unavailable, a single manual Production deployment is the emergency fallback. It is not the normal workflow.

## Deployment budget

For a normal release:

- Working commits: unlimited, **0 Vercel deployments**
- Pull requests: **0 Vercel deployments**
- Preview: **1 Vercel deployment**
- Production: **0 new builds when promoted**
- Expected total new deployment artifacts per normal release: **1**

A second Preview is justified only when the first Preview found an issue that could not be validated without another deployed artifact.

## Storage discipline

Keep these deployments:

- current Production
- previous known-good Production/rollback candidate
- current verified Preview while a release is in progress

Old canceled, errored, superseded feature previews, and obsolete release previews are cleanup candidates.

Never delete the deployment currently serving `riotbasketballacademy.com`.

## Emergency/manual deployment

Manual deployments remain allowed for recovery. Use them only when the normal Preview → Promote path cannot be used.

## Operating rule for RBA

**Build in Git. Verify once. Promote the verified artifact.**

Do not create a Vercel deployment for:
- copy edits
- article additions
- isolated CSS tweaks
- one-file fixes
- intermediate implementation commits
- routine branch synchronization
