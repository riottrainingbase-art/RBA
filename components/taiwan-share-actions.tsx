"use client";

import { useState } from "react";
import { Copy, Send } from "lucide-react";

type Props = {
  path: string;
  message: string;
  trackingId: string;
};

export function TaiwanShareActions({ path, message, trackingId }: Props) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const url = new URL(path, "https://riotbasketballacademy.com");
  url.searchParams.set("utm_source", "line");
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set("utm_campaign", "rba_taiwan");
  const lineHref = new URL("https://social-plugins.line.me/lineit/share");
  lineHref.searchParams.set("url", url.toString());
  lineHref.searchParams.set("text", message);

  const copyUrl = new URL(url);
  copyUrl.searchParams.set("utm_source", "share_copy");
  const text = `${message}\n${copyUrl}`;

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("manual");
    }
  }

  return (
    <>
      <div className="homecourt-launch-actions">
        <a className="button button-dark" href={lineHref.toString()} target="_blank" rel="noopener noreferrer" data-growth-id={trackingId}>
          <Send size={16} aria-hidden="true" /> 用 LINE 分享
        </a>
        <button type="button" className="button button-light" onClick={copyMessage}>
          <Copy size={16} aria-hidden="true" /> 複製分享文字
        </button>
      </div>
      <p role="status">
        {copyState === "copied" ? "已複製，可貼到 LINE 或其他社群。" : copyState === "manual" ? "請選取下方文字並手動複製。" : ""}
      </p>
      {copyState === "manual" && (
        <textarea aria-label="分享文字與連結" rows={4} readOnly value={text} onFocus={(event) => event.currentTarget.select()} className="w-full" />
      )}
    </>
  );
}
