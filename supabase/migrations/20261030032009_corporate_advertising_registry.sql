create table public.rba_advertisers (
 id uuid primary key default gen_random_uuid(),
 display_name text not null check(length(trim(display_name)) between 1 and 100),
 tier text not null check(tier in ('supporter','partner')),
 website_url text not null default '' check(website_url='' or website_url ~ '^https://[^[:space:]]+$'),
 introduction text not null default '' check(length(introduction)<=1200),
 logo_path text not null default '' check(logo_path='' or logo_path ~ '^logos/[0-9a-f-]{36}\.jpg$'),
 joined_at timestamptz not null,
 display_until timestamptz not null,
 published boolean not null default false,
 paid_verified boolean not null default false,
 consent_confirmed_at timestamptz,
 created_at timestamptz not null default now(),updated_at timestamptz not null default now(),
 check(not published or (paid_verified and consent_confirmed_at is not null)),
 check(display_until>joined_at)
);
alter table public.rba_advertisers enable row level security;
revoke all on public.rba_advertisers from anon,authenticated;
grant select on public.rba_advertisers to anon,authenticated;
grant insert,update on public.rba_advertisers to authenticated;
create policy "current advertisers public read" on public.rba_advertisers for select to anon,authenticated using(published and paid_verified and consent_confirmed_at is not null and joined_at<=now() and display_until>now());
create policy "editor manages advertisers" on public.rba_advertisers for all to authenticated using(exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid()))) with check(exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid())));
create index rba_advertisers_order on public.rba_advertisers(joined_at,created_at);
create table public.rba_advertiser_followups (
 advertiser_id uuid primary key references public.rba_advertisers(id) on delete cascade,
 stripe_reference text not null default '' check(length(stripe_reference)<=300),
 welcome_done boolean not null default false,
 publication_notified boolean not null default false,
 last_report_month text not null default '' check(last_report_month='' or last_report_month ~ '^20[0-9]{2}-[0-9]{2}$'),
 annual_review_due date,
 notes text not null default '' check(length(notes)<=2000),
 updated_at timestamptz not null default now()
);
alter table public.rba_advertiser_followups enable row level security;
revoke all on public.rba_advertiser_followups from anon,authenticated;
grant select,insert,update on public.rba_advertiser_followups to authenticated;
create policy "editor manages advertising followups" on public.rba_advertiser_followups for all to authenticated using(exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid()))) with check(exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid())));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('rba-advertising-assets','rba-advertising-assets',false,3145728,array['image/jpeg']);
create policy "editor manages advertising files" on storage.objects for all to authenticated using(bucket_id='rba-advertising-assets' and exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid()))) with check(bucket_id='rba-advertising-assets' and exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid())));
create policy "current advertiser logo public read" on storage.objects for select to anon,authenticated using(bucket_id='rba-advertising-assets' and exists(select 1 from public.rba_advertisers a where a.logo_path=storage.objects.name and a.tier='partner' and a.published and a.paid_verified and a.consent_confirmed_at is not null and a.display_until>now()));
create table public.rba_advertising_reports (
 id uuid primary key default gen_random_uuid(),
 title text not null check(length(trim(title)) between 1 and 160),
 report_month text not null check(report_month ~ '^20[0-9]{2}-(0[1-9]|1[0-2])$'),
 pdf_path text not null unique check(pdf_path ~ '^reports/[0-9a-f-]{36}\.pdf$'),
 published boolean not null default false,
 issued_at timestamptz not null default now(),created_at timestamptz not null default now()
);
alter table public.rba_advertising_reports enable row level security;
revoke all on public.rba_advertising_reports from anon,authenticated;
grant select on public.rba_advertising_reports to anon,authenticated;
grant insert,update on public.rba_advertising_reports to authenticated;
create policy "published advertising reports public read" on public.rba_advertising_reports for select to anon,authenticated using(published);
create policy "editor manages advertising reports" on public.rba_advertising_reports for all to authenticated using(exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid()))) with check(exists(select 1 from public.rba_support_photo_editors e where e.user_id=(select auth.uid())));
update storage.buckets set file_size_limit=12582912,allowed_mime_types=array['image/jpeg','application/pdf'] where id='rba-advertising-assets';
create policy "published advertising report files read" on storage.objects for select to anon,authenticated using(bucket_id='rba-advertising-assets' and exists(select 1 from public.rba_advertising_reports r where r.pdf_path=storage.objects.name and r.published));
