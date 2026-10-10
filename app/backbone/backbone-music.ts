"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Original procedural instrumental for BACKBONE: 94 BPM, halftime hip-hop,
// four-bar variations, A minor bassline, kick/snare/hat, synth stabs and risers.
// All sound is synthesized locally; no third-party recordings or samples.
const BPM = 94;
const STEP = 60 / BPM / 4;
const LOOKAHEAD = .14;
const NOTES = [55, 55, 65.41, 49, 55, 73.42, 65.41, 49];
type Engine = {
  ctx: AudioContext;
  master: GainNode;
  compressor: DynamicsCompressorNode;
  noise: AudioBuffer;
  timer: ReturnType<typeof setInterval> | null;
  next: number;
  step: number;
};

export function useBackboneMusic() {
  const engine = useRef<Engine | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(45);
  const [error, setError] = useState("");

  const ensureEngine = useCallback(() => {
    if (engine.current) return engine.current;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -20;
    compressor.knee.value = 15;
    compressor.ratio.value = 3;
    compressor.attack.value = .004;
    compressor.release.value = .18;
    master.gain.value = .45;
    master.connect(compressor);
    compressor.connect(ctx.destination);
    const noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate), ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    engine.current = {ctx, master, compressor, noise, timer:null, next:0, step:0};
    return engine.current;
  }, []);

  const kick = (e:Engine, t:number, accent=1) => {
    const o=e.ctx.createOscillator(),g=e.ctx.createGain();
    o.type="sine";
    o.frequency.setValueAtTime(155,t);
    o.frequency.exponentialRampToValueAtTime(48,t+.09);
    g.gain.setValueAtTime(.001,t);
    g.gain.linearRampToValueAtTime(.58*accent,t+.008);
    g.gain.exponentialRampToValueAtTime(.001,t+.32);
    o.connect(g);g.connect(e.master);o.start(t);o.stop(t+.33);
  };
  const noiseHit=(e:Engine,t:number,vol:number,duration:number,highpass:number)=>{
    const source=e.ctx.createBufferSource(),filter=e.ctx.createBiquadFilter(),g=e.ctx.createGain();
    source.buffer=e.noise;filter.type="highpass";filter.frequency.value=highpass;
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
    source.connect(filter);filter.connect(g);g.connect(e.master);
    source.start(t);source.stop(t+duration+.01);
  };
  const snare=(e:Engine,t:number)=>{
    noiseHit(e,t,.18,.12,1250);
    const o=e.ctx.createOscillator(),g=e.ctx.createGain();
    o.type="triangle";o.frequency.setValueAtTime(210,t);o.frequency.exponentialRampToValueAtTime(130,t+.09);
    g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.0001,t+.11);
    o.connect(g);g.connect(e.master);o.start(t);o.stop(t+.12);
  };
  const bass=(e:Engine,t:number,hz:number,duration:number)=>{
    const o=e.ctx.createOscillator(),filter=e.ctx.createBiquadFilter(),g=e.ctx.createGain();
    o.type="sawtooth";o.frequency.setValueAtTime(hz,t);
    filter.type="lowpass";filter.frequency.value=155;filter.Q.value=.7;
    g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(.22,t+.025);
    g.gain.setValueAtTime(.22,t+Math.min(duration*.65,.3));
    g.gain.exponentialRampToValueAtTime(.0001,t+duration);
    o.connect(filter);filter.connect(g);g.connect(e.master);
    o.start(t);o.stop(t+duration+.02);
  };
  const synth=(e:Engine,t:number,notes:number[],duration:number,level:number)=>{
    for(const hz of notes){
      const o=e.ctx.createOscillator(),filter=e.ctx.createBiquadFilter(),g=e.ctx.createGain();
      o.type="triangle";o.frequency.value=hz;
      filter.type="lowpass";filter.frequency.value=1300;
      g.gain.setValueAtTime(.0001,t);
      g.gain.linearRampToValueAtTime(level,t+.04);
      g.gain.exponentialRampToValueAtTime(.0001,t+duration);
      o.connect(filter);filter.connect(g);g.connect(e.master);
      o.start(t);o.stop(t+duration+.02);
    }
  };

  const schedule=(e:Engine,t:number,index:number)=>{
    const step=index%16,bar=Math.floor(index/16)%4;
    // Boom-bap rhythm with a second kick variation every other bar.
    if(step===0||step===7||step===10||(bar%2===1&&step===14))kick(e,t,step===0?1:.77);
    if(step===4||step===12)snare(e,t);
    if(step%2===0||step===15)noiseHit(e,t,step===0?.042:.027,.048,6800);
    if(step===11&&bar===3)noiseHit(e,t,.035,.035,8200);
    if(step===0||step===6||step===10||step===14){
      const root=NOTES[(bar*2+(step===0?0:step===6?1:step===10?2:3))%NOTES.length];
      bass(e,t,root,step===0?STEP*3.6:STEP*1.8);
    }
    if(step===0&&bar%2===0)synth(e,t,[220,261.63,329.63],STEP*6,.026);
    if(step===8&&bar===3)synth(e,t,[196,246.94,293.66],STEP*5,.025);
    if(step===15&&bar===3)synth(e,t,[440,523.25],STEP*.9,.024);
  };

  const stop=useCallback(()=>{
    const e=engine.current;
    if(e?.timer){clearInterval(e.timer);e.timer=null;}
    if(e&&e.ctx.state==="running")void e.ctx.suspend();
    setPlaying(false);
  },[]);

  const toggle=useCallback(()=>{
    const existing=engine.current;
    if(existing?.timer){stop();return;}
    try{
      // Creating/resuming AudioContext synchronously from the tap works on iOS.
      const e=ensureEngine();
      const start=()=>{
        if(e.timer)return;
        e.step=0;e.next=e.ctx.currentTime+.035;
        const pump=()=>{
          while(e.next<e.ctx.currentTime+LOOKAHEAD){
            schedule(e,e.next,e.step);
            e.step++;e.next+=STEP;
          }
        };
        pump();
        e.timer=setInterval(pump,35);
        setPlaying(true);setError("");
      };
      void e.ctx.resume().then(start).catch(()=>{setError("音声を開始できませんでした。端末の音量とブラウザ設定をご確認ください。");stop();});
    }catch{
      setError("このブラウザでは音声を再生できません。");
      stop();
    }
  },[ensureEngine,stop]);

  const changeVolume=useCallback((v:number)=>{
    const value=Math.max(0,Math.min(100,v));
    setVolume(value);
    const e=engine.current;
    if(e)e.master.gain.setTargetAtTime(value/100,e.ctx.currentTime,.025);
  },[]);

  useEffect(()=>{
    const onHidden=()=>{if(document.hidden)stop();};
    document.addEventListener("visibilitychange",onHidden);
    return ()=>{
      document.removeEventListener("visibilitychange",onHidden);
      const e=engine.current;
      if(e?.timer)clearInterval(e.timer);
      if(e)void e.ctx.close();
      engine.current=null;
    };
  },[stop]);

  return {playing,volume,error,toggle,changeVolume,bpm:BPM};
}
