# RBA LINE AI Assistant setup

This implementation adds a secure LINE Messaging API webhook to the RBA Next.js application.

## Endpoint

After deployment:

```
https://riotbasketballacademy.com/api/line/webhook
```

GET returns configuration readiness without exposing secret values.

POST is the LINE webhook endpoint.

## Required environment variables

Set these in the Vercel project for Preview and Production:

```
LINE_CHANNEL_SECRET=
LINE_CHANNEL_ACCESS_TOKEN=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.6-luna
```

`OPENAI_MODEL` is optional. The code defaults to `gpt-5.6-luna`.

Never put any of these secret values in GitHub.

## LINE Developers Console

1. Open the Messaging API channel for the RBA LINE Official Account.
2. Copy the Channel secret to `LINE_CHANNEL_SECRET`.
3. Issue/copy a Channel access token and store it as `LINE_CHANNEL_ACCESS_TOKEN`.
4. Set the Webhook URL to:
   `https://riotbasketballacademy.com/api/line/webhook`
5. Click **Verify**.
6. Enable **Use webhook**.
7. Review the LINE Official Account auto-response settings so LINE's built-in greeting/auto-reply does not duplicate the AI reply.

## OpenAI

Create an OpenAI API key and store it in Vercel as `OPENAI_API_KEY`.

The implementation uses the Responses API over HTTPS and does not require adding the OpenAI SDK package.

## Security design

- Verifies `x-line-signature` using the raw request body and HMAC-SHA256 before parsing JSON.
- Keeps all credentials in server-side environment variables.
- Does not store LINE user IDs or conversation contents in the initial version.
- Does not expose secrets in the health endpoint.
- Ignores non-text events.
- Truncates outgoing LINE text to 5,000 characters.

## Verification checklist

1. Deploy the feature branch to a Vercel Preview deployment.
2. Open `/api/line/webhook` and confirm `ok: true`.
3. Add the three required secrets to the Preview environment.
4. Confirm the health endpoint reports `ready: true`.
5. Use LINE Developers **Verify** against the Preview webhook URL first.
6. Send a text message from a test LINE account and confirm a single AI reply.
7. Check Vercel Runtime Logs for `[line-webhook]` errors.
8. Only after Preview verification, merge/promote to Production.
9. Change the LINE webhook URL to the production endpoint and verify again.

## Next stage

For persistent conversation memory, connect a server-only Supabase secret key and store a minimal mapping between LINE user ID and conversation state with retention controls. Do not enable conversation logging by default without a clear retention/privacy policy.
