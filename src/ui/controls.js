import { TOPICS } from "../data/topics.js";
import { getState, setState } from "../state/store.js";
import { derivedWaveValues } from "../physics/wave.js";

function formatFi(value, digits = 2) {
  return new Intl.NumberFormat("fi-FI", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function currentTopic(state) {
  return TOPICS.find(t => t.id === state.currentTopicId);
}

function lockedKeys(state) {
  const topic = currentTopic(state);
  const ex = topic.exercises[state.exerciseIndex];
  return ex?.setup?.locked || [];
}

export function renderControls(gridEl, derivedEl) {
  const state = getState();
  const topic = currentTopic(state);
  const locked = lockedKeys(state);

  gridEl.innerHTML = "";
  for (const ctrl of topic.controls) {
    const isLocked = locked.includes(ctrl.id);
    const card = document.createElement("div");
    card.className = "control-card" + (isLocked ? " is-locked" : "");

    const header = document.createElement("div");
    header.className = "control-header";
    header.innerHTML = `<strong>${ctrl.label}</strong><span class="symbol">${ctrl.symbol}</span>`;

    const readout = document.createElement("div");
    readout.className = "value-readout";
    readout.textContent = `${ctrl.symbol} = ${formatFi(state.params[ctrl.id] || 0, ctrl.digits)} ${ctrl.unit}`;

    const range = document.createElement("input");
    range.type = "range";
    range.min = ctrl.min;
    range.max = ctrl.max;
    range.step = ctrl.step;
    range.value = state.params[ctrl.id] || ctrl.min;
    range.disabled = isLocked;
    range.setAttribute("aria-label", ctrl.label);
    range.addEventListener("input", e => {
      setState(s => ({ ...s, params: { ...s.params, [ctrl.id]: Number(e.target.value) } }));
    });

    const rangeRow = document.createElement("div");
    rangeRow.className = "range-row";
    rangeRow.innerHTML = `<span>${formatFi(ctrl.min, ctrl.digits)} ${ctrl.unit}</span><span>${formatFi(ctrl.max, ctrl.digits)} ${ctrl.unit}</span>`;

    card.append(header, readout, range, rangeRow);
    gridEl.appendChild(card);
  }

  if (topic.derived && topic.derived.length > 0 && topic.id === "wave") {
    const dv = derivedWaveValues(state.params);
    const map = { period: dv.period, speed: dv.speed, angularFrequency: dv.angularFrequency, waveNumber: dv.waveNumber };
    derivedEl.innerHTML = topic.derived.map(d => `
      <div class="derived-card">
        <span>${d.label} <em>${d.symbol}</em></span>
        <strong>${formatFi(map[d.id] || 0, 2)} ${d.unit}</strong>
      </div>
    `).join("");
  } else {
    derivedEl.innerHTML = "";
  }
}

export { formatFi };
