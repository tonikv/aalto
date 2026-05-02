import { renderTopicNav, renderTopicIntro } from "./topic-nav.js";
import { renderControls } from "./controls.js";
import { renderLesson } from "./lesson.js";
import { TOPICS } from "../data/topics.js";
import { getState } from "../state/store.js";

const els = {};

export function initRender() {
  els.topicButtons = document.getElementById("topic-buttons");
  els.topicTitle = document.getElementById("topic-title");
  els.topicIntro = document.getElementById("topic-intro");
  els.conceptsGrid = document.getElementById("concepts-grid");
  els.canvasTitle = document.getElementById("canvas-title");
  els.canvasCopy = document.getElementById("canvas-copy");
  els.controlGrid = document.getElementById("control-grid");
  els.derivedStrip = document.getElementById("derived-strip");
  els.lessonTitle = document.getElementById("lesson-title");
  els.lessonCopy = document.getElementById("lesson-copy");
  els.progressEl = document.getElementById("lesson-progress");
}

export function render() {
  const state = getState();
  const topic = TOPICS.find(t => t.id === state.currentTopicId);

  renderTopicNav(els.topicButtons);
  renderTopicIntro(els.topicTitle, els.topicIntro, els.conceptsGrid);

  if (els.canvasTitle) els.canvasTitle.textContent = topic.title;
  if (els.canvasCopy) els.canvasCopy.textContent = topic.intro;

  renderControls(els.controlGrid, els.derivedStrip);
  renderLesson(els.lessonTitle, els.lessonCopy, els.progressEl);
}
