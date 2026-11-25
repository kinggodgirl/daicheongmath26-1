/* =========================================================
   단원 목록 — 새 단원을 만들면 여기에 한 줄 추가하세요.
     id    : 단원 파일 이름 (units/{id}.js) 이자 그 파일의 window.UNIT.id 와 같아야 해요
     title : 교사 화면 단원 고르기에 보이는 이름
   맨 위 단원이 처음 열 때의 기본값이에요.
========================================================= */
window.UNITS = [
  {id:'circle-sector-review', title:'원과 부채꼴 단원 마무리'}
];

/* ---------- 아래는 고치지 않아도 돼요: 주소의 ?u=단원 또는 마지막으로 쓴 단원을 골라 읽어 옴 ---------- */
(function(){
  const key = /teacher\.html$/.test(location.pathname) ? 'ur-t-unit' : 'ur-unit';
  const has = id => window.UNITS.some(u => u.id === id);
  let id = null;
  try{ id = new URLSearchParams(location.search).get('u'); }catch(e){}
  if(!has(id)){ try{ id = JSON.parse(localStorage.getItem(key)); }catch(e){ id = null; } }
  if(!has(id)) id = window.UNITS[0].id;
  try{ localStorage.setItem(key, JSON.stringify(id)); }catch(e){}
  window.UNIT_ID = id;
  window.unitExists = has;
  document.write('<script src="units/_lib.js"><\/script><script src="units/_prereq.js"><\/script><script src="units/' + id + '.js"><\/script>');
})();
