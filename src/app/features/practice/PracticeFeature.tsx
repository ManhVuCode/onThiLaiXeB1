import React from "react";
import {
  BookOpen, ChevronRight, CheckCircle, XCircle,
  ArrowLeft, ArrowRight, AlertTriangle, RotateCcw,
  Zap
} from "lucide-react";
import { Question, Topic, TOPICS, ALL_QUESTIONS } from "../../data/questions";
import { OPTION_LABELS } from "../../data/exam-config";
import { SIGN_MAP } from "../../components/signs";

export type StudyView = "topics" | "practice" | "result";

interface PracticeFeatureProps {
  studyView: StudyView;
  currentTopic: Topic | undefined;
  practiceQuestions: Question[];
  practiceIndex: number;
  practiceAnswers: (number | null)[];
  showExplanation: boolean;
  selectedTopicId: number;
  topicProgress: Record<number, { practiced: number; correct: number }>;
  startPractice: (topicId: number) => void;
  handlePracticeAnswer: (optionIdx: number) => void;
  nextPracticeQuestion: () => void;
  setStudyView: (view: StudyView) => void;
  setPracticeIndex: (index: number) => void;
  setShowExplanation: (show: boolean) => void;
}

export default function PracticeFeature({
  studyView,
  currentTopic,
  practiceQuestions,
  practiceIndex,
  practiceAnswers,
  showExplanation,
  selectedTopicId,
  topicProgress,
  startPractice,
  handlePracticeAnswer,
  nextPracticeQuestion,
  setStudyView,
  setPracticeIndex,
  setShowExplanation,
}: PracticeFeatureProps) {
  return (
    <>
      {/* ── STUDY — Topics ── */}
      {studyView === "topics" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Ôn luyện theo chủ đề</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOPICS.map((topic) => {
              const topicQs = ALL_QUESTIONS.filter((q) => q.topicId === topic.id);
              const prog = topicProgress[topic.id];
              const pct = prog ? Math.round((prog.correct / prog.practiced) * 100) : null;
              return (
                <div key={topic.id} className={`${topic.bg} border ${topic.border} rounded-2xl p-5 hover:shadow-lg transition-all`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-3xl">{topic.icon}</span>
                      <h3 className={`font-bold text-sm mt-2 ${topic.color}`}>{topic.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{topic.description}</p>
                    </div>
                    <span className="text-xs font-mono bg-white/70 rounded-lg px-2 py-1 text-muted-foreground border border-border">{topicQs.length} câu</span>
                  </div>
                  {prog && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Đã luyện {prog.practiced} câu</span>
                        <span className={`font-bold ${pct! >= 85 ? "text-green-600" : "text-amber-600"}`}>
                          {pct}% đúng {pct! >= 85 ? "✓" : ""}
                        </span>
                      </div>
                      <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${pct! >= 85 ? "bg-green-500" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                  <button onClick={() => startPractice(topic.id)} className={`w-full py-2 rounded-xl text-sm font-bold transition-all ${topic.color} bg-white hover:bg-white/80 border border-current/20 flex items-center justify-center gap-2`}>
                    <Zap size={14} /> {prog ? "Luyện tiếp" : "Bắt đầu luyện"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STUDY — Practice ── */}
      {studyView === "practice" && practiceQuestions.length > 0 && (() => {
        const q = practiceQuestions[practiceIndex];
        const answered = practiceAnswers[practiceIndex];
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setStudyView("topics")} className="text-primary hover:underline text-sm flex items-center gap-1">
                <ArrowLeft size={14} /> Chủ đề
              </button>
              <ChevronRight size={14} className="text-muted-foreground" />
              <span className={`text-sm font-semibold ${currentTopic?.color || ""}`}>
                {currentTopic?.icon} {currentTopic?.name}
              </span>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Câu {practiceIndex + 1} / {practiceQuestions.length}</span>
                <span>{practiceAnswers.filter((a) => a !== null).length} đã trả lời</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((practiceIndex + 1) / practiceQuestions.length) * 100}%` }} />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              {q.isCritical && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 mb-3 font-semibold">
                  <AlertTriangle size={13} /> ⚠️ Câu điểm liệt — Sai sẽ không đỗ
                </div>
              )}
              {q.imageUrl ? (
                <div className="flex justify-center bg-gray-50 rounded-xl mb-3 py-2">
                  <img src={q.imageUrl} alt="" className="max-h-48 rounded-lg object-contain" />
                </div>
              ) : q.signKey && SIGN_MAP[q.signKey] && (
                <div className="flex justify-center bg-gray-50 rounded-xl mb-3 py-2">{SIGN_MAP[q.signKey]}</div>
              )}
              <p className="font-semibold text-foreground text-sm leading-relaxed">{q.question}</p>
            </div>

            <div className="space-y-2.5">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctAnswer;
                const isSelected = answered === i;
                let cls = "bg-card border-border hover:border-primary hover:bg-secondary/30";
                if (answered !== null) {
                  if (isCorrect) cls = "bg-green-50 border-green-400";
                  else if (isSelected) cls = "bg-red-50 border-red-400";
                  else cls = "bg-card border-border opacity-50";
                }
                return (
                  <button key={i} onClick={() => handlePracticeAnswer(i)} disabled={answered !== null} className={`w-full text-left border-2 rounded-xl px-4 py-3 transition-all flex items-start gap-3 ${cls}`}>
                    <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${answered !== null && isCorrect ? "bg-green-500 text-white border-green-500" : answered !== null && isSelected ? "bg-red-500 text-white border-red-500" : "border-border bg-muted text-muted-foreground"}`}>{OPTION_LABELS[i]}</span>
                    <span className="text-sm leading-relaxed">{opt}</span>
                    {answered !== null && isCorrect && <CheckCircle size={15} className="text-green-500 shrink-0 ml-auto mt-0.5" />}
                    {answered !== null && isSelected && !isCorrect && <XCircle size={15} className="text-red-500 shrink-0 ml-auto mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-xs font-bold text-blue-700 mb-1 flex items-center gap-1">
                  <BookOpen size={13} /> Giải thích
                </div>
                <p className="text-sm text-blue-900 leading-relaxed">{q.explanation}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => { setPracticeIndex(Math.max(0, practiceIndex - 1)); setShowExplanation(practiceAnswers[practiceIndex - 1] !== null); }} disabled={practiceIndex === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold hover:bg-muted disabled:opacity-40">
                <ArrowLeft size={15} /> Trước
              </button>
              {answered !== null && (
                <button onClick={nextPracticeQuestion} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-700">
                  {practiceIndex < practiceQuestions.length - 1 ? (
                    <>
                      <span>Câu tiếp</span>
                      <ArrowRight size={15} />
                    </>
                  ) : (
                    <>
                      <CheckCircle size={15} />
                      <span>Xem kết quả</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── STUDY — Result ── */}
      {studyView === "result" && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
            <div className="text-5xl mb-3">{Math.round((practiceAnswers.filter((a, i) => a === practiceQuestions[i]?.correctAnswer).length / practiceQuestions.length) * 100) >= 85 ? "🎉" : "📚"}</div>
            <h2 className="text-xl font-bold mb-1">Kết quả luyện tập</h2>
            <p className={`text-sm font-semibold ${currentTopic?.color || ""}`}>{currentTopic?.icon} {currentTopic?.name}</p>
            <div className="mt-4 flex justify-center gap-8">
              {[
                { v: practiceAnswers.filter((a, i) => a === practiceQuestions[i]?.correctAnswer).length, l: "Đúng", c: "text-green-600" },
                { v: practiceAnswers.filter((a, i) => a !== null && a !== practiceQuestions[i]?.correctAnswer).length, l: "Sai", c: "text-red-500" },
                { v: `${Math.round((practiceAnswers.filter((a, i) => a === practiceQuestions[i]?.correctAnswer).length / practiceQuestions.length) * 100)}%`, l: "Chính xác", c: "text-primary" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className={`text-3xl font-bold ${s.c}`}>{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {practiceQuestions.some((q, i) => practiceAnswers[i] !== null && practiceAnswers[i] !== q.correctAnswer) && (
            <div>
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <XCircle size={15} className="text-red-500" /> Câu trả lời sai
              </h3>
              {practiceQuestions.map((q, i) => {
                if (practiceAnswers[i] === null || practiceAnswers[i] === q.correctAnswer) return null;
                return (
                  <div key={q.id} className="bg-card border border-red-100 rounded-xl p-4 mb-3">
                    {q.imageUrl ? (
                      <div className="flex justify-center bg-gray-50 rounded-lg mb-2">
                        <img src={q.imageUrl} alt="" className="max-h-40 rounded-lg object-contain" />
                      </div>
                    ) : q.signKey && SIGN_MAP[q.signKey] && <div className="flex justify-center bg-gray-50 rounded-lg mb-2">{SIGN_MAP[q.signKey]}</div>}
                    <p className="text-sm font-semibold mb-2">{q.question}</p>
                    <p className="text-xs text-red-600">✗ Bạn chọn: {q.options[practiceAnswers[i]!]}</p>
                    <p className="text-xs text-green-700 mb-2">✓ Đáp án đúng: {q.options[q.correctAnswer]}</p>
                    <p className="text-xs text-blue-700 bg-blue-50 rounded-lg p-2">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => startPractice(selectedTopicId)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-700">
              <RotateCcw size={15} /> Luyện lại
            </button>
            <button onClick={() => setStudyView("topics")} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border font-bold text-sm hover:bg-muted">
              <ArrowLeft size={15} /> Đổi chủ đề
            </button>
          </div>
        </div>
      )}
    </>
  );
}
