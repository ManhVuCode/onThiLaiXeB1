import { useState, useEffect, useRef } from "react";
import {
  BookOpen, ClipboardList, Home, Award, TrendingUp, Target, BookMarked, Play, User, LogOut
} from "lucide-react";
import { Question, TOPICS, ALL_QUESTIONS } from "./data/questions";
import { EXAM_QUESTIONS_COUNT, EXAM_TIME, PASS_SCORE } from "./data/exam-config";
import { shuffle, generateExam } from "./lib/utils";
import AuthScreen from "./components/auth/AuthScreen";
import GoalsTab from "./components/goals/GoalsTab";
import PracticeFeature from "./features/practice/PracticeFeature";
import ExamFeature from "./features/exam/ExamFeature";

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

        {/* ── STUDY ── */}
        {activeTab === "study" && (
          <PracticeFeature
            studyView={studyView}
            currentTopic={currentTopic}
            practiceQuestions={practiceQuestions}
            practiceIndex={practiceIndex}
            practiceAnswers={practiceAnswers}
            showExplanation={showExplanation}
            selectedTopicId={selectedTopicId}
            topicProgress={topicProgress}
            startPractice={startPractice}
            handlePracticeAnswer={handlePracticeAnswer}
            nextPracticeQuestion={nextPracticeQuestion}
            setStudyView={setStudyView}
            setPracticeIndex={setPracticeIndex}
            setShowExplanation={setShowExplanation}
          />
        )}

        {/* ── EXAM ── */}
        {activeTab === "exam" && (
          <ExamFeature
            examView={examView}
            examQuestions={examQuestions}
            examIndex={examIndex}
            examAnswers={examAnswers}
            examTimeLeft={examTimeLeft}
            examHistory={examHistory}
            examScore={examScore}
            examCriticalFailed={examCriticalFailed}
            examPassed={examPassed}
            startExam={startExam}
            handleExamAnswer={handleExamAnswer}
            submitExam={submitExam}
            setExamIndex={setExamIndex}
            setExamView={setExamView}
          />
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <GoalsTab topicProgress={topicProgress} examHistory={examHistory} />
        )}
      </main>
    </div>
  );
}
