"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window & { va?: (command: string, ...args: unknown[]) => void; vaq?: unknown[][] };

/** Only fixed CTA IDs and allowlisted attribution labels are sent.
 *  Never include URL strings, form inputs, emails, children or other personal details. */
const sources = new Set(["instagram", "rba_share_kit"]);
const campaigns = new Set(["torsten_vol2_20261125", "rba_first_visit"]);

function safeAttribution(): { source?: string; campaign?: string } {
  const query = new URLSearchParams(window.location.search);
  const source = query.get("utm_source");
  const campaign = query.get("utm_campaign");
  return {
    ...(source && sources.has(source) ? { source } : {}),
    ...(campaign && campaigns.has(campaign) ? { campaign } : {}),
  };
}
export function GrowthClickTracking() {
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const target = event.target;
      const link = target instanceof Element ? target.closest<HTMLAnchorElement>("a[data-growth-id]") : null;
      const id = link?.dataset.growthId;
      if (!id || !/^[a-z0-9-]{1,80}$/.test(id)) return;
      const analytics = window as AnalyticsWindow;
      try {
        const event = { name: "rba_growth_click", data: { cta: id, ...safeAttribution() } };
        if (analytics.va) analytics.va("event", event);
        else (analytics.vaq ??= []).push(["event", event]);
      } catch { /* Navigation must work even when analytics is unavailable. */ }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
