import React from "react";
import {
  Play, Clock, ArrowLeft, ArrowRight, CheckCircle, RotateCcw, AlertTriangle, ClipboardList
} from "lucide-react";
import { Question, TOPICS } from "../../data/questions";
import { EXAM_QUESTIONS_COUNT, OPTION_LABELS } from "../../data/exam-config";
import { SIGN_MAP } from "../../components/signs";
import { formatTime } from "../../lib/utils";

export type ExamView = "setup" | "taking" | "result";

interface ExamFeatureProps {
  examView: ExamView;
  examQuestions: Question[];
  examIndex: number;
  examAnswers: (number | null)[];
  examTimeLeft: number;
  examHistory: { score: number; total: number; passed: boolean; date: string }[];
  examScore: number;
  examCriticalFailed: boolean;
  examPassed: boolean;
  startExam: () => void;
  handleExamAnswer: (optionIdx: number) => void;
  submitExam: () => void;
  setExamIndex: (index: number) => void;
  setExamView: (view: ExamView) => void;
}

export default function ExamFeature({
  examView,
  examQuestions,
  examIndex,
  examAnswers,
  examTimeLeft,
  examHistory,
  examScore,
  examCriticalFailed,
  examPassed,
  startExam,
  handleExamAnswer,
  submitExam,
  setExamIndex,
  setExamView,
}: ExamFeatureProps) {
  return (
    <>
      {/* ── EXAM — Setup ── */}
      {examView === "setup" && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Thi thử lý thuyết B1</h2>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-4">Thông tin đề thi</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { icon: "📝", label: "Số câu", value: "35 câu" },
                { icon: "⏱️", label: "Thời gian", value: "19 phút" },
                { icon: "✅", label: "Điểm đỗ", value: "≥ 32 câu" },
                { icon: "⚠️", label: "Điểm liệt", value: "Sai = Trượt" },
              ].map((info) => (
                <div key={info.label} className="text-center bg-secondary/40 rounded-xl p-3">
                  <div className="text-2xl mb-1">{info.icon}</div>
                  <div className="font-bold text-sm text-foreground">{info.value}</div>
                  <div className="text-xs text-muted-foreground">{info.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <strong>Lưu ý:</strong> Câu hỏi lấy ngẫu nhiên từ 6 chủ đề. Sai câu điểm liệt (⚠️) = trượt dù điểm cao.
            </div>
          </div>

          <button onClick={startExam} className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-lg">
            <Play size={20} /> Bắt đầu thi thử
          </button>

          {examHistory.length > 0 && (
            <div>
              <h3 className="font-bold mb-3">Lịch sử thi</h3>
              {examHistory.map((e, i) => (
                <div key={i} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${e.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{e.passed ? "✓" : "✗"}</span>
                    <div>
                      <div className={`text-sm font-bold ${e.passed ? "text-green-700" : "text-red-600"}`}>{e.passed ? "ĐỖ" : "TRƯỢT"}</div>
                      <div className="text-xs text-muted-foreground">{e.date}</div>
                    </div>
                  </div>
                  <span className="font-bold">{e.score}/{e.total}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── EXAM — Taking ── */}
      {examView === "taking" && examQuestions.length > 0 && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between sticky top-16 z-40 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold">Câu {examIndex + 1}/{EXAM_QUESTIONS_COUNT}</div>
              <div className="text-xs text-muted-foreground">{examAnswers.filter((a) => a !== null).length} đã trả lời</div>
            </div>
            <div className={`flex items-center gap-2 font-mono font-bold text-lg ${examTimeLeft < 120 ? "text-red-600" : examTimeLeft < 300 ? "text-amber-600" : "text-foreground"}`}>
              <Clock size={17} />{formatTime(examTimeLeft)}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {examQuestions.map((_, i) => (
              <button key={i} onClick={() => setExamIndex(i)} className={`w-7 h-7 rounded-md text-xs font-bold transition-all ${i === examIndex ? "bg-primary text-white ring-2 ring-primary/50" : examAnswers[i] !== null ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground hover:bg-secondary"}`}>
                {i + 1}
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            {examQuestions[examIndex].isCritical && <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 mb-3 font-semibold"><AlertTriangle size={13} /> ⚠️ Câu điểm liệt</div>}
            {examQuestions[examIndex].signKey && SIGN_MAP[examQuestions[examIndex].signKey!] && (
              <div className="flex justify-center bg-gray-50 rounded-xl mb-3 py-2">{SIGN_MAP[examQuestions[examIndex].signKey!]}</div>
            )}
            <p className="font-semibold text-foreground leading-relaxed">{examQuestions[examIndex].question}</p>
          </div>

          <div className="space-y-2.5">
            {examQuestions[examIndex].options.map((opt, i) => {
              const selected = examAnswers[examIndex] === i;
              return (
                <button key={i} onClick={() => handleExamAnswer(i)} className={`w-full text-left border-2 rounded-xl px-4 py-3 transition-all flex items-start gap-3 ${selected ? "bg-primary/10 border-primary text-primary" : "bg-card border-border hover:border-primary/50 hover:bg-secondary/30"}`}>
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${selected ? "bg-primary text-white border-primary" : "border-border bg-muted text-muted-foreground"}`}>{OPTION_LABELS[i]}</span>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setExamIndex(Math.max(0, examIndex - 1))} disabled={examIndex === 0} className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold hover:bg-muted disabled:opacity-40 flex items-center gap-2">
              <ArrowLeft size={15} /> Trước
            </button>
            {examIndex < EXAM_QUESTIONS_COUNT - 1 ? (
              <button onClick={() => setExamIndex(examIndex + 1)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-700">
                Tiếp theo <ArrowRight size={15} />
              </button>
            ) : (
              <button onClick={submitExam} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700">
                <CheckCircle size={15} /> Nộp bài
              </button>
            )}
            {examAnswers.filter((a) => a !== null).length === EXAM_QUESTIONS_COUNT && examIndex < EXAM_QUESTIONS_COUNT - 1 && (
              <button onClick={submitExam} className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 flex items-center gap-1.5">
                <CheckCircle size={14} /> Nộp
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── EXAM — Result ── */}
      {examView === "result" && (
        <div className="space-y-5">
          <div className={`rounded-2xl p-6 text-white text-center ${examPassed ? "bg-gradient-to-br from-green-500 to-green-700" : "bg-gradient-to-br from-red-500 to-red-700"}`}>
            <div className="text-5xl mb-2">{examPassed ? "🎉" : "😔"}</div>
            <h2 className="text-2xl font-bold">{examPassed ? "CHÚC MỪNG! ĐỖ THI!" : "CHƯA ĐỖ LẦN NÀY"}</h2>
            <div className="text-5xl font-bold my-3">{examScore}<span className="text-2xl font-normal">/{EXAM_QUESTIONS_COUNT}</span></div>
            {examCriticalFailed && !examPassed && <div className="mt-2 bg-white/20 rounded-lg px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1"><AlertTriangle size={13} /> Sai câu điểm liệt</div>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { v: examScore, l: "Đúng", c: "bg-green-50 border-green-200 text-green-700" },
              { v: EXAM_QUESTIONS_COUNT - examScore, l: "Sai", c: "bg-red-50 border-red-200 text-red-600" },
              { v: `${Math.round((examScore / EXAM_QUESTIONS_COUNT) * 100)}%`, l: "Chính xác", c: "bg-blue-50 border-blue-200 text-blue-700" },
            ].map((s) => (
              <div key={s.l} className={`border rounded-xl p-3 text-center ${s.c}`}><div className="text-2xl font-bold">{s.v}</div><div className="text-xs">{s.l}</div></div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setExamView("setup")} className="flex-1 py-3 rounded-xl bg-card border border-border font-bold text-sm hover:bg-muted flex items-center justify-center gap-2">
              <ArrowLeft size={15} /> Về trang thi
            </button>
            <button onClick={startExam} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-700 flex items-center justify-center gap-2">
              <RotateCcw size={15} /> Thi lại
            </button>
          </div>

          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2"><ClipboardList size={15} className="text-primary" /> Chi tiết từng câu</h3>
            <div className="space-y-3">
              {examQuestions.map((q, i) => {
                const ua = examAnswers[i];
                const correct = ua === q.correctAnswer;
                return (
                  <div key={q.id} className={`bg-card border rounded-xl p-4 ${!correct ? "border-red-100" : "border-border"}`}>
                    <div className="flex items-start gap-2 mb-1">
                      <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{correct ? "✓" : "✗"}</span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-xs text-muted-foreground">Câu {i + 1}</span>
                          {q.isCritical && <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-semibold">⚠️ Điểm liệt</span>}
                          <span className="text-xs text-muted-foreground">{TOPICS.find((t) => t.id === q.topicId)?.icon}</span>
                        </div>
                        {q.signKey && SIGN_MAP[q.signKey] && <div className="flex bg-gray-50 rounded-lg mb-1 scale-75 origin-left">{SIGN_MAP[q.signKey]}</div>}
                        <p className="text-sm font-semibold">{q.question}</p>
                      </div>
                    </div>
                    {!correct && (
                      <>
                        <p className="text-xs text-red-600 ml-7">✗ Bạn chọn: {ua !== null ? q.options[ua] : "Chưa trả lời"}</p>
                        <p className="text-xs text-green-700 ml-7">✓ Đúng: {q.options[q.correctAnswer]}</p>
                        <p className="text-xs text-blue-700 bg-blue-50 rounded-lg p-2 ml-7 mt-1">{q.explanation}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
