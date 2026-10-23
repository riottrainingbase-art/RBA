# RBA overseas clinic → MY HOME COURT / Story rollout

Status: **pre-release draft**. Do not publish links until production routes, auth and analytics are verified.

## Purpose
Convert interest from previous RBA overseas clinic participants into free RBA ID sign-ups, then help them reflect on their experience and discover the next RBA activity. Do not promise automatic importing of attendance, photos, or video.

## Instagram Story / Malaysia (English)

**Frame 1**
YOU TRAINED WITH RBA.
THE JOURNEY CONTINUES.
What will you try next?

**Frame 2**
REMEMBER → TRY → REFLECT.
One idea from the clinic.
One decision in your next game.
One goal for next week.

**Frame 3**
YOUR COURT. YOUR JOURNEY.
Discover MY HOME COURT.
FREE RBA ID — start when registration reopens.
Sticker: **EXPLORE MY HOME COURT**
Link: https://riotbasketballacademy.com/clinic-homecourt?utm_source=instagram&utm_medium=story&utm_campaign=overseas_homecourt_2026&utm_content=malaysia_en

## Instagram Story / Taiwan (Traditional Chinese)

**第 1 張**
你和 RBA 一起訓練過。
下一步，從現在開始。

**第 2 張**
回想 → 嘗試 → 反思
把訓練營學到的一件事，
帶進下一次練習與比賽。

**第 3 張**
你的球場，你的成長。
認識 MY HOME COURT。
RBA ID 免費。
貼圖：**了解 MY HOME COURT**
連結：https://riotbasketballacademy.com/zh-tw/clinic-homecourt?utm_source=instagram&utm_medium=story&utm_campaign=overseas_homecourt_2026&utm_content=taiwan_zh_tw

## Instagram Story / Japan

**1枚目** クリニックの、その先へ。
**2枚目** 学んだことを一つ、次の練習で試そう。
**3枚目** MY HOME COURTで次の挑戦へ。RBA IDは無料。
Link: https://riotbasketballacademy.com/ja/clinic-homecourt?utm_source=instagram&utm_medium=story&utm_campaign=overseas_homecourt_2026&utm_content=japan_ja

## Instagram Story / Korea

**1** RBA 클리닉 이후, 성장의 다음 단계로.
**2** 기억하기 → 시도하기 → 돌아보기.
**3** MY HOME COURT를 알아보세요. RBA ID는 무료입니다.
Link: https://riotbasketballacademy.com/ko/clinic-homecourt?utm_source=instagram&utm_medium=story&utm_campaign=overseas_homecourt_2026&utm_content=korea_ko

## Mandatory release checks

- [ ] Preview build for exact commit passes and all four routes return 200.
- [ ] 390px mobile viewport: no horizontal overflow, CTA visible, links usable.
- [ ] Auth disabled: no CTA claims account creation works; official LINE fallback works.
- [ ] Auth enabled: magic-link delivery, callback, RBA ID creation and MY HOME COURT redirect pass on iOS Instagram in-app browser and Safari.
- [ ] Validate all language switches and guardian links.
- [ ] Verify payment copy: RBA ID free; optional PLUS, no automatic charges.
- [ ] Confirm tracking events and consent compliance before reporting registrations or conversions.
- [ ] Confirm no automatic past-attendance claims and no uploading minors' personal data without appropriate consent.
- [ ] Publish story only after the production deployment is confirmed.

## Measurement

Track separately: story views (Instagram), sticker taps (Instagram), landing sessions (consented analytics), registration starts, verified RBA IDs, MY HOME COURT first visits, and 7-day return visits. A UTM query string alone does not measure conversion.

## Editorial guardrails

Use the actual RBA logo asset already in the website; no invented endorsements, team logos, or claims of official partnerships. No promise of personalised coaching, imported clinic attendance, or access to participant photographs without rights and consent.
