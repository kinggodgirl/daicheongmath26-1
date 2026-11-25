/* =========================================================
   ⚾ 숫자야구 (하) — 친구와 포인트 대전
   규칙: 1~6 중 서로 다른 숫자 2개. 두 사람이 동시에 한 번씩 추측, 자리마다 ○(숫자·자리 맞음) △(숫자만 맞음) ×(없음).
         같은 회에 둘 다 맞히면 무승부, 10회 안에 아무도 못 맞혀도 무승부.
   포인트: 두 사람이 고른 금액 중 작은 쪽(교사가 정한 한 판 최대 이하)으로 똑같이 걸고, 진 사람 포인트가 이긴 사람에게.
         정산은 교사 화면이 두 사람의 비밀 숫자로 모든 판정을 다시 확인한 뒤에 해요(bank). 같은 친구와 연속 3판이 넘으면 연습 경기.
   비밀 숫자는 내 기기에만 있고, 서버에는 잠금값(h)만 올렸다가 경기가 끝나면 공개해요.
   index.html 의 전역(CL, CFG, UI, $, esc, toast, render, go, pts, myName, LS, TS)을 씀.
========================================================= */
const BB_ROUNDS = 10, BB_DIG = [1,2,3,4,5,6];
let BB = null;          // 지금 방: {room, side, d(서버 데이터), sec, salt, bet, inp, cross, ref, cache}
let BBL = {rooms:{}, ref:null, join:''};   // 로비
let BANK = {n:0};
const BBSYM = {O:'○', A:'△', X:'×'};

function bbJudge(sec, g){ return g.split('').map((c,i)=> c===sec[i]?'O':(sec.includes(c)?'A':'X')).join(''); }
function bbHash(s){ let h=0x811c9dc5; for(const c of String(s)){ h^=c.charCodeAt(0); h=Math.imul(h,0x01000193)>>>0; } return h.toString(36); }
function bbBalance(){ return pts().total + (+BANK.n||0); }
function bbOther(s){ return s==='a'?'b':'a'; }
/* 서버 데이터로 경기 결과 판단 (교사 화면도 같은 규칙) */
function bbOutcome(d){
  const a=d&&d.a, b=d&&d.b; if(!a||!b) return {done:false, k:1};
  const started = !!((a.g&&a.g.k1)||(b.g&&b.g.k1));
  if(a.quit||b.quit){ const q=a.quit?'a':'b'; return {done:true, w: started? bbOther(q) : 'draw', why: started?'quit':'early', k:0}; }
  if(a.abandon||b.abandon) return {done:true, w:'draw', why:'abandon', k:0};
  let k=1;
  for(; k<=BB_ROUNDS; k++){ const ra=b.r&&b.r['k'+k], rb=a.r&&a.r['k'+k]; if(!ra||!rb) break;
    const aw=ra==='OO', bw=rb==='OO';
    if(aw&&bw) return {done:true, w:'draw', why:'both', k};
    if(aw) return {done:true, w:'a', why:'hit', k};
    if(bw) return {done:true, w:'b', why:'hit', k};
    if(k===BB_ROUNDS) return {done:true, w:'draw', why:'ten', k}; }
  return {done:false, k};
}

/* ---------- 연결 ---------- */
function bbOnConnect(base){
  base.child('bank/'+CL.key).on('value', s=>{ BANK=s.val()||{n:0}; updPts(); if(UI.view==='bb'||UI.view==='pts') render(); }, ()=>{});
  base.child('games').on('value', s=>{ BBL.rooms=s.val()||{}; bbSync(); }, ()=>{});
  const cur=LS.get('bb-cur-'+CL.code+'-'+CL.key,null);
  if(cur&&cur.room&&!BB) BB=Object.assign({inp:'', cross:{}, d:null, resume:true}, cur);
}
function bbOff(){ try{ CL.base&&CL.base.child('games').off(); CL.base&&CL.base.child('bank/'+CL.key).off(); }catch(e){} BB=null; BBL.rooms={}; BANK={n:0}; }
function bbSave(){ if(!BB) return; LS.set('bb-cur-'+CL.code+'-'+CL.key, {room:BB.room, side:BB.side, sec:BB.sec||null, salt:BB.salt||null, bet:BB.bet||0, t:BB.t}); }
function bbClear(){ LS.set('bb-cur-'+CL.code+'-'+CL.key, null); BB=null; }
function bbRef(){ return CL.base.child('games/'+BB.room); }
function bbMine(o){ return bbRef().child(BB.side).update(Object.assign({at:TS}, o)); }

/* 서버 데이터가 바뀔 때마다: 내 차례 일(상대 추측 판정, 끝나면 비밀 숫자 공개)을 하고 다시 그림 */
function bbSync(){
  if(BB){ const d=BBL.rooms[BB.room];
    if(!d || (BB.t && d.t!==BB.t) || !d[BB.side] || d[BB.side].uid!==CL.uid){
      if(BB.d && BB.d.s){ BB.gone=true; } else if(BB.resume){ bbClear(); } else if(BB.d){ toast('방이 닫혔어요'); bbClear(); }
    } else { BB.d=d; BB.t=d.t; BB.resume=false; bbSave(); bbAuto(); }
  }
  if(UI.view==='bb') render();
}
function bbAuto(){
  const d=BB.d, me=d[BB.side], op=d[bbOther(BB.side)]; if(!me||!op||!BB.sec) return;
  const o=bbOutcome(d);
  if(!o.done){ const k=o.k, og=op.g&&op.g['k'+k];
    if(og && !(me.r&&me.r['k'+k])) bbMine({['r/k'+k]: bbJudge(BB.sec, og)}); }
  else if(!me.sec) bbMine({sec:BB.sec, salt:BB.salt, end:true});
}

/* ---------- 행동 ---------- */
function bbCode(){ return String(1000+Math.floor(Math.random()*9000)); }
function bbCreate(){
  if(!CL.base||!CFG.bb) return; const room=bbCode();
  bbRef0(room).once('value').then(s=>{ if(s.exists()) return bbCreate();
    const t=Date.now(); return bbRef0(room).update({t, a:{uid:CL.uid, name:myName(), at:TS}}).then(()=>{ BB={room, side:'a', t, inp:'', cross:{}, d:null}; bbSave(); render(); }); })
  .catch(e=>toast(isDenied(e)?'아직 숫자야구를 쓸 수 없어요. 선생님께 알려 주세요 (데이터베이스 규칙 업데이트 필요)':'방을 만들지 못했어요: '+e.message,5000));
}
function bbRef0(room){ return CL.base.child('games/'+room); }
function bbJoin(room){
  room=String(room||'').replace(/\D/g,''); if(room.length!==4){ toast('방 코드 4자리를 넣어 주세요'); return; }
  const d=BBL.rooms[room]; if(!d||!d.a){ toast('그 방을 찾지 못했어요'); return; }
  if(d.b&&d.b.uid!==CL.uid){ toast('이미 두 명이 들어간 방이에요'); return; }
  if(d.a.uid===CL.uid){ BB={room, side:'a', t:d.t, inp:'', cross:{}, d}; bbSave(); render(); return; }
  bbRef0(room).child('b').update({uid:CL.uid, name:myName(), at:TS}).then(()=>{ BB={room, side:'b', t:d.t, inp:'', cross:{}, d:null}; bbSave(); render(); })
    .catch(e=>toast('들어가지 못했어요: '+e.message));
}
function bbKey(n){ if(!BB) return; const ph=bbPhase();
  if(ph==='setup'){ const v=(BB.sec||'').length>=2?'':(BB.sec||''); if(v.includes(String(n))) return; BB.sec=(v+n).slice(0,2); render(); return; }
  if(ph==='play'){ if(BB.inp.includes(String(n))||BB.inp.length>=2) return; BB.inp+=n; render(); }
}
function bbBack(){ if(!BB) return; const ph=bbPhase(); if(ph==='setup') BB.sec=(BB.sec||'').slice(0,-1); else BB.inp=BB.inp.slice(0,-1); render(); }
function bbSetBet(v){ BB.bet=v; render(); }
function bbReady(){
  if(!BB||!BB.sec||BB.sec.length!==2){ toast('비밀 숫자 2개를 골라 주세요'); return; }
  const mx=Math.min(+CFG.bbMax||0, Math.max(0,bbBalance())); BB.bet=Math.max(0,Math.min(+BB.bet||0,mx));
  BB.salt=Math.random().toString(36).slice(2,10); bbSave();
  bbMine({ready:true, bet:BB.bet, h:bbHash(BB.sec+'|'+BB.salt)}).then(render);
}
function bbGuess(){ if(!BB||BB.inp.length!==2) return; const o=bbOutcome(BB.d); if(o.done) return;
  const k=o.k, g=BB.inp; BB.inp=''; bbMine({['g/k'+k]:g}); }
function bbQuit(){
  if(!BB) return; const ph=bbPhase();
  if(ph==='play'&&!confirm('지금 나가면 기권이에요. 건 포인트를 잃어요. 나갈까요?')) return;
  if(ph==='end'||ph==='gone'){ bbClear(); render(); return; }
  bbMine({quit:true, sec:BB.sec||null, salt:BB.salt||null, end:true}).catch(()=>{}); bbClear(); render();
}
function bbAbandon(){ if(!BB) return; bbMine({abandon:true, sec:BB.sec, salt:BB.salt, end:true}); }
function bbCross(c){ BB.cross[c]=!BB.cross[c]; render(); }

/* ---------- 화면 ---------- */
function bbPhase(){
  if(!BB) return 'lobby'; if(BB.gone) return 'gone';
  const d=BB.d; if(!d) return 'wait';
  const me=d[BB.side], op=d[bbOther(BB.side)];
  if(!op) return 'wait';
  if(bbOutcome(d).done) return 'end';
  if(!(me&&me.ready&&op.ready)) return 'setup';
  return 'play';
}
function bbTiles(g,r){ return `<span class="bbt">${g.split('').map((c,i)=>`<i class="${r?r[i]:'w'}">${c}${r?`<s>${BBSYM[r[i]]}</s>`:''}</i>`).join('')}</span>`; }
function bbPad(){ return `<div class="bbkeys">${BB_DIG.map(n=>`<button onclick="bbKey(${n})">${n}</button>`).join('')}<button class="ghost" onclick="bbBack()">⌫</button></div>`; }
function bbCand(){ let h=`<div class="bbcand"><span></span>${BB_DIG.map(n=>`<b>${n}</b>`).join('')}`;
  for(const a of BB_DIG){ h+=`<b>${a}</b>`; for(const b of BB_DIG){ const c=''+a+b; h+= a===b?`<i class="no"></i>`:`<button class="${BB.cross[c]?'x':''}" onclick="bbCross('${c}')">${c}</button>`; } }
  const left=BB_DIG.length*(BB_DIG.length-1)-Object.values(BB.cross).filter(Boolean).length;
  return h+`</div><div class="muted" style="font-size:14px;margin-top:4px">아닌 숫자를 눌러 지워요 · 남은 후보 ${left}가지</div>`; }
function viewBB(){
  if(!CFG.bb&&!BB) return `<div class="phase-h">⚾ 숫자야구</div><div class="card"><div class="muted">선생님이 숫자야구를 닫았어요.</div></div>`;
  const ph=bbPhase(), bal=bbBalance(), mx=+CFG.bbMax||0;
  let h=`<div class="phase-h">⚾ 숫자야구 <span class="muted" style="font-size:16px;font-weight:700">하 · 1~6 · 2자리</span></div>`;
  h+=`<div class="phase-d">⭐ 내 포인트 <b>${bal}</b>점 · 한 판 최대 <b>${mx}</b>점 걸기. 진 사람 포인트가 이긴 사람에게 가요.</div><div class="bbboard">`;
  if(ph==='lobby'){
    const open=Object.entries(BBL.rooms).filter(([r,d])=>d&&d.a&&!d.b&&!d.a.quit&&Date.now()-(+d.t||0)<30*60000&&d.a.uid!==CL.uid);
    h+=`<div class="bbrule">1~6 중 <b>서로 다른 숫자 2개</b>를 비밀로 정하고, 친구와 동시에 한 번씩 추측해요.<br>
      ${bbTiles('35','OA')} 자리마다 <b>○</b> 숫자·자리 맞음 · <b>△</b> 숫자만 맞음 · <b>×</b> 없는 숫자. 먼저 맞히면 승리! (같은 회에 둘 다 맞히거나 10회 안에 못 맞히면 무승부)</div>`;
    h+=`<div class="next"><button class="acc" onclick="bbCreate()">➕ 방 만들기</button>
      <input id="bbJoin" class="bbin" inputmode="numeric" maxlength="4" placeholder="방 코드" value="${esc(BBL.join)}" oninput="BBL.join=this.value"><button onclick="bbJoin($('bbJoin').value)">들어가기</button></div>`;
    h+=`<div style="margin-top:10px;font-weight:900">기다리는 방</div>${open.length?open.map(([r,d])=>`<div class="bbroom"><span>${esc(d.a.name)}의 방 <span class="muted">${r}</span></span><button onclick="bbJoin('${r}')">들어가기</button></div>`).join(''):'<div class="muted">아직 없어요. 방을 만들어 친구에게 코드를 알려 주세요.</div>'}`;
  }
  else if(ph==='wait') h+=`<div style="text-align:center"><div class="muted">방 코드</div><div class="bbcode">${BB.room}</div><div>친구가 들어오기를 기다리는 중… 친구에게 방 코드를 알려 주세요.</div><div class="next" style="justify-content:center"><button class="ghost" onclick="bbQuit()">방 닫기</button></div></div>`;
  else if(ph==='setup'){ const me=BB.d[BB.side]||{}, op=BB.d[bbOther(BB.side)];
    h+=`<div class="bbvs">${esc(myName())} <span>vs</span> ${esc(op.name)}</div>`;
    if(me.ready) h+=`<div style="text-align:center">비밀 숫자 ${bbTiles(BB.sec||'??',null)} · 건 포인트 ${me.bet}점<div class="muted" style="margin-top:8px">${esc(op.name)}을(를) 기다리는 중…</div></div>`;
    else { const chips=[0,5,10,20,30,50].filter(v=>v<=Math.min(mx,Math.max(0,bal))); if(BB.bet==null||!chips.includes(+BB.bet)) BB.bet=chips[chips.length-1]||0;
      h+=`<div style="font-weight:900">1) 비밀 숫자 2개 (친구에게 보이지 않아요)</div><div style="text-align:center;margin:8px 0">${bbTiles((BB.sec||'').padEnd(2,'·'),null)}</div>${bbPad()}
        <div style="font-weight:900;margin-top:12px">2) 걸 포인트</div><div class="gpick" style="justify-content:flex-start;margin-top:6px">${chips.map(v=>`<button class="${+BB.bet===v?'sel':''}" onclick="bbSetBet(${v})">${v}</button>`).join('')}</div>
        <div class="muted" style="font-size:14px">두 사람이 고른 금액 중 <b>작은 쪽</b>이 똑같이 걸려요. 같은 친구와 연속 3판이 넘으면 연습 경기(0점)예요.</div>
        <div class="next"><button class="acc" ${(BB.sec||'').length===2?'':'disabled'} onclick="bbReady()">준비 완료</button><button class="ghost" onclick="bbQuit()">나가기</button></div>`; }
  }
  else if(ph==='play'||ph==='end'||ph==='gone'){
    const d=BB.d, me=d[BB.side]||{}, op=d[bbOther(BB.side)]||{}, o=bbOutcome(d), K=o.done?o.k:o.k;
    const rows=[]; for(let k=1;k<=BB_ROUNDS;k++){ const mg=me.g&&me.g['k'+k], og=op.g&&op.g['k'+k]; if(!mg&&!og) break;
      const mr=op.r&&op.r['k'+k], orr=me.r&&me.r['k'+k], both=!!(mr&&orr);
      rows.push(`<tr><td class="k">${k}회</td><td>${mg?bbTiles(mg,both?mr:null):'<span class="muted">…</span>'}</td><td>${og?(both?bbTiles(og,orr):'<span class="muted">추측 완료</span>'):'<span class="muted">…</span>'}</td></tr>`); }
    h+=`<div class="bbvs">${esc(myName())} <span>vs</span> ${esc(op.name||'')} · 건 포인트 ${Math.min(+me.bet||0,+op.bet||0)}점 · 내 비밀 숫자 ${bbTiles(BB.sec||'??',null)}</div>`;
    h+=`<table class="bbtab"><tr><th></th><th>내 추측</th><th>${esc(op.name||'친구')}의 추측</th></tr>${rows.join('')}</table>`;
    if(ph==='play'){ const mine=me.g&&me.g['k'+K];
      if(!mine) h+=`<div style="font-weight:900;margin-top:8px">${K}회 추측</div><div style="text-align:center;margin:6px 0">${bbTiles(BB.inp.padEnd(2,'·'),null)}</div>${bbPad()}<div class="next"><button class="acc" ${BB.inp.length===2?'':'disabled'} onclick="bbGuess()">추측 보내기</button></div>`;
      else { const idle=Date.now()-(+op.at||0)>120000;
        h+=`<div class="muted" style="text-align:center;margin:10px 0">${esc(op.name)}의 추측을 기다리는 중…</div>${idle?`<div class="next" style="justify-content:center"><button class="ghost" onclick="bbAbandon()">친구가 응답이 없어요 · 무승부로 끝내기</button></div>`:''}`; }
      h+=`<details class="bbdet" open><summary>📋 후보 표 (30가지)</summary>${bbCand()}</details><div class="next"><button class="ghost" onclick="bbQuit()">기권하고 나가기</button></div>`;
    } else {
      const meW=o.w===BB.side, dr=o.w==='draw', s=d.s;
      const msg= o.why==='quit'? (meW?`${esc(op.name)}이(가) 기권했어요. 승리!`:'기권했어요') : o.why==='early'?'경기 전에 나갔어요' : o.why==='abandon'?'응답이 없어 무승부로 끝냈어요' : dr? (o.why==='both'?'같은 회에 둘 다 맞혔어요. 무승부!':'10회 안에 아무도 못 맞혔어요. 무승부!') : meW? `🎉 ${o.k}회 만에 맞혔어요. 승리!` : `${esc(op.name)}이(가) 먼저 맞혔어요.`;
      h+=`<div class="verdict ${meW?'r':dr?'':'w'}" style="margin-top:10px">${msg}</div>`;
      if(op.sec) h+=`<div>${esc(op.name)}의 비밀 숫자: ${bbTiles(op.sec,null)}</div>`;
      h+= s? `<div class="bbset">${s.stake? (s.w===myName()?`⭐ +${s.stake}점을 받았어요`: s.w==='draw'?'포인트 변화 없음':`⭐ -${s.stake}점`) : (s.note||'포인트가 걸리지 않은 경기예요')}</div>` : `<div class="muted">선생님 화면에서 결과를 확인하면 포인트가 정산돼요…</div>`;
      h+=`<div class="next"><button class="acc" onclick="bbClear();render()">다른 경기 하기</button></div>`;
    }
  }
  return h+`</div>`;
}
