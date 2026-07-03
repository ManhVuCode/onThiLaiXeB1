import {
  BookOpen,
  Target,
  ClipboardList,
  CheckCircle,
  Shield,
  Flag,
  Award,
  AlertTriangle,
  Flame,
  Star
} from "lucide-react";
import { TOPICS, ALL_QUESTIONS } from "../../data/questions";

export default function GoalsTab({ topicProgress, examHistory }: {
  topicProgress: Record<number, { practiced: number; correct: number }>;
  examHistory: { score: number; passed: boolean }[];
}) {
  const topicsStudied = TOPICS.filter((t) => topicProgress[t.id]?.practiced > 0).length;
  const allTopicsAbove85 = TOPICS.every((t) => {
    const p = topicProgress[t.id];
    if (!p) return false;
    return (p.correct / p.practiced) >= 0.85;
  });
  const examsTaken = examHistory.length;
  const recentPassed = examHistory.slice(0, 2).every((e) => e.passed);
  const noRecentCriticalFail = examHistory.slice(0, 3).filter((e) => !e.passed).length === 0;

  const milestones = [
    { label: "Học ít nhất 1 lần tất cả 6 chủ đề", done: topicsStudied === 6, detail: `${topicsStudied}/6 chủ đề`, icon: BookOpen },
    { label: "Đạt tỷ lệ đúng > 85% ở mỗi chủ đề", done: allTopicsAbove85, detail: `${TOPICS.filter((t) => { const p = topicProgress[t.id]; return p && (p.correct / p.practiced) >= 0.85; }).length}/6 chủ đề`, icon: Target },
    { label: "Làm ít nhất 5 đề thi thử", done: examsTaken >= 5, detail: `${examsTaken}/5 đề`, icon: ClipboardList },
    { label: "Đỗ 2 đề thi thử liên tiếp gần nhất", done: recentPassed && examsTaken >= 2, detail: examsTaken < 2 ? "Chưa đủ dữ liệu" : recentPassed ? "Hoàn thành" : "Chưa đạt", icon: CheckCircle },
    { label: "Không sai câu điểm liệt trong 3 lần thi gần nhất", done: noRecentCriticalFail && examsTaken >= 3, detail: examsTaken < 3 ? "Chưa đủ dữ liệu" : noRecentCriticalFail ? "Hoàn thành" : "Chưa đạt", icon: Shield },
  ];

  const readyCount = milestones.filter((m) => m.done).length;
  const readyPct = Math.round((readyCount / milestones.length) * 100);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Mục tiêu & Điều kiện thi tốt</h2>

      {/* Readiness score */}
      <div className={`rounded-2xl p-6 text-white ${readyPct === 100 ? "bg-gradient-to-br from-green-500 to-green-700" : readyPct >= 60 ? "bg-gradient-to-br from-blue-600 to-blue-800" : "bg-gradient-to-br from-slate-600 to-slate-800"}`}>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="white" strokeWidth="8" strokeDasharray={`${readyPct * 2.136} 213.6`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{readyPct}%</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">Chỉ số sẵn sàng thi</h3>
            <p className="text-sm opacity-90">{readyPct === 100 ? "🎉 Bạn đã sẵn sàng! Hãy tự tin vào phòng thi." : readyPct >= 60 ? "📚 Đang tiến bộ tốt, tiếp tục ôn luyện!" : "💪 Hãy dành thêm thời gian ôn tập trước khi thi."}</p>
            <p className="text-xs opacity-70 mt-1">{readyCount}/{milestones.length} mục tiêu hoàn thành</p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2"><Flag size={16} className="text-primary" /> Các mục tiêu cần đạt trước khi thi</h3>
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${m.done ? "bg-green-50 border-green-200" : "bg-card border-border"}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.done ? "bg-green-500" : "bg-muted"}`}>
                {m.done ? <CheckCircle size={16} className="text-white" /> : <m.icon size={16} className="text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${m.done ? "text-green-800" : "text-foreground"}`}>{m.label}</p>
                <p className={`text-xs mt-0.5 ${m.done ? "text-green-600" : "text-muted-foreground"}`}>{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exam requirements */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Award size={16} className="text-amber-500" /> Yêu cầu điểm đề thi thực tế</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="text-3xl">📋</div>
            <div className="flex-1">
              <div className="font-bold text-blue-800 text-sm">Hạng B1 — Ô tô con dưới 9 chỗ</div>
              <div className="text-xs text-blue-700 mt-1 space-y-0.5">
                <div>• <strong>Số câu:</strong> 35 câu hỏi trắc nghiệm</div>
                <div>• <strong>Thời gian:</strong> 19 phút</div>
                <div>• <strong>Điểm đỗ:</strong> <span className="font-bold text-green-700">Trả lời đúng ≥ 32 câu</span> (91.4%)</div>
                <div>• <strong>Câu điểm liệt:</strong> Sai 1 câu = <span className="font-bold text-red-700">Không đỗ ngay dù đủ điểm</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { value: "35", label: "Tổng câu hỏi", color: "text-blue-700 bg-blue-50 border-blue-200" },
              { value: "32+", label: "Câu cần đúng", color: "text-green-700 bg-green-50 border-green-200" },
              { value: "19'", label: "Thời gian", color: "text-purple-700 bg-purple-50 border-purple-200" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border py-3 px-2 ${s.color}`}>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical questions explained */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2"><AlertTriangle size={16} /> Câu điểm liệt là gì?</h3>
        <p className="text-sm text-red-700 leading-relaxed mb-3">Câu điểm liệt là các câu hỏi về hành vi nguy hiểm đặc biệt. Nếu trả lời sai <strong>bất kỳ câu nào</strong> trong nhóm này, bạn sẽ bị trượt ngay dù đúng đủ 32 câu còn lại.</p>
        <div className="space-y-1.5">
          {ALL_QUESTIONS.filter((q) => q.isCritical).map((q, i) => (
            <div key={i} className="text-xs text-red-700 bg-white/70 rounded-lg px-3 py-2 border border-red-200">
              ⚠️ {q.question}
            </div>
          ))}
        </div>
      </div>

      {/* Study tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><Flame size={16} /> Mẹo học thi hiệu quả</h3>
        <div className="space-y-2">
          {[
            "Học theo từng chủ đề, không học tất cả một lúc.",
            "Đọc kỹ phần giải thích sau mỗi câu — đừng chỉ nhớ đáp án.",
            "Tập trung thuộc lòng các câu điểm liệt trước tiên.",
            "Làm ít nhất 3-5 đề thi thử trước khi thi thật.",
            "Ôn lại các câu sai nhiều lần cho đến khi chắc chắn.",
            "Biển báo cần học theo hình ảnh, không chỉ đọc chữ.",
            "Trước ngày thi: ngủ đủ giấc, không dùng rượu bia.",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-amber-800">
              <Star size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
