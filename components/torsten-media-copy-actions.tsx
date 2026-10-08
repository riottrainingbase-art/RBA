"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  copyText: string;
  eventUrl: string;
};

export function TorstenMediaCopyActions({ title, copyText, eventUrl }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const payload = `${copyText}\n\n詳細・申込：${eventUrl}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setState("copied");
    } catch {
      setState("error");
    }
  };

  const share = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text: copyText, url: eventUrl });
        return;
      } catch (error) {
        if ((error as { name?: string })?.name === "AbortError") return;
      }
    }
    await copy();
  };

  return (
    <div className="event-share-buttons" style={{ marginTop: 18 }}>
      <button className="button button-orange" type="button" onClick={copy}>
        {state === "copied" ? <Check size={17} /> : <Copy size={17} />}
        {state === "copied" ? "コピーしました" : "紹介文と申込URLをコピー"}
      </button>
      <button className="button button-dark" type="button" onClick={share}>
        <Share2 size={17} /> 共有する
      </button>
      {state === "error" ? (
        <p role="status" style={{ color: "#ac341e" }}>
          自動コピーできませんでした。上の本文とURLを選択してコピーしてください。
        </p>
      ) : null}
    </div>
  );
}
