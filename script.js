const nodes = [
  {
    stage: "01 — EXTRACTION & REFINING",
    place: "Sulawesi, Indonesia",
    process: "Open-pit mining + HPAL refining",
    text: "The dissertation describes severe ecological pressures from land clearance, mine waste and refining, alongside hazardous labour conditions, low wages and strong employer power. It argues that upstream labour and resources are structurally undervalued.",
    labour: ["High burden", 86],
    environment: ["High burden", 94],
    value: ["Lower capture", 28],
    transport: "→ ship"
  },
  {
    stage: "02 — CHEMICAL REFINING",
    place: "Zhejiang, China",
    process: "Nickel sulfate → pCAM → CAM",
    text: "This stage is more capital- and technology-intensive. The dissertation argues that Chinese firms benefit from first-mover advantages, scale and vertical integration, allowing substantial midstream value capture while environmental impacts remain significant.",
    labour: ["Medium burden", 52],
    environment: ["Medium–high burden", 63],
    value: ["High capture", 76],
    transport: "→ ship + rail"
  },
  {
    stage: "03 — BATTERY CELLS",
    place: "Salzgitter, Germany",
    process: "Battery-cell production",
    text: "The German stage is highly capital-intensive and increasingly automated. The dissertation contrasts stronger union organisation, substantially higher wages and renewable-powered production with the harsher conditions found upstream.",
    labour: ["Lower burden", 27],
    environment: ["Lower local burden", 31],
    value: ["High capture", 82],
    transport: "→ rail"
  },
  {
    stage: "04 — VEHICLE ASSEMBLY",
    place: "Martorell, Spain",
    process: "Cell-to-pack + final assembly",
    text: "The downstream European stage completes the vehicle-production chain. In the dissertation's comparative analysis, downstream Euro-core nodes are positioned as capturing more of the economic and ecological benefits of EV production.",
    labour: ["Lower burden", 34],
    environment: ["Lower local burden", 35],
    value: ["High capture", 78],
    transport: "→ EV"
  }
];

const chain = document.getElementById("chain");

nodes.forEach((n, i) => {
  const button = document.createElement("button");
  button.className = "node" + (i === 0 ? " active" : "");
  button.innerHTML = `
    <span class="num">0${i+1}</span>
    <span><strong>${n.place}</strong><small>${n.process}</small></span>
    <span class="transport">${n.transport}</span>
  `;
  button.addEventListener("click", () => selectNode(i));
  chain.appendChild(button);
});

function selectNode(index) {
  const n = nodes[index];
  [...document.querySelectorAll(".node")].forEach((el, i) => el.classList.toggle("active", i === index));
  document.getElementById("detailStage").textContent = n.stage;
  document.getElementById("detailTitle").textContent = n.place;
  document.getElementById("detailText").textContent = n.text;
  setMetric("labour", n.labour);
  setMetric("environment", n.environment);
  setMetric("value", n.value);
}

function setMetric(id, value) {
  document.getElementById(id + "Label").textContent = value[0];
  document.getElementById(id + "Bar").style.width = value[1] + "%";
}

selectNode(0);
