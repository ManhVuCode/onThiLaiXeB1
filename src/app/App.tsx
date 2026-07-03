import { useState, useEffect, useRef } from "react";
import {
  BookOpen, ClipboardList, Home, ChevronRight, CheckCircle, XCircle,
  Clock, Award, RotateCcw, ArrowLeft, ArrowRight, AlertTriangle,
  TrendingUp, Target, Zap, BookMarked, Play, User, LogOut,
  Eye, EyeOff, Star, Flag, Shield, Flame
} from "lucide-react";
import { Question, Topic, TOPICS, ALL_QUESTIONS } from "./data/questions";
import { EXAM_QUESTIONS_COUNT, EXAM_TIME, PASS_SCORE, OPTION_LABELS } from "./data/exam-config";
import { shuffle, generateExam, formatTime } from "./lib/utils";
import { SIGN_MAP } from "./components/signs";
import AuthScreen from "./components/auth/AuthScreen";
import GoalsTab from "./components/goals/GoalsTab";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  email: string;
  joinedAt: string;
  dailyGoal: number;
}

type Tab = "home" | "study" | "exam" | "goals";
type StudyView = "topics" | "practice" | "result";
type ExamView = "setup" | "taking" | "result";

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [studyView, setStudyView] = useState<StudyView>("topics");
  const [examView, setExamView] = useState<ExamView>("setup");

  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examIndex, setExamIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<(number | null)[]>([]);
  const [examTimeLeft, setExamTimeLeft] = useState(EXAM_TIME);
  const [examRunning, setExamRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [topicProgress, setTopicProgress] = useState<Record<number, { practiced: number; correct: number }>>({});
  const [examHistory, setExamHistory] = useState<{ score: number; total: number; passed: boolean; date: string }[]>([]);

  useEffect(() => {
    if (examRunning && examView === "taking") {
      timerRef.current = setInterval(() => {
        setExamTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setExamRunning(false);
            finishExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [examRunning, examView]);

  const finishExam = () => setExamView("result");

  const startPractice = (topicId: number) => {
    const questions = shuffle(ALL_QUESTIONS.filter((q) => q.topicId === topicId));
    setSelectedTopicId(topicId);
    setPracticeQuestions(questions);
    setPracticeIndex(0);
    setPracticeAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
    setStudyView("practice");
  };

  const handlePracticeAnswer = (optionIdx: number) => {
    if (practiceAnswers[practiceIndex] !== null) return;
    const updated = [...practiceAnswers];
    updated[practiceIndex] = optionIdx;
    setPracticeAnswers(updated);
    setShowExplanation(true);
  };

  const nextPracticeQuestion = () => {
    if (practiceIndex < practiceQuestions.length - 1) {
      setPracticeIndex(practiceIndex + 1);
      setShowExplanation(false);
    } else {
      const correct = practiceAnswers.filter((a, i) => a === practiceQuestions[i].correctAnswer).length;
      setTopicProgress((prev) => ({
        ...prev,
        [selectedTopicId]: { practiced: (prev[selectedTopicId]?.practiced || 0) + practiceQuestions.length, correct: (prev[selectedTopicId]?.correct || 0) + correct },
      }));
      setStudyView("result");
    }
  };

  const startExam = () => {
    const questions = generateExam();
    setExamQuestions(questions);
    setExamAnswers(new Array(questions.length).fill(null));
    setExamIndex(0);
    setExamTimeLeft(EXAM_TIME);
    setExamRunning(true);
    setExamView("taking");
  };

  const handleExamAnswer = (optionIdx: number) => {
    const updated = [...examAnswers];
    updated[examIndex] = optionIdx;
    setExamAnswers(updated);
  };

  const submitExam = () => {
    clearInterval(timerRef.current!);
    setExamRunning(false);
    const answers = [...examAnswers];
    const score = answers.filter((a, i) => a === examQuestions[i]?.correctAnswer).length;
    const criticalFail = examQuestions.some((q, i) => q.isCritical && answers[i] !== q.correctAnswer);
    const passed = score >= PASS_SCORE && !criticalFail;
    setExamHistory((prev) => [{ score, total: EXAM_QUESTIONS_COUNT, passed, date: new Date().toLocaleString("vi-VN") }, ...prev.slice(0, 9)]);
    setExamView("result");
  };

  const examScore = examAnswers.filter((a, i) => a === examQuestions[i]?.correctAnswer).length;
  const examCriticalFailed = examQuestions.some((q, i) => q.isCritical && examAnswers[i] !== null && examAnswers[i] !== q.correctAnswer);
  const examPassed = examScore >= PASS_SCORE && !examCriticalFailed;
  const totalPracticed = Object.values(topicProgress).reduce((s, v) => s + v.practiced, 0);
  const totalCorrect = Object.values(topicProgress).reduce((s, v) => s + v.correct, 0);
  const currentTopic = TOPICS.find((t) => t.id === selectedTopicId)!;

  if (!user) return <AuthScreen onAuth={setUser} />;

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "study", label: "Ôn luyện", icon: BookOpen },
    { id: "exam", label: "Thi thử", icon: ClipboardList },
    { id: "goals", label: "Mục tiêu", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-background font-[Be_Vietnam_Pro,sans-serif]">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg">🚗</div>
              <div>
                <div className="font-bold text-sm leading-tight">Ôn Luyện Lái Xe B1</div>
                <div className="text-xs text-blue-200 leading-tight hidden sm:block">Chào, {user.name.split(" ").pop()}!</div>
              </div>
            </div>
            <nav className="flex gap-0.5">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { setActiveTab(id); if (id === "study") setStudyView("topics"); if (id === "exam") setExamView("setup"); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === id ? "bg-white text-primary" : "text-blue-100 hover:bg-blue-700"}`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
              <button onClick={() => setUser(null)} className="ml-1 text-blue-200 hover:text-white p-1.5 rounded-lg hover:bg-blue-700 transition-colors" title="Đăng xuất">
                <LogOut size={15} />
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 pb-10">

        {/* ── HOME ── */}
        {activeTab === "home" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Xin chào, {user.name}!</h1>
                  <p className="text-blue-200 text-sm">Tham gia từ {user.joinedAt}</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm mb-4">Hãy ôn luyện đầy đủ 6 chủ đề và thi thử nhiều lần để đạt điểm cao nhất.</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { setActiveTab("study"); setStudyView("topics"); }} className="bg-white text-primary font-bold px-4 py-2 rounded-xl text-sm hover:bg-blue-50 flex items-center gap-1.5">
                  <BookMarked size={15} /> Ôn luyện
                </button>
                <button onClick={() => { setActiveTab("exam"); startExam(); }} className="bg-accent text-accent-foreground font-bold px-4 py-2 rounded-xl text-sm hover:bg-yellow-400 flex items-center gap-1.5">
                  <Play size={15} /> Thi thử ngay
                </button>
                <button onClick={() => setActiveTab("goals")} className="bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-white/30 flex items-center gap-1.5">
                  <Target size={15} /> Mục tiêu
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Câu đã ôn", value: totalPracticed, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
                { label: "Tỷ lệ đúng", value: totalPracticed > 0 ? `${Math.round(totalCorrect / totalPracticed * 100)}%` : "—", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50 border-green-100" },
                { label: "Đề đã thi", value: examHistory.length, icon: ClipboardList, color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
                { label: "Điểm cao nhất", value: examHistory.length > 0 ? `${Math.max(...examHistory.map((e) => e.score))}/35` : "—", icon: Award, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} rounded-xl p-4 border`}>
                  <s.icon size={18} className={`${s.color} mb-2`} />
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Topics */}
            <div>
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2"><BookOpen size={16} className="text-primary" /> Chủ đề ôn luyện</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TOPICS.map((topic) => {
                  const prog = topicProgress[topic.id];
                  const topicQs = ALL_QUESTIONS.filter((q) => q.topicId === topic.id);
                  const pct = prog ? Math.round(prog.correct / prog.practiced * 100) : null;
                  return (
                    <button key={topic.id} onClick={() => { setActiveTab("study"); startPractice(topic.id); }} className={`text-left ${topic.bg} border ${topic.border} rounded-xl p-4 hover:shadow-md transition-all`}>
                      <div className="text-2xl mb-1.5">{topic.icon}</div>
                      <div className={`font-bold text-xs ${topic.color}`}>{topic.name}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{topicQs.length} câu</span>
                        {pct !== null ? <span className={`text-xs font-bold ${pct >= 85 ? "text-green-600" : "text-amber-600"}`}>{pct}%</span> : <span className="text-xs text-muted-foreground">Chưa học</span>}
                      </div>
                      {prog && <div className="mt-1.5 h-1 bg-white/60 rounded-full overflow-hidden"><div className={`h-full rounded-full ${pct! >= 85 ? "bg-green-500" : "bg-amber-400"}`} style={{ width: `${pct}%` }} /></div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {examHistory.length > 0 && (
              <div>
                <h2 className="font-bold text-foreground mb-3 flex items-center gap-2"><TrendingUp size={16} className="text-primary" /> Lịch sử thi</h2>
                {examHistory.slice(0, 4).map((e, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${e.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{e.passed ? "✓" : "✗"}</span>
                      <div>
                        <div className={`text-sm font-bold ${e.passed ? "text-green-700" : "text-red-600"}`}>{e.passed ? "ĐỖ" : "TRƯỢT"}</div>
                        <div className="text-xs text-muted-foreground">{e.date}</div>
                      </div>
                    </div>
                    <span className="font-bold text-foreground">{e.score}/{e.total}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STUDY — Topics ── */}
        {activeTab === "study" && studyView === "topics" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Ôn luyện theo chủ đề</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TOPICS.map((topic) => {
                const topicQs = ALL_QUESTIONS.filter((q) => q.topicId === topic.id);
                const prog = topicProgress[topic.id];
                const pct = prog ? Math.round(prog.correct / prog.practiced * 100) : null;
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
                          <span className={`font-bold ${pct! >= 85 ? "text-green-600" : "text-amber-600"}`}>{pct}% đúng {pct! >= 85 ? "✓" : ""}</span>
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
        {activeTab === "study" && studyView === "practice" && practiceQuestions.length > 0 && (() => {
          const q = practiceQuestions[practiceIndex];
          const answered = practiceAnswers[practiceIndex];
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setStudyView("topics")} className="text-primary hover:underline text-sm flex items-center gap-1"><ArrowLeft size={14} /> Chủ đề</button>
                <ChevronRight size={14} className="text-muted-foreground" />
                <span className={`text-sm font-semibold ${currentTopic.color}`}>{currentTopic.icon} {currentTopic.name}</span>
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
                {q.isCritical && <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 mb-3 font-semibold"><AlertTriangle size={13} /> ⚠️ Câu điểm liệt — Sai sẽ không đỗ</div>}
                {q.signKey && SIGN_MAP[q.signKey] && (
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
                  <div className="text-xs font-bold text-blue-700 mb-1 flex items-center gap-1"><BookOpen size={13} /> Giải thích</div>
                  <p className="text-sm text-blue-900 leading-relaxed">{q.explanation}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => { setPracticeIndex(Math.max(0, practiceIndex - 1)); setShowExplanation(practiceAnswers[practiceIndex - 1] !== null); }} disabled={practiceIndex === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold hover:bg-muted disabled:opacity-40">
                  <ArrowLeft size={15} /> Trước
                </button>
                {answered !== null && (
                  <button onClick={nextPracticeQuestion} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-700">
                    {practiceIndex < practiceQuestions.length - 1 ? <><span>Câu tiếp</span><ArrowRight size={15} /></> : <><CheckCircle size={15} /><span>Xem kết quả</span></>}
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── STUDY — Result ── */}
        {activeTab === "study" && studyView === "result" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
              <div className="text-5xl mb-3">{Math.round(practiceAnswers.filter((a, i) => a === practiceQuestions[i]?.correctAnswer).length / practiceQuestions.length * 100) >= 85 ? "🎉" : "📚"}</div>
              <h2 className="text-xl font-bold mb-1">Kết quả luyện tập</h2>
              <p className={`text-sm font-semibold ${currentTopic.color}`}>{currentTopic.icon} {currentTopic.name}</p>
              <div className="mt-4 flex justify-center gap-8">
                {[
                  { v: practiceAnswers.filter((a, i) => a === practiceQuestions[i]?.correctAnswer).length, l: "Đúng", c: "text-green-600" },
                  { v: practiceAnswers.filter((a, i) => a !== null && a !== practiceQuestions[i]?.correctAnswer).length, l: "Sai", c: "text-red-500" },
                  { v: `${Math.round(practiceAnswers.filter((a, i) => a === practiceQuestions[i]?.correctAnswer).length / practiceQuestions.length * 100)}%`, l: "Chính xác", c: "text-primary" },
                ].map((s) => (
                  <div key={s.l} className="text-center"><div className={`text-3xl font-bold ${s.c}`}>{s.v}</div><div className="text-xs text-muted-foreground">{s.l}</div></div>
                ))}
              </div>
            </div>

            {practiceQuestions.some((q, i) => practiceAnswers[i] !== null && practiceAnswers[i] !== q.correctAnswer) && (
              <div>
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2"><XCircle size={15} className="text-red-500" /> Câu trả lời sai</h3>
                {practiceQuestions.map((q, i) => {
                  if (practiceAnswers[i] === null || practiceAnswers[i] === q.correctAnswer) return null;
                  return (
                    <div key={q.id} className="bg-card border border-red-100 rounded-xl p-4 mb-3">
                      {q.signKey && SIGN_MAP[q.signKey] && <div className="flex justify-center bg-gray-50 rounded-lg mb-2">{SIGN_MAP[q.signKey]}</div>}
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

        {/* ── EXAM — Setup ── */}
        {activeTab === "exam" && examView === "setup" && (
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
        {activeTab === "exam" && examView === "taking" && examQuestions.length > 0 && (
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
        {activeTab === "exam" && examView === "result" && (
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
                { v: `${Math.round(examScore / EXAM_QUESTIONS_COUNT * 100)}%`, l: "Chính xác", c: "bg-blue-50 border-blue-200 text-blue-700" },
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

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <GoalsTab topicProgress={topicProgress} examHistory={examHistory} />
        )}
      </main>
    </div>
  );
}
