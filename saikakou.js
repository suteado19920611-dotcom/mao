(async function () {

  /* ========= 既に起動していたら二重起動防止 ========= */
  if (document.getElementById('__rng_overlay__')) return;

  /* ========= Shadow DOM 用の土台 ========= */
  const host = document.createElement('div');
  host.id = '__rng_overlay__';
  host.style.position = 'fixed';
  host.style.inset = '0';
  host.style.zIndex = '2147483647';
  document.documentElement.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  /* ========= CSS ========= */
  shadow.innerHTML = `
<style>
*{box-sizing:border-box;font-family:sans-serif;}
.overlay{
  position:fixed; inset:0;
  background:rgba(0,0,0,.6);
  display:flex; align-items:center; justify-content:center;
}
.box{
  background:#fff; width:90%; max-width:480px;
  max-height:80%; padding:12px;
  border-radius:8px; display:flex; flex-direction:column;
}
input{padding:8px;font-size:16px;}
.list{overflow:auto; margin-top:8px; border:1px solid #ccc;}
.item{padding:6px; cursor:pointer;}
.item:hover{background:#def;}
</style>

<div class="overlay">
  <div class="box">
    <input id="q" placeholder="検索（コード / 名前）">
    <div id="list" class="list"></div>
  </div>
</div>
`;

  /* ========= データ取得 ========= */
  const res = await fetch(
    'https://raw.githubusercontent.com/【user】/【repo】/main/rng_list.json'
  );
  const RNG_LIST = await res.json();

  const q = shadow.getElementById('q');
  const list = shadow.getElementById('list');

  function render(filter='') {
    list.innerHTML='';
    RNG_LIST
      .filter(r =>
        (r.code + r.name).toLowerCase().includes(filter.toLowerCase())
      )
      .slice(0,200)
      .forEach(r=>{
        const d=document.createElement('div');
        d.className='item';
        d.textContent=`${r.code} ${r.name}`;
        d.onclick=()=>{
          window.__RNG_CODE__ = r.code;
          host.remove();
          alert('選択: '+r.code);
        };
        list.appendChild(d);
      });
  }

  q.oninput=()=>render(q.value);
  render();

})();
