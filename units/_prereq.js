/* =========================================================
   🧩 선수지식 — 힌트를 봐도 못 푸는 학생은 대개 앞에서 배운 내용이 빠져 있어요.
   여기 있는 짧은 설명 + 연습 3문제로 그 내용을 먼저 익히고 힌트로 돌아갑니다.
   단원 파일의 문제에  pre:[힌트1, 힌트2, …]  로 이 열쇠(RATIO, CIRC …)를 적으면
   그 힌트 아래에 "🧩 필요한 기초" 버튼이 생겨요. (필요 없는 힌트는 null)

   열쇠: { name 이름, lesson:[설명 단계 HTML…], gen() → {q 질문, fig 그림, a 정답(수), u 단위, ph 입력 예시, sol 풀이} }
   다른 단원도 같이 쓸 수 있게 단원과 상관없는 내용만 넣어요.
========================================================= */
(function(){
const {K, FR, svg, ln, dot, T, pol, angMark, gcd, rnd, ri} = window.ULIB;
const C = ['#ff6b81','#4b8bff','#2fbf8f','#ffae2b','#a46bff'];
const M = s => K(s, s);                            // 수식 한 줄
const big = s => `<div class="pmath">${s}</div>`;
const sv = (w,h,b) => `<div class="pfig" style="max-width:${Math.round(w*1.05)}px">${svg(w,h,b)}</div>`;   // 그림이 너무 커지지 않게

/* ---------- 그림 ---------- */
/* 띠 그림: parts=[2,3,4], cell=한 칸 값(없으면 빈칸), sums=몫 표시 */
function tape(parts, o={}){
  const n=parts.reduce((a,b)=>a+b,0), W=560, x0=20, cw=(W-40)/n, y=40, h=46; let s='', k=0;
  parts.forEach((p,g)=>{ const gx=x0+k*cw;
    for(let i=0;i<p;i++){ const x=x0+(k+i)*cw;
      s+=`<rect x="${x}" y="${y}" width="${cw}" height="${h}" fill="${C[g]}" fill-opacity="${o.cell!=null?.32:.22}" stroke="#fff" stroke-width="3"/>`;
      if(o.cell!=null) s+=T(x+cw/2,y+h/2,String(o.cell),{size:20}); }
    s+=`<rect x="${gx}" y="${y}" width="${p*cw}" height="${h}" fill="none" stroke="${C[g]}" stroke-width="3" rx="4"/>`;
    s+=T(gx+p*cw/2,y-16,o.sums?`${o.sums[g]}`:`${p}칸`,{size:19});
    k+=p; });
  if(o.total!=null){ s+=`<path d="M ${x0} ${y+h+12} v 8 H ${x0+W-40} v -8" fill="none" stroke="#555" stroke-width="2"/>`+T(W/2,y+h+40,`전체 ${o.total}`,{size:19}); }
  return sv(W, o.total!=null?150:100, s);
}
/* 반지름 r인 원 */
function circleR(r,u=' cm'){ const c=[110,105], R=78, P=pol(c,R,20);
  return sv(220,210,`<circle cx="${c[0]}" cy="${c[1]}" r="${R}" fill="#eef4ff" stroke="#111" stroke-width="2.6"/>${ln(c,P)}${dot(c)}${T(c[0]-14,c[1]+16,'O',{size:20})}${T((c[0]+P[0])/2+4,(c[1]+P[1])/2-14,r+u,{size:19})}`); }
/* 원을 n조각, 그중 m조각 칠함 */
function pie(n,m){ const c=[110,105], R=82; let s='';
  for(let i=0;i<n;i++){ const a0=90-i*360/n, a1=90-(i+1)*360/n, P=pol(c,R,a0), Q=pol(c,R,a1);
    s+=`<path d="M ${c[0]} ${c[1]} L ${P[0]} ${P[1]} A ${R} ${R} 0 0 1 ${Q[0]} ${Q[1]} Z" fill="${i<m?'#ffcf5a':'#fff'}" stroke="#111" stroke-width="2"/>`; }
  return sv(220,210,s); }
/* 이등변삼각형 (꼭짓점 O 위) */
function isoFig(top,left,right){ const O=[150,30], A=[50,190], B=[250,190];
  return sv(300,215,`<path d="M ${O} L ${A} L ${B} Z" fill="#f4f8ff" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>`
    +ln([92,108],[104,114],2.2)+ln([196,114],[208,108],2.2)
    +angMark(O,238,302,28,'',0)+T(150,82,top,{size:19})
    +angMark(A,0,58,30,'',0)+T(95,174,left,{size:19})
    +angMark(B,122,180,30,'',0)+T(205,174,right,{size:19})
    +T(150,14,'O',{size:20})+T(36,200,'A',{size:20})+T(264,200,'C',{size:20})); }
/* 삼각형 세 각 */
function triFig(a,b,c){ const P=[40,190], Q=[270,190], R=[110,40];
  return sv(310,215,`<path d="M ${P} L ${Q} L ${R} Z" fill="#f4fff8" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>`
    +angMark(P,0,65,32,'',0)+T(88,170,a,{size:19})+angMark(Q,148,180,40,'',0)+T(212,178,b,{size:19})+angMark(R,245,313,26,'',0)+T(115,84,c,{size:19})); }
/* 직선 위의 두 각 */
function lineFig(a,b){ const O=[160,150], L=[20,150], Rr=[300,150], P=pol(O,130,62);
  return sv(320,180,ln(L,Rr)+ln(O,P)+dot(O)+angMark(O,0,62,34,'',0)+T(222,122,a,{size:19})+angMark(O,62,180,28,'',0)+T(112,112,b,{size:19})+T(160,172,'180°',{size:16})); }
/* 평행선과 엇각·동위각 */
function paraFig(lbl1,lbl2,kind){ const y1=55, y2=155, X1=[120,y1], X2=[200,y2];
  const d=[X2[0]-X1[0],X2[1]-X1[1]], A=[X1[0]-d[0]*0.45,X1[1]-d[1]*0.45], B=[X2[0]+d[0]*0.45,X2[1]+d[1]*0.45];
  const ang=Math.atan2(-(d[1]),d[0])*180/Math.PI;   // 아래쪽으로 내려가는 방향(음수)
  let s=ln([20,y1],[320,y1])+ln([20,y2],[320,y2])+ln(A,B)+T(334,y1,'l',{size:20,it:true})+T(334,y2,'m',{size:20,it:true});
  s+=`<path d="M 260 ${y1-6} l 10 6 l -10 6 M 260 ${y2-6} l 10 6 l -10 6" fill="none" stroke="#111" stroke-width="2"/>`;
  const L1=pol(X1,54,(ang+720)/2); s+=angMark(X1,ang+360,360,26,'',0)+T(L1[0],L1[1],lbl1,{size:19});
  if(kind==='alt'){ const L2=pol(X2,54,(180+ang+180)/2); s+=angMark(X2,180+ang+360,540,26,'',0)+T(L2[0],L2[1],lbl2,{size:19}); }
  else { const L2=pol(X2,54,(ang+720)/2); s+=angMark(X2,ang+360,360,26,'',0)+T(L2[0],L2[1],lbl2,{size:19}); }
  return sv(350,200,s); }

const ordK=['첫째','둘째','셋째'];
const PREREQ = {
RATIO:{ name:'비례배분', icon:'🍬',
  lesson:[
    `사탕 <b>18개</b>를 <b>2 : 3 : 4</b>로 나눠 줘요.<br>먼저 비의 수를 모두 더해요. 2 + 3 + 4 = <b>9칸</b>`+tape([2,3,4]),
    `전체 18개를 9칸에 똑같이 나누면 <b>한 칸</b>은 18 ÷ 9 = <b>2개</b>`+tape([2,3,4],{cell:2,total:18}),
    `내 몫 = <b>한 칸 × 내 칸 수</b><br>2 × 2 = 4, 3 × 2 = 6, 4 × 2 = 8 &nbsp;(확인: 4 + 6 + 8 = 18 ✔)`+tape([2,3,4],{cell:2,sums:['4개','6개','8개']}),
    `<b>각도도 똑같아요.</b> 원 한 바퀴 360°를 2 : 3 : 4로 나누면<br>한 칸 = 360° ÷ 9 = 40° → 80°, 120°, 160°`+tape([2,3,4],{cell:'40°',sums:['80°','120°','160°']})],
  gen(){
    const deg=Math.random()<.5, sets=deg?[[2,3,4],[1,2,3],[1,3,5],[3,4,5],[2,3,5],[1,2],[4,5],[3,5]]:[[2,3,4],[1,2,3],[2,3],[1,4],[3,4],[2,5],[1,2,4],[3,2,1]];
    const r=rnd(sets), n=r.reduce((a,b)=>a+b,0), k=deg?360/n:ri(2,6), tot=k*n, j=ri(0,r.length-1), u=deg?'°':'개';
    const what=deg?`원 한 바퀴 <b>360°</b>`:`사탕 <b>${tot}개</b>`;
    return {q:`${what}를 <b>${r.join(' : ')}</b>로 나누면 <b>${ordK[j]}</b> 몫은?`, a:r[j]*k, u,
      sol:`칸 수 ${r.join(' + ')} = ${n} → 한 칸 ${tot}${deg?'°':''} ÷ ${n} = ${k}${u} → ${ordK[j]} 몫 ${r[j]} × ${k} = <b>${r[j]*k}${u}</b>`}; } },
CIRC:{ name:'원의 둘레와 넓이', icon:'⭕',
  lesson:[
    `반지름이 <i>r</i>인 원에서<br>${big(M('(\\text{둘레}) = 2 \\times \\pi \\times r = 2\\pi r'))}`+circleR('r',''),
    `${big(M('(\\text{넓이}) = \\pi \\times r \\times r = \\pi r^{2}'))}반지름을 <b>두 번</b> 곱해요. (2를 곱하는 게 아니에요!)`,
    `예) 반지름 8 cm<br>둘레 = 2 × π × 8 = <b>16π cm</b><br>넓이 = π × 8 × 8 = <b>64π cm²</b><br><span class="muted">π는 그대로 두고 숫자만 계산해요.</span>`],
  gen(){ const r=ri(2,12), area=Math.random()<.55;
    return {q:`반지름이 <b>${r} cm</b>인 원의 <b>${area?'넓이':'둘레'}</b>는?`, fig:circleR(r), a:area?r*r:2*r, u:area?'π cm²':'π cm', ph:area?'예: 9π':'예: 6π',
      sol: area?`π × ${r} × ${r} = <b>${r*r}π cm²</b>`:`2 × π × ${r} = <b>${2*r}π cm</b>`}; } },
FRAC:{ name:'몇 분의 몇 (약분)', icon:'🍕',
  lesson:[
    `135°는 360°의 몇 분의 몇일까요? 먼저 분수로 써요.${big(FR('135','360'))}`,
    `분자와 분모를 <b>같은 수로 나눠</b> 약분해요.<br>÷5 → ${FR(27,72)} &nbsp; ÷9 → ${FR(3,8)}<br><span class="muted">(최대공약수 45로 한 번에 나눠도 돼요)</span>`,
    `원을 8조각으로 나눈 것 중 3조각이 135°예요.`+pie(8,3)],
  gen(){ const [a]=rnd([[30],[45],[60],[72],[90],[120],[135],[150],[210],[225],[240],[270],[300],[315]]), g=gcd(a,360);
    return {q:`<b>${a}°</b>는 360°의 몇 분의 몇일까요? (약분해서)`, a:a/360, u:'', ph:'예: 1/2', fig:pie(360/g,a/g),
      sol:`${FR(a,360)} → 분자·분모를 ${g}(으)로 나누면 <b>${FR(a/g,360/g)}</b>`}; } },
ISO:{ name:'이등변삼각형의 두 밑각', icon:'🔺',
  lesson:[
    `원의 중심 O와 원 위의 두 점 A, C를 이으면 ${M('\\overline{\\mathrm{OA}}')}, ${M('\\overline{\\mathrm{OC}}')}는 둘 다 <b>반지름</b>이라 길이가 같아요.<br>→ 삼각형 OAC는 <b>이등변삼각형</b>`+isoFig('','',''),
    `이등변삼각형은 <b>두 밑각의 크기가 같아요.</b>`+isoFig('','40°','40°'),
    `세 각의 합은 180°이니까<br>꼭지각 = 180° − 40° × 2 = <b>100°</b><br>꼭지각을 알면 밑각 = (180° − 꼭지각) ÷ 2`+isoFig('100°','40°','40°')],
  gen(){ if(Math.random()<.5){ const b=rnd([20,25,30,35,40,50,55,60,65,70]);
      return {q:`OA = OC인 이등변삼각형에서 ∠A = <b>${b}°</b>일 때, 꼭지각 ∠O는?`, fig:isoFig('?',b+'°',''), a:180-2*b, u:'°', sol:`∠C = ∠A = ${b}° → ∠O = 180° − ${b}° × 2 = <b>${180-2*b}°</b>`}; }
    const t=rnd([40,50,60,70,80,100,110,120,140]);
    return {q:`OA = OC인 이등변삼각형에서 꼭지각 ∠O = <b>${t}°</b>일 때, 밑각 ∠C는?`, fig:isoFig(t+'°','','?'), a:(180-t)/2, u:'°', sol:`두 밑각이 같으니 (180° − ${t}°) ÷ 2 = <b>${(180-t)/2}°</b>`}; } },
TRI:{ name:'삼각형 세 각의 합', icon:'📐',
  lesson:[
    `삼각형의 세 각을 모두 더하면 <b>180°</b>예요.`+triFig('●','▲','■')+big(M('\\bullet+\\blacktriangle+\\blacksquare=180^{\\circ}')),
    `모르는 각 = 180° − (아는 두 각의 합)<br>예) 50°, 70° → 180° − 120° = <b>60°</b>`+triFig('50°','70°','?'),
    `<b>정삼각형</b>은 세 각이 모두 같아서 한 각은 180° ÷ 3 = <b>60°</b>`],
  gen(){ if(Math.random()<.2) return {q:`<b>정삼각형</b>의 한 각의 크기는?`, a:60, u:'°', sol:`세 각이 같으니 180° ÷ 3 = <b>60°</b>`};
    const a=ri(3,14)*5, b=ri(3,Math.min(20,(170-a)/5))*5;
    return {q:`삼각형의 두 각이 <b>${a}°</b>, <b>${b}°</b>일 때 나머지 한 각은?`, fig:triFig(a+'°',b+'°','?'), a:180-a-b, u:'°', sol:`180° − (${a}° + ${b}°) = <b>${180-a-b}°</b>`}; } },
LINE:{ name:'한 직선이 만드는 각 180°', icon:'📏',
  lesson:[
    `한 직선 위에서 한 점을 중심으로 한 각은 <b>180°</b> (평각)예요.`+lineFig('',''),
    `그래서 한 직선 위에 붙어 있는 두 각을 더하면 180°<br>나머지 각 = 180° − 아는 각`+lineFig('60°','120°')],
  gen(){ const a=ri(4,32)*5; return {q:`한 직선 위에 붙어 있는 두 각 중 하나가 <b>${a}°</b>예요. 다른 각은?`, fig:lineFig(a+'°','?'), a:180-a, u:'°', sol:`180° − ${a}° = <b>${180-a}°</b>`}; } },
PARA:{ name:'평행선의 동위각과 엇각', icon:'🛤',
  lesson:[
    `두 직선 <i>l</i>, <i>m</i>이 <b>평행</b>할 때, 다른 직선과 만나서 생기는<br><b>동위각</b>(같은 자리의 각)은 크기가 같아요.`+paraFig('70°','70°','co'),
    `<b>엇각</b>(Z 모양으로 엇갈린 자리의 각)도 크기가 같아요.`+paraFig('70°','70°','alt'),
    `평행선이 보이면 → 같은 각을 찾아 <b>그림에 모두 표시</b>해 보세요.`],
  gen(){ const a=ri(5,16)*5, alt=Math.random()<.6;
    return {q:`<i>l</i> ∥ <i>m</i>일 때, ? 표시한 각의 크기는? (${alt?'엇각':'동위각'})`, fig:paraFig(a+'°','?',alt?'alt':'co'), a, u:'°', sol:`평행선의 ${alt?'엇각':'동위각'}은 크기가 같아요 → <b>${a}°</b>`}; } },
PROP:{ name:'비례식', icon:'⚖',
  lesson:[
    `중심각이 30°일 때 호의 길이가 6 cm예요. 중심각이 120°이면?<br>120° ÷ 30° = <b>4배</b> → 호도 4배 → 6 × 4 = <b>24 cm</b>`,
    `비례식으로 써도 돼요.${big(M('30 : 6 = 120 : x'))}(외항의 곱) = (내항의 곱) → 30 × <i>x</i> = 6 × 120 → <i>x</i> = <b>24</b>`],
  gen(){ const a=rnd([20,30,40,45,60]), L=ri(2,9), m=rnd([2,3,4,5,6]), b=a*m;
    return {q:`중심각이 <b>${a}°</b>일 때 호의 길이가 <b>${L} cm</b>예요. 중심각이 <b>${b}°</b>이면 호의 길이는?`, a:L*m, u:'cm',
      sol:`${b}° ÷ ${a}° = ${m}배 → ${L} × ${m} = <b>${L*m} cm</b> &nbsp;(또는 ${a} : ${L} = ${b} : <i>x</i>)`}; } },
};
window.PREREQ = PREREQ;
})();
