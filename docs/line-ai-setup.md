# RIOT LINE Concierge setup (RTB + RBA)

This implementation turns the existing RIOT LINE Official Account into a shared automated front desk for:

- Riot Training Base (RTB): personal training / S&C / physical preparation
- Riot Basketball Academy (RBA): youth basketball development / clinics / camps / coach education / exchange

The bot routes inquiries into RTB, RBA, ambiguous, or staff-required flows before generating an AI response.

## Endpoint

Production:

```
https://riotbasketballacademy.com/api/line/webhook
```

Use the Vercel Preview deployment URL first during validation.

GET returns configuration readiness and privacy state without exposing secret values.

POST is the LINE Messaging API webhook endpoint.

## Required environment variables

Set these in the Vercel project:

```
LINE_CHANNEL_SECRET=
LINE_CHANNEL_ACCESS_TOKEN=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.6-luna
```

`OPENAI_MODEL` is optional. The current default is `gpt-5.6-luna`.

Never put secret values in GitHub.

## User experience

### New friend / menu

The account introduces itself as the shared RTB + RBA contact and displays quick replies:

- RTB｜パーソナル
- RBA｜バスケ
- RBA｜指導者
- スタッフ相談

### RTB routing

Typical RTB topics:

- personal training
- S&C / physical preparation
- strength and weight training
- youth physical development
- training consultation

The AI can collect only minimal non-sensitive intake details such as age group, goal, training experience, preferred frequency, and preferred days/times.

### RBA routing

Typical RBA topics:

- U12 / U15
- clinics and camps
- MY HOME COURT
- RBA United
- Team Training
- D-HUB / Coach Journal
- coach education
- domestic and international exchange

The AI must not invent current event dates, prices, venues, capacity, or registration status.

### Staff-required routing

These topics bypass AI advice and receive a staff-confirmation response:

- refunds / duplicate payments / billing
- cancellation or withdrawal procedures
- injuries, pain, diagnosis, allergies
- complaints
- sensitive personal information

The bot explicitly tells users not to send passwords, full card details, medical records, or identity documents.

## LINE Developers Console

1. Open the Messaging API channel attached to the existing RIOT / Riot Training Base LINE Official Account.
2. Copy the Channel secret to `LINE_CHANNEL_SECRET`.
3. Issue/copy a Channel access token and store it as `LINE_CHANNEL_ACCESS_TOKEN`.
4. Set the Preview webhook URL first:
   `https://<preview-host>/api/line/webhook`
5. Click **Verify**.
6. Enable **Use webhook**.
7. Review LINE Official Account Manager response settings:
   - avoid duplicate built-in auto-replies
   - keep the greeting message only if it complements the webhook welcome
8. Test follow, menu, RTB inquiry, RBA inquiry, billing/refund inquiry, and non-text input.
9. After validation, use the production webhook URL.

## OpenAI

The app calls the OpenAI Responses API over HTTPS.

Default model:

```
gpt-5.6-luna
```

Responses use:

```
store: false
```

No OpenAI SDK package is required.

## Security and privacy design

- Verifies `x-line-signature` against the exact raw request body using HMAC-SHA256 before parsing events.
- Rejects invalid signatures.
- Rejects unexpectedly large webhook bodies.
- Keeps all credentials in server-side environment variables.
- Does not store LINE user IDs.
- Does not store conversation contents.
- Does not expose secret values from the readiness endpoint.
- Does not log user message text.
- Uses request timeouts for LINE and OpenAI calls.
- Returns HTTP 200 quickly and processes replies with Next.js `after()`.
- Treats payment, health, and sensitive-account cases as staff-required.

## Preview verification checklist

1. Vercel Preview build is READY.
2. GET `/api/line/webhook` returns:
   - `ok: true`
   - `service: "RIOT LINE concierge (RTB + RBA)"`
3. Add all required Preview environment variables.
4. GET reports `ready: true`.
5. LINE Developers **Verify** succeeds.
6. Add/follow the account from a test LINE user and confirm the RTB/RBA welcome menu.
7. Send: `パーソナルトレーニングを相談したい`
   - should route to RTB.
8. Send: `U15の活動を知りたい`
   - should route to RBA.
9. Send: `料金を知りたい`
   - should ask whether RTB or RBA.
10. Send: `返金について確認したい`
   - should bypass AI and request staff confirmation.
11. Send an image without text.
   - should ask for a short text explanation.
12. Confirm there are no duplicate LINE Official Account Manager auto-replies.
13. Check Vercel runtime logs for `[line-webhook]` errors.
14. Only then merge/promote to Production.

## Deliberately not enabled yet

Persistent conversation memory is intentionally disabled.

A future version can use Supabase for opt-in conversation state, inquiry status, or staff handoff queues, but only after defining:
- what is stored
- retention duration
- deletion behavior
- staff access rules
- user notice / consent
