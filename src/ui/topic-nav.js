import { TOPICS } from "../data/topics.js";
import { getState, setState } from "../state/store.js";

export function renderTopicNav(root) {
  const state = getState();
  root.innerHTML = "";
  TOPICS.forEach(topic => {
    const btn = document.createElement("button");
    btn.className = "topic-button" + (state.currentTopicId === topic.id ? " active" : "");
    btn.textContent = topic.title;
    btn.addEventListener("click", () => {
      setState({
        currentTopicId: topic.id,
        params: { ...topic.simulator.initialParams },
        exerciseIndex: 0,
        wrongAttempts: 0,
        predictChoice: null,
        predictRevealed: false,
        checkResult: null,
        hintVisible: false,
        solutionVisible: false,
      });
    });
    root.appendChild(btn);
  });
}

export function renderTopicIntro(titleEl, introEl, conceptsEl) {
  const { currentTopicId } = getState();
  const topic = TOPICS.find(t => t.id === currentTopicId);
  titleEl.textContent = topic.title;
  introEl.textContent = topic.intro;
  conceptsEl.innerHTML = topic.concepts.map(c => `
    <div class="concept-card">
      <h3>${c.term}</h3>
      <p>${c.blurb}</p>
    </div>
  `).join("");
}
