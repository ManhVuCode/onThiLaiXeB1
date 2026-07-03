import { Question, TOPICS, ALL_QUESTIONS } from "../data/questions";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateExam(): Question[] {
  const distribution = [6, 8, 5, 5, 5, 6];
  const selected: Question[] = [];
  TOPICS.forEach((t, i) => {
    const questions = shuffle(ALL_QUESTIONS.filter((q) => q.topicId === t.id));
    selected.push(...questions.slice(0, distribution[i]));
  });
  return shuffle(selected);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
