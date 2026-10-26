"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window & { va?: (command: string, ...args: unknown[]) => void; vaq?: unknown[][] };

/** Only fixed CTA identifiers are sent. Never send form text, query strings or child details. */
export function GrowthClickTracking() {
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const target = event.target;
      const link = target instanceof Element ? target.closest<HTMLAnchorElement>("a[data-growth-id]") : null;
      const id = link?.dataset.growthId;
      if (!id || !/^[a-z0-9-]{1,80}$/.test(id)) return;
      const analytics = window as AnalyticsWindow;
      try {
        if (analytics.va) analytics.va("event", { name: "rba_growth_click", data: { cta: id } });
        else (analytics.vaq ??= []).push(["event", { name: "rba_growth_click", data: { cta: id } }]);
      } catch { /* Navigation must work even when analytics is unavailable. */ }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
