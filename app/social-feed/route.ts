const base = "https://riotbasketballacademy.com";
const items = [
  { type:"journal", title:"Plan a Japan basketball exchange without turning it into sports tourism", url:`${base}/journal/plan-a-japan-basketball-exchange`, tags:["Japan basketball","Asia exchange","youth development"] },
  { type:"journal", title:"What RBA can coordinate—and what must stay with your organisation", url:`${base}/journal/what-rba-coordinates-in-japan`, tags:["Japan clinic","academy exchange","safeguarding"] },
  { type:"journal", title:"How to build a Japan–Asia relationship that lasts beyond one event", url:`${base}/journal/building-a-real-asia-basketball-relationship`, tags:["Asia basketball","coach learning","international exchange"] },
];
export function GET(){return Response.json({brand:"Riot Basketball Academy",updated:"2026-09-14",languages:["en","ja","zh-tw","ko"],channels:["instagram","threads","whatsapp"],items});}
