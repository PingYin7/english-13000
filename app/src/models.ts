export type SourceType = "self-authored" | "personal-manual" | "licensed" | "adapted";
export type ContentType = "word" | "phrase" | "passage" | "question" | "translation" | "writing-template";
export type Confidence = "unknown" | "unclear" | "known";
export type ReviewKind = "word" | "phrase" | "sentence" | "trap" | "question";

export interface LearnerProfile {
  baselineScore: number;
  targetScore: number;
  targetMonth: string;
  lowStorageMode: boolean;
}

export interface SourceMeta {
  type: SourceType;
  note: string;
}

export interface StudyTask {
  id: string;
  title: string;
  detail: string;
  route: string;
  minutes: number;
  reviewFirst: boolean;
}

export interface Explanation {
  correctReason: string;
  sourceText?: string;
  sourceTranslation?: string;
  optionReasons?: Record<string, string>;
  trapLabels?: string[];
}

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  prompt: string;
  answer?: string;
  difficulty: "easy" | "medium" | "hard";
  examRelevance: string;
  source: SourceMeta;
  explanation?: Explanation;
}

export interface ReviewItem {
  id: string;
  kind: ReviewKind;
  label: string;
  detail: string;
  dueDate: string;
  intervalDays: number;
  status: Confidence;
  topic: string;
}

export interface Attempt {
  id: string;
  questionId: string;
  selectedAnswer: string;
  correct: boolean;
  createdAt: string;
}

export interface CacheMeta {
  lowStorageMode: boolean;
  cachedTaskIds: string[];
  cachedReviewIds: string[];
  cachedWrongAnswerIds: string[];
  lastClearedAt?: string;
  pendingSyncEvents: unknown[];
}
