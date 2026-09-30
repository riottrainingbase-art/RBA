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
OPENAI_MODEL=gpt-6-luna
```

`OPENAI_MODEL` is optional. The current default is `gpt-6-luna`.

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
4. Check Vercel Deployment Protection before using a Preview URL. If the Preview is protected by Vercel Authentication, LINE cannot complete the login flow.
5. Create a temporary Deployment Protection Exception for the dedicated Preview domain, or use another supported public test endpoint. Keep the rest of the project protected.
6. Set the public Preview webhook URL:
   `https://<preview-host>/api/line/webhook`
7. Click **Verify**.
8. Enable **Use webhook**.
9. Review LINE Official Account Manager response settings:
   - avoid duplicate built-in auto-replies
   - keep the greeting message only if it complements the webhook welcome
10. Test follow, menu, RTB inquiry, RBA inquiry, billing/refund inquiry, and non-text input.
11. After validation, remove any temporary Preview exception that is no longer needed and use the production webhook URL.

## OpenAI

The app calls the OpenAI Responses API over HTTPS.

Default model:

```
gpt-6-luna
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
- Uses `webhookEventId` for best-effort in-memory duplicate suppression on warm instances.
- Failed events are not marked completed, so LINE redelivery can retry them.
- Returns HTTP 200 quickly and processes replies with Next.js `after()`.
- Treats payment, health, and sensitive-account cases as staff-required.

## Preview verification checklist

1. Vercel Preview build is READY.
2. GET `/api/line/webhook` returns:
   - `ok: true`
   - `service: "RIOT LINE concierge (RTB + RBA)"`
3. Add all required Preview environment variables.
4. GET reports `ready: true`.
5. Confirm the Preview webhook is publicly reachable by LINE. A Vercel login screen means Deployment Protection still blocks the webhook.
6. LINE Developers **Verify** succeeds.
7. Add/follow the account from a test LINE user and confirm the RTB/RBA welcome menu.
8. Send: `パーソナルトレーニングを相談したい`
   - should route to RTB.
9. Send: `U15の活動を知りたい`
   - should route to RBA.
10. Send: `料金を知りたい`
   - should ask whether RTB or RBA.
11. Send: `返金について確認したい`
   - should bypass AI and request billing staff confirmation.
12. Send: `腰痛がある`
   - should bypass AI and request health/safety staff confirmation.
13. Send: `怪我予防のトレーニングを相談したい`
   - should route to RTB rather than medical handling.
14. Send an image without text.
   - should ask for a short text explanation.
15. Confirm there are no duplicate LINE Official Account Manager auto-replies.
16. Check Vercel runtime logs for `[line-webhook]` errors.
17. Only then merge/promote to Production.


## Recommended LINE Official Account profile alignment

The current account is used by both RTB and RBA, so the public profile should make that clear before a user sends the first message.

Recommended display name:

```
Riot Training Base｜RBA
```

Recommended status message:

```
RTB｜パーソナル・S&C / RBA｜育成・全国クリニック
```

Recommended short description:

```
仙台のRiot Training Base（パーソナル・S&C）と、Riot Basketball Academy（U12/U15育成・クリニック・キャンプ・指導者教育）の共通公式LINEです。
```

Recommended rich-menu information architecture:

1. RTB｜パーソナル・S&C
2. RBA｜選手・保護者
3. RBA｜指導者
4. MY HOME COURT
5. RBA公式サイト
6. スタッフ相談

Do not enable a second long automatic greeting in LINE Official Account Manager if the webhook follow event is already sending the RTB/RBA welcome message. Avoid duplicate replies.


## Rich menu automation

The repository includes a dependency-free rich-menu generator and provisioning script.

Generate the 1200×810 PNG only:

```bash
npm run line:rich-menu:image
```

Preview the rich-menu JSON without calling LINE:

```bash
npm run line:rich-menu:dry-run
```

Provision the rich menu to the connected LINE Official Account:

```bash
LINE_CHANNEL_ACCESS_TOKEN=... npm run line:rich-menu
```

The script:

1. Generates `public/line-rich-menu.png`
2. Validates the rich-menu object with LINE
3. Creates the rich menu
4. Uploads the generated PNG
5. Sets it as the default rich menu for all users
6. Deletes the newly-created rich menu if upload/default activation fails

Menu areas:

- RTB → starts an RTB personal training / S&C conversation
- RBA PLAYERS → starts an RBA player / parent conversation
- RBA COACHES → starts a coach education conversation
- HOME COURT → opens MY HOME COURT
- RBA WEBSITE → opens the official RBA website
- STAFF → starts a staff-confirmation conversation

The script does not delete a previously active rich menu after a successful switch. Keep the previous menu temporarily for rollback, then remove it manually after validation if desired.

## Deliberately not enabled yet

Persistent conversation memory is intentionally disabled.

A future version can use Supabase for opt-in conversation state, inquiry status, or staff handoff queues, but only after defining:
- what is stored
- retention duration
- deletion behavior
- staff access rules
- user notice / consent
