"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "./site-frame";
import {
  japanPoints,
  plannedJapanPoints,
  worldPoints,
  tr,
  MapPoint,
  Text4,
  ActivityType,
  JapanRegion,
  japanLocationProfiles,
  japanRegionLabels,
} from "./network-data";
import { programmeById } from "./programme-data";

const copy = {
  title: ["From Japan to the world.", "日本の現場から、世界へ。", "從日本球場，連結世界。", "일본의 현장에서 세계로."] as Text4,
  intro: [
    "Explore RBA activity locations and international relationships. The Japan map uses GSI tiles and representative geographic coordinates.",
    "RBAの活動地域と海外連携を地図から確認できます。日本地図は国土地理院の地理院タイルをリアルタイム表示し、各拠点は代表地点の緯度・経度から配置しています。",
    "可透過地圖查看RBA活動地區與海外合作。日本地圖即時顯示國土地理院地圖磚，據點依代表地點經緯度配置。",
    "RBA 활동 지역과 해외 협력 관계를 지도에서 확인할 수 있습니다. 일본 지도는 국토지리원 타일과 대표 지점 좌표를 사용합니다.",
  ] as Text4,
  japan: ["Japan · Activity network", "日本・活動ネットワーク", "日本・活動網絡", "일본・활동 네트워크"] as Text4,
  world: ["World · International network", "世界・海外連携先", "世界・海外合作網絡", "세계・해외 협력 네트워크"] as Text4,
  hint: [
    "Select a numbered marker or a location below. The line starts at the representative geographic coordinate; the numbered marker may be offset to avoid overlap.",
    "地図の番号か下の地域名を押すと詳細を表示します。線の起点が代表地点の緯度・経度で、番号は重なりを避けるため見やすい位置へずらす場合があります。",
    "選擇地圖編號或下方地名查看詳情。線段起點為代表地點經緯度，編號可能為避免重疊而稍微偏移。",
    "지도 번호 또는 아래 지역명을 누르면 상세 정보가 표시됩니다. 선의 시작점이 대표 지점 좌표이며 번호는 겹침을 피하기 위해 이동할 수 있습니다.",
  ] as Text4,
  note: [
    "Map base: GSI pale tiles. Coordinates represent the named city/area where known; prefecture-level records use a representative prefectural coordinate. They are not gym entrances.",
    "背景地図は国土地理院「淡色地図」。市・地域が確認できる拠点はその代表座標、都道府県単位の記録は都道府県の代表座標を表示しています。体育館入口や個人住所を示すものではありません。",
    "底圖為國土地理院「淡色地圖」。已知市／地區的據點使用代表座標，僅有都道府縣層級記錄時使用都道府縣代表座標；並非場館入口或私人地址。",
    "배경 지도는 일본 국토지리원 '옅은색 지도'입니다. 시·지역이 확인되는 거점은 대표 좌표를, 도도부현 단위 기록은 대표 좌표를 표시하며 체육관 입구나 개인 주소가 아닙니다.",
  ] as Text4,
  worldNote: [
    "A partner relationship does not mean an overseas programme has already taken place. Each location shows its current status.",
    "連携先として掲載している地域でも、すでに海外で活動を実施したとは限りません。交流企画の進行状況は各項目に表示しています。",
    "合作關係不代表海外活動已舉行，各地項目另列目前進度。",
    "협력 관계가 해외 프로그램 개최 완료를 의미하지는 않습니다. 각 항목에 현재 진행 상태를 표시합니다.",
  ] as Text4,
  all: ["All", "すべて", "全部", "전체"] as Text4,
  allRegions: ["All regions", "全国", "全國", "전국"] as Text4,
  region: ["Region", "地方", "地區", "지역"] as Text4,
  type: ["Activity", "活動種別", "活動類型", "활동 유형"] as Text4,
  empty: ["No locations match these filters.", "条件に一致する地域はありません。", "沒有符合條件的地點。", "조건에 맞는 지역이 없습니다."] as Text4,
  selected: ["Selected location", "選択中の地域", "已選地點", "선택한 지역"] as Text4,
  prefecture: ["Prefecture", "都道府県", "都道府縣", "도도부현"] as Text4,
  municipality: ["City / area", "市・地域", "市／地區", "시・지역"] as Text4,
  coordinator: ["Regional lead", "地域責任者", "區域負責人", "지역 책임자"] as Text4,
  coordinatorPending: ["To be added", "後日掲載", "日後公布", "추후 공개"] as Text4,
  coordinate: ["Map coordinate", "地図上の代表座標", "地圖代表座標", "지도 대표 좌표"] as Text4,
  regional: ["Regional details", "地域詳細ページ", "區域詳情頁", "지역 상세 페이지"] as Text4,
  contact: ["Discuss a clinic or exchange", "クリニック・地域開催を相談する", "洽詢訓練營或區域活動", "클리닉·지역 개최 문의"] as Text4,
  programme: ["Related programme", "関連プログラム", "相關活動", "관련 프로그램"] as Text4,
  apply: ["Details & registration", "詳細・申込へ", "詳情與報名", "상세·신청"] as Text4,
  source: ["Map source", "地図出典", "地圖來源", "지도 출처"] as Text4,
} as const;

const activityLabels: Record<ActivityType, Text4> = {
  clinic: ["Clinic", "クリニック", "訓練營", "클리닉"],
  camp: ["Camp", "キャンプ", "培育營", "캠프"],
  "3x3": ["3x3", "3x3", "3x3", "3x3"],
  school: ["School", "スクール", "課程", "스쿨"],
};

const status: Record<MapPoint["status"], Text4> = {
  activity: ["Activity record", "活動実績", "活動紀錄", "활동 이력"],
  planned: ["Planned programme", "開催予定", "活動規劃", "개최 예정"],
  partner: ["Partner", "連携先", "合作夥伴", "협력 파트너"],
  discussion: ["In discussion", "協議中", "協議中", "협의 중"],
};

const coordinateLevel: Record<"city" | "area" | "prefecture", Text4> = {
  city: ["city representative point", "市の代表地点", "城市代表點", "시 대표 지점"],
  area: ["area representative point", "地域の代表地点", "地區代表點", "지역 대표 지점"],
  prefecture: ["prefecture representative point", "都道府県の代表地点", "都道府縣代表點", "도도부현 대표 지점"],
};

const offsets: Record<string, [number, number]> = {
  akita: [-4, -1],
  yuzawa: [4, 1],
  sendai: [-5, 2],
  shizugawa: [5, -2],
  saitama: [-6, -2],
  kazo: [1, -5],
  harayama: [6, 1],
  kozaki: [6, -4],
  kawasaki: [-4, 5],
  takahama: [-6, -3],
  toyota: [4, -5],
  ise: [6, 3],
  saga: [-4, -4],
  okawa: [5, 3],
  okinawa: [7, -7],
  tomigusuku: [-7, -1],
  itoman: [7, 3],
  nanjo: [-5, 8],
  ishigaki: [-5, 1],
  "yamagata-planned": [5, -4],
  "tatsuno-planned": [-5, 4],
  taiwan: [-3, 4],
  korea: [3, -3],
};

const relatedProgramme: Record<string, { text: Text4; href: string }> = {
  saga: {
    text: ["Saga × Fukuoka 2Days Development Camp", "佐賀 × 福岡 2Days Development Camp", "佐賀 × 福岡兩日培育營", "사가 × 후쿠오카 2Days Development Camp"],
    href: "/ja/saga",
  },
  okawa: {
    text: ["Saga × Fukuoka 2Days Development Camp", "佐賀 × 福岡 2Days Development Camp", "佐賀 × 福岡兩日培育營", "사가 × 후쿠오카 2Days Development Camp"],
    href: "/ja/saga",
  },
  "yamagata-planned": {
    text: ["24 Oct · Yamagata 1Day Clinic", "10月24日 · 山形1Day Clinic", "10月24日 · 山形一日訓練營", "10월 24일 · 야마가타 1Day Clinic"],
    href: programmeById.yamagata.applicationUrl,
  },
  shizugawa: {
    text: ["7–8 Nov · Shizugawa Development Camp", "11月7〜8日 · 志津川 Development Camp", "11月7日至8日 · 志津川培育營", "11월 7~8일 · 시즈가와 Development Camp"],
    href: programmeById.shizugawa.applicationUrl,
  },
  "tatsuno-planned": {
    text: ["20–23 Nov · KOBE Development Camp", "11月20〜23日 · KOBE Development Camp", "11月20日至23日 · KOBE培育營", "11월 20~23일 · KOBE Development Camp"],
    href: programmeById.kobe.applicationUrl,
  },
};

const GSI_ZOOM = 5;
const TILE_SIZE = 256;
const JAPAN_BOUNDS = { west: 121.5, east: 148.5, north: 46.5, south: 23.0 };

function mercatorPixel(lon: number, lat: number, zoom = GSI_ZOOM) {
  const n = 2 ** zoom;
  const x = ((lon + 180) / 360) * n * TILE_SIZE;
  const clampedLat = Math.max(-85.05112878, Math.min(85.05112878, lat));
  const latRad = (clampedLat * Math.PI) / 180;
  const y = ((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n * TILE_SIZE;
  return [x, y] as const;
}

const [japanLeft, japanTop] = mercatorPixel(JAPAN_BOUNDS.west, JAPAN_BOUNDS.north);
const [japanRight, japanBottom] = mercatorPixel(JAPAN_BOUNDS.east, JAPAN_BOUNDS.south);
const japanWidth = japanRight - japanLeft;
const japanHeight = japanBottom - japanTop;

const japanTiles = (() => {
  const minX = Math.floor(japanLeft / TILE_SIZE);
  const maxX = Math.floor(japanRight / TILE_SIZE);
  const minY = Math.floor(japanTop / TILE_SIZE);
  const maxY = Math.floor(japanBottom / TILE_SIZE);
  const result: { x: number; y: number }[] = [];
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) result.push({ x, y });
  }
  return result;
})();

function positionJapan(point: MapPoint) {
  const [x, y] = mercatorPixel(point.lon, point.lat);
  return [((x - japanLeft) / japanWidth) * 100, ((y - japanTop) / japanHeight) * 100] as const;
}

function positionWorld(point: MapPoint) {
  const bounds = [-180, 180, -60, 85] as const;
  return [
    ((point.lon - bounds[0]) / (bounds[1] - bounds[0])) * 100,
    ((bounds[3] - point.lat) / (bounds[3] - bounds[2])) * 100,
  ] as const;
}

function JapanBaseMap({ locale }: { locale: Locale }) {
  return (
    <>
      <svg
        className="network-gsi-map"
        viewBox={`${japanLeft} ${japanTop} ${japanWidth} ${japanHeight}`}
        role="img"
        aria-label={tr(copy.japan, locale)}
        preserveAspectRatio="xMidYMid meet"
      >
        <image
          href="/network-japan.svg"
          x={japanLeft}
          y={japanTop}
          width={japanWidth}
          height={japanHeight}
          preserveAspectRatio="none"
          opacity="0.18"
        />
        {japanTiles.map(({ x, y }) => (
          <image
            key={`${x}-${y}`}
            href={`https://cyberjapandata.gsi.go.jp/xyz/pale/${GSI_ZOOM}/${x}/${y}.png`}
            x={x * TILE_SIZE}
            y={y * TILE_SIZE}
            width={TILE_SIZE}
            height={TILE_SIZE}
          />
        ))}
      </svg>
      <span className="network-map-source-badge">{tr(copy.source, locale)} · GSI</span>
    </>
  );
}

function LocationDetail({
  locale,
  kind,
  active,
}: {
  locale: Locale;
  kind: "japan" | "world";
  active?: MapPoint;
}) {
  if (!active) return <aside className="network-detail"><p>{tr(copy.empty, locale)}</p></aside>;

  const profile = kind === "japan" ? japanLocationProfiles[active.id] : undefined;
  const regionalPage = profile?.page?.[locale];
  const programme = relatedProgramme[active.id];

  return (
    <aside className="network-detail" id={`network-detail-${kind}`} aria-live="polite">
      <p className="section-index">{tr(copy.selected, locale)}</p>
      <span className={`network-badge ${active.status}`}>{tr(active.statusLabel || status[active.status], locale)}</span>
      <h3>{tr(active.name, locale)}</h3>
      <p>{tr(active.detail, locale)}</p>

      {profile ? (
        <div className="network-detail-meta">
          <div>
            <span>{tr(copy.region, locale)}</span>
            <strong>{tr(japanRegionLabels[profile.region], locale)}</strong>
          </div>
          <div>
            <span>{tr(copy.prefecture, locale)}</span>
            <strong>{tr(profile.prefecture, locale)}</strong>
          </div>
          <div>
            <span>{tr(copy.municipality, locale)}</span>
            <strong>{profile.municipality ? tr(profile.municipality, locale) : "—"}</strong>
          </div>
          <div>
            <span>{tr(copy.coordinator, locale)}</span>
            <strong>{profile.lead?.name || tr(copy.coordinatorPending, locale)}</strong>
            {profile.lead?.role ? <small>{tr(profile.lead.role, locale)}</small> : null}
          </div>
        </div>
      ) : null}

      {kind === "japan" ? (
        <p className="network-coordinate-note">
          <strong>{tr(copy.coordinate, locale)}</strong>
          <span>{active.lat.toFixed(4)} / {active.lon.toFixed(4)}</span>
          {profile ? <small>{tr(coordinateLevel[profile.coordinateLevel], locale)}</small> : null}
        </p>
      ) : null}

      {regionalPage ? (
        <a className="network-primary-link" href={regionalPage}>{tr(copy.regional, locale)} →</a>
      ) : null}

      {programme ? (
        <div className="network-upcoming">
          <strong>{tr(copy.programme, locale)}</strong>
          <p>{tr(programme.text, locale)}</p>
          <a
            href={programme.href.startsWith("/") ? programme.href : programme.href}
            target={programme.href.startsWith("http") ? "_blank" : undefined}
            rel={programme.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {tr(copy.apply, locale)} →
          </a>
        </div>
      ) : null}

      <a href={(locale === "en" ? "" : `/${locale}`) + "/contact"}>{tr(copy.contact, locale)} →</a>
    </aside>
  );
}

function MapPanel({ locale, kind }: { locale: Locale; kind: "japan" | "world" }) {
  const points = kind === "japan" ? [...japanPoints, ...plannedJapanPoints] : worldPoints;
  const [filter, setFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState<"all" | JapanRegion>("all");
  const [selected, setSelected] = useState(points[0].id);

  const availableRegions = kind === "japan"
    ? Array.from(
        new Set(
          points
            .map((point) => japanLocationProfiles[point.id]?.region)
            .filter((region): region is JapanRegion => Boolean(region)),
        ),
      )
    : [];

  const shown = points.filter((point) => {
    const activityMatch =
      filter === "all" || point.status === filter || point.activities?.includes(filter as ActivityType);
    const regionMatch =
      kind !== "japan" ||
      regionFilter === "all" ||
      japanLocationProfiles[point.id]?.region === regionFilter;
    return activityMatch && regionMatch;
  });

  const active = shown.find((point) => point.id === selected) || shown[0];
  const kinds =
    kind === "japan"
      ? (["clinic", "camp", "3x3", "school", "planned"] as const)
      : (["partner", "discussion"] as const);

  const position = kind === "japan" ? positionJapan : positionWorld;

  return (
    <div className="network-panel">
      <p className="network-hint">{tr(copy.hint, locale)}</p>

      {kind === "japan" ? (
        <div className="network-filter-block">
          <span>{tr(copy.region, locale)}</span>
          <div className="network-filters" role="group" aria-label={tr(copy.region, locale)}>
            <button type="button" aria-pressed={regionFilter === "all"} onClick={() => setRegionFilter("all")}>
              {tr(copy.allRegions, locale)}
            </button>
            {availableRegions.map((region) => (
              <button
                type="button"
                key={region}
                aria-pressed={regionFilter === region}
                onClick={() => setRegionFilter(region)}
              >
                {tr(japanRegionLabels[region], locale)}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="network-filter-block">
        <span>{tr(copy.type, locale)}</span>
        <div className="network-filters" role="group" aria-label={tr(copy.type, locale)}>
          {["all", ...kinds].map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === "all"
                ? tr(copy.all, locale)
                : item in activityLabels
                  ? tr(activityLabels[item as ActivityType], locale)
                  : tr(status[item as MapPoint["status"]], locale)}
            </button>
          ))}
        </div>
      </div>

      <div className="network-layout">
        <div className={`network-map network-map-${kind}`} role="group" aria-label={tr(copy[kind], locale)}>
          {kind === "japan" ? (
            <JapanBaseMap locale={locale} />
          ) : (
            <Image src="/network-world.svg" alt={tr(copy.world, locale)} width={1000} height={403} />
          )}

          <svg className="network-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {shown.map((point) => {
              const [x, y] = position(point);
              const [dx, dy] = offsets[point.id] || [0, 0];
              return (
                <g key={point.id}>
                  <line x1={x} y1={y} x2={x + dx} y2={y + dy} />
                  <circle cx={x} cy={y} r="0.45" />
                </g>
              );
            })}
          </svg>

          {shown.map((point) => {
            const [x, y] = position(point);
            const [dx, dy] = offsets[point.id] || [0, 0];
            return (
              <button
                type="button"
                className={`network-pin ${point.status}`}
                key={point.id}
                style={{ left: `${x + dx}%`, top: `${y + dy}%` }}
                aria-label={`${tr(point.name, locale)} — ${tr(point.statusLabel || status[point.status], locale)}`}
                aria-pressed={active?.id === point.id}
                aria-controls={`network-detail-${kind}`}
                onClick={() => setSelected(point.id)}
              >
                {points.indexOf(point) + 1}
              </button>
            );
          })}
        </div>

        <LocationDetail locale={locale} kind={kind} active={active} />
      </div>

      <div className="network-locations">
        {shown.map((point) => {
          const profile = kind === "japan" ? japanLocationProfiles[point.id] : undefined;
          return (
            <button
              type="button"
              key={point.id}
              aria-pressed={active?.id === point.id}
              onClick={() => setSelected(point.id)}
              aria-controls={`network-detail-${kind}`}
            >
              <strong>{points.indexOf(point) + 1}. {tr(point.name, locale)}</strong>
              <span>{tr(point.statusLabel || status[point.status], locale)}</span>
              {profile ? <small>{tr(japanRegionLabels[profile.region], locale)} · {tr(profile.prefecture, locale)}</small> : null}
            </button>
          );
        })}
      </div>

      {!shown.length ? <p className="network-empty">{tr(copy.empty, locale)}</p> : null}
      <p className="network-note">{tr(kind === "japan" ? copy.note : copy.worldNote, locale)}</p>

      {kind === "japan" ? (
        <details className="network-map-attribution">
          <summary>{tr(copy.source, locale)}</summary>
          <p>
            <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noreferrer">
              国土地理院・地理院タイル「淡色地図」
            </a>
          </p>
          <p>
            Shoreline data is derived from: United States. National Imagery and Mapping Agency.
            “Vector Map Level 0 (VMAP0).” Bethesda, MD: Denver, CO: The Agency; USGS Information Services, 1997.
          </p>
        </details>
      ) : (
        <p className="network-credit">
          <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noreferrer">Natural Earth</a> · 2026-09-17
        </p>
      )}
    </div>
  );
}

export function NetworkMaps({ locale }: { locale: Locale }) {
  const [view, setView] = useState<"japan" | "world">("japan");

  return (
    <section className="network-section section-pad" id="network">
      <div className="section-head">
        <div>
          <p className="section-index">RBA / JAPAN × WORLD</p>
          <h2>{tr(copy.title, locale)}</h2>
        </div>
        <p>{tr(copy.intro, locale)}</p>
      </div>
      <div className="network-tabs" role="tablist" aria-label="RBA network">
        <button
          type="button"
          role="tab"
          id="network-tab-japan"
          aria-selected={view === "japan"}
          aria-controls="network-panel-japan"
          onClick={() => setView("japan")}
        >
          {tr(copy.japan, locale)}
        </button>
        <button
          type="button"
          role="tab"
          id="network-tab-world"
          aria-selected={view === "world"}
          aria-controls="network-panel-world"
          onClick={() => setView("world")}
        >
          {tr(copy.world, locale)}
        </button>
      </div>
      <div role="tabpanel" id={`network-panel-${view}`} aria-labelledby={`network-tab-${view}`}>
        <MapPanel locale={locale} kind={view} />
      </div>
    </section>
  );
}
