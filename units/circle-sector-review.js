/* =========================================================
   단원 마무리 내용 파일 — 원과 부채꼴 (Ⅵ 대단원 마무리)
   ▶ 힌트·풀이 문구를 고치려면 이 파일만 고치면 됩니다.
     (index.html, teacher.html 은 units/list.js 에서 고른 단원 파일을 읽어 씁니다)
   ▶ 글자 꾸미기·그림 도구는 units/_lib.js 에 있어요. (A, OV, FR, I, svg, ...)
========================================================= */
(function(){
const {A, OV, FR, I, PI, FONT, GRAY, svg, ln, dot, T, pol, mid, fx, pt, arcTo, dimLine, arrowHead, arcDim, angMark, gcd, rnd, ri, shuffle, fracH, mc, BOX, XI} = window.ULIB;


const FIG = {
  /* ① 원 위의 세 점 (호의 비 a:b:c) */
  circle3(a,b,c){
    const C=[140,125], R=88, tot=a+b+c;
    const aA=125, aB=aA+360*a/tot, aC=aB+360*b/tot;
    const P={A:pol(C,R,aA),B:pol(C,R,aB),Cc:pol(C,R,aC)};
    const L=(ang,s)=>{const q=pol(C,R+20,ang); return T(q[0],q[1],s);};
    return svg(280,250,`<circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="none" stroke="#111" stroke-width="2.6"/>`
      +dot(P.A)+dot(P.B)+dot(P.Cc)+dot(C)+L(aA,'A')+L(aB,'B')+L(aC,'C')+T(C[0]+16,C[1]+14,'O'));
  },
  /* ③ 지름 AB, ∠CAB = d° */
  diam(d){
    const C=[150,128], R=95, A_=[C[0]-R,C[1]], B_=[C[0]+R,C[1]], Cc=pol(C,R,2*d);
    const lc=pol(C,R+20,2*d);
    return svg(300,240,`<circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="none" stroke="#111" stroke-width="2.6"/>`
      +ln(A_,B_)+ln(A_,Cc)+dot(C)+dot(Cc)+T(A_[0]-18,A_[1],'A')+T(B_[0]+18,B_[1],'B')+T(lc[0],lc[1],'C')+T(C[0],C[1]+22,'O')
      +angMark(A_,0,d,34,`${d}°`,58,20));
  },
  /* ④ 정사각형 안 두 사분원 (lens=true면 가운데를 색칠) */
  lens(s,lens){
    const x0=40,y0=22,k=190, TL=[x0,y0], TR=[x0+k,y0], BL=[x0,y0+k], BR=[x0+k,y0+k];
    const lensPath=`M ${pt(BL)} ${arcTo(BR,BL,TR)} ${arcTo(TL,TR,BL)} Z`;
    const sq=`M ${pt(TL)} L ${pt(TR)} L ${pt(BR)} L ${pt(BL)} Z`;
    const m=13, rt=(P,sx,sy)=>`<path d="M ${P[0]+sx*m} ${P[1]} L ${P[0]+sx*m} ${P[1]+sy*m} L ${P[0]} ${P[1]+sy*m}" fill="none" stroke="#111" stroke-width="1.4"/>`;
    return svg(270,285,
      (lens? `<path d="${lensPath}" fill="${GRAY}"/>` : `<path d="${sq}" fill="${GRAY}"/><path d="${lensPath}" fill="#fff"/>`)
      +`<path d="${sq}" fill="none" stroke="#111" stroke-width="2.6"/><path d="${lensPath}" fill="none" stroke="#111" stroke-width="2.6"/>`
      +rt(TL,1,1)+rt(BR,-1,-1)+dimLine(BL,BR,`${s} cm`,28));
  },
  /* ⑤ 반원 O, AC∥OD, ∠BOD = d°, 호 BD = L cm */
  semi(d,L){
    const C=[150,172], R=120, A_=[C[0]-R,C[1]], B_=[C[0]+R,C[1]], D=pol(C,R,d), Cc=pol(C,R,2*d);
    const lD=pol(C,R+20,d+5), lC=pol(C,R+20,2*d);
    return svg(355,215,`<path d="M ${pt(B_)} A ${R} ${R} 0 0 0 ${pt(A_)}" fill="none" stroke="#111" stroke-width="2.6"/>`
      +ln(A_,B_)+ln(A_,Cc)+ln(C,D)+dot(C)
      +T(A_[0]-6,A_[1]+22,'A')+T(C[0],C[1]+24,'O')+T(B_[0]+4,B_[1]+24,'B')+T(lC[0],lC[1],'C')+T(lD[0]-4,lD[1]-2,'D')
      +angMark(C,0,d,30,`${d}°`,52,19)
      +arcDim(C,R,0,d,14,`${L} cm`,R+30));
  },
  /* ⑥ 정삼각형 ABC 바깥으로 이어지는 부채꼴 세 개 */
  spiral(s){
    const k=50, ox=110, oy=78, S=(x,y)=>[ox+x,oy-y], h=k*Math.sqrt(3)/2;
    const A_=S(0,0), C_=S(k,0), B_=S(k/2,-h);
    const D=pol(A_,k,120), E=pol(B_,2*k,240), F=pol(C_,3*k,0);
    const sec=(c,P,Q)=>`<path d="M ${pt(c)} L ${pt(P)} ${arcTo(c,P,Q)} Z" fill="${GRAY}"/>`;
    const arc=(c,P,Q)=>`<path d="M ${pt(P)} ${arcTo(c,P,Q)}" fill="none" stroke="#111" stroke-width="2.6"/>`;
    const lab=mid(A_,C_);
    return svg(345,262, sec(A_,C_,D)+sec(B_,D,E)+sec(C_,E,F)
      +arc(A_,C_,D)+arc(B_,D,E)+arc(C_,E,F)+ln(B_,D)+ln(C_,E)+ln(A_,F)
      +`<path d="M ${pt([lab[0],lab[1]-3])} Q ${lab[0]+20} ${lab[1]-40} ${lab[0]+46} ${lab[1]-44}" fill="none" stroke="#111" stroke-width="1.2"/>`
      +T(lab[0]+50,lab[1]-46,`${s} cm`,{anchor:'start',size:23})
      +T(A_[0]-14,A_[1]+4,'A',{size:22,halo:true})+T(B_[0]+4,B_[1]+20,'B',{size:22,halo:true})+T(C_[0]+6,C_[1]-16,'C',{size:22})
      +T(D[0]-10,D[1]-12,'D')+T(E[0]-12,E[1]+14,'E')+T(F[0]+14,F[1],'F'));
  },
  /* ⑦ 정삼각형의 각 변을 지름으로 하는 반원 */
  tri3(s){
    const k=240, h=k*Math.sqrt(3)/2, B_=[40,236], C_=[40+k,236], A_=[160,236-h];
    const M={AB:mid(A_,B_),BC:mid(B_,C_),CA:mid(C_,A_)};
    const piece=(V,Mvp,Mvq,Mpq)=>`<path d="M ${pt(V)} ${arcTo(Mvp,V,Mvq)} ${arcTo(Mpq,Mvq,Mvp)} ${arcTo(Mvq,Mvp,V)} Z" fill="${GRAY}"/>`;
    // 반원(안쪽) = 60° 호 세 개
    const semi=(P,Q,Mpq,Mp,Mq)=>`<path d="M ${pt(P)} ${arcTo(Mpq,P,Mp)} ${arcTo(Mpq,Mp,Mq)} ${arcTo(Mpq,Mq,Q)}" fill="none" stroke="#111" stroke-width="2.6"/>`;
    return svg(320,312,
      piece(B_,M.AB,M.BC,M.CA)+piece(C_,M.CA,M.BC,M.AB)+piece(A_,M.AB,M.CA,M.BC)
      +semi(B_,C_,M.BC,M.AB,M.CA)+semi(C_,A_,M.CA,M.BC,M.AB)+semi(A_,B_,M.AB,M.CA,M.BC)
      +`<path d="M ${pt(A_)} L ${pt(B_)} L ${pt(C_)} Z" fill="none" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>`
      +dimLine(B_,C_,`${s} cm`,36));
  }
};

/* ---------------- 문제 · 힌트 · 풀이 ----------------
   hints: 학생이 차례로 여는 힌트 (앞의 것을 열고 기다려야 다음이 열림)
   checks: 힌트마다 학생이 적을 답 (null이면 답 칸 없음). 맞히면 기다리지 않고 다음 힌트가 열림
           {l:'칸 이름', a:정답 숫자, u:'단위'} — u에 π가 있으면 π 앞의 수만 적으면 됨
   sol  : 마지막 단계 '풀이' (교사가 '풀이까지' 허용해야 열림)
   rule : 풀이 아래에 굵게 보이는 한 줄 규칙 (다른 문제에도 쓰는 생각)
   group: 교사 화면 묶음 (같은 아이디어끼리)
------------------------------------------------------- */
const GROUPS = {
  ratio: {name:'비례', desc:'중심각 ∝ 호의 길이·넓이'},
  aux:   {name:'보조선', desc:'반지름 긋기 → 이등변삼각형'},
  area:  {name:'넓이 쪼개기', desc:'더하고 빼고 옮기기'}
};

const PROBLEMS = [
 { id:'p1', no:'①', group:'ratio', title:'호의 비와 중심각',
   text:`오른쪽 그림의 원 O에서 ${A('AB')} : ${A('BC')} : ${A('CA')} = 2 : 3 : 4일 때, ${A('CA')}에 대한 중심각의 크기를 구하시오.`,
   fig:()=>FIG.circle3(2,3,4),
   ans:`160°`,
   hints:[
     `${A('AB')}, ${A('BC')}, ${A('CA')}의 중심각을 모두 더하면 몇 도일까요? (원을 한 바퀴 돌아요!)`,
     `사탕 18개를 2 : 3 : 4의 비율로 3명에게 나눠 주면 각각 몇 개씩 받을까요?`,
     `이번에는 360°를 2 : 3 : 4로 나눠 봅시다. ${A('CA')}는 그중 몇 번째 몫일까요?`
   ],
   checks:[ [{l:'중심각의 합',a:360,u:'°'}], [{l:'첫째',a:4,u:'개'},{l:'둘째',a:6,u:'개'},{l:'셋째',a:8,u:'개'}], [{l:'첫째 몫',a:80,u:'°'},{l:'둘째 몫',a:120,u:'°'},{l:'셋째 몫',a:160,u:'°'}] ],
   sol:`세 호의 중심각을 모두 더하면 360°예요. 호의 길이는 중심각의 크기에 정비례하므로 중심각의 비도 2 : 3 : 4입니다.<br>${A('CA')}의 중심각 = 360° × ${FR(4,9)} = <b>160°</b>`,
   rule:`호의 길이의 비 = 중심각의 크기의 비`
 },
 { id:'p2', no:'②', group:'ratio', title:'부채꼴의 호의 길이와 넓이',
   text:`반지름의 길이가 8 cm이고 중심각의 크기가 135°인 부채꼴의 호의 길이와 넓이를 각각 구하시오.`,
   fig:null,
   ans:`호의 길이 6${PI} cm, 넓이 24${PI} cm²`,
   hints:[
     `그림을 대충이라도 그려 봅시다. 반지름 8 cm, 중심각 135°인 부채꼴이에요.`,
     `반지름이 8 cm인 원의 둘레와 넓이는 각각 얼마일까요?`,
     `135°는 360°의 몇 분의 몇일까요? 약분까지 해 보세요.`
   ],
   checks:[ null, [{l:'원의 둘레',a:16,u:'π cm'},{l:'원의 넓이',a:64,u:'π cm²'}], [{l:'135°는 360°의',a:3/8,u:'',ph:'예: 1/2'}] ],
   sol:`원의 둘레 = 2${PI} × 8 = 16${PI} (cm), 원의 넓이 = ${PI} × 8² = 64${PI} (cm²)<br>${FR('135','360')} = ${FR(3,8)} 이므로 부채꼴은 원의 ${FR(3,8)} 조각이에요.<br>호의 길이 = 16${PI} × ${FR(3,8)} = <b>6${PI} cm</b>, 넓이 = 64${PI} × ${FR(3,8)} = <b>24${PI} cm²</b>`,
   rule:`부채꼴 = 원의 ${FR('(중심각)','360')} 조각`
 },
 { id:'p3', no:'③', group:'aux', title:'지름과 현이 만드는 호의 비',
   text:`원 O에서 현 AC와 지름 AB가 이루는 각의 크기가 40°일 때, ${A('AC')}와 ${A('CB')}의 길이의 비를 가장 간단한 자연수의 비로 나타내시오.`,
   fig:()=>FIG.diam(40),
   ans:`5 : 4`,
   hints:[
     `호의 길이는 중심각과 관계가 있어요! ${A('AC')}와 ${A('CB')}의 중심각을 그려 보세요. 어떤 선분을 그어야 할까요?`,
     `${OV('OC')}를 그었나요? ${OV('OA')}와 ${OV('OC')}는 둘 다 원의 반지름이에요. 그럼 삼각형 OAC는 어떤 삼각형일까요? ∠OCA의 크기는?`,
     `중심각 ∠AOC의 크기는? (삼각형의 세 각의 크기의 합은 180°)`,
     `중심각 ∠BOC의 크기는? (${OV('AB')}는 한 직선이에요!) 이제 비를 쓸 때 순서에 조심하세요.`
   ],
   checks:[ null, [{l:'∠OCA',a:40,u:'°'}], [{l:'∠AOC',a:100,u:'°'}], [{l:'∠BOC',a:80,u:'°'}] ],
   sol:`${OV('OC')}를 그으면 ${OV('OA')} = ${OV('OC')} (반지름)이므로 삼각형 OAC는 이등변삼각형 → ∠OCA = ∠OAC = 40°<br>∠AOC = 180° − 40° − 40° = 100°, ∠BOC = 180° − 100° = 80°<br>${A('AC')} : ${A('CB')} = 100 : 80 = <b>5 : 4</b>`,
   rule:`중심 O와 원 위의 점이 보이면 반지름부터 긋는다 → 이등변삼각형`
 },
 { id:'p4', no:'④', group:'area', title:'정사각형 속 두 사분원',
   text:`오른쪽 그림과 같은 정사각형에서 색칠한 부분의 둘레의 길이와 넓이를 각각 구하시오.`,
   fig:()=>FIG.lens(6,false),
   ans:`둘레 (24 + 6${PI}) cm, 넓이 (72 − 18${PI}) cm²`,
   hints:[
     `둘레부터 구해 봅시다. 선을 따라 색칠한 부분의 경계를 모두 돌려면 호는 몇 번, 선분은 몇 번 따라가야 할까요?`,
     `문제에 있는 호 몇 개가 모이면 원이 될까요? 그 원의 반지름은 몇 cm일까요?`,
     `이제 넓이! 색칠한 한 조각은 (정사각형) − (무엇)일까요? 정사각형에서 빼야 할 도형을 찾아보세요.`
   ],
   checks:[ [{l:'호',a:2,u:'번'},{l:'선분',a:4,u:'번'}], [{l:'호',a:4,u:'개'},{l:'반지름',a:6,u:'cm'}], null ],
   sol:`<b>둘레</b>: 선분 4개 → 6 × 4 = 24 (cm), 호 2개 → 각각 반지름 6 cm인 원의 ${FR(1,4)} → 2 × (12${PI} × ${FR(1,4)}) = 6${PI} (cm)<br>→ <b>(24 + 6${PI}) cm</b><br><b>넓이</b>: 한 조각 = (정사각형) − (사분원) = 36 − 9${PI}, 두 조각 → <b>(72 − 18${PI}) cm²</b>`,
   rule:`색칠한 부분 = (큰 도형) − (색칠하지 않은 부분)`
 },
 { id:'p5', no:'⑤', group:'aux', title:'평행선과 반원',
   text:`오른쪽 그림과 같은 반원 O에서 ${OV('AC')} ∥ ${OV('OD')}, ∠BOD = 30°, ${A('BD')} = 6 cm일 때, ${A('AC')}의 길이를 구하시오.`,
   fig:()=>FIG.semi(30,6),
   ans:`24 cm`,
   hints:[
     `호의 길이를 알려면 중심각을 알면 돼요. ${A('AC')}의 중심각을 그리고 크기를 구하려고 노력해 봅시다.`,
     `평행선을 이용하여 알 수 있는 각을 모두 표시해 보세요. (동위각, 엇각) ∠OAC의 크기는?`,
     `이등변삼각형이 보이나요? ${OV('OA')}와 ${OV('OC')}는 둘 다 반지름! ∠OCA와 ∠AOC의 크기는?`,
     `중심각이 30°일 때 호의 길이가 6 cm예요. 중심각이 ∠AOC일 때 호의 길이는? 비례식을 세워 보세요.`
   ],
   checks:[ null, [{l:'∠OAC',a:30,u:'°'}], [{l:'∠OCA',a:30,u:'°'},{l:'∠AOC',a:120,u:'°'}], [{l:'호 AC',a:24,u:'cm'}] ],
   sol:`${OV('OC')}를 긋습니다. ${OV('AC')} ∥ ${OV('OD')}이므로 ∠OAC = ∠BOD = 30° (동위각)<br>${OV('OA')} = ${OV('OC')}이므로 ∠OCA = 30° → ∠AOC = 180° − 60° = 120°<br>30 : 120 = 6 : ${A('AC')} → ${A('AC')} = <b>24 cm</b>`,
   rule:`③과 같은 생각: 반지름 긋기(이등변삼각형) + 평행선의 동위각`
 },
 { id:'p6', no:'⑥', group:'area', title:'이어지는 부채꼴 세 개',
   text:`오른쪽 그림과 같이 한 변의 길이가 3 cm인 정삼각형 ABC의 세 꼭짓점을 중심으로 부채꼴을 그렸을 때, 색칠한 부분의 넓이를 구하려고 한다. 풀이 과정과 답을 쓰시오. (단, ${OV('AC')} = ${OV('AD')}, ${OV('BD')} = ${OV('BE')}, ${OV('CE')} = ${OV('CF')})`,
   fig:()=>FIG.spiral(3),
   ans:`42${PI} cm²`,
   hints:[
     `부채꼴 DAC부터 봅시다. 반지름은 ${OV('AC')} = 3 cm예요. 중심각 ∠DAC의 크기는? (∠BAC = 60°이고, D는 ${OV('BA')}의 연장선 위에 있어요)`,
     `부채꼴 DAC가 몇 개 모이면 원이 될까요? 그럼 넓이는?`,
     `부채꼴 BDE의 반지름은? (${OV('BD')} = ${OV('BA')} + ${OV('AD')}) 중심각 ∠DBE의 크기는?`,
     `마지막 부채꼴 CEF의 반지름과 중심각은? 세 부채꼴의 넓이를 더하세요. 풀이 과정을 쓰는 것도 잊지 마세요!`
   ],
   checks:[ [{l:'∠DAC',a:120,u:'°'}], [{l:'몇 개',a:3,u:'개'},{l:'넓이',a:3,u:'π cm²'}], [{l:'반지름',a:6,u:'cm'},{l:'∠DBE',a:120,u:'°'}], [{l:'반지름',a:9,u:'cm'},{l:'중심각',a:120,u:'°'},{l:'세 넓이의 합',a:42,u:'π cm²'}] ],
   sol:`세 부채꼴의 중심각은 모두 180° − 60° = 120° → 원의 ${FR(1,3)}<br>반지름: ${OV('AC')} = 3, ${OV('BD')} = 3 + 3 = 6, ${OV('CE')} = 3 + 6 = 9 (cm)<br>넓이 = ${FR(1,3)}(9${PI} + 36${PI} + 81${PI}) = 3${PI} + 12${PI} + 27${PI} = <b>42${PI} cm²</b>`,
   rule:`부채꼴마다 [반지름, 중심각]을 표로 정리하고 더한다`
 },
 { id:'p7', no:'⑦', group:'area', title:'정삼각형과 세 반원',
   text:`오른쪽 그림은 한 변의 길이가 8 cm인 정삼각형의 각 변을 지름으로 하는 반원을 그린 것이다. 색칠한 부분의 넓이를 구하시오.`,
   fig:()=>FIG.tri3(8),
   ans:`8${PI} cm²`,
   hints:[
     `반원의 반지름은 몇 cm일까요? 색칠한 조각은 3개이고 모양이 모두 같아요. 한 조각만 구해서 3배 하면 돼요.`,
     `지금 모양으로는 넓이를 구하기가 쉽지 않아요. 한 조각에서 삼각형 밖으로 튀어나온 부분을 잘라서, 안쪽으로 파인 자리에 옮겨 붙여 보세요.`,
     `옮기고 나니 부채꼴이 되었나요? 그 부채꼴의 반지름과 중심각의 크기는? (정삼각형의 한 각을 떠올려 보세요)`
   ],
   checks:[ [{l:'반지름',a:4,u:'cm'}], null, [{l:'반지름',a:4,u:'cm'},{l:'중심각',a:60,u:'°'}] ],
   sol:`반원의 반지름은 4 cm. 한 조각에서 튀어나온 활꼴 하나를 파인 자리로 옮기면, 반지름 4 cm, 중심각 60°인 부채꼴이 돼요.<br>한 조각 = 16${PI} × ${FR(1,6)} = ${FR('8'+PI,3)} (cm²), 세 조각 → <b>8${PI} cm²</b>`,
   rule:`모양이 복잡하면 잘라서 옮겨 구하기 쉬운 모양(부채꼴)으로 만든다`
 }
];

/* ---------------- 확인 문제 (쌍둥이 문제, 책 덮고) ----------------
   ok: 정답 번호(0부터), why: 오답을 고른 학생이 무엇을 놓쳤는지 교사 참고용
------------------------------------------------------- */
const TWINS = [
 { id:'t1', of:'p1', text:`원 O에서 ${A('AB')} : ${A('BC')} : ${A('CA')} = 3 : 4 : 5일 때, ${A('CA')}에 대한 중심각의 크기는?`,
   fig:()=>FIG.circle3(3,4,5),
   ch:['150°','75°','120°','100°'], ok:0,
   why:['', '360° 대신 180°를 나눔', '다른 호(BC)의 중심각', '비를 잘못 계산'],
   exp:`세 중심각의 합 360°를 3 : 4 : 5로 나누면 ${A('CA')}의 중심각 = 360° × ${FR(5,12)} = 150°` },
 { id:'t2', of:'p2', text:`반지름의 길이가 6 cm이고 중심각의 크기가 120°인 부채꼴의 호의 길이와 넓이는?`,
   fig:null,
   ch:[`호 4${PI} cm, 넓이 12${PI} cm²`,`호 12${PI} cm, 넓이 4${PI} cm²`,`호 2${PI} cm, 넓이 6${PI} cm²`,`호 4${PI} cm, 넓이 36${PI} cm²`], ok:0,
   why:['', '원의 둘레와 넓이를 바꿔 씀', '둘레를 πr로 착각', '넓이에 1/3을 곱하지 않음'],
   exp:`120°는 360°의 ${FR(1,3)} → 호 = 12${PI} × ${FR(1,3)} = 4${PI} cm, 넓이 = 36${PI} × ${FR(1,3)} = 12${PI} cm²` },
 { id:'t3', of:'p3', text:`원 O에서 현 AC와 지름 AB가 이루는 각의 크기가 20°일 때, ${A('AC')} : ${A('CB')}는?`,
   fig:()=>FIG.diam(20),
   ch:['7 : 2','2 : 7','8 : 1','5 : 4'], ok:0,
   why:['', '비의 순서를 바꿈', '∠BOC를 20°로 착각 (보조선 없이)', '앞 문제의 답을 그대로 씀'],
   exp:`${OV('OC')}를 그으면 ∠OCA = 20° → ∠AOC = 140°, ∠BOC = 40° → 140 : 40 = 7 : 2` },
 { id:'t4', of:'p4', text:`한 변의 길이가 4 cm인 정사각형에 그림과 같이 두 사분원을 그렸다. 색칠한 부분의 넓이는? (이번엔 가운데가 색칠되어 있어요!)`,
   fig:()=>FIG.lens(4,true),
   ch:[`(8${PI} − 16) cm²`,`(32 − 8${PI}) cm²`,`(16 − 4${PI}) cm²`,`4${PI} cm²`], ok:0,
   why:['', '색칠하지 않은 바깥 부분을 구함', '바깥 한 조각만 구함', '사분원 하나의 넓이'],
   exp:`(가운데) = (사분원 2개) − (정사각형) = 2 × 4${PI} − 16 = (8${PI} − 16) cm²` },
 { id:'t5', of:'p5', text:`반원 O에서 ${OV('AC')} ∥ ${OV('OD')}, ∠BOD = 40°, ${A('BD')} = 4 cm일 때, ${A('AC')}의 길이는?`,
   fig:()=>FIG.semi(40,4),
   ch:['10 cm','14 cm','8 cm','16 cm'], ok:0,
   why:['', '∠AOC를 180° − 40° = 140°로 착각', '∠AOC를 80°로 착각', '앞 문제처럼 4배라고 생각'],
   exp:`∠OAC = 40° (동위각), ∠OCA = 40° (이등변삼각형) → ∠AOC = 100°. 40 : 100 = 4 : ${A('AC')} → 10 cm` },
 { id:'t6', of:'p6', text:`한 변의 길이가 2 cm인 정삼각형 ABC로 ⑥과 같이 부채꼴 세 개를 그렸을 때, 색칠한 부분의 넓이는?`,
   fig:()=>FIG.spiral(2),
   ch:[`${FR('56'+PI,3)} cm²`,`${FR('28'+PI,3)} cm²`,`56${PI} cm²`,`4${PI} cm²`], ok:0,
   why:['', '중심각을 60°로 착각', '원의 1/3을 곱하지 않음', '반지름을 모두 2 cm로 착각'],
   exp:`중심각 120°(원의 ${FR(1,3)}), 반지름 2, 4, 6 → ${FR(1,3)}(4${PI} + 16${PI} + 36${PI}) = ${FR('56'+PI,3)} cm²` },
 { id:'t7', of:'p7', text:`한 변의 길이가 6 cm인 정삼각형의 각 변을 지름으로 하는 반원을 ⑦과 같이 그렸을 때, 색칠한 부분의 넓이는?`,
   fig:()=>FIG.tri3(6),
   ch:[`${FR('9'+PI,2)} cm²`,`${FR('3'+PI,2)} cm²`,`${FR('27'+PI,2)} cm²`,`9${PI} cm²`], ok:0,
   why:['', '한 조각만 구함', '반원 3개의 넓이를 더함', '중심각을 120°로 착각'],
   exp:`한 조각을 옮기면 반지름 3 cm, 중심각 60°인 부채꼴 → 9${PI} × ${FR(1,6)} × 3 = ${FR('9'+PI,2)} cm²` }
];

/* =========================================================
   기초 연습 (1쪽 왼쪽 기초 유형) — 문제는 매번 무작위로 만들어져요
   각 문제: {text, fig, kind:'mc'|'num', choices, ok, ans, suffix, steps:[{q,kind,choices,ok,ans,suffix}], exp}
   - 'num' 답은 숫자만 입력 (π는 칸 옆에 미리 적혀 있음)
   - 처음에 틀리면 steps(학습지의 풀이 순서)대로 한 칸씩 다시 풀어요
========================================================= */


/* 부채꼴 그림: 반지름 표시, 중심각, 호 길이(선택), 색칠(선택) */
function sectorFig(o){
  const C=[180,155], R=100, th=o.theta, mid=o.mid!=null?o.mid:90, a0=mid-th/2, a1=mid+th/2, big=th>180?1:0;
  const P0=pol(C,R,a0), P1=pol(C,R,a1);
  const path=`M ${pt(C)} L ${pt(P0)} A ${R} ${R} 0 ${big} 0 ${pt(P1)} Z`;
  let s=`<path d="${path}" fill="${o.shade?GRAY:'none'}" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>`+dot(C);
  if(o.rLabel) s+=dimLine(C,P0,o.rLabel,30);
  if(o.angLabel) s+=angMark(C,a0,a1,24,o.angLabel,th<60?52:44,20);
  if(o.arcLabel) s+=arcDim(C,R,a0,a1,14,o.arcLabel,R+34);
  if(o.inLabel){ const q=pol(C,R*0.62,mid); s+=T(q[0],q[1],o.inLabel,{halo:true}); }
  // 부채꼴이 차지하는 영역에 맞춰 잘라서 크게 보이게
  const pts=[C,P0,P1]; for(const ang of [0,90,180,270,360,450]){ const a=ang; if((a>=a0&&a<=a1)||(a-360>=a0&&a-360<=a1)) pts.push(pol(C,R,a)); }
  const mx=48, xs=pts.map(q=>q[0]), ys=pts.map(q=>q[1]);
  const x0=Math.min(...xs)-mx-(o.rLabel?30:0), y0=Math.min(...ys)-mx, x1=Math.max(...xs)+mx+(o.rLabel?30:0), y1=Math.max(...ys)+mx;
  return `<svg class="fig" viewBox="${fx(x0)} ${fx(y0)} ${fx(x1-x0)} ${fx(y1-y0)}" xmlns="http://www.w3.org/2000/svg" style="max-height:300px">${s}</svg>`;
}
/* 원 안의 두 부채꼴 (비례 문제) */
function twoSectorFig(a,b,l1,l2,area){
  const C=[210,160], R=95, gap=30, tot=a+gap+b, s0=90-tot/2+ (Math.random()<.5?0:180);
  const A0=s0, A1=s0+a, B0=A1+gap, B1=B0+b;
  let s=`<circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="none" stroke="#111" stroke-width="2.6"/>`;
  const sec=(x0,x1)=>`<path d="M ${pt(C)} L ${pt(pol(C,R,x0))} A ${R} ${R} 0 ${x1-x0>180?1:0} 0 ${pt(pol(C,R,x1))} Z" fill="${area?GRAY:'none'}" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>`;
  s+=sec(A0,A1)+sec(B0,B1)+dot(C);
  s+=angMark(C,A0,A1,22,`${a}°`,a<30?60:a<45?52:42,18)+angMark(C,B0,B1,22,`${b}°`,b<30?60:b<45?52:42,18);
  if(!area){ s+=arcDim(C,R,A0,A1,12,l1,R+30)+arcDim(C,R,B0,B1,12,l2,R+30); }
  else { for(const [x0,x1,l] of [[A0,A1,l1],[B0,B1,l2]]){ const m=(x0+x1)/2, q=pol(C,R+26,m), cs=Math.cos(m*Math.PI/180); s+=T(q[0],q[1],l,{anchor:cs>0.3?'start':cs<-0.3?'end':'middle'}); } }
  return svg(420,330,s);
}

/* 그림 보고 이름 고르기 (예시·비예시) */
const ID_NAMES=['반지름','지름','현','호','부채꼴','활꼴','중심각','어느 것도 아니에요'];
const ID_EXP={
  '반지름':'원의 중심과 원 위의 한 점을 이은 선분 → <b>반지름</b>',
  '지름':'원의 중심을 지나는 현 → <b>지름</b> (반지름의 2배)',
  '현':'원 위의 두 점을 이은 선분 → <b>현</b> (중심을 지나지 않아도 돼요)',
  '호':'원 위의 두 점 사이의 원의 일부(곡선) → <b>호</b>',
  '부채꼴':'두 반지름과 호로 둘러싸인 도형 → <b>부채꼴</b>',
  '활꼴':'현과 호로 둘러싸인 도형 → <b>활꼴</b>',
  '중심각':'부채꼴에서 두 반지름이 이루는 각 → <b>중심각</b>',
  'none-sector':'부채꼴 모양 같지만 꼭짓점이 원의 <b>중심이 아니에요</b>. 부채꼴은 두 <b>반지름</b>과 호로 둘러싸여야 해요 → <b>어느 것도 아니에요</b>',
  'none-chord':'한 끝이 원 위에 있지 않아요. 현은 <b>양 끝이 모두 원 위</b>에 있어야 해요 → <b>어느 것도 아니에요</b>',
  'none-arc':'곡선이지만 <b>원의 일부가 아니에요</b>(원을 벗어나 있어요) → <b>어느 것도 아니에요</b>'
};
function idFig(kind){
  const C=[150,140], R=100, f=ri(0,359), al=ri(75,130), P=a=>pol(C,R,a);
  const TH='stroke="#111" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"';
  let hi='', away=f+al/2+180;
  const A=P(f), B=P(f+al);
  switch(kind){
    case '반지름': hi=`<line x1="${fx(C[0])}" y1="${fx(C[1])}" x2="${fx(A[0])}" y2="${fx(A[1])}" ${TH}/>`+dot(A,5); away=f+180; break;
    case '지름': { const D=P(f+180); hi=`<line x1="${fx(A[0])}" y1="${fx(A[1])}" x2="${fx(D[0])}" y2="${fx(D[1])}" ${TH}/>`+dot(A,5)+dot(D,5); away=f+90; break; }
    case '현': hi=`<line x1="${fx(A[0])}" y1="${fx(A[1])}" x2="${fx(B[0])}" y2="${fx(B[1])}" ${TH}/>`+dot(A,5)+dot(B,5); break;
    case '호': hi=`<path d="M ${pt(A)} A ${R} ${R} 0 0 0 ${pt(B)}" fill="none" ${TH}/>`+dot(A,5)+dot(B,5); break;
    case '부채꼴': hi=`<path d="M ${pt(C)} L ${pt(A)} A ${R} ${R} 0 0 0 ${pt(B)} Z" fill="${GRAY}" ${TH}/>`; break;
    case '활꼴': hi=`<path d="M ${pt(A)} A ${R} ${R} 0 0 0 ${pt(B)} Z" fill="${GRAY}" ${TH}/>`; break;
    case '중심각': hi=ln(C,A)+ln(C,B)+`<path d="M ${pt(C)} L ${pt(pol(C,30,f))} A 30 30 0 0 0 ${pt(pol(C,30,f+al))} Z" fill="${GRAY}" stroke="none"/><path d="M ${pt(pol(C,30,f))} A 30 30 0 0 0 ${pt(pol(C,30,f+al))}" fill="none" ${TH}/>`; break;
    case 'none-sector': { const Q=pol(C,R*0.45,f+al/2+180); hi=`<path d="M ${pt(Q)} L ${pt(A)} A ${R} ${R} 0 0 0 ${pt(B)} Z" fill="${GRAY}" ${TH}/>`+dot(Q,4); away=f+al/2; break; }
    case 'none-chord': { const Q=pol(C,R*0.5,f+al); hi=`<line x1="${fx(A[0])}" y1="${fx(A[1])}" x2="${fx(Q[0])}" y2="${fx(Q[1])}" ${TH}/>`+dot(A,5)+dot(Q,5); break; }
    case 'none-arc': { const M=pol(C,R*1.28,f+al/2); hi=`<path d="M ${pt(A)} Q ${pt(M)} ${pt(B)}" fill="none" ${TH}/>`+dot(A,5)+dot(B,5); break; }
  }
  const lo=pol(C,20,away);
  return svg(300,280,`<circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="none" stroke="#111" stroke-width="2.2"/>`+hi+dot(C)+T(lo[0],lo[1],'O',{halo:true}));
}

const A1_ITEMS=[
  ['<b>원</b>: 평면 위의 한 점 O에서 □에 있는 모든 점으로 이루어진 도형','일정한 거리',['가장 가까운 거리','같은 방향','한 직선 위']],
  ['<b>반지름</b>: 원의 중심과 □을 이은 선분','원 위의 한 점',['원 안의 한 점','원 밖의 한 점','현의 중점']],
  ['<b>지름</b>: 원 위의 두 점을 이은 선분 중 □을 지나는 것','원의 중심',['원 밖의 한 점','반지름의 중점','호의 중점']],
  ['<b>호</b>: 원 위의 두 점을 □을 따라 이은 곡선','원',['직선','지름','반지름']],
  ['<b>현</b>: 원 위의 두 점을 이은 □','선분',['곡선','호','반직선']],
  ['<b>부채꼴</b>: 원의 두 □과 호로 둘러싸인 도형','반지름',['현','지름','중심각']],
  ['<b>활꼴</b>: 원의 호와 □으로 둘러싸인 도형','현',['반지름 두 개','중심각','원의 중심']],
  ['<b>중심각</b>: 부채꼴에서 두 □이 이루는 각','반지름',['현','호','지름']],
  ['반지름의 길이가 <i class="mv">r</i>인 원의 <b>넓이</b>는 □',`${PI}<i class="mv">r</i>²`,[`2${PI}<i class="mv">r</i>`,`${PI}<i class="mv">r</i>`,`2${PI}<i class="mv">r</i>²`]],
  ['반지름의 길이가 <i class="mv">r</i>인 원의 <b>둘레의 길이</b>는 □',`2${PI}<i class="mv">r</i>`,[`${PI}<i class="mv">r</i>²`,`${PI}<i class="mv">r</i>`,`4${PI}<i class="mv">r</i>`]],
  ['한 원에서 부채꼴의 <b>호의 길이</b>는 중심각의 크기에 □','정비례한다',['반비례한다','관계없이 같다']],
  ['한 원에서 <b>현의 길이</b>는 중심각의 크기에 □','정비례하지 않는다',['정비례한다','반비례한다']]
];
let A1_LAST=-1, A2_LAST='';
const BASIC_GEN={
  A1(){
    let i; do{ i=ri(0,A1_ITEMS.length-1); }while(i===A1_LAST && A1_ITEMS.length>1); A1_LAST=i;
    const [s,ok,w]=A1_ITEMS[i], m=mc(ok,w);
    return {text:`□에 알맞은 것을 고르시오.<div class="sent">${s.replace('□',BOX)}</div>`, fig:null, kind:'mc', choices:m.choices, ok:m.ok, steps:[],
      exp:s.replace('□',`<u><b>${ok}</b></u>`)};
  },
  A2(){
    const pool=['반지름','지름','현','호','부채꼴','활꼴','중심각','반지름','현','호','부채꼴','활꼴','none-sector','none-chord','none-arc'];
    let k; do{ k=rnd(pool); }while(k===A2_LAST); A2_LAST=k;
    const ans=k.startsWith('none')?'어느 것도 아니에요':k;
    /* also: 정답은 아니지만 수학적으로 맞는 답 (지름도 현이에요) → 맞음으로 치고 더 정확한 이름을 알려 줌 */
    const also={};
    if(k==='지름') also[ID_NAMES.indexOf('현')]='맞아요! 지름도 원 위의 두 점을 이은 선분이니까 <b>현</b>이에요. 그중에서 원의 중심을 지나는 현을 특별히 <b>지름</b>이라고 불러요. 더 정확한 이름은 <b>지름</b>!';
    return {text:`원 O에서 <b>굵게 표시한 것</b>의 이름을 고르시오.`, fig:idFig(k), kind:'mc', choices:ID_NAMES.slice(), ok:ID_NAMES.indexOf(ans), also, steps:[], wide:true, exp:ID_EXP[k]};
  },
  B(){
    const area=Math.random()<0.35;
    let a,b,k,L,x,up;
    for(;;){
      a=rnd([20,24,30,36,40,45,60,72,90]); k=rnd([2,3,4]); up=Math.random()<0.6;
      if(up){ b=a*k; if(a+b>300) continue; L=ri(2,9); x=L*k; }
      else { if(a%k) continue; b=a/k; if(b<20||a+b>300) continue; const m=ri(2,7); L=m*k; x=m; }
      break;
    }
    const u=area?'cm²':'cm', what=area?'넓이':'호의 길이';
    const ratioCh=['2배','3배','4배',`${FR(1,2)}배`,`${FR(1,3)}배`,`${FR(1,4)}배`];
    const okR= up? `${k}배` : `${FR(1,k)}배`;
    const r=mc(okR, shuffle(ratioCh.filter(c=>c!==okR)).slice(0,3));
    return {text:`한 원에서 중심각의 크기가 ${a}°인 부채꼴의 ${what}가 ${L} ${u}일 때, 중심각의 크기가 ${b}°인 부채꼴의 ${what}를 구하시오.`,
      fig:twoSectorFig(a,b,`${L} ${u}`,`${XI} ${u}`,area), kind:'num', ans:x, suffix:u,
      steps:[
        {q:`중심각이 ${a}° → ${b}°로 바뀌었어요. 몇 배가 되었나요?`, kind:'mc', choices:r.choices, ok:r.ok},
        {q:`${what}도 중심각과 <b>같은 배</b>가 돼요. ${L} ${u}의 ${okR}는?`, kind:'num', ans:x, suffix:u}
      ],
      exp:`중심각이 ${okR}가 되면 ${what}도 ${okR} → ${L} × ${up?k:FR(1,k)} = <b>${x} ${u}</b><br>(비례식: ${a} : ${b} = ${L} : <i class="mv">x</i>)`};
  },
  C(){
    const area=Math.random()<0.5;
    let r,th,coef;
    for(;;){ r=ri(2,12); th=rnd([30,40,45,60,72,80,90,100,120,135,144,150,160,180,200,210,225,240,270]);
      coef= area? r*r*th/360 : r*th/180; if(Number.isInteger(coef) && coef>0) break; }
    const full= area? r*r : 2*r, u= area?'cm²':'cm', what= area?'넓이':'호의 길이', circ= area?'넓이':'둘레의 길이';
    const fOk=fracH(th,360);
    const cand=[]; if(th<180) cand.push(fracH(th,180)); cand.push(fracH(360-th,360)); if(th<=100) cand.push(fracH(th,100));
    for(const [n,d] of shuffle([[1,2],[1,3],[1,4],[2,3],[3,4],[1,6],[5,6],[3,8],[5,8],[5,12],[1,5],[2,5]])) cand.push(fracH(n,d));
    const fr=mc(fOk,[...new Set(cand)].filter(c=>c!==fOk).slice(0,3));
    return {text:`반지름의 길이가 ${r} cm이고 중심각의 크기가 ${th}°인 부채꼴의 <b>${what}</b>를 구하시오.`,
      fig:sectorFig({theta:th, mid:th>180?270:rnd([90,90,60,120]), rLabel:`${r} cm`, angLabel:`${th}°`, shade:area, arcLabel:area?null:'? cm', inLabel:null}),
      kind:'num', ans:coef, suffix:`${PI} ${u}`,
      steps:[
        {q:`반지름이 ${r} cm인 <b>원</b>의 ${circ}는?`, kind:'num', ans:full, suffix:`${PI} ${u}`},
        {q:`중심각 ${th}°인 부채꼴은 원의 몇 분의 몇 조각인가요? (${th}/360을 약분)`, kind:'mc', choices:fr.choices, ok:fr.ok},
        {q:`${full}${PI} × ${fOk} = ?`, kind:'num', ans:coef, suffix:`${PI} ${u}`}
      ],
      exp:`원의 ${circ} = ${area?`${PI} × ${r}²`:`2${PI} × ${r}`} = ${full}${PI}, 부채꼴은 원의 ${FR(th,360)} = ${fOk}<br>→ ${full}${PI} × ${fOk} = <b>${coef}${PI} ${u}</b>`};
  },
  D(){
    let r,k,th;
    for(;;){ r=ri(3,12); k=ri(2,12); th=180*k/r; if((k*r)%2===0 && th>=30 && th<=300) break; }
    const S=k*r/2;
    const f=mc('½ × (호의 길이) × (반지름)',['(호의 길이) × (반지름)','½ × (반지름) × (반지름)','2 × (호의 길이) × (반지름)']);
    return {text:`반지름의 길이가 ${r} cm이고 호의 길이가 ${k}${PI} cm인 부채꼴의 <b>넓이</b>를 구하시오.`,
      fig:sectorFig({theta:th, mid:th>180?270:90, rLabel:`${r} cm`, shade:true, arcLabel:`${k}${PI} cm`}),
      kind:'num', ans:S, suffix:`${PI} cm²`,
      steps:[
        {q:'중심각을 모를 때 부채꼴의 넓이를 구하는 공식은? (삼각형 넓이 공식과 닮았어요)', kind:'mc', choices:f.choices.map(c=>c.replace('½',FR(1,2))), ok:f.ok},
        {q:`${FR(1,2)} × ${k}${PI} × ${r} = ?`, kind:'num', ans:S, suffix:`${PI} cm²`}
      ],
      exp:`(넓이) = ${FR(1,2)} × (호의 길이) × (반지름) = ${FR(1,2)} × ${k}${PI} × ${r} = <b>${S}${PI} cm²</b>`};
  }
};
const BASIC_TYPES=[
  {k:'A1', name:'개념 빈칸', desc:'원·호·현·부채꼴·활꼴의 뜻', steps:[]},
  {k:'A2', name:'그림 보고 이름 고르기', desc:'이건 호일까 현일까? 부채꼴일까 아닐까?', steps:[]},
  {k:'B',  name:'중심각과 호의 길이', desc:'중심각이 2배면 호의 길이도 2배', steps:['몇 배인지','답']},
  {k:'C',  name:'[반지름, 중심각] → 호의 길이·넓이', desc:'원의 몇 분의 몇 조각인지 구하기', steps:['원의 둘레·넓이','몇 분의 몇','답']},
  {k:'D',  name:'[반지름, 호의 길이] → 넓이', desc:'½ × 호의 길이 × 반지름', steps:['공식','답']}
];
/* 각 문제에서 막혔을 때 권할 기초 유형 */
const BASIC_FOR={p1:['B','C'], p2:['C','A1'], p3:['A2','B'], p4:['C','D'], p5:['A2','B'], p6:['C','A2'], p7:['C','D']};

const CAUSES = [
  {k:'concept', label:'개념을 몰랐어요', short:'개념'},
  {k:'idea',    label:'아이디어가 안 떠올랐어요', short:'아이디어'},
  {k:'calc',    label:'계산을 실수했어요', short:'계산'},
  {k:'unsure',  label:'잘 모르겠어요', short:'모름'}
];

window.UNIT = {
  id:'circle-sector-review',                 // 저장 이름 (단원이 바뀌면 바꾸세요)
  title:'원과 부채꼴 단원 마무리',
  sub:'Ⅵ. 대단원 마무리',
  groups:GROUPS, problems:PROBLEMS, twins:TWINS, causes:CAUSES,
  basicTypes:BASIC_TYPES, basicGen:BASIC_GEN, basicFor:BASIC_FOR
};
})();
