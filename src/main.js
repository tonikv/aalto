import { getState, setState, subscribe } from "./state/store.js";
import { initRender, render } from "./ui/render.js";
import { resizeCanvas, getPlot } from "./simulators/canvas-utils.js";
import { drawWave } from "./simulators/wave-sim.js";
import { drawSound } from "./simulators/sound-sim.js";
import { drawRadiation } from "./simulators/radiation-sim.js";
import { drawLight } from "./simulators/light-sim.js";
import { drawMirror } from "./simulators/mirror-sim.js";
import { TOPICS } from "./data/topics.js";

const SIM_RENDERERS = {
  wave: drawWave,
  sound: drawSound,
  radiation: drawRadiation,
  light: drawLight,
  mirror: drawMirror,
};

function formatFi(value, digits = 2) {
  return new Intl.NumberFormat("fi-FI", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

const canvas = document.getElementById("wave-canvas");

function currentTimeSeconds(state, now = performance.now()) {
  if (!state.running) return state.pausedAtSeconds;
  return (now - state.animationStartMs) / 1000;
}

function drawCanvas(nowMs) {
  const state = getState();
  const topic = TOPICS.find(t => t.id === state.currentTopicId);
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const plot = getPlot(canvas);
  ctx.clearRect(0, 0, plot.canvasWidth, plot.canvasHeight);
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.fillRect(0, 0, plot.canvasWidth, plot.canvasHeight);

  const renderer = SIM_RENDERERS[topic.simulator.type];
  if (renderer) {
    renderer(ctx, plot, state.params, currentTimeSeconds(state, nowMs), formatFi);
  }
}

function animate(nowMs) {
  drawCanvas(nowMs);
  requestAnimationFrame(animate);
}

document.getElementById("toggle-motion").addEventListener("click", () => {
  const state = getState();
  if (state.running) {
    setState({ running: false, pausedAtSeconds: currentTimeSeconds(state) });
  } else {
    setState({ running: true, animationStartMs: performance.now() - state.pausedAtSeconds * 1000 });
  }
  const btn = document.getElementById("toggle-motion");
  btn.textContent = getState().running ? "Pysäytä" : "Jatka";
});

document.getElementById("reset-app").addEventListener("click", () => {
  const state = getState();
  const topic = TOPICS.find(t => t.id === state.currentTopicId);
  setState({
    params: { ...topic.simulator.initialParams },
    exerciseIndex: 0,
    wrongAttempts: 0,
    predictChoice: null,
    predictRevealed: false,
    checkResult: null,
    hintVisible: false,
    solutionVisible: false,
    running: true,
    pausedAtSeconds: 0,
    animationStartMs: performance.now(),
  });
});

window.addEventListener("resize", () => {
  resizeCanvas(canvas);
});

initRender();
subscribe(render);
resizeCanvas(canvas);
render();
requestAnimationFrame(animate);
