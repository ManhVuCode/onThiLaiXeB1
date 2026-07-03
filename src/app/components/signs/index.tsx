import React from "react";

// ─── SVG TRAFFIC SIGNS ───────────────────────────────────────────────────────

export const SignWrapper = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-2 py-3">
    {children}
    {label && <p className="text-xs text-muted-foreground italic">{label}</p>}
  </div>
);

// Biển cấm: vòng tròn viền đỏ, nền trắng
export const SpeedLimitSign = ({ limit }: { limit: number }) => (
  <SignWrapper label={`Biển giới hạn tốc độ ${limit} km/h`}>
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="56" fill="white" stroke="#CC0000" strokeWidth="11" />
      <text x="60" y="78" textAnchor="middle" fontSize={limit >= 100 ? 32 : 40} fontWeight="900" fill="#111" fontFamily="Arial, sans-serif">{limit}</text>
    </svg>
  </SignWrapper>
);

// Biển cấm đi ngược chiều: tròn đỏ, thanh ngang trắng
export const NoEntrySign = () => (
  <SignWrapper label="Biển cấm đi ngược chiều">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="56" fill="#CC0000" />
      <rect x="18" y="47" width="84" height="26" rx="4" fill="white" />
    </svg>
  </SignWrapper>
);

// Biển nguy hiểm: tam giác viền đỏ
export const WarningSign = ({ symbol, label }: { symbol: string; label: string }) => (
  <SignWrapper label={label}>
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,8 112,102 8,102" fill="#FFFDE7" stroke="#CC0000" strokeWidth="9" strokeLinejoin="round" />
      <text x="60" y="90" textAnchor="middle" fontSize="34" fontFamily="Arial">{symbol}</text>
    </svg>
  </SignWrapper>
);

// Biển ưu tiên: hình thoi vàng
export const PriorityRoadSign = () => (
  <SignWrapper label="Biển đường ưu tiên (hình thoi vàng)">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <rect x="60" y="6" width="76" height="76" rx="4" fill="#F9A825" stroke="#5D4037" strokeWidth="5" transform="rotate(45 60 60)" />
    </svg>
  </SignWrapper>
);

// Biển nhường đường: tam giác ngược
export const YieldSign = () => (
  <SignWrapper label="Biển nhường đường (tam giác ngược)">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,102 8,8 112,8" fill="white" stroke="#CC0000" strokeWidth="9" strokeLinejoin="round" />
      <polygon points="60,86 22,20 98,20" fill="#CC0000" />
      <polygon points="60,76 30,26 90,26" fill="white" />
    </svg>
  </SignWrapper>
);

// Biển dừng lại (STOP): bát giác đỏ
export const StopSign = () => (
  <SignWrapper label="Biển dừng lại (STOP)">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <polygon points="38,8 82,8 112,38 112,82 82,112 38,112 8,82 8,38" fill="#CC0000" stroke="#880000" strokeWidth="3" />
      <text x="60" y="72" textAnchor="middle" fontSize="24" fontWeight="900" fill="white" fontFamily="Arial">STOP</text>
    </svg>
  </SignWrapper>
);

// Biển cấm rẽ trái
export const NoLeftTurnSign = () => (
  <SignWrapper label="Biển cấm rẽ trái">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#CC0000" strokeWidth="9" />
      <path d="M75,75 L55,55 L55,68 L38,68 L38,45 L55,45 L55,58" stroke="#333" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="25" y1="25" x2="95" y2="95" stroke="#CC0000" strokeWidth="9" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển cấm quay đầu
export const NoUTurnSign = () => (
  <SignWrapper label="Biển cấm quay đầu xe">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#CC0000" strokeWidth="9" />
      <path d="M40,80 L40,52 A22,22 0 0,1 84,52 L84,68 L75,58 L93,58 L83,72" stroke="#333" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="25" y1="25" x2="95" y2="95" stroke="#CC0000" strokeWidth="9" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển cấm dừng đỗ xe
export const NoParkingSign = () => (
  <SignWrapper label="Biển cấm đỗ xe">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#CC0000" strokeWidth="9" />
      <text x="60" y="75" textAnchor="middle" fontSize="46" fontWeight="900" fill="#1565C0" fontFamily="Arial">P</text>
      <line x1="25" y1="25" x2="95" y2="95" stroke="#CC0000" strokeWidth="9" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển một chiều: nền xanh, mũi tên trắng
export const OneWaySign = () => (
  <SignWrapper label="Biển đường một chiều">
    <svg viewBox="0 0 160 80" className="h-20 w-40 drop-shadow-md">
      <rect x="2" y="2" width="156" height="76" rx="8" fill="#1565C0" />
      <polygon points="115,40 80,15 80,30 45,30 45,50 80,50 80,65" fill="white" />
    </svg>
  </SignWrapper>
);

// Biển kết thúc hạn chế tốc độ
export const EndSpeedLimitSign = ({ limit }: { limit: number }) => (
  <SignWrapper label={`Biển hết hạn chế tốc độ ${limit} km/h`}>
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="white" stroke="#555" strokeWidth="5" />
      <text x="60" y="78" textAnchor="middle" fontSize={limit >= 100 ? 32 : 40} fontWeight="900" fill="#888" fontFamily="Arial">{limit}</text>
      <line x1="20" y1="20" x2="100" y2="100" stroke="#333" strokeWidth="7" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển giao nhau đường sắt
export const RailwayCrossingSign = () => (
  <SignWrapper label="Biển giao nhau với đường sắt không có rào chắn">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,8 112,102 8,102" fill="#FFFDE7" stroke="#CC0000" strokeWidth="9" strokeLinejoin="round" />
      <text x="60" y="55" textAnchor="middle" fontSize="22" fontFamily="Arial" fill="#111">╋</text>
      <text x="60" y="82" textAnchor="middle" fontSize="14" fontFamily="Arial" fill="#333">🚂</text>
    </svg>
  </SignWrapper>
);

// Vạch dừng STOP
export const StopLineMarking = () => (
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
export const RoadMarkings = () => (
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
export const MandatoryStraightSign = () => (
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
export const GreenArrowSignal = ({ direction }: { direction: "straight" | "left" | "right" }) => {
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
export const RoundaboutDiagram = () => (
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
export const NoOvertakingSign = () => (
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
export const ChildrenWarningSign = () => (
  <SignWrapper label="Biển cảnh báo khu vực có trẻ em">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,8 112,102 8,102" fill="#FFFDE7" stroke="#CC0000" strokeWidth="9" strokeLinejoin="round" />
      <text x="60" y="88" textAnchor="middle" fontSize="42" fontFamily="Arial">👧</text>
    </svg>
  </SignWrapper>
);

export const SIGN_MAP: Record<string, React.ReactNode> = {
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
