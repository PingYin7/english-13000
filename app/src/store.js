import { profile, questions } from "./data.js";

const STORAGE_KEY = "english13000-state-v1";

const today = () => new Date().toISOString().slice(0, 10);

const initialState = {
  profile,
  completedTasks: {},
  attempts: [],
  wrongAnswers: [],
  reviewItems: [
    {
      id: "review-word-benefit",
      kind: "word",
      label: "benefit",
      detail: "好处；使受益",
      dueDate: today(),
      intervalDays: 1,
      status: "unclear",
      topic: "高频词"
    },
    {
      id: "review-phrase-as-a-result",
      kind: "phrase",
      label: "as a result",
      detail: "结果；因此",
      dueDate: today(),
      intervalDays: 1,
      status: "unclear",
      topic: "逻辑短语"
    }
  ],
  cacheMeta: {
    lowStorageMode: true,
    cachedTaskIds: ["review", "words", "questions"],
    cachedReviewIds: ["review-word-benefit", "review-phrase-as-a-result"],
    cachedWrongAnswerIds: [],
    pendingSyncEvents: []
  }
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState;
  } catch {
    return initialState;
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function markTaskComplete(taskId) {
  const state = loadState();
  state.completedTasks[`${today()}:${taskId}`] = true;
  saveState(state);
}

export function isTaskComplete(state, taskId) {
  return Boolean(state.completedTasks[`${today()}:${taskId}`]);
}

export function addReviewItem(item) {
  const state = loadState();
  if (!state.reviewItems.some((review) => review.id === item.id)) {
    state.reviewItems.push(item);
    state.cacheMeta.cachedReviewIds = state.reviewItems.slice(-20).map((review) => review.id);
    state.cacheMeta.pendingSyncEvents.push({ type: "review-added", itemId: item.id, at: new Date().toISOString() });
    saveState(state);
  }
}

export function rateReviewItem(id, rating) {
  const state = loadState();
  const item = state.reviewItems.find((review) => review.id === id);
  if (!item) return;
  const nextInterval = rating === "known" ? Math.max(item.intervalDays * 2, 3) : rating === "unclear" ? 2 : 1;
  const due = new Date();
  due.setDate(due.getDate() + nextInterval);
  item.status = rating;
  item.intervalDays = nextInterval;
  item.dueDate = due.toISOString().slice(0, 10);
  state.cacheMeta.pendingSyncEvents.push({ type: "review-rated", itemId: id, rating, at: new Date().toISOString() });
  saveState(state);
}

export function recordAttempt(questionId, selectedAnswer) {
  const state = loadState();
  const question = questions.find((item) => item.id === questionId);
  if (!question) return null;
  const correct = question.answer === selectedAnswer;
  const attempt = {
    id: `attempt-${Date.now()}`,
    questionId,
    selectedAnswer,
    correct,
    createdAt: new Date().toISOString()
  };
  state.attempts.push(attempt);
  if (!correct && !state.wrongAnswers.includes(questionId)) {
    state.wrongAnswers.push(questionId);
    state.cacheMeta.cachedWrongAnswerIds = state.wrongAnswers.slice(-30);
  }
  state.cacheMeta.pendingSyncEvents.push({ type: "attempt", attempt, at: new Date().toISOString() });
  saveState(state);
  return attempt;
}

export function clearCachedContent() {
  const state = loadState();
  state.cacheMeta.cachedTaskIds = [];
  state.cacheMeta.cachedReviewIds = state.reviewItems.slice(0, 10).map((review) => review.id);
  state.cacheMeta.cachedWrongAnswerIds = state.wrongAnswers.slice(-10);
  state.cacheMeta.lastClearedAt = new Date().toISOString();
  saveState(state);
}

export function getDueReviews(state) {
  return state.reviewItems.filter((item) => item.dueDate <= today());
}

export function getPreparationPhase() {
  const month = new Date().getMonth() + 1;
  if (month <= 6) return "基础恢复";
  if (month === 7 || month === 8) return "题型练习";
  if (month === 9) return "整套模拟";
  return "最终复盘";
}
