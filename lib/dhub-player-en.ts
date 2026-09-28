export type PlayerModuleCopy={
  title:string;
  guiding_question:string;
  focus:string;
  action:string;
  reflection_questions:string[];
};

export const playerModuleEn:Record<number,PlayerModuleCopy>={
  1:{
    title:"Describe where you are now",
    guiding_question:"Instead of just saying good or bad, what is actually happening in your game?",
    focus:"Describe your current level through perception, decisions, execution and reflection—not just results.",
    action:"Choose one recent practice or game. Write one thing that worked, one thing that was difficult, and one thing you want to try next.",
    reflection_questions:["What worked better than you expected?","Where did you get stuck?","What is the next thing you want to test?"]
  },
  2:{
    title:"Scan before the ball arrives",
    guiding_question:"How much information do you have before you catch the ball?",
    focus:"Improve what happens before the catch, not only how fast you play after it.",
    action:"In your next practice, scan left or right once before receiving the ball. Try it 10 times.",
    reflection_questions:["When was it easiest to scan?","Did scanning reduce hesitation after the catch?","What do you want to notice next?"]
  },
  3:{
    title:"Know your advantage",
    guiding_question:"Where do you create an advantage: speed, space, angle or size?",
    focus:"Understand the advantage you create instead of only naming your favorite move.",
    action:"Find three 1-on-1 possessions where you created an advantage and look for the common pattern.",
    reflection_questions:["What advantage showed up most often?","What made the defender uncomfortable?","How can you create that advantage again?"]
  },
  4:{
    title:"Know your physical state",
    guiding_question:"Are you ignoring sleep, fatigue or pain because you only want to improve?",
    focus:"Treat recovery and physical readiness as part of player development.",
    action:"For one week, track sleep, fatigue and pain with a simple daily note.",
    reflection_questions:["Which day felt hardest?","What changed when you slept less?","Is there pain or fatigue you should tell an adult about?"]
  },
  5:{
    title:"Prepare before the catch",
    guiding_question:"Can you reduce how much time you need to think after receiving the ball?",
    focus:"Prepare your eyes, body position and space before the pass arrives.",
    action:"Play 3-on-3 with one theme: scan before the catch. Count the times you prepared well, not only successful plays.",
    reflection_questions:["How often were you ready before the catch?","What did you see earlier?","What still made you hesitate?"]
  },
  6:{
    title:"Change the purpose of your drive",
    guiding_question:"Are you driving only to beat your defender, or to move the defense?",
    focus:"Use paint touches to force help and create the next advantage.",
    action:"Review three drives where help came. Notice what became open after the defense moved.",
    reflection_questions:["Who helped?","What opened after the help?","Did you force a finish when a pass was available?"]
  },
  7:{
    title:"Do not judge shooting by form alone",
    guiding_question:"Why did you choose that shot in that situation?",
    focus:"Connect shooting technique with shot selection.",
    action:"Track 10 catch-read-shoot possessions in practice that feel close to real game situations.",
    reflection_questions:["Was the shot actually open?","Were your feet and eyes ready?","Which shots felt most repeatable?"]
  },
  8:{
    title:"Create advantage without the ball",
    guiding_question:"Can you help the offense when you do not have the ball?",
    focus:"Use spacing, cutting and relocation to prepare the next play.",
    action:"Review five possessions where you did not touch the ball. Note your position and what you did next.",
    reflection_questions:["Did you create space for a teammate?","Did you move for a reason?","When was staying still the better choice?"]
  },
  9:{
    title:"See one step ahead on defense",
    guiding_question:"Can you see your player and the next help responsibility, not only the ball?",
    focus:"Understand help and recovery, not only on-ball defense.",
    action:"In 3-on-3, remember three possessions where you helped. Review what happened next.",
    reflection_questions:["Did you know who you were responsible for after helping?","Did you lose your player while watching the ball?","Did you communicate with teammates?"]
  },
  10:{
    title:"Test one thing in the game",
    guiding_question:"Are you trying to improve everything at once during a game?",
    focus:"Choose one theme so game experience becomes useful learning.",
    action:"Before the next game, choose one theme. After the game, review only three possessions connected to it.",
    reflection_questions:["Did you remember the theme during the game?","Which possession showed progress?","Do you keep the same theme or change it next time?"]
  },
  11:{
    title:"Review what happens after a mistake",
    guiding_question:"After the mistake, what did you do next?",
    focus:"Make your response after mistakes part of development.",
    action:"Track three possessions immediately after a mistake and write what you did next.",
    reflection_questions:["How quickly did you return to the next play?","What reset action worked best?","What made you stay stuck?"]
  },
  12:{
    title:"Do not let one role define you",
    guiding_question:"Are you getting experience outside your usual position or role?",
    focus:"Build multiple game decisions instead of being limited by one position label.",
    action:"Try one responsibility you do not normally have and write what looked different from that role.",
    reflection_questions:["What new information did you notice?","Which skill felt unfamiliar?","How can this make you better in your usual role?"]
  },
  13:{
    title:"Watch only three clips",
    guiding_question:"Are you using video to learn, or only to judge yourself?",
    focus:"Use film to decide the next action.",
    action:"Choose three clips. For each one, write: what happened, what information was available, and what you will try next.",
    reflection_questions:["What pattern showed up across the clips?","Did you include a successful example too?","What is the one action you will test next?"]
  },
  14:{
    title:"Ask your coach one specific question",
    guiding_question:"Are you leaving confusion unspoken?",
    focus:"Move from passive feedback to creating your own question.",
    action:"After practice, ask your coach one specific question about one situation.",
    reflection_questions:["Was your question specific?","Did the answer change what you tried next?","What is still unclear?"]
  },
  15:{
    title:"Take one piece of feedback with you",
    guiding_question:"Are you trying to fix every comment at the same time?",
    focus:"Keep one development theme alive until the next practice.",
    action:"Choose one piece of feedback from today and remind yourself of it at the start of the next session.",
    reflection_questions:["Which feedback matters most right now?","Did you remember it next session?","What changed when you focused on only one thing?"]
  },
  16:{
    title:"Compare yourself with your starting point",
    guiding_question:"Is the challenge you wrote at the beginning still the same?",
    focus:"See development as change over time, not just outcomes.",
    action:"Compare your Module 1 notes with today. Write three things that changed and three things that still need work.",
    reflection_questions:["What changed most?","What still appears in games?","What progress would you have missed without looking back?"]
  },
  17:{
    title:"Check whether it transfers to games",
    guiding_question:"Can you use in games what you can already do in practice?",
    focus:"Check whether practice learning appears in real play.",
    action:"Find three recent game possessions where your practice theme appeared.",
    reflection_questions:["Did the skill appear under pressure?","What game information changed the decision?","What still breaks down in games?"]
  },
  18:{
    title:"Choose one goal for the next three months",
    guiding_question:"Do you have so many goals that your focus changes every week?",
    focus:"Choose one development theme for the next three months.",
    action:"Choose one play you want to change in three months and rewrite it as an action you can check every week.",
    reflection_questions:["Is the goal specific enough to observe?","Can you check it every week?","What would progress look like after one month?"]
  }
};

export const playerStageEn:Record<string,string>={
  assessment:"ASSESSMENT",
  development:"DEVELOPMENT",
  game_experience:"GAME EXPERIENCE",
  feedback:"FEEDBACK",
  reassessment:"RE-ASSESSMENT"
};
