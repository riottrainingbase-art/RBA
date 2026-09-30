# RBA DEVELOPMENT PLATFORM — Product Architecture

Updated: 2026-10-01
Status: implementation branch only. Do not deploy from this branch.

## Product promise

RBA is not a replacement for a player's current team.

RBA connects four actions around the player's existing basketball life:

1. DISCOVER — find the next appropriate opportunity.
2. LEARN — understand development and choose one thing to try.
3. DO — practise, play, travel or coach in the real world.
4. REFLECT — keep the experience in MY HOME COURT and choose the next step.

Every major product surface should return the user to this loop.

## Primary platform surfaces

### RBA ID
Free identity and entry point. It must create immediate utility before any paid conversion.

Activation is achieved when a new member:
- records one experience;
- saves one opportunity;
- reads one development article.

### MY HOME COURT
The private operating surface. The home screen should answer, in this order:
- What should I do next?
- What did I do recently?
- What am I working on?
- Which opportunity fits me next?
- What can I learn now?

Existing modules that already support this:
- Basketball Passport
- Weekly Loop
- Monthly Review
- Planner
- Development Report
- Global Development Profile
- Saves / activity history

Do not create duplicate trackers when one of these modules already owns the job.

### WORLD YOUTH BASKETBALL MAP
A research layer, not an overseas-praise page.

Each entry needs:
- country / region;
- governing body or league;
- date verified;
- category: rules / competition / coach education / talent / school / girls / 3x3 / environment;
- verified fact;
- why the system exists or what problem it addresses;
- question for Japanese practice;
- primary-source URL;
- source status and last verification date.

Research should connect to a practical RBA resource where one exists.

### OPPORTUNITIES
The action layer.

Every opportunity should communicate:
- age / audience;
- date;
- place;
- purpose;
- cost;
- application status;
- pathway (Development Camp / RBA United / Clinic / Coach Education / Exchange);
- what the participant should try or learn;
- what to record in Passport afterwards.

### PARTNER NETWORK
The network layer.

A Partner is not an endorsement or ranking. Partner status means the relationship and published facts have been verified.

Partner records should distinguish:
- verified partner;
- active collaboration;
- discussion;
- past activity.

Never imply safeguarding, coaching quality or institutional approval merely from partner status.

## Audience loops

### PLAYER
Discover → choose a development focus → participate → Passport → reflect → next opportunity.

### PARENT
Understand → compare environment and logistics → support participation → review experience → decide next step.

### COACH
Learn → design → coach → reflect → discuss / learn again.

Coach education must not be reduced to content consumption. D-HUB should increasingly support this practice loop.

## Partner Club beta

Do not launch a public certification or league table.

Start as a private / application-based Development Partner network.

Minimum published principles:
- child safety and dignity;
- meaningful participation;
- age-appropriate practice and competition;
- attention to workload and recovery;
- willingness to keep learning as coaches;
- transparent programme information.

Phase 1 benefits:
- coach learning access;
- opportunity sharing;
- Development Camp / clinic collaboration;
- international exchange enquiries;
- selected RBA resources.

Before public launch define:
- application owner;
- verification process;
- renewal period;
- complaint / safeguarding escalation;
- suspension and removal process;
- permitted logo language.

## WORLD MAP → PRACTICE bridge

Every major research article should end with one or more of:
- TRY THIS — one practice experiment;
- COACH QUESTION — one reflection question;
- PARENT QUESTION — one environment question;
- RELATED OPPORTUNITY — a real RBA programme when relevant.

This prevents research from becoming passive content.

## Metrics

North-star metric:
Weekly members who complete at least two different development actions.

Supporting metrics:
- RBA ID activation rate;
- week-2 and week-4 return rate;
- Passport entries per active member;
- opportunity saves → applications;
- article read → practice/reflection action;
- weekly loop completion;
- partner clubs with an active coach learner;
- repeat programme participation.

Do not use raw registered-account count as the main success metric.

## Build order

P0
- simplify MY HOME COURT around the development loop;
- connect Passport, Opportunities and Journal visibly;
- make the next action obvious;
- preserve mobile readability.

P1
- WORLD MAP structured data + source verification;
- Partner Club beta data model and governance;
- role-aware recommendations.

P2
- coach practice/reflection network;
- partner-submitted opportunities with moderation;
- aggregate development insights without exposing minors.

## Guardrails

- No public ranking of minors.
- No public player scouting score.
- No unrestricted adult/minor direct messaging.
- Guardian-managed child records remain private.
- Partner status is not a safety guarantee.
- Research entries retain primary-source provenance.
- International opportunities must not imply selection or progression guarantees.
