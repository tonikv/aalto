import { TOPICS } from "../data/topics.js";

const listeners = new Set();

function createInitialState() {
  const topic = TOPICS[0];
  return {
    currentTopicId: topic.id,
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
  };
}

let state = createInitialState();

export function getState() {
  return state;
}

export function setState(patch) {
  state = typeof patch === "function" ? patch(state) : { ...state, ...patch };
  listeners.forEach(l => l(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function resetState() {
  state = createInitialState();
  listeners.forEach(l => l(state));
}
