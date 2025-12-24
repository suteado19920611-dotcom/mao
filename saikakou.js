(function () {
  if (window.__SAIKAKOU_LOADED__) {
    alert("既にUIは起動しています");
    return;
  }
  window.__SAIKAKOU_LOADED__ = true;

  // === UI生成 ===
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed;
    top:10%;
    left:50%;
    transform:translateX(-50%);
    width:90%;
    max-width:420px;
    max-height:70%;
    background:#111;
    color:#fff;
    z-index:999999;
    padding:12px;
    border-radius:8px;
    box-shadow:0 0 20px #000;
    font-size:14px;
  `;

  overlay.innerHTML = `
    <div style="font-weight:bold;margin-bottom:6px">再加工ツール</div>
    <input id="rngSearch" placeholder="検索（コード / 名前）"
      style="width:100%;padding:6px;margin-bottom:6px">
    <select id="rngSelect" size="10"
      style="width:100%;height:200px"></select>
    <div style="margin-top:6px;text-align:right">
      <button id="closeBtn">閉じる</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("closeBtn").onclick = () => {
    overlay.remove();
    delete window.__SAIKAKOU_LOADED__;
  };

  // === RNG_LIST ===
  const RNG_LIST = window.RNG_LIST || [];

  const sel = document.getElementById("rngSelect");
  function render(list) {
    sel.innerHTML = "";
    list.forEach(r => {
      const o = document.createElement("option");
      o.value = r.code;
      o.textContent = `${r.code} ${r.name}`;
      sel.appendChild(o);
    });
  }

  render(RNG_LIST);

  document.getElementById("rngSearch").oninput = e => {
    const q = e.target.value.toLowerCase();
    render(RNG_LIST.filter(r =>
      r.code.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q)
    ));
  };
})();
