export type PlayerJourneyInput={
  historyCount:number;
  savedCount:number;
  journalViews:number;
  setupPercent:number;
  teamLinked:boolean;
  hasNextEvent:boolean;
};

export const PLAYER_JOURNEY_LEVEL_THRESHOLDS=[0,125,225,325,425,515,595,660] as const;
export const PLAYER_JOURNEY_LEVEL_NAMES=["START","EXPLORER","PLAYER","REVIEWER","CHALLENGER","CONNECTOR","WORLD","LEGACY"] as const;

export function computePlayerJourney(input:PlayerJourneyInput){
  const history=Math.max(0,Math.floor(input.historyCount));
  const saves=Math.max(0,Math.floor(input.savedCount));
  const views=Math.max(0,Math.floor(input.journalViews));

  // Journey XP rewards breadth and reflection, not performance, money, or repeated grinding.
  // Each source is capped so adding duplicate/self-entered records cannot create unlimited XP.
  const xp=
    100+
    Math.min(history,8)*35+
    Math.min(saves,5)*25+
    Math.min(views,10)*12+
    (input.setupPercent>=100?50:0);

  let level=1;
  for(let i=1;i<PLAYER_JOURNEY_LEVEL_THRESHOLDS.length;i++){
    if(xp>=PLAYER_JOURNEY_LEVEL_THRESHOLDS[i])level=i+1;
  }
  level=Math.min(level,PLAYER_JOURNEY_LEVEL_THRESHOLDS.length);
  const currentFloor=PLAYER_JOURNEY_LEVEL_THRESHOLDS[Math.max(0,level-1)]||0;
  const maxLevel=level===PLAYER_JOURNEY_LEVEL_THRESHOLDS.length;
  const nextFloor=maxLevel?PLAYER_JOURNEY_LEVEL_THRESHOLDS[PLAYER_JOURNEY_LEVEL_THRESHOLDS.length-1]:PLAYER_JOURNEY_LEVEL_THRESHOLDS[level];
  const levelProgress=maxLevel?100:Math.max(0,Math.min(100,Math.round(((xp-currentFloor)/(nextFloor-currentFloor))*100)));

  // Team links and future schedules never add XP because they can disappear later.
  // LEVEL is intentionally monotonic as long as durable history/saves/reads remain.
  // Momentum counts different kinds of engagement, never consecutive-day login streaks.
  const momentum=[history>0,saves>0,views>0].filter(Boolean).length;

  return {xp,level,currentFloor,nextFloor,levelProgress,momentum,maxLevel};
}

export function journeyTier(value:number,thresholds:readonly number[]){
  const names=["LOCKED","BRONZE","SILVER","GOLD","PLATINUM"] as const;
  let index=0;
  thresholds.forEach((threshold,i)=>{if(value>=threshold)index=i+1;});
  return names[Math.min(index,names.length-1)];
}
