/* =========================================================
   새 단원 만들기 틀 — 이 파일을 복사해서 시작하세요.
   1) 이 파일을 복사해 이름을 바꿉니다.          예: units/polygon-review.js
   2) 아래 window.UNIT 의 id 를 파일 이름과 똑같이 씁니다.  예: id:'polygon-review'
   3) units/list.js 의 UNITS 에 한 줄 추가합니다.  예: {id:'polygon-review', title:'다각형 단원 마무리'}
   4) index.html, teacher.html 의 APP_VER 숫자를 둘 다 올립니다.
   5) 교사 화면 위쪽 단원 고르기에서 새 단원을 고르고 [힌트·풀이 미리보기]로 확인합니다.
   학생은 따로 할 일 없이 수업 코드만 입력하면 선생님이 고른 단원이 열립니다.

   ※ 기초 연습(basicTypes)과 확인 문제(twins)는 없어도 됩니다.
     기초 연습이 없으면 학생·교사 화면에서 기초 연습 칸이 사라지고,
     확인 문제가 없는 문제는 '③ 확인 문제' 단계 없이 끝납니다.
========================================================= */
(function(){
const {A, OV, FR, I, PI, svg, ln, dot, T, pol, angMark, mc, ri, rnd} = window.ULIB;

/* 그림: 교과서 형식 흑백 SVG (필요 없으면 fig:null) */
const FIG = {
  tri(a,b){   // 삼각형 ABC, ∠A=a°, ∠B=b°
    const A_=[60,200], B_=[300,200], C_=[150,60];
    return svg(360,250, `<path d="M ${A_} L ${B_} L ${C_} Z" fill="none" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>`
      + T(A_[0]-18,A_[1]+8,'A') + T(B_[0]+18,B_[1]+8,'B') + T(C_[0],C_[1]-20,'C')
      + angMark(A_,0,57,30,`${a}°`,54,19) + angMark(B_,123,180,30,`${b}°`,54,19));
  }
};

/* 교사 화면에서 문제를 묶어 보여 줄 이름 */
const GROUPS = {
  basic: {name:'기본', desc:'정의를 그대로 쓰는 문제'}
};

/* 문제 (id 는 p1, p2, … 처럼 겹치지 않게) */
const PROBLEMS = [
 { id:'p1', no:'①', group:'basic', title:'삼각형의 세 내각',
   text:`오른쪽 삼각형 ABC에서 ∠A = 50°, ∠B = 60°일 때, ∠C의 크기를 구하시오.`,
   fig:()=>FIG.tri(50,60),
   ans:`70°`,
   hints:[                                   // 학생이 하나씩 여는 힌트 (몇 개든 괜찮아요)
     `삼각형의 세 내각의 크기의 합은 몇 도일까요?`,
     `180°에서 아는 두 각을 빼 보세요.`
   ],
   checks:[                                  // (없어도 됨) 힌트마다 학생이 적을 답. 맞히면 기다리지 않고 다음 힌트가 열려요
     [{l:'세 내각의 합', a:180, u:'°'}],     //  l: 칸 이름, a: 정답 숫자, u: 단위 (u에 π가 있으면 π 앞의 수만 적어요)
     null                                    //  null: 이 힌트에는 답 칸이 없음
   ],
   sol:`삼각형의 세 내각의 합은 180°이므로 ∠C = 180° − 50° − 60° = <b>70°</b>`,
   rule:`삼각형의 세 내각의 크기의 합 = 180°`, // 풀이 아래에 굵게 보이는 한 줄
   causes:[                                  // (없어도 됨) 이 문제에서 '왜 막혔나요?'에 보일 이유. 없으면 아래 CAUSES를 써요
     {k:'p1-sum', label:'세 내각의 합이 180°인 걸 몰랐어요', short:'내각의 합', cat:'concept'}, // cat: concept·idea·calc
     {k:'p1-calc', label:'빼다가 계산을 실수했어요', short:'계산', cat:'calc'}             // '잘 모르겠어요'는 자동으로 붙어요
   ]
 },
 { id:'p2', no:'②', group:'basic', title:'확인 문제가 없는 문제 예시',
   text:`정육각형의 한 내각의 크기를 구하시오.`,
   fig:null,
   ans:`120°`,
   hints:[`정육각형의 내각의 크기의 합은 180° × (6 − 2)예요.`],
   sol:`180° × 4 = 720°, 720° ÷ 6 = <b>120°</b>`,
   rule:`정 n각형의 한 내각 = 180° × (n − 2) ÷ n`
 }
];

/* 확인 문제 (숫자만 바꾼 쌍둥이 문제, 4지선다)
   of: 어느 문제의 쌍둥이인지 · ok: 정답 번호(0부터) · why: 오답마다 어떤 실수인지(교사 화면에 보임) */
const TWINS = [
 { id:'t1', of:'p1', text:`삼각형 ABC에서 ∠A = 40°, ∠B = 75°일 때, ∠C의 크기는?`,
   fig:()=>FIG.tri(40,75),
   ch:['65°','115°','55°','75°'], ok:0,
   why:['', '두 각의 합을 답으로 씀', '계산 실수', '∠B를 답으로 씀'],
   exp:`180° − 40° − 75° = 65°` }
];

/* 기초 연습 (없으면 빈 칸으로 두세요: BASIC_TYPES=[], BASIC_GEN={}, BASIC_FOR={})
   원과 부채꼴 단원(units/circle-sector-review.js)의 BASIC_GEN 을 참고하면 만들기 쉬워요. */
const BASIC_TYPES = [];
const BASIC_GEN = {};
const BASIC_FOR = {};

/* 학생이 고르는 '막힌 이유' (그대로 써도 돼요) */
const CAUSES = [
  {k:'concept', label:'개념을 몰랐어요', short:'개념'},
  {k:'idea',    label:'아이디어가 안 떠올랐어요', short:'아이디어'},
  {k:'calc',    label:'계산을 실수했어요', short:'계산'},
  {k:'unsure',  label:'잘 모르겠어요', short:'모름'}
];

window.UNIT = {
  id:'_template',                 // ← 파일 이름과 똑같이
  title:'예시 단원 마무리',
  sub:'새 단원 만들기 틀',
  groups:GROUPS, problems:PROBLEMS, twins:TWINS, causes:CAUSES,
  basicTypes:BASIC_TYPES, basicGen:BASIC_GEN, basicFor:BASIC_FOR
};
})();
