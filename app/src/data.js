export const profile = {
  baselineScore: 48,
  targetScore: 60,
  targetMonth: "2026年10月",
  lowStorageMode: true
};

export const words = [
  {
    id: "word-benefit",
    type: "word",
    title: "benefit",
    prompt: "benefit",
    answer: "好处；使受益",
    difficulty: "easy",
    examRelevance: "阅读和作文高频词",
    source: { type: "self-authored", note: "自制高频词示例" }
  },
  {
    id: "word-improve",
    type: "word",
    title: "improve",
    prompt: "improve",
    answer: "提高；改善",
    difficulty: "easy",
    examRelevance: "作文和阅读常用动词",
    source: { type: "self-authored", note: "自制高频词示例" }
  },
  {
    id: "word-regularly",
    type: "word",
    title: "regularly",
    prompt: "regularly",
    answer: "定期地；经常地",
    difficulty: "medium",
    examRelevance: "阅读细节题常见副词",
    source: { type: "self-authored", note: "自制高频词示例" }
  }
];

export const phrases = [
  {
    id: "phrase-as-a-result",
    type: "phrase",
    title: "as a result",
    prompt: "as a result",
    answer: "结果；因此",
    difficulty: "easy",
    examRelevance: "阅读逻辑关系和作文衔接",
    source: { type: "self-authored", note: "自制短语示例" }
  },
  {
    id: "phrase-be-likely-to",
    type: "phrase",
    title: "be likely to",
    prompt: "be likely to do sth.",
    answer: "有可能做某事",
    difficulty: "medium",
    examRelevance: "阅读同义替换和长句理解",
    source: { type: "self-authored", note: "自制短语示例" }
  }
];

export const passages = [
  {
    id: "passage-health",
    type: "passage",
    title: "A Small Habit",
    prompt:
      "People who exercise regularly are more likely to stay healthy. Even a short walk after dinner can help them relax. As a result, many doctors suggest building small habits instead of making big plans.",
    answer: "短文主旨：小习惯有助于健康，坚持比大计划更实际。",
    difficulty: "easy",
    examRelevance: "阅读理解：主旨、细节、同义替换",
    source: { type: "self-authored", note: "自制模拟短文" },
    paragraphs: [
      {
        en: "People who exercise regularly are more likely to stay healthy.",
        zh: "经常锻炼的人更有可能保持健康。",
        breakdown: "主干：People are more likely to stay healthy. 修饰：who exercise regularly 修饰 people。"
      },
      {
        en: "Even a short walk after dinner can help them relax.",
        zh: "即使晚饭后短暂散步也能帮助他们放松。",
        breakdown: "Even 表示强调；help sb. do sth. 表示帮助某人做某事。"
      },
      {
        en: "As a result, many doctors suggest building small habits instead of making big plans.",
        zh: "因此，许多医生建议养成小习惯，而不是制定大计划。",
        breakdown: "As a result 表示结果；instead of 后接名词或动名词。"
      }
    ],
    keyWords: ["regularly", "healthy", "relax", "suggest", "habit"],
    keyPhrases: ["be likely to", "as a result", "instead of"]
  }
];

export const questions = [
  {
    id: "q-health-main",
    type: "question",
    title: "阅读理解：主旨题",
    prompt: "What is the passage mainly about?",
    options: [
      { key: "A", text: "Big plans are always better than small habits." },
      { key: "B", text: "Small habits can help people stay healthy." },
      { key: "C", text: "Doctors do not like exercise." },
      { key: "D", text: "Walking after dinner is dangerous." }
    ],
    answer: "B",
    passageId: "passage-health",
    difficulty: "easy",
    examRelevance: "阅读主旨题",
    source: { type: "self-authored", note: "自制模拟题" },
    explanation: {
      correctReason: "短文反复强调 regularly exercise、short walk、small habits 对健康和放松有帮助，所以 B 概括最准确。",
      sourceText: "many doctors suggest building small habits instead of making big plans",
      sourceTranslation: "许多医生建议养成小习惯，而不是制定大计划。",
      optionReasons: {
        A: "always 过于绝对，而且原文说小习惯更实际，不是大计划更好。",
        B: "正确。small habits 和 stay healthy 都是原文核心信息。",
        C: "无中生有。原文说医生建议养成小习惯，并没有说医生不喜欢运动。",
        D: "意思反转。原文说饭后短暂散步可以帮助放松。"
      },
      trapLabels: ["绝对词陷阱", "无中生有", "意思反转"]
    }
  },
  {
    id: "q-health-detail",
    type: "question",
    title: "阅读理解：细节题",
    prompt: "What can a short walk after dinner help people do?",
    options: [
      { key: "A", text: "Relax." },
      { key: "B", text: "Forget all habits." },
      { key: "C", text: "Make big plans." },
      { key: "D", text: "Stop seeing doctors." }
    ],
    answer: "A",
    passageId: "passage-health",
    difficulty: "easy",
    examRelevance: "阅读细节定位",
    source: { type: "self-authored", note: "自制模拟题" },
    explanation: {
      correctReason: "原文第二句直接说 a short walk after dinner can help them relax。",
      sourceText: "Even a short walk after dinner can help them relax.",
      sourceTranslation: "即使晚饭后短暂散步也能帮助他们放松。",
      optionReasons: {
        A: "正确。relax 是原文直接信息。",
        B: "原文没有 forget all habits。",
        C: "原文提到 big plans，但不是散步的作用。",
        D: "原文没有 stop seeing doctors。"
      },
      trapLabels: ["原文定位", "无中生有"]
    }
  }
];

export const writingTemplates = [
  {
    id: "writing-public-health",
    type: "writing-template",
    title: "作文保底句型：提出观点",
    prompt: "In my opinion, it is important for us to keep a healthy habit.",
    answer: "在我看来，保持健康的习惯对我们很重要。",
    difficulty: "easy",
    examRelevance: "作文开头和观点句",
    source: { type: "self-authored", note: "自制作文模板" }
  },
  {
    id: "writing-result",
    type: "writing-template",
    title: "作文保底句型：结果",
    prompt: "As a result, we can improve our life step by step.",
    answer: "因此，我们可以一步一步改善生活。",
    difficulty: "easy",
    examRelevance: "作文结尾和结果句",
    source: { type: "self-authored", note: "自制作文模板" }
  }
];

export const allContent = [...words, ...phrases, ...passages, ...questions, ...writingTemplates];
