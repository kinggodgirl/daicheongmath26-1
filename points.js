/* =========================================================
   ⭐ 학습 포인트 — 학생 화면과 교사 화면이 같은 규칙으로 계산해요.
   포인트는 학생 기록(rec)에서 매번 다시 계산하므로 따로 저장하지 않아요.
   '제대로 학습한 행동'에만 점수를 줍니다. (빨리 풀기·힌트 열기·스스로 ○ 표시만으로는 0점)
   포인트는 줄지 않고, 🎲 주사위 게임과는 따로예요(게임은 포인트를 쓰지도, 주지도 않아요).
========================================================= */
(function(){
const RULES = [            // 학생 화면 '포인트는 이렇게 모아요' 표에 그대로 보여요
  {k:'hint',  t:'힌트 질문에 답 맞히기',               p:1},
  {k:'err',   t:'어디서 막혔는지 스스로 찾기',          p:1},
  {k:'solve', t:'힌트로 다시 풀어 해결 (풀이를 봤다면 덮고 혼자 다시 써서)', p:3},
  {k:'first', t:'처음부터 맞힌 문제 — 확인 문제까지 맞혔을 때', p:3},
  {k:'twin',  t:'확인 문제 정답',                       p:5},
  {k:'why',   t:'확인 문제를 틀렸을 때 놓친 것 찾기',     p:1},
  {k:'rule',  t:'핵심 생각 바르게 고르기',               p:2},
  {k:'bas',   t:'기초 연습 정답',                       p:1},
  {k:'star',  t:'기초 연습 ⭐ (연속 3개)',               p:3},
  {k:'self',  t:'스스로 단계에서 형광펜을 직접 켜고 풀기', p:1},
  {k:'mix',   t:'섞어 풀기 정답 · 핵심 생각 맞히기',      p:1},
];
const PT = {}; RULES.forEach(r=>PT[r.k]=r.p);

/* rec: 학생 기록, unit: window.UNIT → {total, n:{규칙별 횟수}} */
function calc(rec, unit){
  rec = rec || {}; const n = {}; RULES.forEach(r=>n[r.k]=0);
  const P = (unit && unit.problems) || [], TW = (unit && unit.twins) || [];
  const tOf = {}; TW.forEach(t=>tOf[t.of]=t);
  for(const p of P){
    const h = (rec.hint||{})[p.id] || {};
    for(const q in (h.ha||{})) if(h.ha[q] && h.ha[q].ok) n.hint++;
    if((rec.err||{})[p.id]) n.err++;
    if((rec.solved||{})[p.id]) n.solve++;
    const t = tOf[p.id], x = t && (rec.twin||{})[t.id];
    if(x && x.a!=null){
      if(+x.a===t.ok){ n.twin++; if((rec.diag||{})[p.id]==='o') n.first++; }
      else if(x.cause) n.why++;
    }
    const r = (rec.rule||{})[p.id]; if(r && r.ok) n.rule++;
  }
  for(const k in (rec.bas||{})){ const b = rec.bas[k]||{}; n.bas += +b.ok||0; if(b.star) n.star++; n.self += +b.selfN||0; }
  if(rec.mix) n.mix += (+rec.mix.ok||0) + (+rec.mix.rok||0);
  let total = 0; for(const k in n) total += n[k]*PT[k];
  return {total, n};
}
window.PTS = {calc, RULES};
})();
