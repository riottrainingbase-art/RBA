"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

const messages = [
  {
    "code": "en",
    "label": "English · Global",
    "text": "An independent basketball coaching clinic from Riot Basketball Academy (Japan): Torsten Loibl Online Clinic Vol.2, 25 November 2026, 11:00–12:30 UTC on Zoom. Explore how shooting technique, spacing, off-ball preparation and decision-making connect to the game. English lecture with Japanese consecutive interpretation. International registration: LIVE US$29 or a separate 30-day recording US$29. No FIBA/JBA accreditation or club endorsement. Full details and USD checkout: https://riotbasketballacademy.com/events/torsten-loibl-online-clinic"
  },
  {
    "code": "es",
    "label": "Español · América Latina",
    "text": "Riot Basketball Academy (Japón) organiza una clínica online independiente para entrenadores con Torsten Loibl el 25 de noviembre de 2026, de 11:00 a 12:30 UTC (08:00 en Argentina / 06:00 en Colombia). Temas: técnica de tiro, espacios, acciones sin balón y toma de decisiones durante el juego. Clase en inglés con interpretación consecutiva al japonés; NO habrá traducción al español. Opciones internacionales separadas: EN VIVO US$29 o grabación disponible durante 30 días US$29. No otorga créditos de certificación FIBA/JBA ni implica aval de clubes. Información y pago en USD: https://riotbasketballacademy.com/events/torsten-loibl-online-clinic"
  },
  {
    "code": "pt",
    "label": "Português · Brasil",
    "text": "A Riot Basketball Academy (Japão) organiza a clínica online independente Torsten Loibl Vol.2 em 25 de novembro de 2026, das 8h às 9h30 (horário de Brasília). Temas: técnica de arremesso, espaçamento, ações sem a bola e tomada de decisão em jogo. Aula em inglês com interpretação consecutiva para japonês; Não haverá interpretação em português. Inscrição internacional: LIVE US$29 ou, separadamente, gravação por 30 dias US$29. Não concede créditos FIBA/JBA nem representa endosso de clubes. Informações e pagamento em USD: https://riotbasketballacademy.com/events/torsten-loibl-online-clinic"
  },
  {
    "code": "fr",
    "label": "Français · Europe / Afrique",
    "text": "Riot Basketball Academy (Japon) organise une formation indépendante en ligne avec Torsten Loibl le 25 novembre 2026, de 11 h à 12 h 30 UTC (12 h–13 h 30 à Paris). Techniques de tir, espaces, déplacements sans ballon et prise de décision en match. Présentation en anglais avec interprétation consécutive en japonais ; AUCUNE traduction française n'est prévue. Deux options internationales distinctes : LIVE 29 USD ou enregistrement accessible pendant 30 jours 29 USD. Aucun crédit FIBA/JBA ni partenariat officiel de club. Informations et paiement en USD : https://riotbasketballacademy.com/events/torsten-loibl-online-clinic"
  },
  {
    "code": "de",
    "label": "Deutsch · Europa",
    "text": "Riot Basketball Academy (Japan) veranstaltet am 25. November 2026 von 12:00 bis 13:30 Uhr MEZ ein unabhängiges Online-Coaching-Seminar mit Torsten Loibl. Themen: Wurftechnik, Spacing, Bewegung ohne Ball und Entscheidungen im Spiel. Der Vortrag findet auf Englisch mit japanischer Konsekutivverdolmetschung statt; es gibt KEINE deutsche Übersetzung. Internationale Buchung: LIVE 29 USD oder separat 30 Tage Aufzeichnung 29 USD. Keine FIBA/JBA-Fortbildungspunkte und keine offizielle Klubunterstützung. Details und USD-Zahlung: https://riotbasketballacademy.com/events/torsten-loibl-online-clinic"
  },
  {
    "code": "zh",
    "label": "繁體中文 · 台灣 / 香港",
    "text": "日本 Riot Basketball Academy（RBA）獨立主辦 Torsten Loibl 線上教練講座 Vol.2，2026年11月25日台北／香港時間19:00–20:30。主題包括投籃技術、空間運用、無球準備以及比賽中的判斷。課程以英語講授，提供日語逐步口譯；不提供中文口譯或字幕。國際報名：直播 US$29，或另外購買30天錄影 US$29。課程不提供 FIBA/JBA 證照學分，亦非球會官方背書。內容及美元付款：https://riotbasketballacademy.com/events/torsten-loibl-online-clinic"
  },
  {
    "code": "ko",
    "label": "한국어 · 한국",
    "text": "일본 Riot Basketball Academy(RBA)가 독립 주최하는 Torsten Loibl 온라인 코칭 클리닉 Vol.2가 2026년 11월 25일(수) 한국시간 20:00–21:30에 열립니다. 슈팅 기술, 스페이싱, 오프볼 움직임, 경기 중 판단을 다룹니다. 강의는 영어로 진행되며 일본어 순차통역이 제공됩니다. 한국어 통역이나 자막은 제공하지 않습니다. 해외 결제는 LIVE US$29 또는 별도 30일 녹화 US$29입니다. FIBA/JBA 자격 연수 학점이나 구단 공식 후원을 의미하지 않습니다. 자세한 내용 및 USD 결제: https://riotbasketballacademy.com/events/torsten-loibl-online-clinic"
  }
] as const;

export function TorstenGlobalShareKit() {
  const [selected, setSelected] = useState<string>("en");
  const [feedback, setFeedback] = useState("");
  const [manual, setManual] = useState(false);
  const current = messages.find((item) => item.code === selected) ?? messages[0];

  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(current.text);
      setManual(false);
      setFeedback("Text copied. Paste it only into a channel where sharing is welcome.");
    } catch {
      setManual(true);
      setFeedback("Automatic copy is unavailable. Select and copy the text below.");
    }
  }
  async function share() {
    if (!navigator.share) { await copy(); return; }
    try {
      await navigator.share({ title: "Torsten Loibl Online Clinic Vol.2", text: current.text });
      setFeedback("Share menu closed. Check the destination app to confirm whether it was shared.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setFeedback("Sharing cancelled.");
      } else {
        setFeedback("Sharing was not available. Use the copy option.");
      }
    }
  }

  return <div style={{ display: "grid", gap: 18 }}>
    <fieldset style={{ padding: 0, margin: 0, border: 0 }}>
      <legend style={{ fontWeight: 700, marginBottom: 12, color: "#111" }}>Choose a language for the recipient</legend>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {messages.map((item) => <label key={item.code} style={{ cursor: "pointer", border: "1px solid #aaa", borderRadius: 24, padding: "9px 14px", background: selected === item.code ? "#121212" : "#fff", color: selected === item.code ? "#fff" : "#111", fontWeight: selected === item.code ? 700 : 400 }}>
          <input type="radio" name="global-share-language" value={item.code} checked={selected === item.code} onChange={() => { setSelected(item.code); setFeedback(""); setManual(false); }} style={{ marginRight: 7 }} />
          {item.label}
        </label>)}
      </div>
    </fieldset>
    <label htmlFor="torsten-global-share-message" style={{ color: "#111", fontWeight: 700 }}>Copy-ready, factual event description</label>
    <textarea id="torsten-global-share-message" lang={current.code === "zh" ? "zh-Hant" : current.code} readOnly rows={12} value={current.text} onFocus={(e) => { if (manual) e.currentTarget.select(); }} style={{ width: "100%", padding: 16, background: "#fff", color: "#111", fontSize: 15, lineHeight: 1.7, border: "1px solid #777", borderRadius: 8, resize: "vertical" }} />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <button type="button" onClick={copy} className="button button-dark">{feedback.startsWith("Text copied") ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />} Copy description</button>
      <button type="button" onClick={share} className="button button-dark"><Share2 size={18} aria-hidden="true" /> Open share menu</button>
    </div>
    <p role="status" aria-live="polite" style={{ minHeight: 24, color: "#333", margin: 0 }}>{feedback || "Review the text before sharing. No email or post is sent by this page."}</p>
  </div>;
}
