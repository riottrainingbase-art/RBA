/**
 * GREAM OKINAWA original illustration.
 * Inspired by Okinawa's ocean, subtropical vegetation and Ryukyu red-tile roofs.
 * This is editorial artwork, not a photograph of any team activity or venue.
 */
export function OkinawaLandscape() {
  return (
    <svg viewBox="0 0 1100 820" role="img" aria-label="沖縄の青い海、赤瓦の屋根、南国の花とバスケットゴールを描いたイラスト" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="okinawa-sky" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor="#79d8ef"/>
          <stop offset="55%" stopColor="#b0f5e7"/>
          <stop offset="100%" stopColor="#e9f1c6"/>
        </linearGradient>
        <linearGradient id="okinawa-sea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#11a4ce"/>
          <stop offset="48%" stopColor="#1acbbd"/>
          <stop offset="100%" stopColor="#76eedb"/>
        </linearGradient>
        <linearGradient id="okinawa-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe8b8"/>
          <stop offset="100%" stopColor="#e8c893"/>
        </linearGradient>
        <pattern id="okinawa-waterlines" width="140" height="55" patternUnits="userSpaceOnUse">
          <path d="M 16 26 Q 40 19 62 26 T 116 26" fill="none" stroke="#d7ffec" strokeWidth="5" strokeLinecap="round" opacity=".4"/>
        </pattern>
        <filter id="okinawa-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#11506a" floodOpacity=".18"/>
        </filter>
      </defs>

      <rect width="1100" height="820" rx="22" fill="url(#okinawa-sky)"/>
      <circle cx="843" cy="139" r="87" fill="#fff0b8"/>
      <circle cx="843" cy="139" r="112" fill="none" stroke="#fff7d3" strokeWidth="3" opacity=".75"/>
      <g fill="#f9fff5" opacity=".78">
        <path d="M102 167q28-32 58-8 37-18 62 15-10 15-34 15h-76q-27-1-10-22Z"/>
        <path d="M473 105q24-21 46-6 25-16 50 7-4 13-27 14h-57q-21 0-12-15Z"/>
      </g>
      <path d="M0 386q163-82 281-36 85 30 150-10 90-55 155 1 71-37 158-24 78 16 166-30 121-45 190 14v167H0Z" fill="#6eaca1"/>
      <path d="M0 425q157-33 262 9 70 19 168-22 93-36 180-6 118 20 212-35 121-29 278 21v91H0Z" fill="#2c817e"/>
      <path d="M0 435q255 9 452-1 257-18 648 22v364H0Z" fill="url(#okinawa-sea)"/>
      <path d="M0 435q255 9 452-1 257-18 648 22v364H0Z" fill="url(#okinawa-waterlines)" opacity=".74"/>
      <path d="M-20 517Q156 496 316 526T658 539T1120 521" fill="none" stroke="#c8fff0" strokeWidth="12" opacity=".62" strokeLinecap="round"/>
      <path d="M-20 565Q156 552 315 571T649 583T1120 568" fill="none" stroke="#a5fff5" strokeWidth="7" opacity=".45" strokeLinecap="round"/>
      <path d="M0 662c198-71 345-62 528 3 201 67 409 48 572-11v166H0Z" fill="#e6f4d5" opacity=".6"/>
      <path d="M0 720c160-52 268-54 442 10 186 67 439 25 658-28v118H0Z" fill="url(#okinawa-sand)"/>
      <path d="M0 719c160-52 268-54 442 10 186 67 439 25 658-28" fill="none" stroke="#fffef0" strokeWidth="13" opacity=".74"/>

      {/* Red-tile roof inspired by the island's built environment. */}
      <g filter="url(#okinawa-shadow)" transform="translate(125 435)">
        <path d="M17 115V270h296V115" fill="#fff2d3"/>
        <rect x="89" y="170" width="74" height="100" rx="3" fill="#4b6459"/>
        <rect x="216" y="166" width="62" height="67" rx="3" fill="#8bc9c1"/>
        <path d="M0 122L164 5l165 117Z" fill="#b64132"/>
        <path d="M-8 130L164 10l174 120" fill="none" stroke="#e56d48" strokeWidth="19" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M35 108L164 20l132 88M63 110L164 39l105 71M93 110L164 58l75 52" fill="none" stroke="#7e2e2a" strokeWidth="3" opacity=".54"/>
        <path d="M164 4l9 16-9 7-9-7Z" fill="#f0a35c"/>
        <path d="M0 273h319" stroke="#a86d50" strokeWidth="8" strokeLinecap="round"/>
        <path d="M188 265v-80" stroke="#c7b095" strokeWidth="6"/>
      </g>

      {/* A stylized court and hoop; this is not an actual site. */}
      <g transform="translate(731 365)">
        <path d="M173 293V0" stroke="#194a55" strokeWidth="18" strokeLinecap="round"/>
        <path d="M110 8h125v114H110z" fill="#f6fff5" stroke="#184954" strokeWidth="9" rx="3"/>
        <path d="M153 8v114M110 63h125" stroke="#82cfc8" strokeWidth="3"/>
        <path d="M112 123h121" stroke="#184954" strokeWidth="8" strokeLinecap="round"/>
        <ellipse cx="172" cy="136" rx="54" ry="15" fill="none" stroke="#ff7857" strokeWidth="10"/>
        <path d="M120 139l16 60 18 12 18-11 18 11 18-10 15-61M138 151l16 44 18 8 18-9 16-44" fill="none" stroke="#f8fbdd" strokeWidth="3" opacity=".85"/>
      </g>
      <g transform="translate(776 687)">
        <circle r="46" fill="#f58255" stroke="#4b4e43" strokeWidth="5"/>
        <path d="M-46 0H46M0-46V46M-32-32q52 32 0 64M32-32q-52 32 0 64" stroke="#4a4940" strokeWidth="4" fill="none"/>
      </g>

      {/* Tropical leaves and hibiscus add a distinctly Okinawan atmosphere. */}
      <g transform="translate(978 645)">
        <path d="M34 190Q-3 66 15-45" fill="none" stroke="#155a4b" strokeWidth="14" strokeLinecap="round"/>
        <path d="M10 48Q-103 25-118-75Q-22-69 10 48Z" fill="#166b50"/>
        <path d="M18 18Q36-100 129-124Q121-32 18 18Z" fill="#147452"/>
        <path d="M25 102Q128 26 154 93Q99 134 25 102Z" fill="#24935b"/>
        <path d="M25 145Q-96 89-104 175Q-19 198 25 145Z" fill="#1b7852"/>
        <g transform="translate(-38 -78)">
          <path d="M0 0Q-39-92 14-97Q62-86 18-16Q99-55 106 2Q103 50 25 20Q79 83 37 110Q-3 132-19 35Q-78 105-110 45Q-124-3-26-9Q-117-39-70-86Q-34-113 0 0Z" fill="#ee6558"/>
          <circle cx="0" cy="5" r="21" fill="#ffcc74"/>
          <path d="M5 4q30-32 77-51" fill="none" stroke="#f6c46e" strokeWidth="7" strokeLinecap="round"/>
          <g fill="#ffe4a4"><circle cx="77" cy="-48" r="6"/><circle cx="90" cy="-53" r="6"/><circle cx="82" cy="-33" r="6"/></g>
        </g>
      </g>
      <g fill="#2c6b58" opacity=".72"><circle cx="65" cy="750" r="15"/><circle cx="95" cy="742" r="9"/><circle cx="549" cy="773" r="13"/></g>
    </svg>
  );
}
