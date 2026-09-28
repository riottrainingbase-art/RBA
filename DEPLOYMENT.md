# RBA deployment workflow

RBA uses a controlled release workflow so Vercel does not build every working commit.

## Branches

- `feature/*`, `work/*`, and other normal branches: **no automatic Vercel deployment**
- `preview-rba`: preview checkpoint branch
- `main`: production branch

## Preview

Work freely on a feature branch and make as many commits as needed.

When the work is ready for browser/device QA:

1. Sync the work with the latest `main`.
2. Update `preview-rba` with the release candidate.
3. Make the preview checkpoint commit include `[preview]`.

Example:

`[preview] HOMECOURT and TEAM DEVELOPMENT release candidate`

Only that checkpoint should run a full Vercel Preview build.

## Production

After the Preview is verified, merge the approved release into `main`.

The production checkpoint commit must include `[deploy]`.

Example:

`[deploy] Release HOMECOURT platform update`

Commits on `main` without `[deploy]` are intentionally ignored by the Vercel build step. This lets several code/content updates accumulate before one production build.

## Emergency/manual deployment

Manual Vercel deployments are allowed because the build gate permits runs that do not have a Git ref.

## Operating rule

Do not use Vercel as a compile check after every edit. Use Git branches for iteration, then run one Preview build at a release checkpoint and one Production build after approval.
