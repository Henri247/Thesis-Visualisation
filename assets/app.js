
(function(){
  const root = document.body.dataset.root || "";
  const active = document.body.dataset.active || "";
  const nav = `
    <nav class="site-nav">
      <div class="nav-inner">
        <a class="logo" href="${root}index.html">Two Theses / Visualised</a>
        <div class="nav-links">
          <a href="${root}dissertation-1/index.html">Dissertation 1</a>
          <a href="${root}dissertation-2/index.html">Dissertation 2</a>
          <a href="${root}research-evolution/index.html">Evolution</a>
          <a class="nav-pill" href="${root}ai-build/index.html">Built with AI</a>
        </div>
      </div>
    </nav>`;
  document.body.insertAdjacentHTML("afterbegin", nav);

  const footer = `
    <footer class="site-footer">
      <span>Interactive portfolio prototype based on two dissertation projects.</span>
      <span>Research claims are paraphrased from the dissertations; evidence drawers identify dissertation pages and cited sources.</span>
    </footer>`;
  document.body.insertAdjacentHTML("beforeend", footer);

  const drawer = document.createElement("div");
  drawer.innerHTML = `
    <div class="drawer-backdrop" id="drawerBackdrop"></div>
    <aside class="drawer" id="evidenceDrawer" aria-live="polite">
      <button class="drawer-close" aria-label="Close">×</button>
      <p class="kicker">Evidence note</p>
      <h3 id="drawerTitle"></h3>
      <p id="drawerText"></p>
      <p id="drawerSource"></p>
      <span class="source-tag" id="drawerPage"></span>
    </aside>`;
  document.body.appendChild(drawer);
  const panel = document.getElementById("evidenceDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const close = () => {panel.classList.remove("open");backdrop.classList.remove("open")};
  panel.querySelector(".drawer-close").onclick = close; backdrop.onclick = close;
  document.querySelectorAll("[data-evidence]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.getElementById("drawerTitle").textContent = btn.dataset.title || "Evidence";
      document.getElementById("drawerText").textContent = btn.dataset.evidence || "";
      document.getElementById("drawerSource").textContent = btn.dataset.source || "";
      document.getElementById("drawerPage").textContent = btn.dataset.page ? `Dissertation p. ${btn.dataset.page}` : "Dissertation evidence";
      panel.classList.add("open");backdrop.classList.add("open");
    });
  });

  const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
})();
