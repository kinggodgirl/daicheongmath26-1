/* =========================================================
   단원 파일이 함께 쓰는 도구 (글자 꾸미기 · 교과서 형식 그림 · 문제 만들기)
   단원 파일 맨 위에서 이렇게 꺼내 씁니다:
     const {A, OV, FR, I, PI, FONT, GRAY, svg, ln, dot, T, pol, mid, fx, pt, arcTo, dimLine, arrowHead, arcDim, angMark, gcd, rnd, ri, shuffle, fracH, mc, BOX, XI} = window.ULIB;
   ▶ 글자 꾸미기
       A('AB')   → 호 AB  (위에 ⌒)
       OV('AC')  → 선분 AC (위에 줄)
       FR(4,9)   → 9분의 4 (분수)
       I('x')    → 기울임 문자
   ▶ 그림 (흑백 SVG): svg(너비,높이,내용), ln(점,점), dot(점), T(x,y,글자), pol(중심,반지름,각도),
       arcTo(중심,P,Q), dimLine(P,Q,'6 cm'), arcDim(...), angMark(꼭짓점,각0,각1,반지름,'40°',글자거리)
   ▶ 문제 만들기: ri(최소,최대) 정수, rnd(배열) 하나 고르기, shuffle(배열), mc(정답,[오답들]) 보기 섞기, fracH(분자,분모) 약분 분수
========================================================= */
(function(){
const A  = s => `<span class="arc">${s}</span>`;
const OV = s => `<span class="ov">${s}</span>`;
const FR = (a,b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const I  = s => `<i class="mv">${s}</i>`;
const PI = 'π';

/* ---------------- 교과서 형식 그림 (흑백 SVG) ---------------- */
const FONT = `font-family="'Times New Roman',Times,'Noto Serif KR',serif"`;
const GRAY = '#d4d4d4';
const svg = (w,h,body) => `<svg class="fig" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const ln  = (P,Q,w=2.6) => `<line x1="${P[0]}" y1="${P[1]}" x2="${Q[0]}" y2="${Q[1]}" stroke="#111" stroke-width="${w}" stroke-linecap="round"/>`;
const dot = (P,r=4) => `<circle cx="${P[0]}" cy="${P[1]}" r="${r}" fill="#111"/>`;
const T = (x,y,s,o={}) => `<text x="${x}" y="${y}" ${FONT} font-size="${o.size||25}" text-anchor="${o.anchor||'middle'}" dominant-baseline="central"${o.it?' font-style="italic"':''}${o.halo?' stroke="#fff" stroke-width="7" paint-order="stroke" stroke-linejoin="round"':''} fill="#111">${s}</text>`;
const pol = (c,r,deg) => [c[0]+r*Math.cos(deg*Math.PI/180), c[1]-r*Math.sin(deg*Math.PI/180)];   // 수학 각도(반시계)
const mid = (P,Q) => [(P[0]+Q[0])/2,(P[1]+Q[1])/2];
const fx = v => Math.round(v*100)/100;
const pt = P => `${fx(P[0])} ${fx(P[1])}`;
/* 중심 c, P → Q 작은 호 */
function arcTo(c,P,Q){
  const r=Math.hypot(P[0]-c[0],P[1]-c[1]);
  const a=Math.atan2(P[1]-c[1],P[0]-c[0]), b=Math.atan2(Q[1]-c[1],Q[0]-c[0]);
  let d=b-a; while(d<=-Math.PI) d+=2*Math.PI; while(d>Math.PI) d-=2*Math.PI;
  return `A ${fx(r)} ${fx(r)} 0 0 ${d>0?1:0} ${pt(Q)}`;
}
/* 선분 길이: 둥근 점선 호 + 가운데 글자 */
function dimLine(P,Q,label,d=26){
  const dx=Q[0]-P[0], dy=Q[1]-P[1], L=Math.hypot(dx,dy), n=[-dy/L,dx/L], M=mid(P,Q);
  const w=label.length*14.4, e=d+Math.sign(d)*Math.abs(n[0])*w*0.42, C=[M[0]+n[0]*2*d, M[1]+n[1]*2*d], Lp=[M[0]+n[0]*e, M[1]+n[1]*e];
  return `<path d="M ${pt(P)} Q ${pt(C)} ${pt(Q)}" fill="none" stroke="#111" stroke-width="1.8" stroke-dasharray="0.1 5" stroke-linecap="round"/>`
       + `<rect x="${fx(Lp[0]-label.length*7.2)}" y="${fx(Lp[1]-14)}" width="${fx(label.length*14.4)}" height="28" fill="#fff"/>`
       + T(Lp[0],Lp[1],label);
}
/* 원의 호 길이: 바깥 실선 동심원 호 + 양 끝 눈금 + 양 끝 화살표 */
function arrowHead(P,dir){
  const n=[-dir[1],dir[0]], b=[P[0]-dir[0]*10,P[1]-dir[1]*10];
  return `<path d="M ${pt(P)} L ${pt([b[0]+n[0]*4,b[1]+n[1]*4])} L ${pt([b[0]-n[0]*4,b[1]-n[1]*4])} Z" fill="#111"/>`;
}
function arcDim(c,R,a0,a1,gap,label,lr){
  const r=R+gap, P0=pol(c,r,a0), P1=pol(c,r,a1), big=(a1-a0)>180?1:0;
  const rad=a=>a*Math.PI/180;
  let s=`<path d="M ${pt(P0)} A ${r} ${r} 0 ${big} 0 ${pt(P1)}" fill="none" stroke="#111" stroke-width="1.6"/>`;
  s+=ln(pol(c,R+4,a0),pol(c,r+8,a0),1.6)+ln(pol(c,R+4,a1),pol(c,r+8,a1),1.6);
  s+=arrowHead(P1,[-Math.sin(rad(a1)),-Math.cos(rad(a1))]);   // 반시계 끝
  s+=arrowHead(P0,[Math.sin(rad(a0)),Math.cos(rad(a0))]);     // 시계 끝
  const m=(a0+a1)/2, Lp=pol(c,lr,m), cs=Math.cos(rad(m));
  return s+T(Lp[0],Lp[1],label,{anchor: cs>0.3?'start': cs<-0.3?'end':'middle'});
}
/* 각 표시 */
function angMark(V,a0,a1,r,label,lr,size=21){
  const P0=pol(V,r,a0), P1=pol(V,r,a1), Lp=pol(V,lr,(a0+a1)/2), big=(a1-a0)>180?1:0;
  return `<path d="M ${pt(P0)} A ${r} ${r} 0 ${big} 0 ${pt(P1)}" fill="none" stroke="#111" stroke-width="1.6"/>`+T(Lp[0],Lp[1],label,{size});
}

/* ---------------- 문제 만들기 도구 ---------------- */
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const ri=(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const fracH=(n,d)=>{const g=gcd(n,d);n/=g;d/=g;return d===1?String(n):FR(n,d);};
function mc(correct,wrongs){ const w=[...new Set(wrongs)].filter(x=>x!==correct).slice(0,3); const all=shuffle([correct,...w]); return {choices:all, ok:all.indexOf(correct)}; }
const BOX='<span class="blank">　　</span>';
const XI=`<tspan font-style="italic">x</tspan>`;

window.ULIB = {A, OV, FR, I, PI, FONT, GRAY, svg, ln, dot, T, pol, mid, fx, pt, arcTo, dimLine, arrowHead, arcDim, angMark, gcd, rnd, ri, shuffle, fracH, mc, BOX, XI};
})();
