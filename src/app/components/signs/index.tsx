import React from "react";

// ─── SVG TRAFFIC SIGNS ───────────────────────────────────────────────────────

export const SignWrapper = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-2 py-3">
    {children}
    {label && <p className="text-xs text-muted-foreground italic text-center max-w-[200px]">{label}</p>}
  </div>
);

// Biển cấm: vòng tròn viền đỏ, nền trắng. Biển số P.127
export const SpeedLimitSign = ({ limit }: { limit: number }) => (
  <SignWrapper label={`Biển số P.127 - Tốc độ tối đa cho phép (${limit} km/h)`}>
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#FFFFFF" stroke="#DA251D" strokeWidth="10" />
      <text x="60" y="78" textAnchor="middle" fontSize={limit >= 100 ? 32 : 40} fontWeight="900" fill="#000000" fontFamily="Arial, sans-serif">{limit}</text>
    </svg>
  </SignWrapper>
);

// Biển cấm đi ngược chiều: tròn đỏ, thanh ngang trắng. Biển số P.102
export const NoEntrySign = () => (
  <SignWrapper label="Biển số P.102 - Cấm đi ngược chiều">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#DA251D" />
      <rect x="18" y="47" width="84" height="26" rx="2" fill="#FFFFFF" />
    </svg>
  </SignWrapper>
);

// Biển nguy hiểm: tam giác viền đỏ, nền vàng
export const WarningSign = ({ symbol, label }: { symbol: string; label: string }) => {
  const displayLabel = label.startsWith("Biển số") || label.startsWith("Nhóm") 
    ? label 
    : `Nhóm biển báo nguy hiểm (Biển số W.201 đến W.247) - ${label}`;
  return (
    <SignWrapper label={displayLabel}>
      <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
        <polygon points="60,8 112,102 8,102" fill="#FFD500" stroke="#DA251D" strokeWidth="9" strokeLinejoin="round" />
        <text x="60" y="88" textAnchor="middle" fontSize="34" fontWeight="900" fill="#000000" fontFamily="Arial, sans-serif">{symbol}</text>
      </svg>
    </SignWrapper>
  );
};

// Biển đường ưu tiên: hình thoi vàng viền trắng và đen. Biển số I.401
export const PriorityRoadSign = () => (
  <SignWrapper label="Biển số I.401 - Đường ưu tiên">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      {/* Lớp ngoài cùng: màu đen mảnh */}
      <rect x="20" y="20" width="80" height="80" fill="none" stroke="#000000" strokeWidth="1.5" transform="rotate(45 60 60)" />
      {/* Lớp giữa: viền trắng dày */}
      <rect x="22" y="22" width="76" height="76" fill="#FFFFFF" transform="rotate(45 60 60)" />
      {/* Lớp trong cùng: nền vàng */}
      <rect x="30" y="30" width="60" height="60" fill="#FFD500" transform="rotate(45 60 60)" />
    </svg>
  </SignWrapper>
);

// Biển nhường đường: tam giác ngược nền vàng viền đỏ. Biển số W.208
export const YieldSign = () => (
  <SignWrapper label="Biển số W.208 - Giao nhau với đường ưu tiên">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,102 8,12 112,12" fill="#FFD500" stroke="#DA251D" strokeWidth="9" strokeLinejoin="round" />
    </svg>
  </SignWrapper>
);

// Biển dừng lại (STOP): bát giác đỏ viền trắng. Biển số R.122
export const StopSign = () => (
  <SignWrapper label="Biển số R.122 - Dừng lại">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <polygon points="38,10 82,10 110,38 110,82 82,110 38,110 10,82 10,38" fill="#DA251D" stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round" />
      <text x="60" y="70" textAnchor="middle" fontSize="28" fontWeight="900" fill="#FFFFFF" fontFamily="Arial, sans-serif" letterSpacing="1">STOP</text>
    </svg>
  </SignWrapper>
);

// Biển cấm rẽ trái: tròn đỏ nền trắng, mũi tên đen bị gạch chéo đỏ. Biển số P.123a
export const NoLeftTurnSign = () => (
  <SignWrapper label="Biển số P.123a - Cấm rẽ trái">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#FFFFFF" stroke="#DA251D" strokeWidth="10" />
      {/* Mũi tên rẽ trái màu đen */}
      <path d="M 70,82 L 70,68 A 8,8 0 0 0 62,60 L 40,60" stroke="#000000" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="44,52 30,60 44,68" fill="#000000" />
      {/* Vạch cấm màu đỏ */}
      <line x1="28" y1="28" x2="92" y2="92" stroke="#DA251D" strokeWidth="10" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển cấm quay đầu: tròn đỏ nền trắng, chữ U ngược đen bị gạch chéo đỏ. Biển số P.124a
export const NoUTurnSign = () => (
  <SignWrapper label="Biển số P.124a - Cấm quay đầu xe">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#FFFFFF" stroke="#DA251D" strokeWidth="10" />
      {/* Mũi tên quay đầu chữ U màu đen */}
      <path d="M 72,82 L 72,54 A 16,16 0 0 0 40,54 L 40,70" stroke="#000000" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="32,66 40,80 48,66" fill="#000000" />
      {/* Vạch cấm màu đỏ */}
      <line x1="28" y1="28" x2="92" y2="92" stroke="#DA251D" strokeWidth="10" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển cấm đỗ xe: tròn viền đỏ nền xanh, vạch chéo đỏ. Biển số P.131a
export const NoParkingSign = () => (
  <SignWrapper label="Biển số P.131a - Cấm đỗ xe">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#0052B4" stroke="#DA251D" strokeWidth="10" />
      <line x1="28" y1="28" x2="92" y2="92" stroke="#DA251D" strokeWidth="10" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển cấm dừng xe và đỗ xe: tròn viền đỏ nền xanh, hai vạch chéo đỏ chữ X. Biển số P.130
export const NoStoppingSign = () => (
  <SignWrapper label="Biển số P.130 - Cấm dừng xe và đỗ xe">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#0052B4" stroke="#DA251D" strokeWidth="10" />
      <line x1="28" y1="28" x2="92" y2="92" stroke="#DA251D" strokeWidth="10" strokeLinecap="round" />
      <line x1="92" y1="28" x2="28" y2="92" stroke="#DA251D" strokeWidth="10" strokeLinecap="round" />
    </svg>
  </SignWrapper>
);

// Biển một chiều: chữ nhật đứng, nền xanh, mũi tên trắng chỉ lên. Biển số I.407a
export const OneWaySign = () => (
  <SignWrapper label="Biển số I.407a - Đường một chiều">
    <svg viewBox="0 0 80 120" className="w-20 h-28 drop-shadow-md">
      <rect x="2" y="2" width="76" height="116" rx="6" fill="#0052B4" />
      <path d="M 40,20 L 20,46 L 33,46 L 33,95 L 47,95 L 47,46 L 60,46 Z" fill="#FFFFFF" />
    </svg>
  </SignWrapper>
);

// Biển hết hạn chế tốc độ tối đa. Biển số DP.134
export const EndSpeedLimitSign = ({ limit }: { limit: number }) => (
  <SignWrapper label={`Biển số DP.134 - Hết hạn chế tốc độ tối đa (${limit} km/h)`}>
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#FFFFFF" stroke="#7F8C8D" strokeWidth="4" />
      <text x="60" y="78" textAnchor="middle" fontSize={limit >= 100 ? 32 : 40} fontWeight="900" fill="#BDC3C7" fontFamily="Arial, sans-serif">{limit}</text>
      {/* 5 vạch chéo song song màu xám thẫm nghiêng 135 độ */}
      <line x1="84" y1="12" x2="12" y2="84" stroke="#7F8C8D" strokeWidth="3" />
      <line x1="92" y1="20" x2="20" y2="92" stroke="#7F8C8D" strokeWidth="3" />
      <line x1="100" y1="28" x2="28" y2="100" stroke="#7F8C8D" strokeWidth="3" />
      <line x1="108" y1="36" x2="36" y2="108" stroke="#7F8C8D" strokeWidth="3" />
      <line x1="116" y1="44" x2="44" y2="116" stroke="#7F8C8D" strokeWidth="3" />
    </svg>
  </SignWrapper>
);

// Biển giao nhau với đường sắt không có rào chắn. Biển số W.211a
export const RailwayCrossingSign = () => (
  <SignWrapper label="Biển số W.211a - Giao nhau với đường sắt không có rào chắn">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,8 112,102 8,102" fill="#FFD500" stroke="#DA251D" strokeWidth="9" strokeLinejoin="round" />
      {/* Đầu máy xe lửa cổ chuẩn SVG vẽ chi tiết */}
      <g fill="#000000">
        <rect x="52" y="62" width="28" height="16" rx="1" />
        <rect x="36" y="52" width="16" height="26" rx="1" />
        <path d="M 33,52 L 55,52 L 53,49 L 35,49 Z" />
        <rect x="40" y="56" width="8" height="9" fill="#FFD500" />
        <rect x="70" y="53" width="4" height="9" />
        <polygon points="68,53 76,53 74,50 70,50" />
        <rect x="60" y="57" width="5" height="5" rx="1" />
        <polygon points="80,72 87,78 80,78" />
        <circle cx="44" cy="83" r="6" />
        <circle cx="44" cy="83" r="3" fill="#FFD500" />
        <circle cx="58" cy="83" r="5" />
        <circle cx="58" cy="83" r="2.5" fill="#FFD500" />
        <circle cx="70" cy="83" r="5" />
        <circle cx="70" cy="83" r="2.5" fill="#FFD500" />
        <rect x="44" y="82" width="26" height="2" rx="0.5" fill="#555" />
      </g>
    </svg>
  </SignWrapper>
);

// Vạch dừng STOP trên mặt đường. Vạch số 7.1
export const StopLineMarking = () => (
  <SignWrapper label="Vạch số 7.1 - Vạch dừng xe (kèm chữ STOP trên mặt đường)">
    <svg viewBox="0 0 180 100" className="h-20 w-44 drop-shadow-sm">
      <rect x="0" y="0" width="180" height="100" rx="6" fill="#2C3E50" />
      <rect x="10" y="65" width="160" height="10" rx="1" fill="#FFFFFF" />
      <text x="90" y="45" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF" fontFamily="Arial, sans-serif" letterSpacing="1">STOP</text>
      <text x="90" y="90" textAnchor="middle" fontSize="10" fill="#BDC3C7" fontFamily="Arial, sans-serif">▶ Hướng xe đi ▶</text>
    </svg>
  </SignWrapper>
);

// Vạch kẻ đường liền và đứt. Vạch số 1.1 và 1.2
export const RoadMarkings = () => (
  <SignWrapper label="Vạch số 1.1 & 1.2 - Vạch phân chia làn đường cùng chiều">
    <svg viewBox="0 0 220 80" className="h-20 w-52 drop-shadow-sm">
      <rect x="0" y="0" width="220" height="80" rx="6" fill="#2C3E50" />
      <line x1="110" y1="0" x2="110" y2="80" stroke="#7F8C8D" strokeWidth="1.5" />
      <line x1="55" y1="5" x2="55" y2="75" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <line x1="165" y1="5" x2="165" y2="22" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeDasharray="16,14" />
      <text x="55" y="42" textAnchor="middle" fontSize="9" fill="#F1C40F" fontFamily="Arial, sans-serif" fontWeight="bold">LIỀN</text>
      <text x="165" y="42" textAnchor="middle" fontSize="9" fill="#F1C40F" fontFamily="Arial, sans-serif" fontWeight="bold">ĐỨT</text>
    </svg>
  </SignWrapper>
);

// Biển hiệu lệnh xanh tròn - hướng bắt buộc đi thẳng. Biển số R.301a
export const MandatoryStraightSign = () => (
  <SignWrapper label="Biển số R.301a - Hướng đi thẳng phải theo">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <circle cx="60" cy="60" r="54" fill="#0052B4" />
      <path d="M 60,22 L 42,44 L 54,44 L 54,88 L 66,88 L 66,44 L 78,44 Z" fill="#FFFFFF" />
    </svg>
  </SignWrapper>
);

// Biển đèn xanh mũi tên
export const GreenArrowSignal = ({ direction }: { direction: "straight" | "left" | "right" }) => {
  const rotate = direction === "left" ? "rotate(-90 60 60)" : direction === "right" ? "rotate(90 60 60)" : "";
  return (
    <SignWrapper label={`Đèn tín hiệu phụ - Mũi tên xanh chỉ hướng ${direction === "straight" ? "đi thẳng" : direction === "left" ? "rẽ trái" : "rẽ phải"}`}>
      <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
        <rect x="2" y="2" width="116" height="116" rx="10" fill="#111111" />
        <g transform={rotate}>
          <rect x="48" y="38" width="24" height="42" rx="2" fill="#00E676" />
          <polygon points="60,20 38,50 82,50" fill="#00E676" />
        </g>
      </svg>
    </SignWrapper>
  );
};

// Sơ đồ vòng xuyến
export const RoundaboutDiagram = () => (
  <SignWrapper label="Sơ đồ giao lộ vòng xuyến (xe đang ở trong vòng xuyến được ưu tiên)">
    <svg viewBox="0 0 160 160" className="w-36 h-36 drop-shadow-sm">
      <rect x="0" y="0" width="160" height="160" rx="8" fill="#2C3E50" />
      <circle cx="80" cy="80" r="50" fill="#7F8C8D" stroke="#95A5A6" strokeWidth="2" />
      <circle cx="80" cy="80" r="30" fill="#2C3E50" stroke="#95A5A6" strokeWidth="2" />
      {/* Vòng tròn giao thông */}
      <path d="M80,30 A50,50 0 1,1 79.9,30" stroke="#00E676" strokeWidth="5" fill="none" markerEnd="url(#arr)" strokeLinecap="round" />
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#00E676" />
        </marker>
      </defs>
      {/* 4 nhánh giao lộ */}
      <line x1="80" y1="0" x2="80" y2="30" stroke="#7F8C8D" strokeWidth="16" />
      <line x1="80" y1="130" x2="80" y2="160" stroke="#7F8C8D" strokeWidth="16" />
      <line x1="0" y1="80" x2="30" y2="80" stroke="#7F8C8D" strokeWidth="16" />
      <line x1="130" y1="80" x2="160" y2="80" stroke="#7F8C8D" strokeWidth="16" />
      <text x="80" y="84" textAnchor="middle" fontSize="11" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontWeight="bold">Vòng</text>
    </svg>
  </SignWrapper>
);

// Biển cấm vượt xe: tròn viền đỏ nền trắng, vẽ 2 ô tô con song song. Biển số P.125
export const NoOvertakingSign = () => (
  <SignWrapper label="Biển số P.125 - Cấm vượt">
    <svg viewBox="0 0 120 120" className="w-24 h-24 drop-shadow-md">
      <defs>
        <g id="car-front">
          <path d="M 2,12 C 2,10 4,9 6,9 L 20,9 C 22,9 24,10 24,12 L 24,20 C 24,21 23,22 22,22 L 4,22 C 3,22 2,21 2,20 Z" />
          <path d="M 5,9 L 7,3 L 19,3 L 21,9 Z" />
          <path d="M 8,4 L 18,4 L 19.5,8 L 6.5,8 Z" fill="#FFFFFF" />
          <circle cx="6" cy="14" r="2" fill="#FFFFFF" />
          <circle cx="20" cy="14" r="2" fill="#FFFFFF" />
          <rect x="4" y="22" width="4" height="2" fill="#333333" />
          <rect x="18" y="22" width="4" height="2" fill="#333333" />
          <rect x="5" y="17" width="16" height="2" rx="0.5" fill="#7F8C8D" />
        </g>
      </defs>
      <circle cx="60" cy="60" r="54" fill="#FFFFFF" stroke="#DA251D" strokeWidth="10" />
      {/* Xe bên trái màu đỏ (xe vượt) */}
      <use href="#car-front" x="32" y="46" fill="#DA251D" />
      {/* Xe bên phải màu đen */}
      <use href="#car-front" x="62" y="46" fill="#000000" />
    </svg>
  </SignWrapper>
);

// Biển cảnh báo trẻ em. Biển số W.225
export const ChildrenWarningSign = () => (
  <SignWrapper label="Biển số W.225 - Cảnh báo trẻ em">
    <svg viewBox="0 0 120 110" className="w-24 h-24 drop-shadow-md">
      <polygon points="60,8 112,102 8,102" fill="#FFD500" stroke="#DA251D" strokeWidth="9" strokeLinejoin="round" />
      {/* Bóng hai trẻ em dắt tay nhau vẽ chuẩn SVG */}
      <g fill="#000000" stroke="#000000" strokeWidth="0.5">
        <circle cx="49" cy="51" r="5" />
        <path d="M 49,56 L 49,71 L 44,83 M 49,71 L 53,83" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        <path d="M 49,59 L 41,68" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 49,59 L 58,66" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />

        <circle cx="65" cy="59" r="4" />
        <polygon points="65,63 59,76 71,76" />
        <path d="M 62,76 L 62,84 M 68,76 L 68,84" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        <path d="M 65,66 L 58,66" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        <path d="M 65,66 L 71,73" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      </g>
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
  "no-stopping": <NoStoppingSign />,
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
