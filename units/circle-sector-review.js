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
   causes: 이 문제에서 '왜 막혔나요? / 어디서 달라졌나요?'에 보일 이유. h: 이 이유를 고르면 앞의 힌트 h개는 이미 아는 것으로 열어 줌 (cat: concept·idea·calc 중 무엇에 가까운지, 돌아보기에 씀)
           '잘 모르겠어요'는 자동으로 붙음. 없으면 아래 CAUSES를 씀
   checks: 힌트마다 학생이 적을 답. 맞히거나 두 번 틀려야(정답을 보여 줌) 다음 힌트가 열림 (null이면 답 칸 없이 바로 열림)
           {l:'칸 이름', a:정답 숫자, u:'단위'} — u에 π가 있으면 π 앞의 수만 적으면 됨
           {l:'칸 이름', ch:['보기1','보기2',...], a:정답 번호(0부터), u:''} — 숫자 대신 보기에서 고르는 질문
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
   checks:[ [{l:'중심각의 합',a:360,u:'°'}], [{l:'셋째가 받는 사탕',a:8,u:'개'}], [{l:'셋째 몫',a:160,u:'°'}] ],
   sol:`세 호의 중심각을 모두 더하면 360°예요. 호의 길이는 중심각의 크기에 정비례하므로 중심각의 비도 2 : 3 : 4입니다.<br>${A('CA')}의 중심각 = 360° × ${FR(4,9)} = <b>160°</b>`,
   rule:`호의 길이의 비 = 중심각의 크기의 비`,
   causes:[{k:'p1-360', label:'중심각을 모두 더하면 360°인 걸 몰랐어요', short:'합 360°', cat:'concept', h:0}, {k:'p1-prop', label:'호의 길이의 비와 중심각의 비가 같다는 걸 몰랐어요', short:'호의 비=각의 비', cat:'concept', h:1}, {k:'p1-split', label:'360°를 2 : 3 : 4로 나누는 방법을 몰랐어요', short:'비례배분', cat:'idea', h:2}, {k:'p1-calc', label:'나누거나 곱하다가 계산을 실수했어요', short:'계산', cat:'calc', h:2}]
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
   checks:[ null, [{l:'원의 넓이',a:64,u:'π cm²'}], [{l:'135°는 360°의',a:3/8,u:'',ph:'예: 1/2'}] ],
   sol:`원의 둘레 = 2${PI} × 8 = 16${PI} (cm), 원의 넓이 = ${PI} × 8² = 64${PI} (cm²)<br>${FR('135','360')} = ${FR(3,8)} 이므로 부채꼴은 원의 ${FR(3,8)} 조각이에요.<br>호의 길이 = 16${PI} × ${FR(3,8)} = <b>6${PI} cm</b>, 넓이 = 64${PI} × ${FR(3,8)} = <b>24${PI} cm²</b>`,
   rule:`부채꼴 = 원의 ${FR('(중심각)','360')} 조각`,
   causes:[{k:'p2-formula', label:'원의 둘레·넓이 공식이 헷갈렸어요', short:'원 공식', cat:'concept', h:1}, {k:'p2-part', label:'부채꼴이 원의 (중심각/360) 조각인 걸 몰랐어요', short:'몇 분의 몇 조각', cat:'concept', h:2}, {k:'p2-reduce', label:'135/360을 약분하거나 곱하다가 실수했어요', short:'약분·계산', cat:'calc', h:2}, {k:'p2-pi', label:'π나 단위(cm, cm²)를 빼먹었어요', short:'π·단위', cat:'calc', h:2}]
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
   checks:[ [{l:'그어야 할 선분',ch:['선분 OC','선분 BC','선분 AB를 늘이기'],a:0,u:''}], [{l:'∠OCA',a:40,u:'°'}], [{l:'∠AOC',a:100,u:'°'}], [{l:'∠BOC',a:80,u:'°'}] ],
   sol:`${OV('OC')}를 그으면 ${OV('OA')} = ${OV('OC')} (반지름)이므로 삼각형 OAC는 이등변삼각형 → ∠OCA = ∠OAC = 40°<br>∠AOC = 180° − 40° − 40° = 100°, ∠BOC = 180° − 100° = 80°<br>${A('AC')} : ${A('CB')} = 100 : 80 = <b>5 : 4</b>`,
   rule:`중심 O와 원 위의 점이 보이면 반지름부터 긋는다 → 이등변삼각형`,
   causes:[{k:'p3-aux', label:'반지름 OC를 그을 생각을 못 했어요', short:'보조선 OC', cat:'idea', h:0}, {k:'p3-iso', label:'삼각형 OAC가 이등변삼각형인 걸 몰랐어요', short:'이등변삼각형', cat:'concept', h:1}, {k:'p3-line', label:'∠BOC = 180° − ∠AOC를 못 떠올렸어요', short:'평각 180°', cat:'idea', h:3}, {k:'p3-order', label:'비를 쓸 때 순서를 바꿔 썼어요', short:'비의 순서', cat:'calc', h:3}]
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
   checks:[ [{l:'호를 따라가는 횟수',a:2,u:'번'}], [{l:'원이 되려면 호',a:4,u:'개'}], [{l:'정사각형에서 뺄 도형',ch:['사분원','반원','원'],a:0,u:''}] ],
   sol:`<b>둘레</b>: 선분 4개 → 6 × 4 = 24 (cm), 호 2개 → 각각 반지름 6 cm인 원의 ${FR(1,4)} → 2 × (12${PI} × ${FR(1,4)}) = 6${PI} (cm)<br>→ <b>(24 + 6${PI}) cm</b><br><b>넓이</b>: 한 조각 = (정사각형) − (사분원) = 36 − 9${PI}, 두 조각 → <b>(72 − 18${PI}) cm²</b>`,
   rule:`색칠한 부분 = (큰 도형) − (색칠하지 않은 부분)`,
   causes:[{k:'p4-edge', label:'둘레에 들어가는 선분이나 호를 빠뜨렸어요', short:'둘레 빠뜨림', cat:'idea', h:0}, {k:'p4-arc', label:'사분원의 호의 길이를 구하지 못했어요', short:'사분원 호', cat:'concept', h:1}, {k:'p4-sub', label:'(정사각형) − (사분원)을 떠올리지 못했어요', short:'빼서 구하기', cat:'idea', h:2}, {k:'p4-calc', label:'넓이를 계산하다가 실수했어요', short:'계산', cat:'calc', h:2}]
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
   checks:[ [{l:'호 AC의 중심각',ch:['∠AOC','∠OAC','∠ABC'],a:0,u:''}], [{l:'∠OAC',a:30,u:'°'}], [{l:'∠AOC',a:120,u:'°'}], [{l:'호 AC',a:24,u:'cm'}] ],
   sol:`${OV('OC')}를 긋습니다. ${OV('AC')} ∥ ${OV('OD')}이므로 ∠OAC = ∠BOD = 30° (동위각)<br>${OV('OA')} = ${OV('OC')}이므로 ∠OCA = 30° → ∠AOC = 180° − 60° = 120°<br>30 : 120 = 6 : ${A('AC')} → ${A('AC')} = <b>24 cm</b>`,
   rule:`③과 같은 생각: 반지름 긋기(이등변삼각형) + 평행선의 동위각`,
   causes:[{k:'p5-aux', label:'반지름 OC를 그을 생각을 못 했어요', short:'보조선 OC', cat:'idea', h:0}, {k:'p5-para', label:'평행선에서 동위각·엇각을 찾지 못했어요', short:'동위각·엇각', cat:'concept', h:1}, {k:'p5-iso', label:'이등변삼각형으로 ∠AOC를 구하지 못했어요', short:'이등변삼각형', cat:'idea', h:2}, {k:'p5-prop', label:'중심각과 호의 길이로 비례식을 잘못 세웠어요', short:'비례식', cat:'calc', h:3}]
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
   checks:[ [{l:'∠DAC',a:120,u:'°'}], [{l:'부채꼴 DAC의 넓이',a:3,u:'π cm²'}], [{l:'부채꼴 BDE의 반지름',a:6,u:'cm'}], [{l:'세 넓이의 합',a:42,u:'π cm²'}] ],
   sol:`세 부채꼴의 중심각은 모두 180° − 60° = 120° → 원의 ${FR(1,3)}<br>반지름: ${OV('AC')} = 3, ${OV('BD')} = 3 + 3 = 6, ${OV('CE')} = 3 + 6 = 9 (cm)<br>넓이 = ${FR(1,3)}(9${PI} + 36${PI} + 81${PI}) = 3${PI} + 12${PI} + 27${PI} = <b>42${PI} cm²</b>`,
   rule:`부채꼴마다 [반지름, 중심각]을 표로 정리하고 더한다`,
   causes:[{k:'p6-angle', label:'세 부채꼴의 중심각이 120°인 걸 못 찾았어요', short:'중심각 120°', cat:'idea', h:0}, {k:'p6-radius', label:'반지름이 3, 6, 9 cm로 커지는 걸 몰랐어요', short:'반지름 3·6·9', cat:'idea', h:2}, {k:'p6-formula', label:'부채꼴의 넓이 공식이 헷갈렸어요', short:'넓이 공식', cat:'concept', h:1}, {k:'p6-calc', label:'세 넓이를 더하다가 계산을 실수했어요', short:'계산', cat:'calc', h:3}]
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
   checks:[ [{l:'반지름',a:4,u:'cm'}], [{l:'옮겨 붙이면 생기는 도형',ch:['부채꼴','정삼각형','반원'],a:0,u:''}], [{l:'부채꼴의 중심각',a:60,u:'°'}] ],
   sol:`반원의 반지름은 4 cm. 한 조각에서 튀어나온 활꼴 하나를 파인 자리로 옮기면, 반지름 4 cm, 중심각 60°인 부채꼴이 돼요.<br>한 조각 = 16${PI} × ${FR(1,6)} = ${FR('8'+PI,3)} (cm²), 세 조각 → <b>8${PI} cm²</b>`,
   rule:`모양이 복잡하면 잘라서 옮겨 구하기 쉬운 모양(부채꼴)으로 만든다`,
   causes:[{k:'p7-radius', label:'반원의 반지름을 잘못 구했어요', short:'반지름', cat:'calc', h:0}, {k:'p7-move', label:'잘라서 옮길 생각을 못 했어요', short:'잘라 옮기기', cat:'idea', h:1}, {k:'p7-sector', label:'옮긴 모양이 중심각 60°인 부채꼴인 걸 몰랐어요', short:'60° 부채꼴', cat:'concept', h:2}, {k:'p7-calc', label:'한 조각을 3배 하거나 계산하다가 실수했어요', short:'계산', cat:'calc', h:2}],
 }
];

/* ---------------- 확인 문제 (쌍둥이 문제, 책 덮고) ----------------
   ok: 정답 번호(0부터), why: 오답을 고른 학생이 무엇을 놓쳤는지 교사 참고용
   inp·vals(있으면): 보기 대신 답을 직접 입력. vals[i] = 보기 i의 값(칸마다, π는 'π'로). 적은 답이 어느 보기와 같은지로 실수를 알아냄
------------------------------------------------------- */
const TWINS = [
 { id:'t1', of:'p1', text:`원 O에서 ${A('AB')} : ${A('BC')} : ${A('CA')} = 3 : 4 : 5일 때, ${A('CA')}에 대한 중심각의 크기는?`,
   fig:()=>FIG.circle3(3,4,5),
   ch:['150°','75°','120°','100°'], ok:0,
   inp:[{l:'중심각',u:'°'}], vals:[['150'],['75'],['120'],['100']],
   why:['', '360° 대신 180°를 나눔', '다른 호(BC)의 중심각', '비를 잘못 계산'],
   exp:`세 중심각의 합 360°를 3 : 4 : 5로 나누면 ${A('CA')}의 중심각 = 360° × ${FR(5,12)} = 150°` },
 { id:'t2', of:'p2', text:`반지름의 길이가 6 cm이고 중심각의 크기가 120°인 부채꼴의 호의 길이와 넓이는?`,
   fig:null,
   ch:[`호 4${PI} cm, 넓이 12${PI} cm²`,`호 12${PI} cm, 넓이 4${PI} cm²`,`호 2${PI} cm, 넓이 6${PI} cm²`,`호 4${PI} cm, 넓이 36${PI} cm²`], ok:0,
   inp:[{l:'호의 길이',u:'cm'},{l:'넓이',u:'cm²'}], vals:[['4π','12π'],['12π','4π'],['2π','6π'],['4π','36π']],
   why:['', '원의 둘레와 넓이를 바꿔 씀', '둘레를 πr로 착각', '넓이에 1/3을 곱하지 않음'],
   exp:`120°는 360°의 ${FR(1,3)} → 호 = 12${PI} × ${FR(1,3)} = 4${PI} cm, 넓이 = 36${PI} × ${FR(1,3)} = 12${PI} cm²` },
 { id:'t3', of:'p3', text:`원 O에서 현 AC와 지름 AB가 이루는 각의 크기가 20°일 때, ${A('AC')} : ${A('CB')}는?`,
   fig:()=>FIG.diam(20),
   ch:['7 : 2','2 : 7','8 : 1','5 : 4'], ok:0,
   inp:[{l:'',u:''},{l:':',u:''}], ratio:true, vals:[['7','2'],['2','7'],['8','1'],['5','4']],
   why:['', '비의 순서를 바꿈', '∠BOC를 20°로 착각 (보조선 없이)', '앞 문제의 답을 그대로 씀'],
   exp:`${OV('OC')}를 그으면 ∠OCA = 20° → ∠AOC = 140°, ∠BOC = 40° → 140 : 40 = 7 : 2` },
 { id:'t4', of:'p4', text:`한 변의 길이가 4 cm인 정사각형에 그림과 같이 두 사분원을 그렸다. 색칠한 부분의 넓이는? (이번엔 가운데가 색칠되어 있어요!)`,
   fig:()=>FIG.lens(4,true),
   ch:[`(8${PI} − 16) cm²`,`(32 − 8${PI}) cm²`,`(16 − 4${PI}) cm²`,`4${PI} cm²`], ok:0,
   inp:[{l:'넓이',u:'cm²'}], vals:[['8π-16'],['32-8π'],['16-4π'],['4π']],
   why:['', '색칠하지 않은 바깥 부분을 구함', '바깥 한 조각만 구함', '사분원 하나의 넓이'],
   exp:`(가운데) = (사분원 2개) − (정사각형) = 2 × 4${PI} − 16 = (8${PI} − 16) cm²` },
 { id:'t5', of:'p5', text:`반원 O에서 ${OV('AC')} ∥ ${OV('OD')}, ∠BOD = 40°, ${A('BD')} = 4 cm일 때, ${A('AC')}의 길이는?`,
   fig:()=>FIG.semi(40,4),
   ch:['10 cm','14 cm','8 cm','16 cm'], ok:0,
   inp:[{l:'호 AC',u:'cm'}], vals:[['10'],['14'],['8'],['16']],
   why:['', '∠AOC를 180° − 40° = 140°로 착각', '∠AOC를 80°로 착각', '앞 문제처럼 4배라고 생각'],
   exp:`∠OAC = 40° (동위각), ∠OCA = 40° (이등변삼각형) → ∠AOC = 100°. 40 : 100 = 4 : ${A('AC')} → 10 cm` },
 { id:'t6', of:'p6', text:`한 변의 길이가 2 cm인 정삼각형 ABC로 ⑥과 같이 부채꼴 세 개를 그렸을 때, 색칠한 부분의 넓이는?`,
   fig:()=>FIG.spiral(2),
   ch:[`${FR('56'+PI,3)} cm²`,`${FR('28'+PI,3)} cm²`,`56${PI} cm²`,`4${PI} cm²`], ok:0,
   inp:[{l:'넓이',u:'cm²'}], vals:[['56π/3'],['28π/3'],['56π'],['4π']],
   why:['', '중심각을 60°로 착각', '원의 1/3을 곱하지 않음', '반지름을 모두 2 cm로 착각'],
   exp:`중심각 120°(원의 ${FR(1,3)}), 반지름 2, 4, 6 → ${FR(1,3)}(4${PI} + 16${PI} + 36${PI}) = ${FR('56'+PI,3)} cm²` },
 { id:'t7', of:'p7', text:`한 변의 길이가 6 cm인 정삼각형의 각 변을 지름으로 하는 반원을 ⑦과 같이 그렸을 때, 색칠한 부분의 넓이는?`,
   fig:()=>FIG.tri3(6),
   ch:[`${FR('9'+PI,2)} cm²`,`${FR('3'+PI,2)} cm²`,`${FR('27'+PI,2)} cm²`,`9${PI} cm²`], ok:0,
   inp:[{l:'넓이',u:'cm²'}], vals:[['9π/2'],['3π/2'],['27π/2'],['9π']],
   why:['', '한 조각만 구함', '반원 3개의 넓이를 더함', '중심각을 120°로 착각'],
   exp:`한 조각을 옮기면 반지름 3 cm, 중심각 60°인 부채꼴 → 9${PI} × ${FR(1,6)} × 3 = ${FR('9'+PI,2)} cm²` }
];

/* ---------------- 재확인 문제 (확인 문제를 틀린 학생만) ----------------
   확인 문제를 틀리고 놓친 것을 고른 뒤, 원래 문제를 다시 보고 한 번 더 풀어요.
   맞히면 이 문제도 완성! 틀리면 교사 화면에 '도움 필요'로 크게 떠요.
------------------------------------------------------- */
const TWINS2 = [
 { id:'t1b', of:'p1', text:`원 O에서 ${A('AB')} : ${A('BC')} : ${A('CA')} = 4 : 5 : 6일 때, ${A('CA')}에 대한 중심각의 크기는?`,
   fig:()=>FIG.circle3(4,5,6),
   ch:['144°','72°','120°','24°'], ok:0,
   inp:[{l:'중심각',u:'°'}], vals:[['144'],['72'],['120'],['24']],
   why:['', '360° 대신 180°를 나눔', '다른 호(BC)의 중심각', '비 한 칸만 구함'],
   exp:`세 중심각의 합 360°를 4 : 5 : 6으로 나누면 한 칸은 360° ÷ 15 = 24° → ${A('CA')}의 중심각 = 24° × 6 = 144°` },
 { id:'t2b', of:'p2', text:`반지름의 길이가 9 cm이고 중심각의 크기가 80°인 부채꼴의 호의 길이와 넓이는?`,
   fig:null,
   ch:[`호 4${PI} cm, 넓이 18${PI} cm²`,`호 18${PI} cm, 넓이 4${PI} cm²`,`호 2${PI} cm, 넓이 9${PI} cm²`,`호 4${PI} cm, 넓이 81${PI} cm²`], ok:0,
   inp:[{l:'호의 길이',u:'cm'},{l:'넓이',u:'cm²'}], vals:[['4π','18π'],['18π','4π'],['2π','9π'],['4π','81π']],
   why:['', '호와 넓이를 바꿔 씀', '둘레를 πr로 착각', '넓이에 2/9를 곱하지 않음'],
   exp:`80°는 360°의 ${FR(2,9)} → 호 = 18${PI} × ${FR(2,9)} = 4${PI} cm, 넓이 = 81${PI} × ${FR(2,9)} = 18${PI} cm²` },
 { id:'t3b', of:'p3', text:`원 O에서 현 AC와 지름 AB가 이루는 각의 크기가 30°일 때, ${A('AC')} : ${A('CB')}는?`,
   fig:()=>FIG.diam(30),
   ch:['2 : 1','1 : 2','5 : 1','7 : 2'], ok:0,
   inp:[{l:'',u:''},{l:':',u:''}], ratio:true, vals:[['2','1'],['1','2'],['5','1'],['7','2']],
   why:['', '비의 순서를 바꿈', '∠BOC를 30°로 착각 (보조선 없이)', '앞 문제의 답을 그대로 씀'],
   exp:`${OV('OC')}를 그으면 ∠OCA = 30° → ∠AOC = 120°, ∠BOC = 60° → 120 : 60 = 2 : 1` },
 { id:'t4b', of:'p4', text:`한 변의 길이가 8 cm인 정사각형에 그림과 같이 두 사분원을 그렸다. 색칠한 부분의 넓이는?`,
   fig:()=>FIG.lens(8,true),
   ch:[`(32${PI} − 64) cm²`,`(128 − 32${PI}) cm²`,`(64 − 16${PI}) cm²`,`16${PI} cm²`], ok:0,
   inp:[{l:'넓이',u:'cm²'}], vals:[['32π-64'],['128-32π'],['64-16π'],['16π']],
   why:['', '색칠하지 않은 바깥 부분을 구함', '바깥 한 조각만 구함', '사분원 하나의 넓이'],
   exp:`(가운데) = (사분원 2개) − (정사각형) = 2 × 16${PI} − 64 = (32${PI} − 64) cm²` },
 { id:'t5b', of:'p5', text:`반원 O에서 ${OV('AC')} ∥ ${OV('OD')}, ∠BOD = 35°, ${A('BD')} = 7 cm일 때, ${A('AC')}의 길이는?`,
   fig:()=>FIG.semi(35,7),
   ch:['22 cm','29 cm','14 cm','7 cm'], ok:0,
   inp:[{l:'호 AC',u:'cm'}], vals:[['22'],['29'],['14'],['7']],
   why:['', '∠AOC를 180° − 35° = 145°로 착각', '∠AOC를 70°로 착각', '호 BD와 같다고 생각'],
   exp:`∠OAC = 35° (동위각), ∠OCA = 35° (이등변삼각형) → ∠AOC = 110°. 35 : 110 = 7 : ${A('AC')} → 22 cm` },
 { id:'t6b', of:'p6', text:`한 변의 길이가 6 cm인 정삼각형 ABC로 ⑥과 같이 부채꼴 세 개를 그렸을 때, 색칠한 부분의 넓이는?`,
   fig:()=>FIG.spiral(6),
   ch:[`168${PI} cm²`,`84${PI} cm²`,`504${PI} cm²`,`36${PI} cm²`], ok:0,
   inp:[{l:'넓이',u:'cm²'}], vals:[['168π'],['84π'],['504π'],['36π']],
   why:['', '중심각을 60°로 착각', '원의 1/3을 곱하지 않음', '반지름을 모두 6 cm로 착각'],
   exp:`중심각 120°(원의 ${FR(1,3)}), 반지름 6, 12, 18 → ${FR(1,3)}(36${PI} + 144${PI} + 324${PI}) = 168${PI} cm²` },
 { id:'t7b', of:'p7', text:`한 변의 길이가 4 cm인 정삼각형의 각 변을 지름으로 하는 반원을 ⑦과 같이 그렸을 때, 색칠한 부분의 넓이는?`,
   fig:()=>FIG.tri3(4),
   ch:[`2${PI} cm²`,`${FR('2'+PI,3)} cm²`,`6${PI} cm²`,`4${PI} cm²`], ok:0,
   inp:[{l:'넓이',u:'cm²'}], vals:[['2π'],['2π/3'],['6π'],['4π']],
   why:['', '한 조각만 구함', '반원 3개의 넓이를 더함', '중심각을 120°로 착각'],
   exp:`한 조각을 옮기면 반지름 2 cm, 중심각 60°인 부채꼴 → 4${PI} × ${FR(1,6)} × 3 = 2${PI} cm²` }
];

/* =========================================================
   기초 연습 (1쪽 왼쪽 기초 유형) — 문제는 매번 무작위로 만들어져요
   각 문제: {text, fig, kind:'mc'|'num', choices, ok, ans, suffix, steps:[{tag,q,kind,choices,ok,ans,suffix}], exp}
   - 단계 kind: 'mark'(0단계 형광펜) · 'mc'(고르기) · 'num'(수 하나) · 'nums'(비처럼 수 여러 개: ans:[5,7], sep:':', pre:'50 : 70 =')
   - 'num' 답은 숫자만 입력 (π는 칸 옆에 미리 적혀 있음)
   - steps(0단계 구할 것·아는 것 → 1단계 → 2단계…)를 매번 한 칸씩 풀어요
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
/* [0단계] 구해야 하는 것과 아는 것 — 문제 문장에 형광펜(구할 것 빨강, 아는 것 파랑)을 칠하고 개념 이름표를 붙여요
   KN(개념, 값, 구절): 아는 것 · WN(개념, 구절): 구할 것. 구절 전체가 한 덩어리로 칠해져요(숫자만 칠할 수 없음) */
const CONCEPTS=['중심각','호의 길이','반지름','넓이'];
const KN=(c,v,t)=>`<span data-r="know" data-c="${c}" data-v="${v}">${t}</span>`;
const WN=(c,t)=>`<span data-r="want" data-c="${c}">${t}</span>`;
/* 그림에만 수가 있는 문제: 문장에 개념 이름이 없으니, 그림 속 수마다 이름표를 붙여요 */
const LABEL0=items=>({tag:'0단계', kind:'label', concepts:CONCEPTS, items, q:'그림 속 수마다 무엇인지 이름표를 붙여요. 🎯는 구할 것, 📌는 아는 것이에요.'});
const XT=`<i class="mv">x</i>`;
const STEP0={tag:'0단계', kind:'mark', concepts:CONCEPTS, q:'문제에서 <b style="color:#c0392b">구할 것</b>은 🎯빨강, <b style="color:#1f5fbf">아는 것</b>은 📌파랑으로 칠하고, 칠한 곳마다 무엇인지 이름표를 붙여요.'};
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
  B1(){ return genB(false); },   // 몇 배: 100 = 50 × 2
  B2(){ return genB(true); },    // 비: 50 : 70 = 5 : 7
  C(){ return genC(); },
  D(){ return genD(); }
};
/* 중심각끼리 비교 → 호의 길이·넓이 (hard=false: 몇 배, hard=true: 비) */
function genB(hard){
  {
    const area=Math.random()<0.35;
    const gcd=(x,y)=>y?gcd(y,x%y):x;
    let a,b,L,x,p,q,k,up;
    for(;;){
      if(hard){ p=ri(2,9); q=ri(2,9); if(p===q||gcd(p,q)!==1||p%q===0||q%p===0) continue; const g=rnd([5,10,15,20]); a=p*g; b=q*g; if(a+b>300||a<20||b<20) continue; const m=ri(1,4); L=p*m; x=q*m; break; }
      a=rnd([20,24,30,36,40,45,60,72,90]); k=rnd([2,3,4]); up=Math.random()<0.6;
      if(up){ b=a*k; if(a+b>300) continue; L=ri(2,9); x=L*k; }
      else { if(a%k) continue; b=a/k; if(b<20||a+b>300) continue; const m=ri(2,7); L=m*k; x=m; }
      break;
    }
    const u=area?'cm²':'cm', what=area?'넓이':'호의 길이';
    let s1,s2,exp;
    if(hard){
      s1={tag:'1단계', q:`중심각끼리 비교해요. 비로 나타내면? (가장 간단한 자연수의 비)`, kind:'nums', pre:`${a} : ${b} =`, ans:[p,q], sep:':'};
      s2={tag:'2단계', q:`${what}끼리 비교해요. ${what}의 비도 ${p} : ${q}예요. ${p} : ${q} = ${L} : <i class="mv">x</i> 이면 <i class="mv">x</i>는?`, kind:'num', ans:x, suffix:u};
      exp=`[0단계] 🎯 구할 것: ${what} · 📌 아는 것: 중심각 ${a}°, ${what} ${L} ${u}, 중심각 ${b}°<br>[1단계] 중심각의 비 ${a} : ${b} = ${p} : ${q}<br>[2단계] ${what}의 비도 ${p} : ${q} → ${p} : ${q} = ${L} : <i class="mv">x</i>, <i class="mv">x</i> = <b>${x} ${u}</b>`;
    } else {
      /* 기초: 분수 배는 묻지 않음. 작아지는 경우는 '큰 쪽이 작은 쪽의 몇 배'를 묻고 나누기로 */
      if(up){
        s1={tag:'1단계', q:`중심각끼리 비교해요. ${b}°는 ${a}°의 몇 배인가요? (${b} = ${a} × □)`, kind:'num', ans:k, suffix:'배'};
        s2={tag:'2단계', q:`${what}끼리 비교해요. 중심각이 ${k}배 커졌으니 ${what}도 <b>${k}배</b>가 돼요. ${L} × ${k} = ?`, kind:'num', ans:x, suffix:u};
        exp=`[0단계] 🎯 구할 것: ${what} · 📌 아는 것: 중심각 ${a}°, ${what} ${L} ${u}, 중심각 ${b}°<br>[1단계] ${b} = ${a} × ${k}<br>[2단계] ${what}도 ${k}배 → ${L} × ${k} = <b>${x} ${u}</b>`;
      } else {
        s1={tag:'1단계', q:`중심각끼리 비교해요. 큰 쪽 ${a}°는 작은 쪽 ${b}°의 몇 배인가요? (${a} = ${b} × □)`, kind:'num', ans:k, suffix:'배'};
        s2={tag:'2단계', q:`${what}끼리 비교해요. 구하는 부채꼴의 중심각 ${b}°는 ${a}°를 <b>${k}로 나눈</b> 크기예요. 그러니 ${what}도 ${k}로 나눠요. ${L} ÷ ${k} = ?`, kind:'num', ans:x, suffix:u};
        exp=`[0단계] 🎯 구할 것: ${what} · 📌 아는 것: 중심각 ${a}°, ${what} ${L} ${u}, 중심각 ${b}°<br>[1단계] ${a} = ${b} × ${k}, 즉 ${b} = ${a} ÷ ${k}<br>[2단계] ${what}도 ${k}로 나눠요 → ${L} ÷ ${k} = <b>${x} ${u}</b>`;
      }
    }
    const figOnly=Math.random()<0.4;
    const s0= figOnly? LABEL0([{v:a+'°',c:'중심각',r:'know'},{v:`${L} ${u}`,c:what,r:'know'},{v:b+'°',c:'중심각',r:'know'},{v:`x ${u}`,c:what,r:'want'}]) : STEP0;
    return {text: figOnly? `그림과 같이 한 원에서 두 부채꼴을 그렸을 때, ${XT}의 값을 구하시오.` : `한 원에서 ${KN('중심각',a+'°',`중심각의 크기가 ${a}°`)}인 부채꼴의 ${KN(what,L+' '+u,`${what}가 ${L} ${u}`)}일 때, ${KN('중심각',b+'°',`중심각의 크기가 ${b}°`)}인 부채꼴의 ${WN(what,`${what}를 구하시오`)}.`,
      fig:twoSectorFig(a,b,`${L} ${u}`,`${XI} ${u}`,area), kind:'num', ans:x, suffix:u,
      steps:[s0, s1, s2], exp};
  }
}
function genC(){
  {
    const area=Math.random()<0.5;
    let r,th,coef;
    for(;;){ r=ri(2,12); th=rnd([30,40,45,60,72,80,90,100,120,135,144,150,160,180,200,210,225,240,270]);
      coef= area? r*r*th/360 : r*th/180; if(Number.isInteger(coef) && coef>0) break; }
    const full= area? r*r : 2*r, u= area?'cm²':'cm', what= area?'넓이':'호의 길이', circ= area?'넓이':'둘레의 길이';
    const fOk=fracH(th,360);
    const cand=[]; if(th<180) cand.push(fracH(th,180)); cand.push(fracH(360-th,360)); if(th<=100) cand.push(fracH(th,100));
    for(const [n,d] of shuffle([[1,2],[1,3],[1,4],[2,3],[3,4],[1,6],[5,6],[3,8],[5,8],[5,12],[1,5],[2,5]])) cand.push(fracH(n,d));
    const fr=mc(fOk,[...new Set(cand)].filter(c=>c!==fOk).slice(0,3));
    const figOnly=Math.random()<0.4, wc=area?'넓이':'호의 길이';
    return {text: figOnly? `그림의 부채꼴에서 ${XT}의 값을 구하시오.` : `${KN('반지름',r+' cm',`반지름의 길이가 ${r} cm`)}이고 ${KN('중심각',th+'°',`중심각의 크기가 ${th}°`)}인 부채꼴의 ${WN(wc,`${what}를 구하시오`)}.`,
      fig:sectorFig({theta:th, mid:th>180?270:rnd([90,90,60,120]), rLabel:`${r} cm`, angLabel:`${th}°`, shade:area, arcLabel:area?null:(figOnly?`${XI} cm`:'? cm'), inLabel:area&&figOnly?`${XI} cm²`:null}),
      s0:figOnly? LABEL0([{v:r+' cm',c:'반지름',r:'know'},{v:th+'°',c:'중심각',r:'know'},{v:`x ${u}`,c:wc,r:'want'}]) : null,
      kind:'num', ans:coef, suffix:`${PI} ${u}`,
      steps:[
        STEP0,
        {tag:'1단계', q:`반지름이 ${r} cm인 <b>원</b>의 ${circ}는?`, kind:'num', ans:full, suffix:`${PI} ${u}`},
        {tag:'2단계', q:`중심각 ${th}°인 부채꼴은 원의 몇 분의 몇 조각인가요? (${th}/360을 약분)`, kind:'mc', choices:fr.choices, ok:fr.ok},
        {tag:'3단계', q:`${full}${PI} × ${fOk} = ?`, kind:'num', ans:coef, suffix:`${PI} ${u}`}
      ],
      exp:`원의 ${circ} = ${area?`${PI} × ${r}²`:`2${PI} × ${r}`} = ${full}${PI}, 부채꼴은 원의 ${FR(th,360)} = ${fOk}<br>→ ${full}${PI} × ${fOk} = <b>${coef}${PI} ${u}</b>`};
  }
}
function genD(){
  {
    let r,k,th;
    for(;;){ r=ri(3,12); k=ri(2,12); th=180*k/r; if((k*r)%2===0 && th>=30 && th<=300) break; }
    const S=k*r/2;
    const f=mc('½ × (호의 길이) × (반지름)',['(호의 길이) × (반지름)','½ × (반지름) × (반지름)','2 × (호의 길이) × (반지름)']);
    const figOnly=Math.random()<0.4;
    return {text: figOnly? `그림의 부채꼴에서 ${XT}의 값을 구하시오.` : `${KN('반지름',r+' cm',`반지름의 길이가 ${r} cm`)}이고 ${KN('호의 길이',k+'π cm',`호의 길이가 ${k}${PI} cm`)}인 부채꼴의 ${WN('넓이','넓이를 구하시오')}.`,
      fig:sectorFig({theta:th, mid:th>180?270:90, rLabel:`${r} cm`, shade:true, arcLabel:`${k}${PI} cm`, inLabel:figOnly?`${XI} cm²`:null}),
      s0:figOnly? LABEL0([{v:r+' cm',c:'반지름',r:'know'},{v:k+'π cm',c:'호의 길이',r:'know'},{v:'x cm²',c:'넓이',r:'want'}]) : null,
      kind:'num', ans:S, suffix:`${PI} cm²`,
      steps:[
        STEP0,
        {tag:'1단계', q:'중심각을 모를 때 부채꼴의 넓이를 구하는 공식은? (삼각형 넓이 공식과 닮았어요)', kind:'mc', choices:f.choices.map(c=>c.replace('½',FR(1,2))), ok:f.ok},
        {tag:'2단계', q:`${FR(1,2)} × ${k}${PI} × ${r} = ?`, kind:'num', ans:S, suffix:`${PI} cm²`}
      ],
      exp:`(넓이) = ${FR(1,2)} × (호의 길이) × (반지름) = ${FR(1,2)} × ${k}${PI} × ${r} = <b>${S}${PI} cm²</b>`};
  }
}

const BASIC_TYPES=[
  {k:'A1', name:'개념 빈칸', desc:'원·호·현·부채꼴·활꼴의 뜻', steps:[]},
  {k:'A2', name:'그림 보고 이름 고르기', desc:'이건 호일까 현일까? 부채꼴일까 아닐까?', steps:[]},
  {k:'B1', name:'중심각 비교 ① 몇 배', desc:'중심각이 2배면 호의 길이·넓이도 2배 (100 = 50 × 2)', rule:'중심각이 몇 배면 호의 길이(넓이)도 몇 배', steps:['0단계 구할 것·아는 것','1단계 중심각이 몇 배','2단계 호의 길이·넓이도 같은 배']},
  {k:'B2', name:'중심각 비교 ② 비', desc:'몇 배로 딱 안 나눠지면 비로 (50 : 70 = 5 : 7)', rule:'중심각의 비 = 호의 길이(넓이)의 비', steps:['0단계 구할 것·아는 것','1단계 중심각의 비','2단계 호의 길이·넓이의 비']},
  {k:'C',  name:'[반지름, 중심각] → 호의 길이·넓이', desc:'원의 몇 분의 몇 조각인지 구하기', rule:'부채꼴 = 원의 (중심각)/360 조각', steps:['0단계 구할 것·아는 것','1단계 원의 둘레·넓이','2단계 몇 분의 몇','3단계 답']},
  {k:'D',  name:'[반지름, 호의 길이] → 넓이', desc:'½ × 호의 길이 × 반지름', rule:'넓이 = ½ × 호의 길이 × 반지름', steps:['0단계 구할 것·아는 것','1단계 공식','2단계 답']}
];
/* 각 문제에서 막혔을 때 권할 기초 유형 */
const BASIC_FOR={p1:['B1','B2','C'], p2:['C','A1'], p3:['A2','B2'], p4:['C','D'], p5:['A2','B1'], p6:['C','A2'], p7:['C','D']};

/* =========================================================
   📺 기초 개념 영상 — 기초 문제를 풀기 전에 보는 1~2분짜리 영상
   장면마다 그림이 하나씩 더해지고(clear면 새 그림), say가 캐릭터 말풍선 자막으로 한 글자씩 나와요.
   cap: 화면 아래 큰 글씨 · add: 이 장면에 더할 그림(SVG 조각, 300×260)
========================================================= */
const VC=[150,128], VR=92, OR='#e8590c', BL='#1c7ed6', GR='#2b8a3e', ORs='#ffc9a1', BLs='#a5d8ff';
const vCirc=(st='#111',w=2.6,fill='none')=>`<circle cx="${VC[0]}" cy="${VC[1]}" r="${VR}" fill="${fill}" stroke="${st}" stroke-width="${w}"/>`;
const vLn=(P,Q,col='#111',w=2.6,dash='')=>`<line x1="${fx(P[0])}" y1="${fx(P[1])}" x2="${fx(Q[0])}" y2="${fx(Q[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash?` stroke-dasharray="${dash}"`:''}/>`;
const vArc=(a0,a1,col,w=6,r=VR)=>`<path d="M ${pt(pol(VC,r,a0))} A ${r} ${r} 0 ${a1-a0>180?1:0} 0 ${pt(pol(VC,r,a1))}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
const vSec=(a0,a1,fill,c=VC,r=VR)=>`<path d="M ${pt(c)} L ${pt(pol(c,r,a0))} A ${r} ${r} 0 ${a1-a0>180?1:0} 0 ${pt(pol(c,r,a1))} Z" fill="${fill}" stroke="#111" stroke-width="2"/>`;
const vSeg=(a0,a1,fill)=>`<path d="M ${pt(pol(VC,VR,a0))} A ${VR} ${VR} 0 ${a1-a0>180?1:0} 0 ${pt(pol(VC,VR,a1))} Z" fill="${fill}" stroke="#111" stroke-width="2"/>`;
const vT=(P,s,col='#111',size=22)=>`<text x="${fx(P[0])}" y="${fx(P[1])}" font-size="${size}" font-weight="700" text-anchor="middle" dominant-baseline="central" fill="${col}" stroke="#fff" stroke-width="5" paint-order="stroke" font-family="'Noto Sans KR',sans-serif">${s}</text>`;
const vO=()=>dot(VC)+vT([VC[0]+4,VC[1]+20],'O','#111',20);
const vAng=(a0,a1,r=26,col='#111')=>`<path d="M ${pt(pol(VC,r,a0))} A ${r} ${r} 0 ${a1-a0>180?1:0} 0 ${pt(pol(VC,r,a1))}" fill="none" stroke="${col}" stroke-width="2.4"/>`;
const vBoxes=(y,n,fill,lab)=>Array.from({length:n},(_,i)=>`<rect x="${70+i*30}" y="${y}" width="26" height="30" rx="5" fill="${fill}" stroke="#111" stroke-width="1.6"/>`).join('')+vT([40,y+15],lab,'#111',18);
const PA=pol(VC,VR,140), PB=pol(VC,VR,40);

const BASIC_VIDEO = {
 A1:{ title:'원·호·현·부채꼴·활꼴', scenes:[
  {clear:1, add:vCirc()+vO()+vLn(VC,pol(VC,VR,-30),GR,3)+vT(pol(VC,58,-12),'반지름',GR,18), cap:'원 · 반지름', say:'한 점 O에서 거리가 같은 점을 모두 모으면 원이 돼요. 중심 O에서 원까지의 거리가 반지름이에요.'},
  {add:dot(PA)+dot(PB)+vT(pol(VC,VR+20,140),'A')+vT(pol(VC,VR+20,40),'B'), cap:'원 위의 두 점 A, B', say:'원 위에 두 점 A와 B를 찍어 볼게요.'},
  {add:vArc(40,140,OR)+vT(pol(VC,VR+22,90),'호 AB',OR), cap:'<b style="color:#e8590c">호</b> = 원을 따라 이은 <b>굽은 선</b>', say:'두 점을 원을 따라 이은 굽은 선, 이것이 호 AB예요.'},
  {add:vLn(PA,PB,BL,4)+vT([VC[0],PA[1]+20],'현 AB',BL), cap:'<b style="color:#1c7ed6">현</b> = 두 점을 이은 <b>곧은 선분</b>', say:'두 점을 곧게 이은 선분은 현 AB예요. 굽으면 호, 곧으면 현! 이렇게 기억해요.'},
  {add:vLn(pol(VC,VR,200),pol(VC,VR,20),GR,3.5,'8 6')+vT(pol(VC,VR-20,215),'지름',GR,18), cap:'<b style="color:#2b8a3e">지름</b> = 중심 O를 지나는 현 (가장 긴 현)', say:'원의 중심을 지나는 현은 지름이에요. 원에서 가장 긴 현이에요.'},
  {clear:1, add:vCirc()+vSec(40,140,ORs)+vO()+vT(pol(VC,VR+20,140),'A')+vT(pol(VC,VR+20,40),'B'), cap:'<b style="color:#e8590c">부채꼴</b> = 반지름 2개 + 호', say:'두 반지름 OA, OB와 호 AB로 둘러싸인 도형을 부채꼴이라고 해요. 부채를 펼친 모양이죠?'},
  {add:vAng(40,140,28,'#c92a2a')+vT(pol(VC,48,90),'중심각','#c92a2a',17), cap:'<b style="color:#c92a2a">중심각</b> = 두 반지름이 만드는 각 ∠AOB', say:'두 반지름이 만드는 각, ∠AOB를 부채꼴의 중심각이라고 해요.'},
  {clear:1, add:vCirc()+vSeg(40,140,BLs)+vLn(PA,PB,BL,3)+vO()+vT(pol(VC,VR+20,140),'A')+vT(pol(VC,VR+20,40),'B'), cap:'<b style="color:#1c7ed6">활꼴</b> = 현 + 호', say:'현 AB와 호 AB로 둘러싸인 도형은 활꼴이에요. 활처럼 생겼죠? 활꼴에는 중심 O가 꼭짓점으로 들어가지 않아요.'},
  {sum:1, cap:'정리', say:'정리해 볼게요. 굽은 선은 호, 곧은 선은 현, 반지름 두 개와 호는 부채꼴, 현과 호는 활꼴이에요.',
   list:['호 = 굽은 선','현 = 곧은 선분 (중심을 지나면 지름)','부채꼴 = 반지름 2개 + 호','중심각 = 두 반지름이 만드는 각','활꼴 = 현 + 호']}
 ]},
 A2:{ title:'헷갈리는 그림 구별하기', scenes:[
  {clear:1, add:vCirc()+`<path d="M ${pt(pol(VC,55,250))} L ${pt(PA)} A ${VR} ${VR} 0 0 1 ${pt(PB)} Z" fill="${ORs}" stroke="#111" stroke-width="2"/>`+vO()+dot(pol(VC,55,250))+vT(pol(VC,74,250),'P'), cap:'이것도 부채꼴일까요? ❌', say:'이 도형은 부채꼴일까요? 꼭짓점 P가 원의 중심이 아니에요. 그래서 부채꼴이 아니에요.'},
  {clear:1, add:vCirc()+vSec(40,140,ORs)+vO(), cap:'⭕ 부채꼴: 꼭짓점이 <b>중심 O</b>, 두 변이 <b>반지름</b>', say:'부채꼴은 꼭짓점이 꼭 중심 O이고, 두 변이 반지름이어야 해요.'},
  {clear:1, add:vCirc()+vSeg(30,150,BLs)+vLn(pol(VC,VR,150),pol(VC,VR,30),BL,3)+vO(), cap:'⭕ 활꼴: <b>현</b>과 <b>호</b>로만 둘러싸임', say:'이번엔 현과 호로만 둘러싸인 도형이에요. 활꼴이에요. 중심 O는 들어가지 않아요.'},
  {clear:1, add:vCirc()+vSec(0,180,'#d3f9d8')+vO(), cap:'반원 = 부채꼴(중심각 180°)이면서 활꼴 — <b>둘 다!</b>', say:'반원은 어떨까요? 중심각이 180°인 부채꼴이에요. 그런데 지름도 현이니까, 현과 호로 둘러싸인 활꼴이기도 해요. 둘 다 맞아요!'},
  {clear:1, add:vCirc()+vArc(200,300,OR)+vLn(pol(VC,VR,330),pol(VC,VR,60),BL,4)+vT(pol(VC,VR-22,250),'호',OR)+vT(pol(VC,VR-32,15),'현',BL)+vO(), cap:'굽으면 <b style="color:#e8590c">호</b>, 곧으면 <b style="color:#1c7ed6">현</b>', say:'선을 볼 때는 이것만 기억해요. 굽은 선이면 호, 곧은 선이면 현.'},
  {sum:1, cap:'정리', say:'꼭짓점이 중심이면 부채꼴, 현과 호만 있으면 활꼴, 반원은 둘 다예요.', list:['꼭짓점이 중심 O + 반지름 2개 → 부채꼴','현 + 호만 → 활꼴','반원 → 부채꼴이면서 활꼴','굽은 선 → 호 · 곧은 선 → 현']}
 ]},
 B1:{ title:'중심각이 몇 배면, 호도 몇 배', scenes:[
  {clear:1, add:vCirc()+vSec(0,40,ORs)+vO()+vT(pol(VC,40,20),'40°','#111',16)+vT(pol(VC,VR+24,20),'3 cm',OR), cap:'중심각 40° → 호 3 cm', say:'중심각이 40°인 부채꼴의 호의 길이가 3 cm예요.'},
  {add:vSec(40,80,BLs)+vT(pol(VC,40,60),'40°','#111',16), cap:'중심각 80° = 40° 조각 <b>2개</b>', say:'중심각이 80°인 부채꼴은요? 40°짜리 조각 두 개를 붙인 것과 같아요.'},
  {add:vT(pol(VC,VR+24,62),'3 cm',BL), cap:'호도 3 cm + 3 cm = <b>6 cm</b> (2배)', say:'조각이 두 개니까 호의 길이도 3 + 3 = 6 cm. 2배가 됐어요.'},
  {cap:'중심각 <b>2배</b> → 호 <b>2배</b>, 넓이도 <b>2배</b>', say:'중심각이 2배가 되면 호의 길이도 2배, 넓이도 2배가 돼요.'},
  {clear:1, add:vCirc()+vSec(0,40,ORs)+vSec(40,80,ORs)+vSec(80,120,ORs)+vO()+vT(pol(VC,VR+26,60),'9 cm',OR), cap:'120° = 40° × <b>3</b> → 호 3 cm × <b>3</b> = 9 cm', say:'중심각이 120°라면? 120 ÷ 40 = 3. 3배니까 호의 길이도 3 × 3 = 9 cm예요.'},
  {add:vSec(0,40,BLs)+vT(pol(VC,VR+24,15),'?',BL,26), cap:'거꾸로! 120° → 40°는 <b>÷ 3</b> → 9 cm ÷ 3 = 3 cm', say:'거꾸로 큰 각에서 작은 각으로 가면, 3으로 나눈 만큼 호의 길이도 3으로 나눠요. 9 ÷ 3 = 3 cm.'},
  {sum:1, cap:'정리', say:'먼저 중심각이 몇 배인지 나눗셈으로 구하고, 호의 길이나 넓이에도 똑같이 곱하거나 나눠요.', list:['① 큰 각 ÷ 작은 각 = 몇 배 (120 ÷ 40 = 3)','② 작은 쪽 → 큰 쪽: × 몇 배','③ 큰 쪽 → 작은 쪽: ÷ 몇 배','넓이도 똑같아요!']}
 ]},
 B2:{ title:'몇 배로 안 나눠지면, 비로', scenes:[
  {clear:1, add:vCirc()+vSec(0,50,ORs)+vSec(50,120,BLs)+vO()+vT(pol(VC,42,25),'50°','#111',15)+vT(pol(VC,44,85),'70°','#111',15)+vT(pol(VC,VR+24,22),'10 cm',OR)+vT(pol(VC,VR+22,88),'?',BL,26), cap:'50° → 10 cm 일 때, 70° → <b>?</b>', say:'중심각 50°인 부채꼴의 호가 10 cm예요. 중심각 70°인 부채꼴의 호는 얼마일까요?'},
  {cap:'70은 50의 몇 배? <b>딱 나눠지지 않아요</b>', say:'70은 50의 몇 배일까요? 70을 50으로 나누면 딱 나누어떨어지지 않아요. 이럴 땐 비를 써요.'},
  {cap:'중심각의 비 50 : 70 = <b>5 : 7</b> (둘 다 ÷10)', say:'중심각의 비를 구해요. 50 : 70을 둘 다 10으로 나누면 5 : 7이에요.'},
  {clear:1, add:vBoxes(60,5,ORs,'50°')+vBoxes(130,7,BLs,'70°'), cap:'호의 비도 <b>5 : 7</b> → 주황 5칸 = 10 cm', say:'호의 길이의 비도 똑같이 5 : 7이에요. 주황 호는 5칸, 파란 호는 7칸이라고 생각해요. 주황 5칸이 10 cm예요.'},
  {add:`<path d="M 70 52 Q 140 30 214 52" fill="none" stroke="${OR}" stroke-width="2"/>`+vT([142,26],'10 cm',OR,18)+vT([172,110],'1칸 = 10 ÷ 5 = 2 cm','#c92a2a',19), cap:'1칸 = 10 ÷ 5 = <b>2 cm</b>', say:'그럼 한 칸은 10 ÷ 5 = 2 cm예요.'},
  {add:`<path d="M 70 168 Q 172 190 274 168" fill="none" stroke="${BL}" stroke-width="2"/>`+vT([172,210],'7칸 = 2 × 7 = 14 cm',BL,19), cap:'파란 7칸 = 2 × 7 = <b>14 cm</b>', say:'파란 호는 7칸이니까 2 × 7 = 14 cm예요.'},
  {sum:1, cap:'정리', say:'중심각의 비를 간단히 하고, 호도 같은 비로 칸을 나눠요. 한 칸을 구한 다음 칸 수만큼 곱하면 돼요.', list:['중심각의 비 = 호의 길이의 비 = 넓이의 비','① 간단한 비로 (50 : 70 = 5 : 7)','② 1칸 = 아는 길이 ÷ 칸 수','③ 답 = 1칸 × 칸 수']}
 ]},
 C:{ title:'반지름·중심각으로 호의 길이·넓이', scenes:[
  {clear:1, add:vCirc()+vSec(0,60,ORs)+vO()+vT(pol(VC,40,30),'60°','#111',16)+vLn(VC,pol(VC,VR,200),GR,3)+vT(pol(VC,50,215),'6 cm',GR,18), cap:'반지름 6 cm, 중심각 60°인 부채꼴', say:'반지름이 6 cm, 중심각이 60°인 부채꼴의 호의 길이와 넓이를 구해 봐요.'},
  {add:vCirc(BL,5), cap:'원 전체 둘레 = 2 × π × 6 = <b>12π</b>', say:'먼저 원 전체를 생각해요. 원의 둘레는 2 × π × 반지름 = 12π예요.'},
  {add:vCirc('none',0,'rgba(28,126,214,.15)'), cap:'원 전체 넓이 = π × 6 × 6 = <b>36π</b>', say:'원의 넓이는 π × 반지름 × 반지름 = 36π예요.'},
  {clear:1, add:vCirc()+vSec(0,60,ORs)+[60,120,180,240,300].map(a=>vLn(VC,pol(VC,VR,a),'#888',1.6,'5 5')).join('')+vO()+vT([150,248],'360 ÷ 60 = 6조각','#c92a2a',20), cap:'360° ÷ 60° = <b>6</b> → 원을 6조각 낸 것 중 1조각', say:'60°는 360°를 몇 조각으로 나눈 것일까요? 360 ÷ 60 = 6. 원을 똑같이 6조각 낸 것 중 하나예요.'},
  {add:vArc(0,60,OR,7)+vT(pol(VC,VR+30,30),'2π',OR,22), cap:'호 = 12π ÷ 6 = <b>2π cm</b>', say:'그러니까 호의 길이는 원의 둘레 12π를 6으로 나눈 2π cm.'},
  {cap:'넓이 = 36π ÷ 6 = <b>6π cm²</b>', say:'넓이도 원의 넓이 36π를 6으로 나눈 6π cm²예요.'},
  {sum:1, cap:'정리', say:'원 전체의 둘레와 넓이를 먼저 구하고, 부채꼴이 원의 몇 조각인지 구해서 나눠요.', list:['① 원 전체: 둘레 2×π×r, 넓이 π×r×r','② 몇 조각? 360 ÷ 중심각','③ 호 = 둘레 ÷ 조각 수, 넓이 = 넓이 ÷ 조각 수','딱 안 나눠지면 × (중심각)/360']}
 ]},
 D:{ title:'호의 길이로 넓이 구하기', scenes:[
  {clear:1, add:vCirc('#ccc',1.6)+vSec(20,110,ORs)+vO()+vT(pol(VC,52,135),'6 cm',GR,18)+vT(pol(VC,VR+24,65),'호 4π',OR), cap:'반지름 6 cm, 호의 길이 4π cm — 중심각은 몰라요', say:'반지름이 6 cm, 호의 길이가 4π cm예요. 중심각은 몰라요. 넓이를 어떻게 구할까요?'},
  {add:Array.from({length:8},(_,i)=>vLn(VC,pol(VC,VR,20+90*(i+1)/9),'#111',1.4)).join(''), cap:'잘게 자르면 조각 하나하나가 <b>삼각형</b>처럼', say:'부채꼴을 아주 잘게 잘라 볼게요. 조각 하나하나가 길쭉한 삼각형처럼 생겼어요.'},
  {clear:1, add:`<path d="M 40 210 L 260 210 L 150 60 Z" fill="${ORs}" stroke="#111" stroke-width="2"/>`+vLn([150,60],[150,210],GR,3,'6 5')+vT([150,232],'밑변 = 호 4π',OR,20)+vT([200,150],'높이 = 6',GR,18), cap:'모으면 밑변 = <b>호의 길이</b>, 높이 = <b>반지름</b>인 삼각형', say:'조각을 모으면 밑변이 호의 길이, 높이가 반지름인 삼각형과 넓이가 같아요.'},
  {cap:'넓이 = ½ × 4π × 6 = <b>12π cm²</b>', say:'삼각형의 넓이는 ½ × 밑변 × 높이. ½ × 4π × 6 = 12π cm²예요.'},
  {sum:1, cap:'정리', say:'부채꼴의 넓이는 ½ × 호의 길이 × 반지름. 중심각을 몰라도 구할 수 있어요.', list:['넓이 = ½ × 호의 길이 × 반지름','삼각형 넓이(½ × 밑변 × 높이)와 같은 모양','중심각을 몰라도 OK!']}
 ]}
};

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
  groups:GROUPS, problems:PROBLEMS, twins:TWINS, twins2:TWINS2, causes:CAUSES,
  basicTypes:BASIC_TYPES, basicVideo:BASIC_VIDEO, basicGen:BASIC_GEN, basicFor:BASIC_FOR
};
})();
