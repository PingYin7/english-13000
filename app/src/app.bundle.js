(() => {
  const app = document.querySelector("#app");
  const stateKey = "english13000-state-v5";
  const todayKey = () => new Date().toISOString().slice(0, 10);
  const zh = {
    app: "\u8fc7\u7ebf\u8bad\u7ec3\u5668",
    course: "13000 \u82f1\u8bed\uff08\u4e13\u5347\u672c\uff09",
    online: "\u5728\u7ebf",
    offline: "\u79bb\u7ebf",
    today: "\u4eca\u65e5",
    practice: "\u7ec3\u4e60",
    review: "\u590d\u4e60",
    wrong: "\u9519\u9898",
    exams: "\u771f\u9898",
    plan: "\u8ba1\u5212",
    progress: "\u8fdb\u5ea6",
    settings: "\u8bbe\u7f6e"
  };

  const words = [
    card("word-benefit", "word", "benefit", "/'benefit/", "n./v.", "\u597d\u5904\uff1b\u4f7f\u53d7\u76ca", "\u9605\u8bfb\u548c\u4f5c\u6587\u9ad8\u9891\u8bcd"),
    card("word-improve", "word", "improve", "/im'pru:v/", "v.", "\u63d0\u9ad8\uff1b\u6539\u5584", "\u4f5c\u6587\u5e38\u7528\u52a8\u8bcd"),
    card("word-regularly", "word", "regularly", "/'regjulerli/", "adv.", "\u5b9a\u671f\u5730\uff1b\u7ecf\u5e38\u5730", "\u9605\u8bfb\u7ec6\u8282\u9898\u5e38\u89c1\u526f\u8bcd"),
    card("word-suggest", "word", "suggest", "/se'dzhest/", "v.", "\u5efa\u8bae\uff1b\u8868\u660e", "\u9605\u8bfb\u548c\u4f5c\u6587\u5e38\u89c1\u8bcd"),
    card("word-habit", "word", "habit", "/'habit/", "n.", "\u4e60\u60ef", "\u4f5c\u6587\u8bdd\u9898\u8bcd"),
    card("word-important", "word", "important", "/im'portnt/", "adj.", "\u91cd\u8981\u7684", "\u4f5c\u6587\u4e07\u80fd\u8bcd"),
    card("word-necessary", "word", "necessary", "/'neseseri/", "adj.", "\u5fc5\u8981\u7684", "\u4f5c\u6587\u548c\u9605\u8bfb\u5e38\u89c1\u8bcd"),
    card("word-environment", "word", "environment", "/in'vairenment/", "n.", "\u73af\u5883", "\u9605\u8bfb\u8bdd\u9898\u8bcd"),
    card("word-decision", "word", "decision", "/di'sizhn/", "n.", "\u51b3\u5b9a", "\u8bcd\u5f62\u548c\u9605\u8bfb\u5e38\u89c1\u8bcd"),
    card("word-experience", "word", "experience", "/ik'spieriens/", "n./v.", "\u7ecf\u5386\uff1b\u7ecf\u9a8c", "\u9605\u8bfb\u548c\u5199\u4f5c\u5e38\u89c1\u8bcd")
  ];
  const phrases = [
    card("phrase-result", "phrase", "as a result", "", "\u77ed\u8bed", "\u7ed3\u679c\uff1b\u56e0\u6b64", "\u903b\u8f91\u8854\u63a5"),
    card("phrase-likely", "phrase", "be likely to", "", "\u77ed\u8bed", "\u6709\u53ef\u80fd\u505a\u67d0\u4e8b", "\u9605\u8bfb\u540c\u4e49\u66ff\u6362"),
    card("phrase-instead", "phrase", "instead of", "", "\u77ed\u8bed", "\u800c\u4e0d\u662f", "\u5bf9\u6bd4\u5173\u7cfb"),
    card("phrase-step", "phrase", "step by step", "", "\u77ed\u8bed", "\u4e00\u6b65\u4e00\u6b65\u5730", "\u4f5c\u6587\u8868\u8fbe"),
    card("phrase-take-part", "phrase", "take part in", "", "\u77ed\u8bed", "\u53c2\u52a0", "\u9605\u8bfb\u548c\u5199\u4f5c\u5e38\u89c1\u77ed\u8bed"),
    card("phrase-pay-attention", "phrase", "pay attention to", "", "\u77ed\u8bed", "\u6ce8\u610f", "\u9605\u8bfb\u548c\u5199\u4f5c\u5e38\u89c1\u77ed\u8bed"),
    card("phrase-be-good-for", "phrase", "be good for", "", "\u77ed\u8bed", "\u5bf9\u2026\u6709\u597d\u5904", "\u4f5c\u6587\u5e38\u89c1\u77ed\u8bed")
  ];
  const writing = [
    { id: "write-opinion", text: "In my opinion, it is important for us to keep a healthy habit.", cn: "\u5728\u6211\u770b\u6765\uff0c\u4fdd\u6301\u5065\u5eb7\u7684\u4e60\u60ef\u5bf9\u6211\u4eec\u5f88\u91cd\u8981\u3002" },
    { id: "write-result", text: "As a result, we can improve our life step by step.", cn: "\u56e0\u6b64\uff0c\u6211\u4eec\u53ef\u4ee5\u4e00\u6b65\u4e00\u6b65\u6539\u5584\u751f\u6d3b\u3002" }
  ];
  const passage = {
    title: "A Small Habit",
    text: "People who exercise regularly are more likely to stay healthy. Even a short walk after dinner can help them relax. As a result, many doctors suggest building small habits instead of making big plans.",
    parts: [
      ["People who exercise regularly are more likely to stay healthy.", "\u7ecf\u5e38\u953b\u70bc\u7684\u4eba\u66f4\u6709\u53ef\u80fd\u4fdd\u6301\u5065\u5eb7\u3002", "\u4e3b\u5e72\uff1aPeople are more likely to stay healthy."],
      ["Even a short walk after dinner can help them relax.", "\u5373\u4f7f\u665a\u996d\u540e\u77ed\u6682\u6563\u6b65\u4e5f\u80fd\u5e2e\u52a9\u4ed6\u4eec\u653e\u677e\u3002", "help sb. do sth. \u8868\u793a\u5e2e\u52a9\u67d0\u4eba\u505a\u67d0\u4e8b\u3002"],
      ["As a result, many doctors suggest building small habits instead of making big plans.", "\u56e0\u6b64\uff0c\u8bb8\u591a\u533b\u751f\u5efa\u8bae\u517b\u6210\u5c0f\u4e60\u60ef\uff0c\u800c\u4e0d\u662f\u5236\u5b9a\u5927\u8ba1\u5212\u3002", "As a result \u8868\u793a\u7ed3\u679c\uff1binstead of \u540e\u63a5\u540d\u8bcd\u6216\u52a8\u540d\u8bcd\u3002"]
    ]
  };
  const questions = [
    q("q-main", "\u9605\u8bfb\u4e3b\u65e8\u9898", "What is the passage mainly about?", [["A", "Big plans are always better than small habits."], ["B", "Small habits can help people stay healthy."], ["C", "Doctors do not like exercise."], ["D", "Walking after dinner is dangerous."]], "B", "\u77ed\u6587\u53cd\u590d\u5f3a\u8c03 small habits \u5bf9\u5065\u5eb7\u6709\u5e2e\u52a9\uff0c\u6240\u4ee5 B \u6982\u62ec\u6700\u51c6\u786e\u3002"),
    q("q-detail", "\u9605\u8bfb\u7ec6\u8282\u9898", "What can a short walk after dinner help people do?", [["A", "Relax."], ["B", "Forget all habits."], ["C", "Make big plans."], ["D", "Stop seeing doctors."]], "A", "\u539f\u6587\u7b2c\u4e8c\u53e5\u76f4\u63a5\u8bf4 a short walk after dinner can help them relax\u3002"),
    q("q-vocab-1", "\u8bcd\u6c47\u8fa8\u6790", "We should ______ attention to our health.", [["A", "pay"], ["B", "make"], ["C", "take"], ["D", "give"]], "A", "pay attention to \u662f\u56fa\u5b9a\u642d\u914d\uff0c\u610f\u4e3a\u201c\u6ce8\u610f\u201d\u3002", "pay attention to", "pay attention to \u662f\u56fa\u5b9a\u77ed\u8bed\u3002"),
    q("q-vocab-2", "\u8bcd\u6c47\u8fa8\u6790", "Reading every day is good ______ your English.", [["A", "at"], ["B", "for"], ["C", "with"], ["D", "from"]], "B", "be good for \u8868\u793a\u201c\u5bf9\u2026\u6709\u597d\u5904\u201d\u3002", "be good for", "be good for \u662f\u5e38\u89c1\u4ecb\u8bcd\u642d\u914d\u3002"),
    q("q-grammar-1", "\u8bed\u6cd5\u7ed3\u6784", "It is important for us ______ English every day.", [["A", "learn"], ["B", "learning"], ["C", "to learn"], ["D", "learned"]], "C", "It is important for sb. to do sth. \u662f\u4f5c\u6587\u548c\u8bed\u6cd5\u5e38\u7528\u53e5\u578b\u3002", "It is important for us to learn English every day.", "\u5f62\u5f0f\u4e3b\u8bed It + is + adj. + for sb. + to do sth."),
    q("q-grammar-2", "\u8bed\u6cd5\u7ed3\u6784", "He kept ______ until he finished the work.", [["A", "read"], ["B", "reading"], ["C", "to read"], ["D", "reads"]], "B", "keep doing sth. \u8868\u793a\u201c\u4e00\u76f4\u505a\u67d0\u4e8b\u201d\u3002", "keep reading", "keep \u540e\u9762\u5e38\u63a5\u52a8\u540d\u8bcd\u3002"),
    q("q-translation-1", "\u7ffb\u8bd1\u7406\u89e3", "Choose the best meaning of: As a result, he made a better decision.", [["A", "\u4f46\u662f\uff0c\u4ed6\u505a\u4e86\u66f4\u597d\u7684\u51b3\u5b9a\u3002"], ["B", "\u56e0\u6b64\uff0c\u4ed6\u505a\u4e86\u66f4\u597d\u7684\u51b3\u5b9a\u3002"], ["C", "\u6362\u53e5\u8bdd\u8bf4\uff0c\u4ed6\u5fd8\u8bb0\u4e86\u51b3\u5b9a\u3002"], ["D", "\u4ed6\u4ece\u4e0d\u505a\u51b3\u5b9a\u3002"]], "B", "as a result \u8868\u793a\u201c\u56e0\u6b64\uff0c\u7ed3\u679c\u201d\uff0c\u662f\u56e0\u679c\u5173\u7cfb\u3002", "As a result", "as a result = \u56e0\u6b64\uff1b\u7ed3\u679c\u3002")
  ];

  function card(id, type, text, phonetic, pos, cn, tip) {
    return { id, type, text, phonetic, pos, cn, tip };
  }
  function q(id, title, prompt, options, answer, why, source, sourceCn) {
    return {
      id, title, prompt, options, answer,
      explain: {
        why,
        source: source || (id === "q-main" ? "many doctors suggest building small habits instead of making big plans" : "Even a short walk after dinner can help them relax."),
        sourceCn: sourceCn || (id === "q-main" ? "\u8bb8\u591a\u533b\u751f\u5efa\u8bae\u517b\u6210\u5c0f\u4e60\u60ef\uff0c\u800c\u4e0d\u662f\u5236\u5b9a\u5927\u8ba1\u5212\u3002" : "\u5373\u4f7f\u665a\u996d\u540e\u77ed\u6682\u6563\u6b65\u4e5f\u80fd\u5e2e\u52a9\u4ed6\u4eec\u653e\u677e\u3002"),
        options: { A: "\u5bf9\u7167\u539f\u6587\u5173\u952e\u8bcd\u5224\u65ad\u3002", B: "\u6ce8\u610f\u662f\u5426\u4e3a\u4e3b\u65e8\u6216\u7ec6\u8282\u3002", C: "\u5e38\u89c1\u5e72\u6270\uff1a\u65e0\u4e2d\u751f\u6709\u3002", D: "\u5e38\u89c1\u5e72\u6270\uff1a\u610f\u601d\u53cd\u8f6c\u3002" }
      }
    };
  }
  function defaults() {
    return {
      done: {}, attempts: [], wrong: [], recall: {}, mastery: {}, writingScores: [], imported: [],
      settings: { wordCount: 3, phraseCount: 2, questionCount: 2, writingCount: 1 },
      review: [reviewItem("benefit", "\u597d\u5904\uff1b\u4f7f\u53d7\u76ca", "word"), reviewItem("as a result", "\u7ed3\u679c\uff1b\u56e0\u6b64", "phrase")]
    };
  }
  function reviewItem(text, cn, kind, extra = {}) {
    return { id: extra.id || `review-${kind}-${text.replace(/\s+/g, "-")}`, text, cn, kind, due: extra.due || todayKey(), interval: extra.interval || 1, status: "\u6a21\u7cca", ...extra };
  }
  function load() {
    try { return merge(defaults(), JSON.parse(localStorage.getItem(stateKey) || "{}")); } catch { return defaults(); }
  }
  function merge(base, saved) {
    return { ...base, ...saved, settings: { ...base.settings, ...(saved.settings || {}) } };
  }
  function save(state) { localStorage.setItem(stateKey, JSON.stringify(state)); }
  function route() { return location.hash.replace("#", "") || "today"; }
  function shell(html) {
    const nav = [["today", zh.today, "✓"], ["practice", zh.practice, "□"], ["review", zh.review, "↻"], ["wrong", zh.wrong, "!"], ["exams", zh.exams, "卷"], ["plan", zh.plan, "日"], ["progress", zh.progress, "%"], ["settings", zh.settings, "⚙"]];
    app.innerHTML = `<header class="topbar"><div><p class="eyebrow">${zh.course}</p><h1>${zh.app}</h1></div><span class="status-pill">${navigator.onLine ? zh.online : zh.offline}</span></header><main class="screen">${html}</main><nav class="tabbar">${nav.map(([id, name, icon]) => `<button class="${route() === id ? "active" : ""}" data-route="${id}"><span>${icon}</span><small>${name}</small></button>`).join("")}</nav>`;
    document.querySelectorAll("[data-route]").forEach((b) => b.addEventListener("click", () => location.hash = b.dataset.route));
  }
  function todayList() {
    const s = load().settings;
    return { words: words.slice(0, s.wordCount), phrases: phrases.slice(0, s.phraseCount), questions: questions.slice(0, s.questionCount), writing: writing.slice(0, s.writingCount) };
  }
  function renderToday() {
    const state = load(), s = state.settings;
    const dueReview = state.review.filter((x) => x.due <= todayKey()).length;
    const dueWrong = state.review.filter((x) => x.kind === "question" && x.due <= todayKey()).length;
    const base = [
      ["review", "\u5148\u590d\u4e60", `\u4eca\u5929\u5230\u671f ${dueReview} \u9879\uff0c\u5176\u4e2d\u9519\u9898 ${dueWrong} \u9898`, "review"],
      ["words", "\u5355\u8bcd\u77ed\u8bed", `\u4eca\u5929 ${s.wordCount} \u4e2a\u5355\u8bcd\u3001${s.phraseCount} \u4e2a\u77ed\u8bed`, "practice"],
      ["questions", "\u9605\u8bfb\u9898", `\u4eca\u5929 ${s.questionCount} \u9053\u9605\u8bfb\u9898`, "practice"],
      ["dictation", "\u53e5\u578b\u9ed8\u5199", "\u770b\u4e2d\u6587\u9ed8\u5199\u82f1\u6587\uff0c\u7cfb\u7edf\u68c0\u67e5\u5173\u952e\u8bcd", "practice"],
      ["writing", "\u5199\u4f5c\u9898", "\u7528\u4eca\u5929\u7684\u8bcd\u548c\u53e5\u578b\u5199\u4e00\u6bb5", "practice"]
    ];
    const allDone = base.every(([id]) => state.done[`${todayKey()}:${id}`]);
    const tasks = allDone ? base.concat([["extra", "\u8ffd\u52a0\u7ec3\u4e60", "\u57fa\u7840\u4efb\u52a1\u5b8c\u6210\u540e\u81ea\u52a8\u89e3\u9501", "practice"]]) : base;
    const pct = Math.round(tasks.filter(([id]) => state.done[`${todayKey()}:${id}`]).length / tasks.length * 100);
    shell(`<section class="hero-band"><div><p class="eyebrow">\u76ee\u6807 2026\u5e7410\u6708</p><h2>13000 \u82f1\u8bed\u5907\u8003</h2><p>\u6bcf\u65e5\u6570\u91cf\u53ef\u5728\u8bbe\u7f6e\u91cc\u8c03\u6574\uff0c\u4e0d\u8bbe\u7f6e\u5c31\u7528\u9ed8\u8ba4\u503c\u3002</p></div><div class="score-ring">${pct}%</div></section><section class="panel"><div class="section-title"><h3>\u4eca\u65e5\u5fc5\u505a</h3><span>${allDone ? "\u5df2\u89e3\u9501\u8ffd\u52a0" : "\u6309\u4f60\u7684\u8bbe\u7f6e"}</span></div>${tasks.map(([id, title, detail, target]) => taskRow(state, id, title, detail, target)).join("")}</section>`);
    document.querySelectorAll("[data-complete]").forEach((b) => b.addEventListener("click", () => { const x = load(); x.done[`${todayKey()}:${b.dataset.complete}`] = true; save(x); renderToday(); }));
  }
  function taskRow(state, id, title, detail, target) {
    const done = state.done[`${todayKey()}:${id}`];
    return `<article class="task-row"><button class="check ${done ? "done" : ""}" data-complete="${id}">${done ? "✓" : ""}</button><div><strong>${title}</strong><p>${detail}</p></div><button class="icon-button" data-route="${target}">›</button></article>`;
  }
  function renderPractice() {
    const list = todayList();
    shell(`<section class="panel"><div class="section-title"><h3>\u4eca\u65e5\u5355\u8bcd\u77ed\u8bed</h3><span>${list.words.length}+${list.phrases.length}</span></div>${list.words.concat(list.phrases).map(studyCard).join("")}</section><section class="panel"><div class="section-title"><h3>\u53e5\u578b\u9ed8\u5199</h3><span>\u4e2d\u6587 \u2192 \u82f1\u6587</span></div>${sentenceDictation()}</section><section class="panel"><div class="section-title"><h3>\u5199\u4f5c\u7ec3\u4e60</h3><span>\u8054\u5408\u4eca\u65e5\u8bcd\u53e5</span></div>${writingPrompt(list)}</section><section class="panel"><div class="section-title"><h3>\u77ed\u6587\u7cbe\u8bfb</h3><span>\u7ffb\u8bd1 + \u91cd\u70b9</span></div>${passageCard()}</section><section class="panel"><div class="section-title"><h3>\u9898\u76ee\u7ec3\u4e60</h3><span>${list.questions.length} \u9898</span></div>${list.questions.map(questionCard).join("")}</section>`);
    bindPractice();
  }
  function studyCard(item) {
    return `<article class="study-card"><p class="eyebrow">${item.tip}</p><h3>${item.text}</h3><p class="word-meta">${item.phonetic ? item.phonetic + " · " : ""}${item.pos}</p><p>${item.cn}</p>${recallBox(item)}<div class="mastery-row"><button data-mastery="${item.id}" data-level="1" data-text="${esc(item.text)}" data-cn="${esc(item.cn)}" data-kind="${item.type}">\u4e0d\u719f</button><button data-mastery="${item.id}" data-level="2" data-text="${esc(item.text)}" data-cn="${esc(item.cn)}" data-kind="${item.type}">\u6a21\u7cca</button><button data-mastery="${item.id}" data-level="3" data-text="${esc(item.text)}" data-cn="${esc(item.cn)}" data-kind="${item.type}">\u8bb0\u4f4f</button></div><button class="tiny" data-add-review="${item.id}" data-text="${esc(item.text)}" data-cn="${esc(item.cn)}" data-kind="${item.type}">\u52a0\u5165\u590d\u4e60</button></article>`;
  }
  function recallBox(item) {
    return `<div class="recall-box"><input data-recall-input="${item.id}" placeholder="\u8f93\u5165\u82f1\u6587\u6216\u4e2d\u6587\u610f\u601d" /><button class="tiny" data-check-recall="${item.id}" data-answer="${esc(item.text)}" data-cn="${esc(item.cn)}">\u9a8c\u8bc1\u8bb0\u4f4f</button><p class="recall-result" id="recall-${item.id}"></p></div>`;
  }
  function writingPrompt(list) {
    const required = list.words.slice(0, 3).map((w) => w.text).concat(list.phrases.slice(0, 2).map((p) => p.text));
    const sentence = writing[0].text;
    return `<article class="study-card"><p><strong>\u9898\u76ee\uff1a</strong>\u8bf7\u5199 3-5 \u53e5\u82f1\u6587\uff0c\u4e3b\u9898\u662f\u201cHow to build a good habit\u201d\u3002</p><p><strong>\u5c3d\u91cf\u4f7f\u7528\uff1a</strong>${required.join(", ")}</p><p><strong>\u53ef\u7528\u53e5\u578b\uff1a</strong>${sentence}</p><textarea class="writing-input" id="writing-answer" placeholder="\u5728\u8fd9\u91cc\u5199\u82f1\u6587\u77ed\u6587"></textarea><button class="primary" id="grade-writing">\u6821\u9a8c\u5e76\u4f30\u5206</button><div class="explanation" id="writing-result" hidden></div></article>`;
  }
  function sentenceDictation() {
    const s = writing[Number(todayKey().slice(-2)) % writing.length];
    return `<article class="study-card"><p><strong>\u770b\u4e2d\u6587\u9ed8\u5199\uff1a</strong>${s.cn}</p><textarea class="writing-input dictation-input" id="dictation-answer" placeholder="\u4e0d\u770b\u82f1\u6587\uff0c\u5148\u81ea\u5df1\u5199\u4e00\u904d"></textarea><button class="primary" id="check-dictation" data-answer="${esc(s.text)}">\u68c0\u67e5\u53e5\u578b</button><div class="explanation" id="dictation-result" hidden></div></article>`;
  }
  function passageCard() {
    return `<article class="passage-card"><h3>${passage.title}</h3><p class="english">${passage.text}</p>${passage.parts.map(([en, cn, tip]) => `<details><summary>${en}</summary><p>${cn}</p><p class="hint">${tip}</p></details>`).join("")}</article>`;
  }
  function questionCard(item) {
    return `<article class="question-card"><p class="eyebrow">${item.title}</p><h3>${item.prompt}</h3><div class="options">${item.options.map(([k, v]) => `<label><input type="radio" name="${item.id}" value="${k}" /><span>${k}. ${v}</span></label>`).join("")}</div><button class="primary" data-submit-question="${item.id}">\u63d0\u4ea4\u7b54\u6848</button><div class="explanation" id="explain-${item.id}" hidden></div></article>`;
  }
  function bindPractice() {
    document.querySelectorAll("[data-add-review]").forEach((b) => b.addEventListener("click", () => { const s = load(); const item = reviewItem(b.dataset.text, b.dataset.cn, b.dataset.kind); if (!s.review.some((r) => r.id === item.id)) s.review.push(item); save(s); b.textContent = "\u5df2\u52a0\u5165"; }));
    document.querySelectorAll("[data-mastery]").forEach((b) => b.addEventListener("click", () => markMastery(b)));
    document.querySelectorAll("[data-check-recall]").forEach((b) => b.addEventListener("click", () => checkRecall(b)));
    document.querySelectorAll("[data-submit-question]").forEach((b) => b.addEventListener("click", () => submitQuestion(b.dataset.submitQuestion)));
    const dictation = document.querySelector("#check-dictation"); if (dictation) dictation.addEventListener("click", () => checkDictation(dictation));
    const grade = document.querySelector("#grade-writing"); if (grade) grade.addEventListener("click", gradeWriting);
  }
  function markMastery(btn) {
    const level = Number(btn.dataset.level);
    const s = load();
    const days = level === 3 ? 4 : level === 2 ? 2 : 1;
    const due = addDays(days);
    const item = reviewItem(btn.dataset.text, btn.dataset.cn, btn.dataset.kind, { due, interval: days });
    const old = s.review.find((r) => r.id === item.id);
    if (old) Object.assign(old, item); else s.review.push(item);
    s.mastery[btn.dataset.mastery] = { level, due, at: new Date().toISOString() };
    save(s);
    btn.closest(".mastery-row").querySelectorAll("button").forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
  }
  function checkDictation(btn) {
    const input = document.querySelector("#dictation-answer").value.trim();
    const answer = btn.dataset.answer;
    const answerWords = answer.toLowerCase().match(/[a-z']+/g) || [];
    const keyWords = answerWords.filter((w) => w.length > 2);
    const hit = keyWords.filter((w) => norm(input).includes(norm(w))).length;
    const close = norm(input) === norm(answer);
    const score = close ? 100 : Math.round(hit / Math.max(keyWords.length, 1) * 100);
    const box = document.querySelector("#dictation-result");
    box.hidden = false;
    box.innerHTML = `<div class="result ${score >= 70 ? "ok" : "bad"}">\u53e5\u578b\u5339\u914d\u5ea6 ${score}%</div><p>\u6807\u51c6\u53e5\uff1a${answer}</p><p>${score >= 70 ? "\u5173\u952e\u8bcd\u57fa\u672c\u5230\u4f4d\uff0c\u660e\u5929\u518d\u9ed8\u5199\u4e00\u904d\u52a0\u56fa\u3002" : "\u5148\u628a\u4e3b\u5e72\u5199\u5bf9\uff0c\u518d\u8865\u4ecb\u8bcd\u548c\u526f\u8bcd\u3002"}</p>`;
    const s = load(); s.recall[`dictation-${todayKey()}`] = { ok: score >= 70, input, answer, at: new Date().toISOString() }; save(s);
  }
  function checkRecall(btn) {
    const input = document.querySelector(`[data-recall-input="${btn.dataset.checkRecall}"]`);
    const ok = match(input.value, btn.dataset.answer, btn.dataset.cn);
    const el = document.querySelector(`#recall-${CSS.escape(btn.dataset.checkRecall)}`);
    el.textContent = ok ? "\u57fa\u672c\u8bb0\u4f4f\u4e86\uff0c\u660e\u5929\u518d\u590d\u4e60\u4e00\u6b21\u3002" : `\u8fd8\u4e0d\u7a33\u3002\u7b54\u6848\uff1a${btn.dataset.answer}\uff1b\u4e2d\u6587\uff1a${btn.dataset.cn}`;
    el.className = `recall-result ${ok ? "ok-text" : "bad-text"}`;
    const s = load(); s.recall[btn.dataset.checkRecall] = { ok, input: input.value, at: new Date().toISOString() }; save(s);
  }
  function match(input, answer, cn) {
    const v = norm(input), a = norm(answer), c = norm(cn);
    return Boolean(v && (v === a || a.includes(v) || v.includes(a) || c.includes(v) || v.includes(c.slice(0, 2))));
  }
  function submitQuestion(id) {
    const item = questions.find((x) => x.id === id), selected = document.querySelector(`input[name="${id}"]:checked`);
    if (!selected) return;
    const correct = selected.value === item.answer, s = load();
    s.attempts.push({ id, selected: selected.value, correct, at: new Date().toISOString() });
    if (!correct) {
      if (!s.wrong.includes(id)) s.wrong.push(id);
      scheduleWrongQuestion(s, item);
    }
    save(s);
    const box = document.querySelector(`#explain-${id}`);
    box.hidden = false;
    box.innerHTML = `<div class="result ${correct ? "ok" : "bad"}">${correct ? "\u7b54\u5bf9\u4e86" : `\u4f60\u9009\u4e86 ${selected.value}\uff0c\u6b63\u786e\u7b54\u6848\u662f ${item.answer}`}</div><h4>\u4e3a\u4ec0\u4e48\u9009 ${item.answer}</h4><p>${item.explain.why}</p><h4>\u539f\u6587\u5b9a\u4f4d</h4><blockquote>${item.explain.source}</blockquote><p>${item.explain.sourceCn}</p>`;
  }
  function scheduleWrongQuestion(state, item) {
    const review = reviewItem(item.prompt, item.explain.why, "question", { id: `review-question-${item.id}`, qid: item.id, due: addDays(1), interval: 1 });
    const old = state.review.find((x) => x.id === review.id);
    if (old) Object.assign(old, review); else state.review.push(review);
  }
  function gradeWriting() {
    const text = document.querySelector("#writing-answer").value.trim(), list = todayList();
    const required = list.words.slice(0, 3).map((w) => w.text).concat(list.phrases.slice(0, 2).map((p) => p.text));
    const used = required.filter((x) => norm(text).includes(norm(x))).length;
    const sentenceUsed = writing.some((w) => norm(text).includes(norm(w.text).slice(0, 16)));
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    let score = 4 + used * 2 + (sentenceUsed ? 3 : 0) + (wordCount >= 25 ? 2 : wordCount >= 12 ? 1 : 0);
    score = Math.max(0, Math.min(15, score));
    const why = [`\u4f7f\u7528\u4eca\u65e5\u8bcd\u77ed\u8bed ${used}/${required.length}\uff1a${used ? "\u6709\u52a0\u5206" : "\u9700\u8981\u52a0\u5165\u4eca\u65e5\u8bcd"}`, sentenceUsed ? "\u7528\u5230\u4fdd\u5e95\u53e5\u578b\uff1a+3" : "\u672a\u660e\u663e\u7528\u5230\u4fdd\u5e95\u53e5\u578b", wordCount >= 25 ? "\u5b57\u6570\u57fa\u672c\u591f" : "\u5b57\u6570\u504f\u5c11\uff0c\u5efa\u8bae\u5199 3-5 \u53e5"];
    const box = document.querySelector("#writing-result");
    box.hidden = false;
    box.innerHTML = `<div class="result ${score >= 9 ? "ok" : "bad"}">\u9884\u4f30 ${score}/15 \u5206</div>${why.map((x) => `<p>${x}</p>`).join("")}<p>\u8bf4\u660e\uff1a\u8fd9\u662f\u7ec3\u4e60\u7528\u4f30\u5206\uff0c\u4e0d\u4ee3\u8868\u771f\u5b9e\u9605\u5377\u5206\u3002</p>`;
    const s = load(); s.writingScores.push({ text, score, why, at: new Date().toISOString() }); save(s);
  }
  function renderReview() {
    const s = load(), items = s.review.filter((x) => x.due <= todayKey());
    shell(`<section class="panel"><div class="section-title"><h3>\u590d\u4e60\u961f\u5217</h3><span>${items.length} \u9879\u5230\u671f</span></div>${(items.length ? items : s.review).map(reviewCard).join("")}</section>`);
    document.querySelectorAll("[data-rate]").forEach((b) => b.addEventListener("click", () => rate(b.dataset.rate, Number(b.dataset.rating))));
  }
  function reviewCard(x) {
    const kind = x.kind === "question" ? "\u9519\u9898\u4e8c\u5237" : x.kind;
    const action = x.kind === "question" ? `<button data-route="practice">\u56de\u7ec3\u4e60</button>` : "";
    return `<article class="review-row"><div><p class="eyebrow">${kind}</p><h3>${x.text}</h3><p>${x.cn}</p><small>\u4e0b\u6b21\uff1a${x.due}</small></div><div class="rating-row">${action}<button data-rate="${x.id}" data-rating="1">\u4e0d\u4f1a</button><button data-rate="${x.id}" data-rating="2">\u6a21\u7cca</button><button data-rate="${x.id}" data-rating="3">\u8ba4\u8bc6</button></div></article>`;
  }
  function rate(id, level) {
    const s = load(), item = s.review.find((x) => x.id === id), days = level === 3 ? Math.max(item.interval * 2, 3) : level === 2 ? 2 : 1, d = new Date();
    d.setDate(d.getDate() + days); item.interval = days; item.due = d.toISOString().slice(0, 10); save(s); renderReview();
  }
  function renderWrong() {
    const s = load(), items = s.wrong.map((id) => questions.find((x) => x.id === id)).filter(Boolean);
    shell(`<section class="panel"><div class="section-title"><h3>\u9519\u9898\u672c</h3><span>${items.length} \u9898</span></div>${items.length ? items.map((x) => `<article class="study-card"><h3>${x.prompt}</h3><p>${x.explain.why}</p><blockquote>${x.explain.source}</blockquote><p>${x.explain.sourceCn}</p></article>`).join("") : `<p class="empty">\u8fd8\u6ca1\u6709\u9519\u9898\u3002</p>`}</section>`);
  }
  function renderExams() {
    const exams = window.AUTHORIZED_EXAMS || [];
    const missing = window.EXAM_MISSING || [];
    const completed = exams.filter((x) => x.hasQuestions).length;
    const texts = window.EXAM_TEXTS || {};
    shell(`<section class="panel"><div class="section-title"><h3>\u5df2\u5f55\u5165\u771f\u9898</h3><span>${completed} \u5957\u8bd5\u5377\u6b63\u6587</span></div>${exams.map((x) => `<article class="study-card"><p class="eyebrow">${x.sourceFile}</p><h3>${x.title}</h3><p>\u9875\u7801\uff1a${x.pageRange}</p><p>\u72b6\u6001\uff1a${texts[x.id] ? "\u539f\u6587\u5df2\u5f55\u5165" : x.status}</p><p>\u9898\u76ee\uff1a${x.hasQuestions ? "\u6709" : "\u6682\u65e0"}\uff1b\u7b54\u6848\uff1a${x.hasAnswers ? "\u6709" : "\u6682\u65e0"}</p><p class="hint">${x.note}</p>${texts[x.id] ? `<details><summary>\u67e5\u770b\u5df2\u5f55\u5165\u5377\u9762\u6587\u672c</summary><pre class="exam-text">${escapeHtml(texts[x.id])}</pre></details>` : ""}</article>`).join("")}</section><section class="panel"><div class="section-title"><h3>\u622a\u81f3\u4eca\u5e74\u8fd8\u7f3a</h3><span>${missing.length} \u9879</span></div><div class="tag-group">${missing.map((x) => `<button>${x}</button>`).join("")}</div></section><section class="panel"><div class="section-title"><h3>\u4e0b\u4e00\u6b65</h3><span>\u7ed3\u6784\u5316\u62c6\u9898</span></div><p>\u5df2\u628a\u53ef\u63d0\u53d6\u7684\u771f\u9898\u5377\u9762\u539f\u6587\u5f55\u5165\u5e94\u7528\u3002\u4e0b\u4e00\u6b65\u53ef\u7ee7\u7eed\u628a\u5377\u9762\u6587\u672c\u62c6\u6210\u53ef\u4f5c\u7b54\u7684\u77ed\u6587\u3001\u9898\u76ee\u3001\u9009\u9879\u3001\u7b54\u6848\u548c\u89e3\u6790\u3002</p></section>`);
    const guide = window.ENGLISH_GUIDE;
    if (guide) {
      document.querySelector(".screen").insertAdjacentHTML("beforeend", `<section class="panel"><div class="section-title"><h3>\u8003\u70b9\u4e00\u672c\u901a\u82f1\u8bed\u7ae0\u8282</h3><span>${guide.pageRange}</span></div><article class="study-card"><p class="eyebrow">${guide.sourceFile}</p><h3>${guide.title}</h3><p>\u53ea\u5f55\u5165 00015 \u82f1\u8bed\uff08\u4e8c\uff09\u76f8\u5173\u9875\uff0c\u672a\u5f55\u5165\u4e13\u4e1a\u8bfe\u5185\u5bb9\u3002</p><details><summary>\u67e5\u770b\u82f1\u8bed\u8003\u70b9\u548c\u6a21\u62df\u9898\u6587\u672c</summary><pre class="exam-text">${escapeHtml(guide.text)}</pre></details></article></section>`);
    }
    renderStructuredExam();
  }
  function renderStructuredExam() {
    const structured = window.STRUCTURED_EXAMS?.["exam-2023-04"];
    if (!structured) return;
    const rawText = window.EXAM_TEXTS?.["exam-2023-04"] || "";
    document.querySelector(".screen").insertAdjacentHTML("afterbegin", `<section class="panel"><div class="section-title"><h3>2023 年 4 月可作答真题</h3><span>按题型作答</span></div><article class="study-card"><p class="eyebrow">${structured.source}</p><h3>${structured.title}</h3><p>先阅读下面的试题原文，再按题型填写答案。1-40 自动判分；41-50 用输入框填写后可核对；写作提供题目、范文和评分档。</p><details open><summary>试题原文</summary><pre class="exam-text exam-paper">${escapeHtml(rawText)}</pre></details>${examSection("第一部分：阅读判断 1-10", structured.objectiveAnswers, 1, 10, ["A","B","C"])}${examSection("第二部分：阅读选择 11-15", structured.objectiveAnswers, 11, 15, ["A","B","C","D"])}${examSection("第三、四部分：16-30", structured.objectiveAnswers, 16, 30, ["A","B","C","D","E","F"])}${examSection("第五部分：31-40", structured.objectiveAnswers, 31, 40, ["A","B","C","D","E","F","G","H","I","J","K","L"])}<button class="primary" id="grade-exam-2023-04">提交 1-40 并判分</button><div class="explanation" id="exam-2023-04-result" hidden></div>${completionInputs(structured.completionAnswers)}<details><summary>短文写作题和评分标准</summary><p>${structured.writing.prompt}</p><pre class="exam-text">${escapeHtml(structured.writing.sample)}</pre>${structured.writing.rubric.map((x) => `<p>${x}</p>`).join("")}</details></article></section>`);
    document.querySelector("#grade-exam-2023-04").addEventListener("click", () => gradeStructuredExam(structured));
    const checkCompletion = document.querySelector("#check-completion-2023-04");
    if (checkCompletion) checkCompletion.addEventListener("click", () => checkCompletionAnswers(structured));
  }
  function examSection(title, answers, start, end, choices) {
    const nums = Object.keys(answers).map(Number).filter((n) => n >= start && n <= end);
    return `<section class="exam-section"><h4>${title}</h4><div class="exam-answer-grid">${nums.map((n) => `<label><span>${n}</span><select data-exam-answer="${n}"><option value="">-</option>${choices.map((x) => `<option value="${x}">${x}</option>`).join("")}</select></label>`).join("")}</div></section>`;
  }
  function completionInputs(answers) {
    return `<section class="exam-section"><h4>第六部分：完形补文 41-50</h4><p class="hint">这里不是选择题，请输入单词正确形式，然后核对参考答案。</p><div class="completion-grid">${Object.keys(answers).map((n) => `<label><span>${n}</span><input data-completion-answer="${n}" placeholder="输入答案" /></label>`).join("")}</div><button class="primary" id="check-completion-2023-04">核对 41-50</button><div class="explanation" id="completion-2023-04-result" hidden></div></section>`;
  }
  function gradeStructuredExam(exam) {
    let total = 0, answered = 0, correct = 0;
    const wrong = [];
    Object.entries(exam.objectiveAnswers).forEach(([num, answer]) => {
      total += 1;
      const value = document.querySelector(`[data-exam-answer="${num}"]`).value;
      if (value) answered += 1;
      if (value === answer) correct += 1;
      else wrong.push(`${num}: ${value || "未答"} / ${answer}`);
    });
    const box = document.querySelector("#exam-2023-04-result");
    box.hidden = false;
    box.innerHTML = `<div class="result ${correct / total >= 0.6 ? "ok" : "bad"}">客观题 ${correct}/${total}</div><p>已作答：${answered}/${total}。这里只统计 1-40 题；41-50 和写作需参考答案/评分标准单独核对。</p>${wrong.length ? `<details><summary>查看错题/未答</summary><p>${wrong.join("；")}</p></details>` : "<p>1-40 全部正确。</p>"}`;
    const state = load();
    state.attempts.push({ id: "exam-2023-04-objective", selected: `${correct}/${total}`, correct: correct === total, at: new Date().toISOString() });
    save(state);
  }
  function checkCompletionAnswers(exam) {
    const wrong = [];
    let correct = 0, total = 0;
    Object.entries(exam.completionAnswers).forEach(([num, answer]) => {
      total += 1;
      const input = document.querySelector(`[data-completion-answer="${num}"]`);
      const value = input.value.trim();
      if (norm(value) === norm(answer)) correct += 1;
      else wrong.push(`${num}: ${value || "未填"} / ${answer}`);
    });
    const box = document.querySelector("#completion-2023-04-result");
    box.hidden = false;
    box.innerHTML = `<div class="result ${correct / total >= 0.6 ? "ok" : "bad"}">41-50：${correct}/${total}</div>${wrong.length ? `<p>${wrong.join("；")}</p>` : "<p>全部正确。</p>"}`;
  }
  function renderProgress() {
    const s = load(), correct = s.attempts.filter((x) => x.correct).length, acc = s.attempts.length ? Math.round(correct / s.attempts.length * 100) : 0, recallOk = Object.values(s.recall).filter((x) => x.ok).length, lastScore = s.writingScores.at(-1)?.score ?? "-";
    shell(`<section class="hero-band"><div><p class="eyebrow">\u5b66\u4e60\u8fdb\u5ea6</p><h2>\u4eca\u65e5\u638c\u63e1\u60c5\u51b5</h2><p>\u7edf\u8ba1\u7b54\u9898\u3001\u8f93\u5165\u56de\u5fc6\u548c\u5199\u4f5c\u4f30\u5206\u3002</p></div><div class="score-ring">${acc}%</div></section><section class="summary-grid"><div><strong>${s.attempts.length}</strong><span>\u7b54\u9898</span></div><div><strong>${recallOk}</strong><span>\u5df2\u8bb0\u4f4f</span></div><div><strong>${lastScore}</strong><span>\u4e0a\u6b21\u5199\u4f5c</span></div></section>`);
  }
  function renderPlan() {
    const plan = buildStudyPlan();
    const next = plan.days.slice(0, 14);
    const rest = plan.days.slice(14);
    shell(`<section class="hero-band"><div><p class="eyebrow">\u4ece ${plan.startText} \u5230 2026-10-31</p><h2>\u6bcf\u65e5\u7ec3\u4e60\u8ba1\u5212</h2><p>\u6309\u4f60\u8bbe\u7f6e\u7684\u6bcf\u65e5\u6570\u91cf\u81ea\u52a8\u751f\u6210\uff0c\u7528\u6765\u4e00\u76f4\u7ec3\u5230 10 \u6708\u5e95\u3002</p></div><div class="score-ring">${plan.total}</div></section><section class="summary-grid"><div><strong>${plan.total}</strong><span>\u5269\u4f59\u5929\u6570</span></div><div><strong>${plan.weeklyExamCount}</strong><span>\u771f\u9898\u5468\u6d4b</span></div><div><strong>${plan.settingsText}</strong><span>\u6bcf\u65e5\u91cf</span></div></section><section class="panel"><div class="section-title"><h3>\u8fd1 14 \u5929</h3><span>\u5148\u7167\u8fd9\u4e2a\u505a</span></div><div class="plan-list">${next.map(planCard).join("")}</div></section>${rest.length ? `<section class="panel"><details><summary>\u67e5\u770b 10 \u6708\u5e95\u524d\u5168\u90e8\u8ba1\u5212\uff08${rest.length} \u5929\uff09</summary><div class="plan-list full-plan">${rest.map(planCard).join("")}</div></details></section>` : ""}`);
  }
  function buildStudyPlan() {
    const settings = load().settings;
    const start = parseLocalDate(todayKey());
    const end = parseLocalDate("2026-10-31");
    const days = [];
    let weeklyExamCount = 0;
    for (let d = new Date(start), index = 0; d <= end; d.setDate(d.getDate() + 1), index += 1) {
      const iso = toIsoDate(d), phase = planPhase(iso), weekday = d.getDay();
      const reviewDay = index % 7 === 6, weeklyExam = weekday === 0 && iso >= "2026-09-01";
      if (weeklyExam) weeklyExamCount += 1;
      days.push({ iso, title: reviewDay ? "\u8f7b\u590d\u76d8\u65e5" : phase.title, phase: phase.name, tasks: planTasks(settings, phase, reviewDay, weeklyExam) });
    }
    return { days, total: days.length, weeklyExamCount, startText: todayKey(), settingsText: `${settings.wordCount}/${settings.phraseCount}/${settings.questionCount}/${settings.writingCount}` };
  }
  function planPhase(iso) {
    if (iso < "2026-07-01") return { name: "\u57fa\u7840\u6062\u590d", title: "\u8865\u57fa\u7840" };
    if (iso < "2026-09-01") return { name: "\u9898\u578b\u5f3a\u5316", title: "\u9898\u578b\u7ec3\u4e60" };
    if (iso < "2026-10-01") return { name: "\u771f\u9898\u6574\u5377", title: "\u771f\u9898\u63d0\u901f" };
    return { name: "\u51b2\u523a\u590d\u76d8", title: "\u8003\u524d\u7a33\u5206" };
  }
  function planTasks(settings, phase, reviewDay, weeklyExam) {
    if (weeklyExam) return ["\u505a 1 \u5957\u771f\u9898\u6216\u7ed3\u6784\u5316\u771f\u9898", "\u6838\u5bf9\u7b54\u6848\u5e76\u628a\u9519\u9898\u52a0\u5165\u590d\u4e60", "\u5199 1 \u7bc7\u77ed\u6587\u5e76\u770b\u6263\u5206\u539f\u56e0"];
    if (reviewDay) return ["\u590d\u4e60\u672c\u5468\u9519\u8bcd\u3001\u77ed\u8bed\u548c\u9519\u9898", "\u91cd\u505a 8 \u9053\u505a\u9519\u6216\u6a21\u7cca\u7684\u9898", "\u9ed8\u5199 3 \u4e2a\u4f5c\u6587\u53e5\u578b"];
    const base = [`\u80cc ${settings.wordCount} \u4e2a\u5355\u8bcd\uff0c${settings.phraseCount} \u4e2a\u77ed\u8bed\uff0c\u5e76\u7528\u8f93\u5165\u6846\u9a8c\u8bc1`, `\u505a ${settings.questionCount} \u9053\u9605\u8bfb/\u8bed\u6cd5/\u8bcd\u6c47\u9898\uff0c\u770b\u5b8c\u89e3\u6790`, `\u7528\u4eca\u5929\u8bcd\u53e5\u5199 ${Math.max(1, settings.writingCount)} \u6bb5\u77ed\u6587\u6216\u53e5\u7ec4`];
    if (phase.name === "\u9898\u578b\u5f3a\u5316") base.push("\u52a0\u7ec3 1 \u4e2a\u771f\u9898\u9898\u578b\u7247\u6bb5");
    if (phase.name === "\u771f\u9898\u6574\u5377") base.push("\u4ece\u5df2\u5f55\u5165\u771f\u9898\u4e2d\u9009 1 \u6bb5\u539f\u6587\u505a\u5b9a\u4f4d\u7ffb\u8bd1");
    if (phase.name === "\u51b2\u523a\u590d\u76d8") base.push("\u590d\u76d8\u9519\u9898\u672c\u548c\u4f5c\u6587\u5e38\u7528\u53e5");
    return base;
  }
  function planCard(day) {
    return `<article class="plan-day"><div><p class="eyebrow">${day.iso} · ${day.phase}</p><h3>${day.title}</h3></div><ul>${day.tasks.map((x) => `<li>${x}</li>`).join("")}</ul></article>`;
  }
  function parseLocalDate(iso) {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  function toIsoDate(date) {
    const y = date.getFullYear(), m = String(date.getMonth() + 1).padStart(2, "0"), d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  function renderSettings() {
    const s = load();
    shell(`<section class="panel"><div class="section-title"><h3>\u6bcf\u65e5\u6570\u91cf</h3><span>\u4e0d\u586b\u5c31\u7528\u9ed8\u8ba4</span></div>${num("wordCount", "\u5355\u8bcd", s.settings.wordCount)}${num("phraseCount", "\u77ed\u8bed", s.settings.phraseCount)}${num("questionCount", "\u9605\u8bfb\u9898", s.settings.questionCount)}${num("writingCount", "\u4f5c\u6587\u53e5\u578b", s.settings.writingCount)}<button class="primary" id="save-settings">\u4fdd\u5b58\u8bbe\u7f6e</button></section><section class="panel"><div class="section-title"><h3>\u771f\u9898\u6587\u672c\u5bfc\u5165</h3><span>\u9700\u8981\u4f60\u63d0\u4f9b\u8d44\u6599</span></div><p>\u53ef\u7c98\u8d34\u4f60\u5df2\u6709\u6743\u4f7f\u7528\u7684\u771f\u9898\u6587\u672c\uff0c\u7cfb\u7edf\u5148\u4fdd\u5b58\u5230\u672c\u5730\u3002\u6211\u4e0d\u4f1a\u64c5\u81ea\u5185\u7f6e\u672a\u6388\u6743\u771f\u9898\u3002</p><textarea class="writing-input" id="import-text" placeholder="\u7c98\u8d34\u9605\u8bfb\u77ed\u6587\u3001\u9898\u76ee\u3001\u7b54\u6848\u548c\u89e3\u6790"></textarea><button class="primary" id="save-import">\u4fdd\u5b58\u771f\u9898\u6587\u672c</button><p class="hint">\u5df2\u4fdd\u5b58 ${s.imported.length} \u6761</p></section>`);
    document.querySelector("#save-settings").addEventListener("click", saveSettings);
    document.querySelector("#save-import").addEventListener("click", saveImport);
  }
  function num(key, label, value) { return `<label class="setting-row"><span>${label}</span><input type="number" min="0" max="20" data-setting="${key}" value="${value}" /></label>`; }
  function saveSettings() {
    const s = load();
    document.querySelectorAll("[data-setting]").forEach((i) => { s.settings[i.dataset.setting] = Number(i.value || defaults().settings[i.dataset.setting]); });
    save(s); renderSettings();
  }
  function saveImport() {
    const text = document.querySelector("#import-text").value.trim(); if (!text) return;
    const s = load(); s.imported.push({ id: `import-${Date.now()}`, text, at: new Date().toISOString() }); save(s); renderSettings();
  }
  function norm(text) { return String(text || "").toLowerCase().replace(/[\s,.!?;，。！？；]/g, ""); }
  function esc(text) { return String(text).replace(/"/g, "&quot;"); }
  function escapeHtml(text) { return String(text).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
  function addDays(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }
  function render() {
    const r = route();
    if (r === "practice") return renderPractice();
    if (r === "review") return renderReview();
    if (r === "wrong") return renderWrong();
    if (r === "exams") return renderExams();
    if (r === "plan") return renderPlan();
    if (r === "progress") return renderProgress();
    if (r === "settings") return renderSettings();
    return renderToday();
  }
  window.addEventListener("hashchange", render);
  if ("serviceWorker" in navigator && location.protocol !== "file:") window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  try { render(); } catch (error) { app.innerHTML = `<div class="boot-panel"><h1>\u52a0\u8f7d\u5931\u8d25</h1><p>${error.message}</p></div>`; }
})();
