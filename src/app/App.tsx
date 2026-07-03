import { useState, useEffect, useRef } from "react";
import {
  BookOpen, ClipboardList, Home, ChevronRight, CheckCircle, XCircle,
  Clock, Award, RotateCcw, ArrowLeft, ArrowRight, AlertTriangle,
  TrendingUp, Target, Zap, BookMarked, Play, User, LogOut,
  Eye, EyeOff, Star, Flag, Shield, Flame
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface UserProfile {
  name: string;
  email: string;
  joinedAt: string;
  dailyGoal: number;
}

interface Question {
  id: number;
  topicId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  isCritical?: boolean;
  signKey?: string;
}

interface Topic {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
}

type Tab = "home" | "study" | "exam" | "goals";
type StudyView = "topics" | "practice" | "result";
type ExamView = "setup" | "taking" | "result";
type AuthView = "login" | "register";

// ─── SVG TRAFFIC SIGNS ───────────────────────────────────────────────────────

const SignWrapper = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-2 py-3">
    {children}
    {label && <p className="text-xs text-muted-foreground italic">{label}</p>}
  </div>
);

// Biển cấm: vòng tròn viền đỏ, nền trắng
const SpeedLimitSign = ({ limit }: { limit: number }) => (
  <SignWrapper label={`Biển giới hạn tốc độ ${limit} km/h`}>
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="56" fill="white" stroke="#CC0000" strokeWidth="11" />
      <text x="60" y="78" textAnchor="middle" fontSize={limit >= 100 ? 32 : 40} fontWeight="900" fill="#111" fontFamily="Arial, sans-serif">{limit}</text>
    </svg>
  </SignWrapper>
);

// Biển cấm đi ngược chiều: tròn đỏ, thanh ngang trắng
const NoEntrySign = () => (
  <SignWrapper label="Biển cấm đi ngược chiều">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="56" fill="#CC0000" />
      <rect x="18" y="47" width="84" height="26" rx="4" fill="white" />
    </svg>
  </SignWrapper>
);

// Biển nguy hiểm: tam giác viền đỏ
const WarningSign = ({ symbol, label }: { symbol: string; label: string }) => (
  <SignWrapper label={label}>
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,8 112,102 8,102" fill="#FFFDE7" stroke="#CC0000" strokeWidth="9" strokeLinejoin="round" />
      <text x="60" y="90" textAnchor="middle" fontSize="34" fontFamily="Arial">{symbol}</text>
    </svg>
  </SignWrapper>
);

// Biển ưu tiên: hình thoi vàng
const PriorityRoadSign = () => (
  <SignWrapper label="Biển đường ưu tiên (hình thoi vàng)">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <rect x="60" y="6" width="76" height="76" rx="4" fill="#F9A825" stroke="#5D4037" strokeWidth="5" transform="rotate(45 60 60)" />
    </svg>
  </SignWrapper>
);

// Biển nhường đường: tam giác ngược
const YieldSign = () => (
  <SignWrapper label="Biển nhường đường (tam giác ngược)">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,102 8,8 112,8" fill="white" stroke="#CC0000" strokeWidth="9" strokeLinejoin="round" />
      <polygon points="60,86 22,20 98,20" fill="#CC0000" />
      <polygon points="60,76 30,26 90,26" fill="white" />
    </svg>
  </SignWrapper>
);

// Biển dừng lại (STOP): bát giác đỏ
const StopSign = () => (
  <SignWrapper label="Biển dừng lại (STOP)">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <polygon points="38,8 82,8 112,38 112,82 82,112 38,112 8,82 8,38" fill="#CC0000" stroke="#880000" strokeWidth="3" />
      <text x="60" y="72" textAnchor="middle" fontSize="24" fontWeight="900" fill="white" fontFamily="Arial">STOP</text>
    </svg>
  </SignWrapper>
);

// Biển cấm rẽ trái
const NoLeftTurnSign = () => (
  <SignWrapper label="Biển cấm rẽ trái">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#CC0000" strokeWidth="9" />
      <path d="M75,75 L55,55 L55,68 L38,68 L38,45 L55,45 L55,58" stroke="#333" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="25" y1="25" x2="95" y2="95" stroke="#CC0000" strokeWidth="9" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển cấm quay đầu
const NoUTurnSign = () => (
  <SignWrapper label="Biển cấm quay đầu xe">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#CC0000" strokeWidth="9" />
      <path d="M40,80 L40,52 A22,22 0 0,1 84,52 L84,68 L75,58 L93,58 L83,72" stroke="#333" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="25" y1="25" x2="95" y2="95" stroke="#CC0000" strokeWidth="9" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển cấm dừng đỗ xe
const NoParkingSign = () => (
  <SignWrapper label="Biển cấm đỗ xe">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#CC0000" strokeWidth="9" />
      <text x="60" y="75" textAnchor="middle" fontSize="46" fontWeight="900" fill="#1565C0" fontFamily="Arial">P</text>
      <line x1="25" y1="25" x2="95" y2="95" stroke="#CC0000" strokeWidth="9" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển một chiều: nền xanh, mũi tên trắng
const OneWaySign = () => (
  <SignWrapper label="Biển đường một chiều">
    <svg viewBox="0 0 160 80" className="h-20 w-40 drop-shadow-md">
      <rect x="2" y="2" width="156" height="76" rx="8" fill="#1565C0" />
      <polygon points="115,40 80,15 80,30 45,30 45,50 80,50 80,65" fill="white" />
    </svg>
  </SignWrapper>
);

// Biển kết thúc hạn chế tốc độ
const EndSpeedLimitSign = ({ limit }: { limit: number }) => (
  <SignWrapper label={`Biển hết hạn chế tốc độ ${limit} km/h`}>
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#555" strokeWidth="5" />
      <text x="60" y="78" textAnchor="middle" fontSize={limit >= 100 ? 32 : 40} fontWeight="900" fill="#888" fontFamily="Arial">{limit}</text>
      <line x1="20" y1="20" x2="100" y2="100" stroke="#333" strokeWidth="7" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển giao nhau đường sắt
const RailwayCrossingSign = () => (
  <SignWrapper label="Biển giao nhau với đường sắt không có rào chắn">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,8 112,102 8,102" fill="#FFFDE7" stroke="#CC0000" strokeWidth="9" strokeLinejoin="round" />
      <text x="60" y="55" textAnchor="middle" fontSize="22" fontFamily="Arial" fill="#111">╋</text>
      <text x="60" y="82" textAnchor="middle" fontSize="14" fontFamily="Arial" fill="#333">🚂</text>
    </svg>
  </SignWrapper>
);

// Vạch dừng STOP
const StopLineMarking = () => (
  <SignWrapper label="Vạch dừng xe STOP trên mặt đường">
    <svg viewBox="0 0 180 100" className="h-20 w-44 drop-shadow-sm">
      <rect x="0" y="0" width="180" height="100" rx="6" fill="#e8e8e8" />
      <rect x="10" y="60" width="160" height="12" rx="2" fill="#f5f5f5" stroke="#aaa" strokeWidth="1" />
      <text x="90" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#cc0000" fontFamily="Arial">STOP</text>
      <text x="90" y="88" textAnchor="middle" fontSize="11" fill="#555" fontFamily="Arial">▶ Hướng xe đi ▶</text>
    </svg>
  </SignWrapper>
);

// Vạch kẻ đường liền và đứt
const RoadMarkings = () => (
  <SignWrapper label="Vạch kẻ đường liền (trái) và đứt (phải)">
    <svg viewBox="0 0 220 80" className="h-20 w-52 drop-shadow-sm">
      <rect x="0" y="0" width="220" height="80" rx="6" fill="#555" />
      <line x1="110" y1="0" x2="110" y2="80" stroke="#888" strokeWidth="1" />
      <line x1="55" y1="5" x2="55" y2="75" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <line x1="165" y1="5" x2="165" y2="22" stroke="white" strokeWidth="5" strokeLinecap="round" strokeDasharray="16,14" />
      <text x="55" y="42" textAnchor="middle" fontSize="9" fill="#ffcc00" fontFamily="Arial">LIỀN</text>
      <text x="165" y="42" textAnchor="middle" fontSize="9" fill="#ffcc00" fontFamily="Arial">ĐỨT</text>
    </svg>
  </SignWrapper>
);

// Biển hiệu lệnh xanh tròn - hướng bắt buộc đi thẳng
const MandatoryStraightSign = () => (
  <SignWrapper label="Biển bắt buộc đi thẳng">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#1565C0" />
      <polygon points="60,28 60,78 45,63 60,78 75,63" stroke="white" strokeWidth="0" fill="white" />
      <rect x="52" y="42" width="16" height="48" rx="4" fill="white" />
      <polygon points="60,26 44,50 76,50" fill="white" />
    </svg>
  </SignWrapper>
);

// Biển đèn xanh mũi tên
const GreenArrowSignal = ({ direction }: { direction: "straight" | "left" | "right" }) => {
  const rotate = direction === "left" ? "rotate(-90 60 60)" : direction === "right" ? "rotate(90 60 60)" : "";
  return (
    <SignWrapper label={`Đèn tín hiệu mũi tên xanh hướng ${direction === "straight" ? "thẳng" : direction === "left" ? "trái" : "phải"}`}>
      <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
        <rect x="2" y="2" width="116" height="116" rx="10" fill="#111" />
        <g transform={rotate}>
          <rect x="48" y="35" width="24" height="45" rx="4" fill="#22c55e" />
          <polygon points="60,20 38,52 82,52" fill="#22c55e" />
        </g>
      </svg>
    </SignWrapper>
  );
};

// Sơ đồ vòng xuyến
const RoundaboutDiagram = () => (
  <SignWrapper label="Sơ đồ vòng xuyến — xe trong vòng được ưu tiên">
    <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-sm">
      <rect x="0" y="0" width="160" height="160" rx="8" fill="#f5f5f5" />
      <circle cx="80" cy="80" r="50" fill="#ddd" stroke="#999" strokeWidth="2" />
      <circle cx="80" cy="80" r="30" fill="#f5f5f5" stroke="#bbb" strokeWidth="2" />
      <path d="M80,30 A50,50 0 1,1 79.9,30" stroke="#1565C0" strokeWidth="5" fill="none" markerEnd="url(#arr)" strokeLinecap="round" />
      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1565C0" /></marker></defs>
      <line x1="80" y1="0" x2="80" y2="30" stroke="#888" strokeWidth="6" />
      <line x1="80" y1="130" x2="80" y2="160" stroke="#888" strokeWidth="6" />
      <line x1="0" y1="80" x2="30" y2="80" stroke="#888" strokeWidth="6" />
      <line x1="130" y1="80" x2="160" y2="80" stroke="#888" strokeWidth="6" />
      <text x="80" y="84" textAnchor="middle" fontSize="11" fill="#555" fontFamily="Arial">Vòng</text>
    </svg>
  </SignWrapper>
);

// Biển cấm vượt xe
const NoOvertakingSign = () => (
  <SignWrapper label="Biển cấm vượt xe">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#CC0000" strokeWidth="9" />
      <rect x="28" y="50" width="28" height="22" rx="4" fill="#CC0000" />
      <rect x="64" y="50" width="28" height="22" rx="4" fill="#555" />
      <line x1="25" y1="25" x2="95" y2="95" stroke="#CC0000" strokeWidth="9" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển cảnh báo trẻ em
const ChildrenWarningSign = () => (
  <SignWrapper label="Biển cảnh báo khu vực có trẻ em">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,8 112,102 8,102" fill="#FFFDE7" stroke="#CC0000" strokeWidth="9" strokeLinejoin="round" />
      <text x="60" y="88" textAnchor="middle" fontSize="42" fontFamily="Arial">👧</text>
    </svg>
  </SignWrapper>
);

const SIGN_MAP: Record<string, React.ReactNode> = {
  "speed-50": <SpeedLimitSign limit={50} />,
  "speed-60": <SpeedLimitSign limit={60} />,
  "speed-80": <SpeedLimitSign limit={80} />,
  "speed-120": <SpeedLimitSign limit={120} />,
  "no-entry": <NoEntrySign />,
  "warning-triangle": <WarningSign symbol="⚠" label="Biển nguy hiểm hình tam giác viền đỏ" />,
  "priority-road": <PriorityRoadSign />,
  "yield": <YieldSign />,
  "stop-sign": <StopSign />,
  "no-left-turn": <NoLeftTurnSign />,
  "no-uturn": <NoUTurnSign />,
  "no-parking": <NoParkingSign />,
  "one-way": <OneWaySign />,
  "end-speed-50": <EndSpeedLimitSign limit={50} />,
  "railway-crossing": <RailwayCrossingSign />,
  "stop-line": <StopLineMarking />,
  "road-markings": <RoadMarkings />,
  "mandatory-straight": <MandatoryStraightSign />,
  "green-arrow-straight": <GreenArrowSignal direction="straight" />,
  "roundabout": <RoundaboutDiagram />,
  "no-overtaking": <NoOvertakingSign />,
  "children-warning": <ChildrenWarningSign />,
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TOPICS: Topic[] = [
  { id: 1, name: "Khái niệm & Quy tắc", description: "Luật giao thông, nhường đường, ưu tiên", icon: "📋", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  { id: 2, name: "Biển báo hiệu", description: "Biển cấm, biển nguy hiểm, biển chỉ dẫn", icon: "🚦", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  { id: 3, name: "Sa hình & Tình huống", description: "Các tình huống giao thông thực tế", icon: "🗺️", color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  { id: 4, name: "Kỹ thuật lái xe", description: "Kỹ năng vận hành, xử lý tình huống", icon: "🚗", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  { id: 5, name: "Cấu tạo xe", description: "Động cơ, hệ thống phanh, an toàn xe", icon: "⚙️", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
  { id: 6, name: "Pháp luật & Xử phạt", description: "Mức phạt, giấy tờ, bằng lái xe", icon: "⚖️", color: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200" },
];

const ALL_QUESTIONS: Question[] = [
  // ── TOPIC 1 ──
  { id: 1, topicId: 1, question: "Đường ưu tiên là gì?", options: ["Đường dành riêng cho xe cứu thương, cứu hỏa", "Đường mà xe đi vào được các xe từ hướng khác nhường đường khi qua giao lộ", "Đường có dải phân cách giữa", "Đường có vạch kẻ liên tục"], correctAnswer: 1, explanation: "Đường ưu tiên là đường mà xe đi vào đó được các xe từ hướng khác nhường đường khi qua nơi đường giao nhau, không có tín hiệu điều khiển giao thông." },
  { id: 2, topicId: 1, question: "Khi gặp xe ưu tiên (xe cứu thương, cảnh sát, cứu hỏa) đang hú còi, người điều khiển phương tiện phải:", options: ["Tăng tốc để tránh đường", "Dừng lại bên phải đường, nhường đường cho xe ưu tiên", "Đi sát vào lề trái", "Bấm còi để thông báo"], correctAnswer: 1, explanation: "Khi gặp xe ưu tiên có tín hiệu còi, đèn ưu tiên, người điều khiển phương tiện phải dừng lại sát lề đường bên phải để nhường đường.", isCritical: true },
  { id: 3, topicId: 1, question: "Tốc độ tối đa cho phép trong khu đông dân cư đối với xe ô tô con là bao nhiêu?", options: ["40 km/h", "50 km/h", "60 km/h", "30 km/h"], correctAnswer: 1, explanation: "Tốc độ tối đa trong khu đông dân cư đối với xe ô tô con là 50 km/h theo quy định hiện hành." },
  { id: 4, topicId: 1, question: "Nơi đường giao nhau không có tín hiệu giao thông, xe từ hướng nào được ưu tiên đi trước?", options: ["Xe từ trái sang phải", "Xe từ bên phải đến", "Xe có tải trọng lớn hơn", "Xe đến trước"], correctAnswer: 1, explanation: "Tại nơi đường giao nhau không có tín hiệu, xe đến từ bên phải được ưu tiên đi trước." },
  { id: 5, topicId: 1, question: "Đèn vàng tín hiệu giao thông có nghĩa là:", options: ["Được phép đi nhưng cẩn thận", "Chuẩn bị dừng lại, trừ khi đã vào giao lộ trước khi đèn vàng bật", "Tăng tốc để qua nhanh", "Chỉ áp dụng cho xe tải"], correctAnswer: 1, explanation: "Đèn vàng báo hiệu chuẩn bị dừng lại. Nếu xe đã vào giao lộ trước khi đèn vàng bật thì tiếp tục đi, còn nếu chưa vào thì phải dừng." },
  { id: 6, topicId: 1, question: "Người điều khiển xe không được uống rượu bia trước khi lái. Nồng độ cồn cho phép trong máu là:", options: ["Dưới 50mg/100ml máu", "Dưới 80mg/100ml máu", "Bằng 0 (không được có nồng độ cồn)", "Dưới 30mg/100ml máu"], correctAnswer: 2, explanation: "Theo quy định hiện hành, người điều khiển phương tiện không được có nồng độ cồn trong máu (bằng 0).", isCritical: true },
  { id: 7, topicId: 1, question: "Khi điều khiển xe, người lái không được:", options: ["Mở điều hòa", "Sử dụng điện thoại di động cầm tay", "Bật đài phát thanh", "Để trẻ em ngồi ghế sau"], correctAnswer: 1, explanation: "Người lái xe bị cấm sử dụng điện thoại di động cầm tay khi đang điều khiển phương tiện vì gây mất tập trung.", isCritical: true },
  { id: 8, topicId: 1, question: "Khi muốn vượt xe phía trước, người lái xe phải:", options: ["Vượt bên phải xe phía trước", "Bấm còi liên tục rồi vượt bên trái", "Quan sát, bật xi-nhan trái, đảm bảo an toàn rồi vượt bên trái", "Vượt ở bất kỳ bên nào nếu thấy an toàn"], correctAnswer: 2, explanation: "Khi vượt xe, phải vượt bên trái, bật xi-nhan báo hiệu, đảm bảo khoảng cách an toàn và chỉ vượt khi đủ điều kiện." },
  { id: 9, topicId: 1, question: "Nhìn vào hình: Vạch kẻ liên tục và vạch đứt đoạn khác nhau về quy định sử dụng như thế nào?", options: ["Không có sự khác biệt", "Vạch liên tục — cấm vượt qua; vạch đứt — được vượt/đổi làn khi an toàn", "Vạch liên tục dành cho xe buýt", "Vạch đứt chỉ dành cho xe ưu tiên"], correctAnswer: 1, explanation: "Vạch liên tục (nét đầy) là vạch cấm vượt. Vạch đứt đoạn cho phép xe chuyển làn hoặc vượt khi điều kiện an toàn.", signKey: "road-markings" },
  { id: 10, topicId: 1, question: "Tốc độ tối đa trên đường cao tốc đối với xe ô tô con là:", options: ["100 km/h", "120 km/h", "130 km/h", "110 km/h"], correctAnswer: 1, explanation: "Tốc độ tối đa trên đường cao tốc đối với xe ô tô con là 120 km/h." },
  { id: 11, topicId: 1, question: "Người ngồi trên xe ô tô phải làm gì để đảm bảo an toàn?", options: ["Thắt dây an toàn", "Mặc áo phao", "Đội mũ bảo hiểm", "Không cần thiết bị bảo hộ"], correctAnswer: 0, explanation: "Người ngồi trên xe ô tô (kể cả lái xe và hành khách) phải thắt dây an toàn khi xe đang chạy." },
  { id: 12, topicId: 1, question: "Khi trời mưa lớn, tầm nhìn hạn chế, người lái xe phải:", options: ["Dừng xe lại ngay", "Giảm tốc độ, bật đèn chiếu gần và đèn sương mù", "Bật đèn pha để thấy rõ hơn", "Tăng tốc để ra khỏi vùng mưa nhanh"], correctAnswer: 1, explanation: "Khi trời mưa lớn, giảm tốc độ, bật đèn chiếu gần và đèn sương mù để đảm bảo tầm nhìn và thông báo cho xe khác." },
  { id: 13, topicId: 1, question: "Xe nào phải nhường đường khi đi từ đường phụ vào đường chính?", options: ["Xe trên đường phụ nhường xe trên đường chính", "Xe trên đường chính nhường xe trên đường phụ", "Xe nhỏ hơn nhường xe lớn hơn", "Xe đến sau nhường xe đến trước"], correctAnswer: 0, explanation: "Khi đi từ đường phụ vào đường chính, xe phải nhường đường cho xe đang lưu thông trên đường chính." },
  { id: 14, topicId: 1, question: "Khoảng cách an toàn tối thiểu ở vận tốc 100 km/h trên đường cao tốc là bao nhiêu?", options: ["50 m", "70 m", "100 m", "120 m"], correctAnswer: 1, explanation: "Ở vận tốc 100 km/h trên đường cao tốc, khoảng cách an toàn tối thiểu là 70 m." },
  { id: 15, topicId: 1, question: "Khi đỗ xe trên đường, xe phải đỗ bên nào?", options: ["Bên trái theo chiều đi", "Bên phải theo chiều đi, sát lề", "Giữa đường nếu đường rộng", "Tùy theo ý người lái"], correctAnswer: 1, explanation: "Đỗ xe bên phải theo chiều đi, sát lề hoặc vỉa hè, không gây cản trở giao thông." },
  { id: 16, topicId: 1, question: "Gặp đường sắt không có rào chắn tự động, người lái xe phải:", options: ["Đi thẳng nếu không thấy tàu", "Dừng hẳn, quan sát cả hai phía, chỉ qua khi chắc chắn không có tàu", "Giảm tốc độ và qua nhanh", "Bấm còi và qua"], correctAnswer: 1, explanation: "Gặp đường ngang không có rào chắn: dừng hẳn xe, nhìn kỹ hai phía đường sắt, chỉ đi khi không có tàu.", isCritical: true },
  { id: 17, topicId: 1, question: "Trong điều kiện nào người lái xe được phép bấm còi?", options: ["Khi muốn vượt xe", "Khi cần thiết để báo hiệu nguy hiểm", "Trong khu đông dân cư bất cứ lúc nào", "Khi đi vào đường hẹp"], correctAnswer: 1, explanation: "Chỉ được bấm còi khi cần báo hiệu nguy hiểm. Cấm bấm còi liên tục, cấm dùng còi hơi trong khu đông dân cư từ 22h đến 5h." },
  { id: 18, topicId: 1, question: "Khi có sương mù dày đặc, người lái xe phải:", options: ["Bật đèn pha chiếu xa", "Bật đèn sương mù và đèn chiếu gần, giảm tốc độ đáng kể", "Đi nhanh để thoát khỏi vùng sương mù", "Đi sát xe phía trước để làm chuẩn"], correctAnswer: 1, explanation: "Sương mù dày: bật đèn sương mù và đèn chiếu gần, giảm tốc đáng kể, tăng khoảng cách. Đèn pha trong sương gây lóa mắt." },
  { id: 19, topicId: 1, question: "Trên đường 4 làn (2 chiều, mỗi chiều 2 làn), xe đi bình thường sử dụng làn nào?", options: ["Làn trong cùng sát tim đường", "Làn ngoài cùng sát lề; làn trong chỉ để vượt", "Bất kỳ làn nào", "Chỉ làn bên trái"], correctAnswer: 1, explanation: "Xe đi bình thường sử dụng làn phải (sát lề). Làn trái (sát tim đường) dành để vượt xe và phải nhường về làn phải sau khi vượt." },
  { id: 20, topicId: 1, question: "Hành vi nào dưới đây là vi phạm giao thông nghiêm trọng?", options: ["Thắt dây an toàn đúng cách", "Lái xe khi có nồng độ cồn trong máu", "Bật đèn chiếu gần khi trời tối", "Giảm tốc khi vào cua"], correctAnswer: 1, explanation: "Lái xe có nồng độ cồn trong máu là vi phạm nghiêm trọng, bị phạt nặng và có thể bị tước bằng lái.", isCritical: true },

  // ── TOPIC 2 — Biển báo (with images) ──
  { id: 21, topicId: 2, question: "Biển báo trong hình có nghĩa là gì?", options: ["Tốc độ tối thiểu phải đạt 50 km/h", "Tốc độ tối đa 50 km/h", "Cấm xe có tải trọng trên 50 tấn", "Giới hạn chiều cao 50 cm"], correctAnswer: 1, explanation: "Biển hình tròn viền đỏ, nền trắng có số là biển báo tốc độ tối đa. Con số là tốc độ tối đa cho phép (km/h).", signKey: "speed-50" },
  { id: 22, topicId: 2, question: "Biển báo trong hình có ý nghĩa gì?", options: ["Cấm đỗ xe", "Cấm đi ngược chiều", "Đường cấm hoàn toàn", "Cấm ô tô"], correctAnswer: 1, explanation: "Biển cấm đi ngược chiều có hình tròn, nền đỏ với vạch ngang màu trắng. Cấm xe đi vào theo hướng đó.", signKey: "no-entry" },
  { id: 23, topicId: 2, question: "Hình dạng và màu sắc của biển báo trong hình cho biết đây là loại biển gì?", options: ["Biển cấm", "Biển nguy hiểm, cảnh báo", "Biển hiệu lệnh", "Biển chỉ dẫn"], correctAnswer: 1, explanation: "Biển hình tam giác viền đỏ là biển nguy hiểm, cảnh báo người lái xe cần chú ý và đề phòng.", signKey: "warning-triangle" },
  { id: 24, topicId: 2, question: "Biển báo trong hình cho biết điều gì?", options: ["Xe được phép đi hai chiều", "Đường một chiều, chỉ đi theo hướng mũi tên", "Chỉ xe buýt được đi hướng này", "Đường cấm xe ngược chiều"], correctAnswer: 1, explanation: "Biển đường một chiều (nền xanh, mũi tên trắng) chỉ cho phép xe đi theo hướng mũi tên.", signKey: "one-way" },
  { id: 25, topicId: 2, question: "Biển báo trong hình có nghĩa gì?", options: ["Cấm đỗ xe nhưng được dừng tạm thời", "Cấm cả dừng và đỗ xe ở khu vực có biển", "Chỉ cấm xe tải dừng đỗ", "Cấm đỗ trong giờ cao điểm"], correctAnswer: 1, explanation: "Biển cấm đỗ xe (chữ P bị gạch chéo đỏ) cấm đỗ xe tại khu vực đó. Biển cấm cả dừng và đỗ có thêm đường gạch chéo.", signKey: "no-parking" },
  { id: 26, topicId: 2, question: "Biển trong hình cảnh báo người lái xe điều gì?", options: ["Đường sắt có rào chắn tự động", "Giao nhau với đường sắt, không có rào chắn — phải dừng quan sát", "Cấm đường sắt", "Đường sắt cắt ngang phía xa"], correctAnswer: 1, explanation: "Biển giao nhau với đường sắt không có rào chắn (tam giác viền đỏ). Người lái phải dừng hẳn và quan sát hai phía trước khi qua.", signKey: "railway-crossing" },
  { id: 27, topicId: 2, question: "Đèn tín hiệu mũi tên màu xanh trong hình cho phép xe đi theo hướng nào?", options: ["Theo hướng mũi tên chỉ", "Theo bất kỳ hướng nào", "Chỉ đi thẳng dù mũi tên chỉ hướng khác", "Không được đi"], correctAnswer: 0, explanation: "Đèn tín hiệu mũi tên màu xanh cho phép xe đi theo hướng mà mũi tên chỉ, các hướng khác phải dừng.", signKey: "green-arrow-straight" },
  { id: 28, topicId: 2, question: "Biển báo hình thoi màu vàng trong hình có ý nghĩa gì khi đặt ở mặt đường?", options: ["Cảnh báo chướng ngại vật", "Xác nhận bạn đang đi trên đường ưu tiên", "Phân làn đường", "Vị trí giao lộ sắp tới"], correctAnswer: 1, explanation: "Biển/vạch hình thoi màu vàng xác nhận bạn đang đi trên đường ưu tiên. Xe từ hướng khác phải nhường đường cho bạn.", signKey: "priority-road" },
  { id: 29, topicId: 2, question: "Biển trong hình yêu cầu người lái xe phải làm gì?", options: ["Giảm tốc độ", "Dừng hẳn xe tại vạch, quan sát trước khi đi tiếp", "Nhường đường cho xe từ phải", "Chỉ dừng khi có xe khác"], correctAnswer: 1, explanation: "Biển STOP (bát giác đỏ) yêu cầu người lái dừng hẳn xe tại vạch dừng, quan sát đảm bảo an toàn mới được tiếp tục.", signKey: "stop-sign" },
  { id: 30, topicId: 2, question: "Biển báo trong hình có nghĩa là gì?", options: ["Cấm rẽ phải", "Cấm rẽ trái — không được phép rẽ trái", "Bắt buộc rẽ trái", "Cảnh báo đường cua trái"], correctAnswer: 1, explanation: "Biển cấm rẽ trái (tròn viền đỏ, mũi tên hướng trái bị gạch chéo đỏ) cấm xe rẽ trái tại vị trí có biển.", signKey: "no-left-turn" },
  { id: 31, topicId: 2, question: "Biển trong hình có ý nghĩa gì?", options: ["Bắt buộc quay đầu xe", "Cấm quay đầu xe tại đây", "Cảnh báo đường cong chữ U", "Chỉ xe tải được quay đầu"], correctAnswer: 1, explanation: "Biển cấm quay đầu xe (tròn viền đỏ, mũi tên hình chữ U bị gạch đỏ) cấm tất cả xe quay đầu tại vị trí có biển.", signKey: "no-uturn" },
  { id: 32, topicId: 2, question: "Vạch kẻ STOP trên mặt đường trong hình yêu cầu:", options: ["Xe giảm tốc và đi chậm qua", "Xe dừng hẳn tại vạch, quan sát rồi mới đi", "Nhường đường xe từ bên phải", "Chỉ dừng khi có xe đang qua"], correctAnswer: 1, explanation: "Vạch STOP yêu cầu dừng hẳn xe lại tại vạch kẻ, quan sát đảm bảo an toàn hoàn toàn rồi mới được tiếp tục đi.", signKey: "stop-line" },
  { id: 33, topicId: 2, question: "Biển báo hình tròn nền xanh trong hình có ý nghĩa gì?", options: ["Cấm đi thẳng", "Bắt buộc đi theo hướng mũi tên (hiệu lệnh)", "Chỉ dẫn hướng đi", "Đường cao tốc"], correctAnswer: 1, explanation: "Biển hình tròn nền xanh là biển hiệu lệnh — bắt buộc người lái xe phải thực hiện theo lệnh ghi trên biển.", signKey: "mandatory-straight" },
  { id: 34, topicId: 2, question: "Biển trong hình có nghĩa là gì?", options: ["Hết giới hạn tốc độ — được đi nhanh tùy ý", "Hết hạn chế tốc độ 50 km/h — trở lại tốc độ theo quy định đường đó", "Tốc độ tối thiểu 50 km/h", "Cấm xe đi nhanh hơn 50 km/h"], correctAnswer: 1, explanation: "Biển hết hạn chế tốc độ (số bị gạch chéo đen) báo hiệu giới hạn tốc độ đặt trước không còn áp dụng. Tuy nhiên phải tuân theo tốc độ quy định của đường đó.", signKey: "end-speed-50" },
  { id: 35, topicId: 2, question: "Biển cảnh báo trong hình nhắc nhở người lái xe điều gì?", options: ["Trường học ở phía trước — cẩn thận có trẻ em", "Khu vui chơi", "Cấm trẻ em qua đường", "Bệnh viện nhi phía trước"], correctAnswer: 0, explanation: "Biển cảnh báo trẻ em (tam giác viền đỏ, hình trẻ em) nhắc nhở có trẻ em qua đường, phải giảm tốc và đề cao cảnh giác.", signKey: "children-warning" },
  { id: 36, topicId: 2, question: "Biển trong hình cấm điều gì?", options: ["Cấm dừng xe", "Cấm vượt xe trong đoạn đường có biển", "Cấm xe tải", "Cấm xe hai bánh"], correctAnswer: 1, explanation: "Biển cấm vượt (tròn viền đỏ, hai hình xe bị gạch chéo) cấm các xe cơ giới vượt nhau trong đoạn đường có biển.", signKey: "no-overtaking" },
  { id: 37, topicId: 2, question: "Tại vòng xuyến trong hình, xe nào có quyền ưu tiên?", options: ["Xe vào vòng xuyến trước", "Xe đang lưu thông bên trong vòng xuyến", "Xe lớn hơn", "Xe từ phía phải"], correctAnswer: 1, explanation: "Tại vòng xuyến, xe đang lưu thông bên trong có quyền ưu tiên. Xe muốn vào phải nhường đường và quan sát.", signKey: "roundabout" },

  // ── TOPIC 3 ──
  { id: 38, topicId: 3, question: "Tại ngã tư đèn xanh bật nhưng có người đang qua đường, xe A phải:", options: ["Bấm còi và đi vì có đèn xanh", "Nhường người đi bộ qua đường rồi mới đi tiếp", "Đi nhanh để kịp đèn xanh", "Dừng lại và chờ đèn xanh lần sau"], correctAnswer: 1, explanation: "Dù đèn xanh, người lái xe phải nhường đường cho người đi bộ đang qua đường hợp lệ. An toàn người đi bộ luôn được ưu tiên.", isCritical: true },
  { id: 39, topicId: 3, question: "Xe A đang lái phát hiện bánh xe bị nổ đột ngột, phải làm gì?", options: ["Đạp phanh gấp ngay", "Giảm nhẹ ga, giữ vô-lăng thẳng, đặt chân phanh nhẹ và từ từ dừng sang lề", "Tăng tốc để ra khỏi đoạn nguy hiểm", "Quẹo ngay vào lề đường"], correctAnswer: 1, explanation: "Khi nổ lốp, KHÔNG phanh gấp (sẽ mất lái). Cần giảm ga từ từ, giữ vô-lăng thẳng, phanh nhẹ dần và dừng xe vào lề an toàn." },
  { id: 40, topicId: 3, question: "Xe A muốn rẽ trái tại ngã tư, xe B đang đi thẳng từ hướng đối diện. Ai nhường ai?", options: ["Xe A nhường xe B vì B đang đi thẳng", "Xe B nhường xe A vì A rẽ", "Xe nào đến trước đi trước", "Xe nhỏ nhường xe lớn"], correctAnswer: 0, explanation: "Xe rẽ trái phải nhường đường cho xe đang đi thẳng từ hướng đối diện. Đây là nguyên tắc ưu tiên đường thẳng." },
  { id: 41, topicId: 3, question: "Xe B đang lùi ra khỏi chỗ đỗ, xe A đang đi trong bãi đỗ. Ai nhường ai?", options: ["Xe A nhường xe B vì B cần lùi", "Xe B nhường xe A vì xe lùi phải nhường xe đang đi", "Xe nhỏ hơn nhường xe lớn hơn", "Ai đến trước được ưu tiên"], correctAnswer: 1, explanation: "Xe đang lùi (xe B) phải nhường đường cho xe đang di chuyển bình thường (xe A). Người lùi xe phải chịu trách nhiệm quan sát." },
  { id: 42, topicId: 3, question: "Khi đang xuống dốc dài, kỹ thuật phanh đúng là:", options: ["Giữ chân phanh liên tục để kiểm soát tốc độ", "Phanh ngắt quãng và sử dụng phanh động cơ (vào số thấp)", "Đạp phanh một lần thật mạnh", "Không cần phanh nếu đường thông thoáng"], correctAnswer: 1, explanation: "Xuống dốc dài, phanh liên tục sẽ làm má phanh nóng và mất hiệu lực. Dùng phanh động cơ (số thấp) kết hợp phanh ngắt quãng." },
  { id: 43, topicId: 3, question: "Đang lái xe ban đêm, gặp xe ngược chiều chiếu đèn pha vào mặt gây chói, phải:", options: ["Bật đèn pha để phản ứng lại", "Giảm tốc độ, nhìn sang lề đường phía bên phải và dừng lại nếu cần", "Nhắm mắt một lúc chờ đèn tắt", "Bấm còi và tăng tốc"], correctAnswer: 1, explanation: "Khi bị chói đèn, giảm tốc, nhìn sang lề bên phải để định hướng. Dừng lại nếu không thấy đường. Không nhìn thẳng vào đèn." },
  { id: 44, topicId: 3, question: "Khi lái xe qua vùng ngập nước, điều đúng nhất là:", options: ["Đi nhanh để qua nhanh", "Đi chậm, giữ số thấp và kiểm tra phanh sau khi qua", "Không ảnh hưởng gì, đi bình thường", "Đánh lái zigzag để thoát nước"], correctAnswer: 1, explanation: "Qua vùng ngập: đi chậm, giữ số thấp. Sau khi qua, đạp phanh nhẹ vài lần để làm khô má phanh." },
  { id: 45, topicId: 3, question: "Xe hỏng giữa đường cao tốc, bước xử lý đầu tiên là:", options: ["Gọi điện cho người thân", "Bật đèn khẩn cấp, đưa xe vào lề hoặc làn dừng khẩn cấp ngay", "Để xe nguyên vị trí và chờ", "Tắt máy xe"], correctAnswer: 1, explanation: "Xe hỏng trên cao tốc: bật đèn hazard ngay, đưa xe vào lề an toàn, đặt tam giác cảnh báo (cách xe 150m phía sau), rời khỏi xe ra phía lan can." },

  // ── TOPIC 4 ──
  { id: 46, topicId: 4, question: "Vị trí cầm vô-lăng đúng chuẩn là:", options: ["Hai tay ở vị trí 10 giờ và 2 giờ", "Một tay ở giữa, một tay trên nóc xe", "Hai tay ở 6 giờ và 12 giờ", "Cầm ở bất kỳ vị trí nào thoải mái"], correctAnswer: 0, explanation: "Vị trí cầm vô-lăng chuẩn là hai tay ở vị trí 10 giờ và 2 giờ (theo mặt đồng hồ), giúp kiểm soát tốt và phản ứng nhanh." },
  { id: 47, topicId: 4, question: "Khi lùi xe, người lái phải:", options: ["Chỉ nhìn vào gương chiếu hậu", "Quan sát xung quanh, sử dụng gương và quay đầu kiểm tra", "Mở cửa xe nhìn ra ngoài", "Nhờ người khác hướng dẫn"], correctAnswer: 1, explanation: "Khi lùi xe, phải quan sát toàn diện: nhìn gương hậu, gương bên và quay đầu trực tiếp để kiểm tra điểm mù." },
  { id: 48, topicId: 4, question: "Điểm mù của xe ô tô là:", options: ["Vùng phía sau xe không thấy qua gương hậu", "Khu vực xung quanh xe không nhìn thấy qua gương chiếu hậu", "Phần trước mũi xe", "Chỉ bên phía tài xế"], correctAnswer: 1, explanation: "Điểm mù là vùng xung quanh xe mà gương chiếu hậu không bao phủ, cần quay đầu kiểm tra trực tiếp." },
  { id: 49, topicId: 4, question: "Khi đỗ xe trên dốc (mũi xe hướng lên dốc), cần:", options: ["Để số N và phanh tay", "Để số 1, kéo phanh tay và đánh lái bánh trước vào lề đường", "Chỉ cần phanh tay", "Để số N, kéo phanh tay"], correctAnswer: 1, explanation: "Đỗ trên dốc mũi xe hướng lên: để số 1, kéo phanh tay và quay bánh xe vào lề để chặn xe nếu phanh hỏng." },
  { id: 50, topicId: 4, question: "Khi đang lái xe bỗng thấy mắt mờ, chóng mặt, buồn ngủ, phải:", options: ["Uống cà phê và tiếp tục lái", "Mở cửa sổ hít không khí và tiếp tục", "Dừng xe ngay ở nơi an toàn, nghỉ ngơi trước khi lái tiếp", "Tăng tốc để về điểm đến nhanh hơn"], correctAnswer: 2, explanation: "Buồn ngủ, chóng mặt khi lái xe cực kỳ nguy hiểm. Phải dừng xe ngay ở nơi an toàn và nghỉ ngơi.", isCritical: true },
  { id: 51, topicId: 4, question: "Tại sao không nên để tay lên vị trí túi khí (airbag) khi lái xe?", options: ["Tay sẽ bị mệt", "Nếu túi khí bung, tay có thể bị đẩy mạnh gây thương tích nặng", "Không ảnh hưởng gì", "Chỉ không nên khi trời nóng"], correctAnswer: 1, explanation: "Túi khí bung với tốc độ rất nhanh (300 km/h). Nếu tay ở vị trí túi khí, sẽ bị đẩy mạnh gây gãy xương, thương tích nghiêm trọng." },
  { id: 52, topicId: 4, question: "Khi xe bị mất phanh khi đang xuống dốc, biện pháp xử lý là:", options: ["Tắt máy ngay", "Vào số thấp hơn (phanh động cơ), ma sát lốp vào lề, dùng phanh tay từ từ", "Đánh tay lái sang phải ngay lập tức", "Bật đèn khẩn cấp và bấm còi"], correctAnswer: 1, explanation: "Mất phanh: vào số thấp để phanh động cơ, cho lốp ma sát vào lề đường (đất, cỏ), sử dụng phanh tay tăng dần. Không tắt máy ngay (mất trợ lực lái)." },
  { id: 53, topicId: 4, question: "Kỹ thuật đúng khi vào cua là:", options: ["Giảm tốc trước khi vào cua, đánh lái trơn tru ổn định", "Giảm tốc giữa cua và đánh lái mạnh", "Duy trì tốc độ cao để ổn định", "Đánh tay lái nhanh rồi trả lái nhanh"], correctAnswer: 0, explanation: "Giảm tốc TRƯỚC khi vào cua, đánh lái ổn định và trơn tru. Không giảm tốc giữa cua và không đánh lái đột ngột." },
  { id: 54, topicId: 4, question: "Sau bao lâu lái xe liên tục nên dừng nghỉ?", options: ["Sau 6 tiếng lái liên tục", "Sau mỗi 4 tiếng, nghỉ ít nhất 15 phút", "Chỉ khi cảm thấy mệt", "Không cần nghỉ nếu đường tốt"], correctAnswer: 1, explanation: "Nên nghỉ ít nhất 15 phút sau mỗi 4 giờ lái liên tục. Luật quy định tài xế xe kinh doanh không được lái quá 10 tiếng/ngày." },
  { id: 55, topicId: 4, question: "Điều chỉnh ghế lái đúng cách là:", options: ["Ngả ghế thật thoải mái để thư giãn", "Ngồi thẳng, tay duỗi đặt lên vô-lăng hơi cong khuỷu, chân đạp hết côn mà đầu gối hơi cong", "Ngồi sát vô-lăng càng gần càng tốt", "Không quan trọng, miễn thoải mái"], correctAnswer: 1, explanation: "Điều chỉnh ghế: lưng thẳng, tay hơi cong đặt lên vô-lăng, chân đạp hết côn còn đầu gối hơi cong, đầu cách trần tối thiểu 1 nắm tay." },

  // ── TOPIC 5 ──
  { id: 56, topicId: 5, question: "Đèn cảnh báo dầu động cơ bật sáng khi đang chạy có nghĩa là:", options: ["Cần thay dầu động cơ ngay", "Áp suất dầu thấp nguy hiểm — dừng xe kiểm tra ngay", "Động cơ đang nóng quá", "Hệ thống lọc dầu cần thay"], correctAnswer: 1, explanation: "Đèn dầu bật sáng báo hiệu áp suất dầu thấp nguy hiểm. Phải dừng xe ngay lập tức và kiểm tra. Tiếp tục lái có thể phá hỏng động cơ." },
  { id: 57, topicId: 5, question: "Hệ thống ABS (chống bó cứng phanh) có tác dụng gì?", options: ["Phanh mạnh hơn bình thường", "Duy trì khả năng lái trong khi phanh gấp, tránh bánh bị khóa cứng", "Xe dừng nhanh hơn trong mọi điều kiện", "Tự động phanh khi có vật cản"], correctAnswer: 1, explanation: "ABS ngăn bánh xe bị khóa cứng khi phanh gấp, giúp người lái duy trì khả năng lái và kiểm soát hướng xe." },
  { id: 58, topicId: 5, question: "Áp suất lốp xe quan trọng vì:", options: ["Chỉ ảnh hưởng đến độ mòn lốp", "Ảnh hưởng đến an toàn, tiêu hao nhiên liệu, độ mòn lốp và khả năng phanh", "Chỉ ảnh hưởng khi đi đường cao tốc", "Không quan trọng với xe hiện đại"], correctAnswer: 1, explanation: "Áp suất lốp ảnh hưởng trực tiếp đến an toàn lái xe, hiệu quả phanh, tiêu hao nhiên liệu và tuổi thọ lốp. Phải kiểm tra định kỳ." },
  { id: 59, topicId: 5, question: "Khi nào cần thay lốp xe?", options: ["Sau mỗi 10.000 km bất kể tình trạng", "Khi độ sâu rãnh lốp dưới 1.6mm hoặc có vết nứt, phồng rộp", "Chỉ khi lốp bị xịt hoàn toàn", "Sau 5 năm bất kể tình trạng"], correctAnswer: 1, explanation: "Thay lốp khi rãnh lốp dưới 1.6mm, có vết nứt, phồng, hoặc lốp quá cũ (trên 6-10 năm dù còn rãnh)." },
  { id: 60, topicId: 5, question: "Khi xe bị quá nhiệt (đồng hồ nhiệt độ vào vùng đỏ), phải:", options: ["Tiếp tục lái về garage", "Dừng xe an toàn, tắt máy, KHÔNG mở nắp két nước ngay, chờ nguội", "Bật điều hòa mạnh nhất", "Tăng tốc để làm mát động cơ bằng gió"], correctAnswer: 1, explanation: "Quá nhiệt: dừng xe ngay, tắt máy chờ nguội. TUYỆT ĐỐI KHÔNG mở nắp két nước khi còn nóng (nước sôi bắn ra gây bỏng)." },
  { id: 61, topicId: 5, question: "Mức dầu động cơ cần được kiểm tra khi nào?", options: ["Ngay sau khi tắt máy", "Khi máy đang chạy", "Khi động cơ nguội hoàn toàn và xe đậu phẳng", "Chỉ tại garage"], correctAnswer: 2, explanation: "Kiểm tra dầu khi động cơ nguội (chờ ít nhất 5 phút sau tắt máy) và xe đậu trên mặt phẳng để được kết quả chính xác." },
  { id: 62, topicId: 5, question: "Hộp số tự động (AT) khác hộp số sàn (MT) chủ yếu ở điểm nào?", options: ["AT không có ly hợp (côn), tự động chuyển số", "AT chỉ có 2 số tiến", "MT nhanh hơn AT trong mọi tình huống", "Không có sự khác biệt lớn"], correctAnswer: 0, explanation: "Hộp số tự động không có bàn đạp côn, tự động chuyển số. Hộp số sàn cần nhấn côn để chuyển số thủ công." },
  { id: 63, topicId: 5, question: "Tiếng kêu lạch cạch ở bánh xe khi rẽ có thể do:", options: ["Nước vào trong bánh", "Khớp truyền động (CV joint) bị mòn hoặc hỏng", "Lốp bị non", "Má phanh mòn"], correctAnswer: 1, explanation: "Tiếng lạch cạch ở bánh xe khi rẽ gấp thường do khớp truyền động CV joint hỏng. Cần kiểm tra và thay thế sớm." },
  { id: 64, topicId: 5, question: "Dầu phanh cần được thay định kỳ vì:", options: ["Dầu phanh bốc hơi theo thời gian", "Dầu phanh hút ẩm theo thời gian, làm giảm nhiệt độ sôi và hiệu quả phanh", "Dầu phanh bẩn do bụi đường", "Không cần thay, chỉ thêm khi cạn"], correctAnswer: 1, explanation: "Dầu phanh hút ẩm (hygroscopic), làm giảm điểm sôi. Khi sôi tạo bong bóng khí gây mất phanh nguy hiểm. Cần thay 2 năm/lần." },
  { id: 65, topicId: 5, question: "Hệ thống kiểm soát lực kéo (TCS) có tác dụng:", options: ["Tăng công suất động cơ", "Ngăn bánh xe bị trơn quay khi tăng tốc trên đường trơn", "Tự động phanh khi có vật cản", "Giảm tiêu hao nhiên liệu"], correctAnswer: 1, explanation: "TCS giảm công suất động cơ hoặc phanh bánh xe chủ động khi phát hiện bánh bị trượt quay, giúp xe bám đường trên mặt trơn." },

  // ── TOPIC 6 ──
  { id: 66, topicId: 6, question: "Người điều khiển xe có nồng độ cồn mức cao nhất bị xử phạt:", options: ["Nhắc nhở và phạt tiền nhẹ", "Phạt tiền 30-40 triệu đồng và tước GPLX 22-24 tháng", "Chỉ phạt tiền", "Tịch thu phương tiện vĩnh viễn"], correctAnswer: 1, explanation: "Vi phạm nồng độ cồn mức cao nhất bị phạt 30-40 triệu đồng và tước GPLX 22-24 tháng theo Nghị định 100/2019/NĐ-CP (đã sửa đổi)." },
  { id: 67, topicId: 6, question: "Giấy phép lái xe hạng B1 có giá trị trong bao lâu?", options: ["5 năm", "10 năm", "Không thời hạn (vĩnh viễn)", "15 năm"], correctAnswer: 2, explanation: "Giấy phép lái xe hạng B1 (xe ô tô dưới 9 chỗ, không kinh doanh vận tải) không có thời hạn, không cần gia hạn." },
  { id: 68, topicId: 6, question: "Xe ô tô phải có những giấy tờ nào khi tham gia giao thông?", options: ["Chỉ cần đăng ký xe", "Đăng ký xe, GPLX, bảo hiểm TNDS bắt buộc và đăng kiểm còn hạn", "Chỉ cần bảo hiểm", "CMND và đăng ký xe"], correctAnswer: 1, explanation: "Xe ô tô khi lưu thông phải có: giấy đăng ký xe, GPLX phù hợp loại xe, giấy chứng nhận bảo hiểm TNDS bắt buộc và giấy kiểm định (đăng kiểm) còn hạn." },
  { id: 69, topicId: 6, question: "Độ tuổi tối thiểu để thi và được cấp giấy phép lái xe hạng B1 là:", options: ["16 tuổi", "17 tuổi", "18 tuổi", "20 tuổi"], correctAnswer: 2, explanation: "Người từ đủ 18 tuổi trở lên mới được thi và cấp giấy phép lái xe hạng B1 và B2 (xe ô tô dưới 9 chỗ)." },
  { id: 70, topicId: 6, question: "Hành vi vượt đèn đỏ bị xử phạt như thế nào?", options: ["Nhắc nhở lần đầu", "Phạt tiền 3-5 triệu đồng và tước GPLX 1-3 tháng", "Chỉ phạt khi gây tai nạn", "Phạt tiền 500.000 đồng"], correctAnswer: 1, explanation: "Vượt đèn đỏ bị phạt tiền từ 3.000.000 đến 5.000.000 đồng và tước quyền sử dụng GPLX từ 1-3 tháng." },
  { id: 71, topicId: 6, question: "Xe ô tô con mới xuất xưởng (dưới 5 năm tuổi) phải đăng kiểm tần suất:", options: ["Mỗi năm một lần", "Mỗi 2 năm một lần", "Mỗi 6 tháng một lần", "Chỉ khi xe bị tai nạn"], correctAnswer: 1, explanation: "Xe ô tô con dưới 5 năm tuổi (tính từ năm sản xuất) được kiểm định mỗi 2 năm/lần. Trên 5 năm tuổi là mỗi 1 năm/lần." },
  { id: 72, topicId: 6, question: "Khi xảy ra tai nạn giao thông, người lái xe phải làm gì đầu tiên?", options: ["Rời khỏi hiện trường ngay", "Dừng xe, bảo vệ hiện trường, cứu người bị nạn và báo cơ quan chức năng", "Chụp ảnh và đăng lên mạng", "Chờ cảnh sát đến mà không làm gì"], correctAnswer: 1, explanation: "Khi xảy ra tai nạn: dừng xe, bảo vệ hiện trường, sơ cứu người bị nạn (ưu tiên nhất), gọi cấp cứu 115 và báo cảnh sát 113." },
  { id: 73, topicId: 6, question: "Hành vi sử dụng điện thoại di động cầm tay khi lái xe bị phạt:", options: ["Nhắc nhở và cảnh cáo", "Phạt 800.000 đến 1 triệu đồng", "Phạt 1-2 triệu đồng và có thể tước GPLX 1-3 tháng", "Chỉ phạt khi gây tai nạn"], correctAnswer: 2, explanation: "Sử dụng điện thoại cầm tay khi lái xe bị phạt tiền từ 1.000.000 đến 2.000.000 đồng và có thể bị tước GPLX từ 1-3 tháng." },
  { id: 74, topicId: 6, question: "Người điều khiển xe ô tô không có giấy phép lái xe bị phạt:", options: ["500.000 đồng", "1-2 triệu đồng", "4-6 triệu đồng và có thể tịch thu phương tiện", "Chỉ cảnh cáo lần đầu"], correctAnswer: 2, explanation: "Điều khiển xe ô tô không có GPLX bị phạt tiền từ 4.000.000 đến 6.000.000 đồng và có thể bị tạm giữ phương tiện." },
  { id: 75, topicId: 6, question: "Bảo hiểm trách nhiệm dân sự bắt buộc của xe ô tô nhằm mục đích:", options: ["Bảo hiểm cho xe khi bị tai nạn", "Bồi thường cho người thứ ba bị thiệt hại do xe gây ra", "Bảo hiểm cho người lái khi bị thương", "Bảo hiểm trộm cắp xe"], correctAnswer: 1, explanation: "Bảo hiểm TNDS bắt buộc bảo vệ người thứ ba (người bị thiệt hại do xe của bạn gây ra), không phải xe của bạn hay bản thân bạn." },
];

const EXAM_QUESTIONS_COUNT = 35;
const EXAM_TIME = 19 * 60;
const PASS_SCORE = 32;
const OPTION_LABELS = ["A", "B", "C", "D"];

// ─── UTILS ────────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateExam(): Question[] {
  const distribution = [6, 8, 5, 5, 5, 6];
  const selected: Question[] = [];
  TOPICS.forEach((t, i) => {
    const questions = shuffle(ALL_QUESTIONS.filter((q) => q.topicId === t.id));
    selected.push(...questions.slice(0, distribution[i]));
  });
  return shuffle(selected);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────

function AuthScreen({ onAuth }: { onAuth: (user: UserProfile) => void }) {
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

// ─── GOALS TAB ────────────────────────────────────────────────────────────────

function GoalsTab({ topicProgress, examHistory }: {
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
