"use client";

import { useEffect, useRef, useState } from "react";

export function CampApplication({ url }: { url: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1100);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== "https://form.jotform.com" || event.source !== frame.current?.contentWindow || typeof event.data !== "string") return;
      const match = /^setHeight:(\d+)(?::|$)/.exec(event.data);
      if (match) setHeight(Math.min(14000, Math.max(700, Number(match[1]) + 40)));
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  return <iframe ref={frame} src={url} title="志津川育成キャンプ参加申込フォーム" loading="lazy" style={{ display: "block", width: "100%", height, border: 0, background: "#fff" }} />;
}
