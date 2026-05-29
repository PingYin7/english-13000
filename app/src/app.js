import { allContent, passages, phrases, profile, questions, words, writingTemplates } from "./data.js";
import {
  addReviewItem,
  clearCachedContent,
  getDueReviews,
  getPreparationPhase,
  isTaskComplete,
  loadState,
  markTaskComplete,
  rateReviewItem,
  recordAttempt
} from "./store.js";

const app = document.querySelector("#app");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

const routes = [
  { id: "today", label: "今日", icon: "✓" },
  { id: "practice", label: "练习", icon: "□" },
  { id: "review", label: "复习", icon: "↻" },
  { id: "wrong", label: "错题", icon: "!" },
  { id: "progress", label: "进度", icon: "%" },
  { id: "settings", label: "设置", icon: "⚙" }
];

const dailyTasks = [
  { id: "review", title: "先复习", detail: "复习到期错词和短语", route: "review", minutes: 10, reviewFirst: true },
  { id: "words", title: "新词短语", detail: "学习 3 个词和 2 个短语", route: "practice", minutes: 8, reviewFirst: false },
  { id: "questions", title: "阅读题", detail: "完成 2 道阅读题并看解析", route: "practice", minutes: 15, reviewFirst: false },
  { id: "writing", title: "作文句型", detail: "背 2 个保底句型", route: "practice", minutes: 7, reviewFirst: false }
];

function setRoute(route) {
  location.hash = route;
}

function currentRoute() {
  return location.hash.replace("#", "") || "today";
}

function shell(content) {
  const state = loadState();
  app.innerHTML = `
    <header class="topbar">
      <div>
        <p class="eyebrow">13000 英语（专升本）</p>
        <h1>过线训练器</h1>
      </div>
      <span class="status-pill">${navigator.onLine ? "在线" : "离线"}</span>
    </header>
    <main class="screen">${content}</main>
    <nav class="tabbar">
      ${routes
        .map(
          (route) => `
            <button class="${currentRoute() === route.id ? "active" : ""}" data-route="${route.id}" aria-label="${route.label}">
              <span>${route.icon}</span>
              <small>${route.label}</small>
            </button>`
        )
        .join("")}
    </nav>
  `;
  app.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => setRoute(button.dataset.route)));
  app.querySelectorAll("[data-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      markTaskComplete(button.dataset.complete);
      render();
    });
  });
  return state;
}

function renderToday() {
  const state = loadState();
  const dueCount = getDueReviews(state).length;
  const done = dailyTasks.filter((task) => isTaskComplete(state, task.id)).length;
  const progress = Math.round((done / dailyTasks.length) * 100);
  shell(`
    <section class="hero-band">
      <div>
        <p class="eyebrow">目标 ${profile.targetMonth}</p>
        <h2>48 分 → 60+ 分</h2>
        <p>今天先做最小闭环：复习、短词短语、阅读题、作文句型。少学一点，但要反复遇见。</p>
      </div>
      <div class="score-ring" aria-label="今日完成度">${progress}%</div>
    </section>
    <section class="summary-grid">
      <div><strong>${getPreparationPhase()}</strong><span>当前阶段</span></div>
      <div><strong>${dueCount}</strong><span>到期复习</span></div>
      <div><strong>低存储</strong><span>默认开启</span></div>
    </section>
    <section class="panel">
      <div class="section-title">
        <h3>今日必做</h3>
        <span>约 40 分钟</span>
      </div>
      ${dailyTasks
        .map(
          (task) => `
          <article class="task-row">
            <button class="check ${isTaskComplete(state, task.id) ? "done" : ""}" data-complete="${task.id}" aria-label="完成 ${task.title}">
              ${isTaskComplete(state, task.id) ? "✓" : ""}
            </button>
            <div>
              <strong>${task.title}</strong>
              <p>${task.detail}</p>
            </div>
            <button class="icon-button" data-route="${task.route}" aria-label="进入${task.title}">›</button>
          </article>`
        )
        .join("")}
    </section>
  `);
}

function reviewButton(item) {
  return `<button class="tiny" data-add-review="${item.id}" data-label="${item.prompt || item.title}" data-detail="${item.answer || item.examRelevance}" data-kind="${item.type === "phrase" ? "phrase" : "word"}">加入复习</button>`;
}

function renderPractice() {
  shell(`
    <section class="panel">
      <div class="section-title"><h3>单词和短语</h3><span>认识 / 模糊 / 不会</span></div>
      <div class="cards">
        ${[...words, ...phrases]
          .map(
            (item) => `
          <article class="study-card">
            <p class="eyebrow">${item.type === "word" ? "单词" : "短语"} · ${item.examRelevance}</p>
            <h3>${item.prompt}</h3>
            <p>${item.answer}</p>
            <div class="button-row">${reviewButton(item)}</div>
          </article>`
          )
          .join("")}
      </div>
    </section>
    <section class="panel">
      <div class="section-title"><h3>短文精读</h3><span>翻译 + 重点</span></div>
      ${passages.map(renderPassage).join("")}
    </section>
    <section class="panel">
      <div class="section-title"><h3>题目练习</h3><span>提交后看详细解析</span></div>
      ${questions.map(renderQuestion).join("")}
    </section>
    <section class="panel">
      <div class="section-title"><h3>作文保底句型</h3><span>短句反复背</span></div>
      ${writingTemplates
        .map(
          (item) => `
        <article class="study-card compact">
          <h3>${item.title}</h3>
          <p class="english">${item.prompt}</p>
          <p>${item.answer}</p>
          ${reviewButton(item)}
        </article>`
        )
        .join("")}
    </section>
  `);
  bindPracticeActions();
}

function renderPassage(passage) {
  return `
    <article class="passage-card">
      <h3>${passage.title}</h3>
      <p class="english">${passage.prompt}</p>
      <div class="split-list">
        ${passage.paragraphs
          .map(
            (part) => `
          <details>
            <summary>${part.en}</summary>
            <p>${part.zh}</p>
            <p class="hint">${part.breakdown}</p>
            <button class="tiny" data-add-review="sentence-${part.en.slice(0, 12)}" data-label="${part.en}" data-detail="${part.zh}" data-kind="sentence">加入句子复习</button>
          </details>`
          )
          .join("")}
      </div>
      <div class="tag-group">
        ${passage.keyWords.map((word) => `<button data-add-review="kw-${word}" data-kind="word" data-label="${word}" data-detail="短文重点单词">${word}</button>`).join("")}
        ${passage.keyPhrases.map((phrase) => `<button data-add-review="kp-${phrase}" data-kind="phrase" data-label="${phrase}" data-detail="短文重点短语">${phrase}</button>`).join("")}
      </div>
    </article>
  `;
}

function renderQuestion(question) {
  return `
    <article class="question-card" data-question="${question.id}">
      <p class="eyebrow">${question.title}</p>
      <h3>${question.prompt}</h3>
      <div class="options">
        ${question.options
          .map(
            (option) => `
          <label>
            <input type="radio" name="${question.id}" value="${option.key}" />
            <span>${option.key}. ${option.text}</span>
          </label>`
          )
          .join("")}
      </div>
      <button class="primary" data-submit-question="${question.id}">提交答案</button>
      <div class="explanation" id="explain-${question.id}" hidden></div>
    </article>
  `;
}

function bindPracticeActions() {
  app.querySelectorAll("[data-add-review]").forEach((button) => {
    button.addEventListener("click", () => {
      addReviewItem({
        id: `review-${button.dataset.addReview}`,
        kind: button.dataset.kind || "word",
        label: button.dataset.label,
        detail: button.dataset.detail,
        dueDate: new Date().toISOString().slice(0, 10),
        intervalDays: 1,
        status: "unknown",
        topic: "手动标记"
      });
      button.textContent = "已加入";
    });
  });
  app.querySelectorAll("[data-submit-question]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = questions.find((item) => item.id === button.dataset.submitQuestion);
      const selected = app.querySelector(`input[name="${question.id}"]:checked`);
      if (!selected) return;
      const attempt = recordAttempt(question.id, selected.value);
      const target = app.querySelector(`#explain-${question.id}`);
      target.hidden = false;
      target.innerHTML = renderExplanation(question, attempt);
      bindPracticeActions();
    });
  });
}

function renderExplanation(question, attempt) {
  const explanation = question.explanation;
  return `
    <div class="${attempt.correct ? "result ok" : "result bad"}">
      ${attempt.correct ? "答对了" : `你选了 ${attempt.selectedAnswer}，正确答案是 ${question.answer}`}
    </div>
    <h4>为什么选 ${question.answer}</h4>
    <p>${explanation.correctReason}</p>
    <h4>原文定位</h4>
    <blockquote>${explanation.sourceText}</blockquote>
    <p>${explanation.sourceTranslation}</p>
    <h4>选项分析</h4>
    ${Object.entries(explanation.optionReasons)
      .map(([key, text]) => `<p><strong>${key}</strong> ${text}</p>`)
      .join("")}
    <h4>常见陷阱</h4>
    <div class="tag-group">
      ${explanation.trapLabels
        .map((trap) => `<button data-add-review="trap-${trap}" data-kind="trap" data-label="${trap}" data-detail="阅读题常见陷阱">${trap}</button>`)
        .join("")}
    </div>
  `;
}

function renderReview() {
  const state = loadState();
  const due = getDueReviews(state);
  shell(`
    <section class="panel">
      <div class="section-title"><h3>到期复习</h3><span>${due.length} 项</span></div>
      ${(due.length ? due : state.reviewItems)
        .map(
          (item) => `
        <article class="review-row">
          <div>
            <p class="eyebrow">${item.kind} · ${item.topic}</p>
            <h3>${item.label}</h3>
            <p>${item.detail}</p>
            <small>下次复习：${item.dueDate}</small>
          </div>
          <div class="rating-row">
            <button data-rate="${item.id}" data-rating="unknown">不会</button>
            <button data-rate="${item.id}" data-rating="unclear">模糊</button>
            <button data-rate="${item.id}" data-rating="known">认识</button>
          </div>
        </article>`
        )
        .join("")}
    </section>
  `);
  app.querySelectorAll("[data-rate]").forEach((button) => {
    button.addEventListener("click", () => {
      rateReviewItem(button.dataset.rate, button.dataset.rating);
      renderReview();
    });
  });
}

function renderWrong() {
  const state = loadState();
  const wrong = state.wrongAnswers.map((id) => questions.find((question) => question.id === id)).filter(Boolean);
  shell(`
    <section class="panel">
      <div class="section-title"><h3>错题本</h3><span>${wrong.length} 题</span></div>
      ${
        wrong.length
          ? wrong.map((question) => `<article class="study-card"><h3>${question.prompt}</h3>${renderExplanation(question, { correct: false, selectedAnswer: "上次错误答案" })}</article>`).join("")
          : `<p class="empty">还没有错题。先去练习区做两道阅读题。</p>`
      }
    </section>
  `);
  bindPracticeActions();
}

function renderProgress() {
  const state = loadState();
  const correct = state.attempts.filter((attempt) => attempt.correct).length;
  const accuracy = state.attempts.length ? Math.round((correct / state.attempts.length) * 100) : 0;
  shell(`
    <section class="hero-band">
      <div>
        <p class="eyebrow">过线进度</p>
        <h2>${profile.baselineScore} → ${profile.targetScore}+</h2>
        <p>当前估算先按完成率和正确率粗略展示，后续可以接入模拟卷分数。</p>
      </div>
      <div class="score-ring">${accuracy}%</div>
    </section>
    <section class="summary-grid">
      <div><strong>${state.attempts.length}</strong><span>答题记录</span></div>
      <div><strong>${state.wrongAnswers.length}</strong><span>错题</span></div>
      <div><strong>${state.reviewItems.length}</strong><span>复习项</span></div>
    </section>
  `);
}

function renderSettings() {
  const state = loadState();
  shell(`
    <section class="panel">
      <div class="section-title"><h3>低存储模式</h3><span>${state.cacheMeta.lowStorageMode ? "已开启" : "未开启"}</span></div>
      <p>当前只保留今日任务、近期复习、最近错题和少量短文。清理缓存不会删除学习进度。</p>
      <div class="settings-list">
        <div><strong>缓存任务</strong><span>${state.cacheMeta.cachedTaskIds.length}</span></div>
        <div><strong>缓存复习</strong><span>${state.cacheMeta.cachedReviewIds.length}</span></div>
        <div><strong>待同步事件</strong><span>${state.cacheMeta.pendingSyncEvents.length}</span></div>
      </div>
      <button class="danger" id="clear-cache">清理本地缓存</button>
      ${navigator.onLine ? "" : `<p class="offline-note">当前离线。未缓存内容需要联网后再打开，学习记录会先保存在本地。</p>`}
    </section>
  `);
  app.querySelector("#clear-cache").addEventListener("click", () => {
    clearCachedContent();
    renderSettings();
  });
}

function render() {
  const route = currentRoute();
  if (route === "practice") return renderPractice();
  if (route === "review") return renderReview();
  if (route === "wrong") return renderWrong();
  if (route === "progress") return renderProgress();
  if (route === "settings") return renderSettings();
  return renderToday();
}

window.addEventListener("hashchange", render);
window.addEventListener("online", render);
window.addEventListener("offline", render);
render();
