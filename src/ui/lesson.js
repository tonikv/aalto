import { TOPICS } from "../data/topics.js";
import { getState, setState } from "../state/store.js";

function currentTopic(state) {
  return TOPICS.find(t => t.id === state.currentTopicId);
}

function parseNumeric(str) {
  return parseFloat(str.replace(",", ".").trim());
}

function difficultyLabel(d) {
  return { perus: "Perustaso", soveltava: "Soveltava", haastava: "Haastava" }[d] || d;
}

function renderMultipleChoice(ex, root, state) {
  const choices = ex.choices || ex.predictChoices || [];
  const selectedIdx = state.predictChoice;
  root.innerHTML = choices.map((c, i) => {
    let cls = "choice-button";
    if (state.checkResult !== null && selectedIdx === i) {
      cls += selectedIdx === ex.correctIndex ? " is-correct" : " is-wrong";
    } else if (selectedIdx === i) {
      cls += " is-selected";
    }
    return `<button class="${cls}" data-idx="${i}">${c}</button>`;
  }).join("");
  root.querySelectorAll(".choice-button").forEach(btn => {
    btn.addEventListener("click", () => {
      setState({ predictChoice: Number(btn.dataset.idx), checkResult: null });
    });
  });
}

function renderTrueFalse(ex, root, state) {
  const choices = ["Tosi", "Epätosi"];
  const correctIdx = ex.correctAnswer ? 0 : 1;
  const selectedIdx = state.predictChoice;
  root.innerHTML = choices.map((c, i) => {
    let cls = "choice-button";
    if (state.checkResult !== null && selectedIdx === i) {
      cls += i === correctIdx ? " is-correct" : " is-wrong";
    } else if (selectedIdx === i) {
      cls += " is-selected";
    }
    return `<button class="${cls}" data-idx="${i}">${c}</button>`;
  }).join("");
  root.querySelectorAll(".choice-button").forEach(btn => {
    btn.addEventListener("click", () => {
      setState({ predictChoice: Number(btn.dataset.idx), checkResult: null });
    });
  });
}

function renderNumeric(ex, root) {
  root.innerHTML = `
    <div class="numeric-input-row">
      <label for="numeric-input">${ex.inputLabel || "Vastaus ="}</label>
      <input id="numeric-input" class="numeric-input" type="text" inputmode="decimal" autocomplete="off" placeholder="0">
      <span class="numeric-unit">${ex.unit || ""}</span>
    </div>
  `;
}

function renderPredict(ex, root, state) {
  root.innerHTML = `<div class="lesson-task"><p>${ex.predictPrompt}</p></div>`;
  const choiceContainer = document.createElement("div");
  choiceContainer.className = "answers";
  root.appendChild(choiceContainer);
  renderMultipleChoice({ choices: ex.predictChoices, correctIndex: ex.correctIndex }, choiceContainer, state);
  if (state.predictRevealed) {
    const verifyBox = document.createElement("div");
    verifyBox.className = "predict-verify-box";
    verifyBox.textContent = ex.verifyInstruction;
    root.appendChild(verifyBox);
  }
}

function renderInvestigate(ex, root, state) {
  root.innerHTML = `<div class="investigate-instructions">${ex.instructions}</div>`;
  if (ex.checkpoint) {
    const cpLabel = document.createElement("p");
    cpLabel.style.fontWeight = "bold";
    cpLabel.style.marginTop = "12px";
    cpLabel.textContent = ex.checkpoint.prompt;
    root.appendChild(cpLabel);
    const choiceContainer = document.createElement("div");
    choiceContainer.className = "answers";
    root.appendChild(choiceContainer);
    renderMultipleChoice(ex.checkpoint, choiceContainer, state);
  }
}

export function renderLesson(titleEl, contentRoot, progressEl) {
  const state = getState();
  const topic = currentTopic(state);
  const exercises = topic.exercises || [];
  const ex = exercises[state.exerciseIndex];

  if (progressEl) {
    progressEl.textContent = `Harjoitus ${state.exerciseIndex + 1} / ${exercises.length}`;
  }

  if (!ex) {
    renderSummary(contentRoot, state, topic);
    return;
  }

  if (ex.setup?.params) {
    const patched = { ...state.params, ...ex.setup.params };
    if (JSON.stringify(patched) !== JSON.stringify(state.params)) {
      setState(s => ({ ...s, params: patched }));
    }
  }

  titleEl.textContent = "Harjoitustehtävä";

  let html = `<span class="difficulty-badge">${difficultyLabel(ex.difficulty)}</span>`;
  const prompt = ex.type === "predict" ? "" : (ex.prompt || ex.statement || ex.instructions || "");
  if (prompt) html += `<div class="lesson-task"><p>${prompt}</p></div>`;
  contentRoot.innerHTML = html;

  const answersEl = document.createElement("div");
  answersEl.className = "answers";
  contentRoot.appendChild(answersEl);

  if (ex.type === "multiple-choice") renderMultipleChoice(ex, answersEl, state);
  else if (ex.type === "true-false") renderTrueFalse(ex, answersEl, state);
  else if (ex.type === "numeric") renderNumeric(ex, answersEl);
  else if (ex.type === "predict") renderPredict(ex, contentRoot, state);
  else if (ex.type === "investigate") renderInvestigate(ex, answersEl, state);

  const feedbackEl = document.createElement("div");
  feedbackEl.className = "feedback";
  if (state.checkResult === true) {
    feedbackEl.dataset.state = "success";
    feedbackEl.textContent = "Oikein!";
  } else if (state.checkResult === false) {
    feedbackEl.dataset.state = "error";
    feedbackEl.textContent = "Ei aivan. Kokeile uudelleen.";
  }
  contentRoot.appendChild(feedbackEl);

  if (state.hintVisible && ex.hint) {
    const hintEl = document.createElement("div");
    hintEl.className = "hint-box";
    hintEl.innerHTML = `<strong>Vihje:</strong> ${ex.hint}`;
    contentRoot.appendChild(hintEl);
  }
  if (state.solutionVisible && ex.solution) {
    const solEl = document.createElement("div");
    solEl.className = "solution-box";
    solEl.innerHTML = `<strong>Ratkaisu:</strong> ${ex.solution}`;
    contentRoot.appendChild(solEl);
  }

  const actionsEl = document.createElement("div");
  actionsEl.className = "lesson-actions";

  if (state.checkResult !== true) {
    const checkBtn = document.createElement("button");
    checkBtn.className = "primary-button";
    checkBtn.textContent = "Tarkista";
    checkBtn.addEventListener("click", () => checkAnswer(ex));
    actionsEl.appendChild(checkBtn);
  } else {
    const nextBtn = document.createElement("button");
    nextBtn.className = "primary-button";
    nextBtn.textContent = state.exerciseIndex + 1 < exercises.length ? "Seuraava" : "Näytä yhteenveto";
    nextBtn.addEventListener("click", () => {
      setState(s => ({
        ...s,
        exerciseIndex: s.exerciseIndex + 1,
        wrongAttempts: 0,
        predictChoice: null,
        predictRevealed: false,
        checkResult: null,
        hintVisible: false,
        solutionVisible: false,
      }));
    });
    actionsEl.appendChild(nextBtn);
  }

  if (state.wrongAttempts >= 1 && ex.hint && !state.hintVisible) {
    const hintBtn = document.createElement("button");
    hintBtn.className = "secondary-button";
    hintBtn.textContent = "Näytä vihje";
    hintBtn.addEventListener("click", () => setState({ hintVisible: true }));
    actionsEl.appendChild(hintBtn);
  }

  if ((state.wrongAttempts >= 2 || state.checkResult === true) && ex.solution && !state.solutionVisible) {
    const solBtn = document.createElement("button");
    solBtn.className = "secondary-button";
    solBtn.textContent = "Näytä ratkaisu";
    solBtn.addEventListener("click", () => setState({ solutionVisible: true }));
    actionsEl.appendChild(solBtn);
  }

  contentRoot.appendChild(actionsEl);
}

function checkAnswer(ex) {
  const state = getState();
  let correct = false;

  if (ex.type === "multiple-choice" || ex.type === "investigate") {
    const cp = ex.type === "investigate" ? ex.checkpoint : ex;
    correct = state.predictChoice === cp.correctIndex;
  } else if (ex.type === "true-false") {
    const correctIdx = ex.correctAnswer ? 0 : 1;
    correct = state.predictChoice === correctIdx;
  } else if (ex.type === "numeric") {
    const input = document.getElementById("numeric-input");
    const val = parseNumeric(input?.value || "");
    correct = !isNaN(val) && Math.abs(val - ex.expected) <= ex.tolerance;
  } else if (ex.type === "predict") {
    if (!state.predictRevealed) {
      setState({ predictRevealed: true });
      return;
    }
    correct = state.predictChoice === ex.correctIndex;
  }

  setState(s => ({
    ...s,
    checkResult: correct,
    wrongAttempts: correct ? s.wrongAttempts : s.wrongAttempts + 1,
  }));
}

function renderSummary(root, state, topic) {
  const total = topic.exercises.length;
  root.innerHTML = `
    <div class="summary-card is-visible">
      <h2>Hienoa! Olet käynyt aiheen ${topic.title} harjoitukset läpi.</h2>
      <p>${total} harjoitusta suoritettu.</p>
      <div class="lesson-actions" style="margin-top:16px">
        <button class="primary-button" id="restart-exercises">Aloita alusta</button>
      </div>
    </div>
  `;
  root.querySelector("#restart-exercises").addEventListener("click", () => {
    setState({
      exerciseIndex: 0,
      wrongAttempts: 0,
      predictChoice: null,
      predictRevealed: false,
      checkResult: null,
      hintVisible: false,
      solutionVisible: false,
    });
  });
}
