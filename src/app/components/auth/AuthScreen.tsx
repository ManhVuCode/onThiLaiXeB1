import { useState } from "react";
import { Eye, EyeOff, Zap } from "lucide-react";
import type { UserProfile } from "../../App";

type AuthView = "login" | "register";

export default function AuthScreen({ onAuth }: { onAuth: (user: UserProfile) => void }) {
  const [view, setView] = useState<AuthView>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Vui lòng điền đầy đủ thông tin."); return; }
    if (view === "register" && !name) { setError("Vui lòng nhập họ tên."); return; }
    if (password.length < 6) { setError("Mật khẩu phải có ít nhất 6 ký tự."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({ name: name || email.split("@")[0], email, joinedAt: new Date().toLocaleDateString("vi-VN"), dailyGoal: 20 });
    }, 800);
  };

  const handleDemo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({ name: "Học viên Demo", email: "demo@b1.edu.vn", joinedAt: new Date().toLocaleDateString("vi-VN"), dailyGoal: 20 });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4">
            <span className="text-4xl">🚗</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Ôn Luyện B1</h1>
          <p className="text-blue-200 text-sm mt-1">Hệ thống thi thử lý thuyết lái xe</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border">
            {(["login", "register"] as AuthView[]).map((v) => (
              <button
                key={v}
                onClick={() => { setView(v); setError(""); }}
                className={`flex-1 py-3.5 text-sm font-bold transition-colors ${view === v ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              >
                {v === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {view === "register" && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Họ và tên</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tối thiểu 6 ký tự" className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : null}
              {view === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">hoặc</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button type="button" onClick={handleDemo} disabled={loading} className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
              <Zap size={15} /> Dùng thử không cần đăng ký
            </button>
          </form>

          <div className="px-6 pb-5 text-center text-xs text-muted-foreground">
            Bằng cách tiếp tục, bạn đồng ý với điều khoản sử dụng của hệ thống thi thử lái xe B1.
          </div>
        </div>

        {/* Info badges */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          {["75 câu hỏi", "6 chủ đề", "Đề thi thử", "Miễn phí"].map((t) => (
            <span key={t} className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-semibold">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
