import type { Question } from "../questions";

// Trích từ "600 câu hỏi dùng cho sát hạch lái xe" (Cục CSGT, 2025)
// Chương V - Báo hiệu đường bộ. Câu 301-360.
// Đã loại các câu hỏi chỉ về xe mô tô / xe gắn máy: 304, 305, 306, 307, 344, 345, 349, 350.
// Không đặt signKey vì hầu hết câu là dạng so sánh nhiều biển (Biển 1/2/3) — mô tả biển ngay trong đề.
export const BATCH: Question[] = [
  // Câu 301
  { id: 1, topicId: 2, question: "Có ba biển báo cấm hình tròn viền đỏ nền trắng: Biển 1 vẽ một xe ô tô con; Biển 2 vẽ xe ô tô khách và xe ô tô tải; Biển 3 vẽ xe tải kéo rơ moóc. Biển nào cấm các loại xe cơ giới đi vào, trừ xe máy hai bánh, xe gắn máy và các loại xe ưu tiên theo quy định?", options: ["Biển 1", "Biển 2", "Biển 1 và biển 3", "Cả ba biển"], correctAnswer: 0, explanation: "Biển 1 là biển 'Cấm xe ô tô' (P.103a): cấm tất cả các loại xe cơ giới đi vào, trừ xe mô tô hai bánh, xe gắn máy và các xe ưu tiên theo luật định." },

  // Câu 302
  { id: 2, topicId: 2, question: "Ba biển cấm hình tròn viền đỏ: Biển 1 vẽ xe ô tô con; Biển 2 vẽ xe ô tô khách và xe ô tô tải; Biển 3 vẽ xe đầu kéo sơ mi rơ moóc. Biển nào cấm xe ô tô tải?", options: ["Cả ba biển", "Biển 2 và biển 3", "Biển 1 và biển 3", "Biển 1 và biển 2"], correctAnswer: 3, explanation: "Biển 1 (cấm xe ô tô) cấm cả ô tô tải; Biển 2 là biển cấm ô tô tải. Vì vậy cả Biển 1 và Biển 2 đều cấm xe ô tô tải. Biển 3 chỉ cấm xe đầu kéo sơ mi rơ moóc." },

  // Câu 303
  { id: 3, topicId: 2, question: "Ba biển cấm hình tròn viền đỏ: Biển 1 vẽ xe mô tô; Biển 2 vẽ xe ô tô tải; Biển 3 vẽ máy kéo (xe đầu vuông có bánh lớn). Biển nào cấm máy kéo?", options: ["Biển 1", "Biển 2 và biển 3", "Biển 1 và biển 3", "Cả ba biển"], correctAnswer: 1, explanation: "Biển 3 là biển 'Cấm máy kéo'. Biển 2 'Cấm ô tô tải' cũng có hiệu lực đối với máy kéo. Do đó cả Biển 2 và Biển 3 đều cấm máy kéo." },

  // Câu 308
  { id: 4, topicId: 2, question: "Biển 1 hình tròn nền xanh (lơ) vẽ hai xe ô tô con và gạch chéo — biển hết mọi lệnh cấm vượt; Biển 2 hình tròn viền đỏ vẽ hai xe ô tô con (một đỏ, một đen) — biển cấm vượt; Biển 3 hình tròn viền đỏ vẽ xe tải và xe ô tô con — biển cấm ô tô tải vượt. Biển nào cho phép xe ô tô con được vượt?", options: ["Biển 1 và biển 2", "Biển 2", "Biển 1 và biển 3", "Biển 2 và biển 3"], correctAnswer: 2, explanation: "Biển 1 là biển hết mọi lệnh cấm vượt nên ô tô con được vượt; Biển 3 chỉ cấm ô tô tải vượt nên ô tô con vẫn được vượt. Biển 2 cấm mọi xe cơ giới vượt." },

  // Câu 309
  { id: 5, topicId: 2, question: "Biển 1 hình tròn nền xanh có hai xe ô tô con và gạch chéo (hết cấm vượt); Biển 2 hình tròn viền đỏ vẽ hai xe ô tô con (cấm vượt); Biển 3 hình tròn viền đỏ vẽ xe tải và ô tô con (cấm ô tô tải vượt). Biển nào không cho phép xe ô tô con vượt?", options: ["Biển 1", "Biển 2", "Biển 3"], correctAnswer: 1, explanation: "Biển 2 (P.125 'Cấm vượt') cấm tất cả xe cơ giới vượt nhau, kể cả xe ô tô con." },

  // Câu 310
  { id: 6, topicId: 2, question: "Biển 1 hình tròn nền xanh có hai xe ô tô và gạch chéo (hết cấm vượt); Biển 2 hình tròn viền đỏ vẽ hai xe ô tô con (cấm vượt); Biển 3 hình tròn viền đỏ vẽ xe tải và ô tô con (cấm ô tô tải vượt). Biển nào cấm xe ô tô tải vượt?", options: ["Biển 1", "Biển 1 và biển 2", "Biển 1 và biển 3", "Biển 2 và biển 3"], correctAnswer: 3, explanation: "Biển 2 cấm tất cả xe cơ giới vượt (bao gồm cả ô tô tải); Biển 3 là biển cấm riêng ô tô tải vượt. Do đó cả Biển 2 và Biển 3 đều cấm xe ô tô tải vượt." },

  // Câu 311
  { id: 7, topicId: 2, question: "Biển 1 hình tròn viền đỏ vẽ hai xe ô tô con (cấm vượt); Biển 2 hình tròn viền đỏ vẽ xe tải và ô tô con (cấm ô tô tải vượt). Biển nào cấm xe tải vượt?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 2, explanation: "Biển 1 cấm mọi xe cơ giới vượt (gồm cả xe tải); Biển 2 cấm riêng ô tô tải vượt. Cả hai biển đều cấm xe tải vượt." },

  // Câu 312
  { id: 8, topicId: 2, question: "Biển 1 hình tròn viền đỏ vẽ hai xe ô tô con (cấm vượt); Biển 2 hình tròn viền đỏ vẽ xe tải và ô tô con (cấm ô tô tải vượt). Biển nào xe ô tô con được phép vượt?", options: ["Biển 1", "Biển 2"], correctAnswer: 1, explanation: "Biển 1 cấm mọi xe cơ giới vượt; Biển 2 chỉ cấm ô tô tải vượt nên xe ô tô con vẫn được phép vượt." },

  // Câu 313
  { id: 9, topicId: 2, question: "Biển 1 hình tròn viền đỏ, mũi tên gấp khúc chỉ sang trái bị gạch chéo (cấm rẽ trái); Biển 2 hình tròn viền đỏ, mũi tên hình chữ U bị gạch chéo (cấm quay đầu). Biển nào cấm quay đầu xe?", options: ["Biển 1", "Biển 2", "Không biển nào", "Cả hai biển"], correctAnswer: 1, explanation: "Biển 2 là biển 'Cấm quay đầu xe' (P.124a). Biển 1 chỉ cấm rẽ trái, không cấm quay đầu." },

  // Câu 314
  { id: 10, topicId: 2, question: "Biển 1 hình tròn viền đỏ, mũi tên gấp khúc sang trái bị gạch chéo (cấm rẽ trái); Biển 2 hình tròn viền đỏ, mũi tên chữ U bị gạch chéo (cấm quay đầu). Biển nào cấm xe rẽ trái?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 0, explanation: "Biển 1 là biển cấm rẽ trái; Biển 2 cấm quay đầu xe (không cấm rẽ trái)." },

  // Câu 315
  { id: 11, topicId: 2, question: "Biển 1 hình tròn viền đỏ, mũi tên sang trái bị gạch chéo (cấm rẽ trái); Biển 2 hình tròn viền đỏ, mũi tên chữ U bị gạch chéo (cấm quay đầu). Khi gặp biển nào xe được rẽ trái?", options: ["Biển 1", "Biển 2", "Không biển nào"], correctAnswer: 1, explanation: "Biển 2 chỉ cấm quay đầu, vẫn cho phép rẽ trái. Biển 1 cấm rẽ trái." },

  // Câu 316
  { id: 12, topicId: 2, question: "Biển 1 hình tròn viền đỏ, mũi tên gấp khúc sang trái bị gạch chéo (cấm mọi phương tiện rẽ trái); Biển 2 hình tròn viền đỏ có hình xe ô tô con và mũi tên rẽ trái bị gạch chéo (cấm ô tô rẽ trái). Biển nào cấm xe ô tô rẽ trái?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 2, explanation: "Biển 1 cấm mọi phương tiện rẽ trái (bao gồm ô tô); Biển 2 cấm riêng xe ô tô rẽ trái. Cả hai biển đều cấm ô tô rẽ trái." },

  // Câu 317
  { id: 13, topicId: 2, question: "Biển 1 cấm rẽ phải (mũi tên rẽ phải bị gạch chéo); Biển 2 cấm rẽ phải và quay đầu; Biển 3 có hình xe ô tô con - cấm ô tô rẽ phải. Biển nào cấm các phương tiện rẽ phải?", options: ["Biển 1 và biển 2", "Biển 1 và biển 3", "Biển 2 và biển 3", "Cả ba biển"], correctAnswer: 0, explanation: "Biển 1 và Biển 2 cấm tất cả các phương tiện rẽ phải; Biển 3 chỉ cấm xe ô tô rẽ phải." },

  // Câu 318
  { id: 14, topicId: 2, question: "Biển 1 cấm rẽ trái (mũi tên rẽ trái bị gạch chéo); Biển 2 cấm rẽ trái và quay đầu; Biển 3 có hình xe ô tô con - cấm ô tô rẽ trái. Biển nào cấm các phương tiện rẽ trái?", options: ["Biển 1 và biển 2", "Biển 1 và biển 3", "Biển 2 và biển 3", "Cả ba biển"], correctAnswer: 0, explanation: "Biển 1 và Biển 2 cấm tất cả các phương tiện rẽ trái; Biển 3 chỉ cấm xe ô tô rẽ trái." },

  // Câu 319
  { id: 15, topicId: 2, question: "Biển 1 có hình xe ô tô con và mũi tên chữ U bị gạch chéo (cấm ô tô quay đầu); Biển 2 có hình ô tô với mũi tên rẽ trái và quay đầu bị gạch chéo (cấm ô tô rẽ trái và quay đầu); Biển 3 có hình ô tô và mũi tên rẽ phải bị gạch chéo (cấm ô tô rẽ phải). Biển nào chỉ cấm xe ô tô quay đầu?", options: ["Biển 1", "Biển 2", "Biển 3", "Biển 1 và biển 3"], correctAnswer: 0, explanation: "Biển 1 chỉ cấm xe ô tô quay đầu. Biển 2 cấm cả rẽ trái và quay đầu, Biển 3 cấm rẽ phải." },

  // Câu 320
  { id: 16, topicId: 2, question: "Biển 1 có hình xe ô tô và mũi tên chữ U bị gạch chéo (cấm ô tô quay đầu); Biển 2 có hình ô tô với mũi tên rẽ trái và quay đầu bị gạch chéo (cấm ô tô rẽ trái và quay đầu); Biển 3 có hình ô tô và mũi tên rẽ phải bị gạch chéo (cấm ô tô rẽ phải). Biển nào cấm xe ô tô rẽ trái và quay đầu?", options: ["Biển 1", "Biển 2", "Biển 3", "Biển 1 và biển 3"], correctAnswer: 1, explanation: "Biển 2 là biển cấm xe ô tô rẽ trái và quay đầu." },

  // Câu 321
  { id: 17, topicId: 2, question: "Biển 1 hình tròn viền đỏ có hình xe ô tô con bị gạch chéo (cấm ô tô); Biển 2 hình tròn viền đỏ có hình xe ô tô con và chữ 'TAXI' màu vàng (cấm xe taxi). Biển nào cấm xe taxi mà không cấm các phương tiện khác?", options: ["Biển 1", "Biển 2", "Không biển nào"], correctAnswer: 1, explanation: "Biển 2 có chữ TAXI chỉ cấm xe taxi, không cấm các phương tiện khác. Biển 1 cấm tất cả xe ô tô." },

  // Câu 322
  { id: 18, topicId: 2, question: "Biển 1 hình tròn viền đỏ, mũi tên rẽ trái bị gạch chéo (cấm rẽ trái); Biển 2 hình vuông nền xanh có mũi tên trắng chỉ hướng rẽ trái và quay đầu (biển chỉ dẫn được rẽ trái, quay đầu). Biển nào xe được phép rẽ trái?", options: ["Biển 1", "Biển 2", "Không biển nào"], correctAnswer: 1, explanation: "Biển 2 (nền xanh) cho phép rẽ trái và quay đầu; Biển 1 cấm rẽ trái." },

  // Câu 323
  { id: 19, topicId: 2, question: "Biển 1 hình tròn viền đỏ, mũi tên rẽ trái bị gạch chéo (cấm rẽ trái); Biển 2 hình vuông nền xanh có mũi tên trắng chỉ hướng rẽ trái và quay đầu. Biển nào xe quay đầu không bị cấm?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 2, explanation: "Biển 1 chỉ cấm rẽ trái nên không cấm quay đầu; Biển 2 cho phép quay đầu. Ở cả hai biển, xe quay đầu đều không bị cấm." },

  // Câu 324
  { id: 20, topicId: 2, question: "Biển 1 hình tròn viền đỏ, mũi tên rẽ trái bị gạch chéo (cấm rẽ trái); Biển 2 hình tròn nền xanh có mũi tên trắng chỉ rẽ trái (hiệu lệnh bắt buộc rẽ trái). Biển nào xe được phép quay đầu nhưng không được rẽ trái?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 0, explanation: "Biển 1 cấm rẽ trái nhưng không cấm quay đầu, nên xe được quay đầu mà không được rẽ trái. Biển 2 bắt buộc rẽ trái." },

  // Câu 325
  { id: 21, topicId: 2, question: "Biển 1 hình tròn viền đỏ nền trắng không có hình vẽ (biển 'Đường cấm'); Biển 2 hình tròn nền đỏ có vạch trắng nằm ngang ở giữa (biển 'Cấm đi ngược chiều'); Biển 3 hình tròn viền đỏ nền xanh có vạch chéo đỏ (biển cấm dừng đỗ). Biển nào là biển 'Cấm đi ngược chiều'?", options: ["Biển 1", "Biển 2", "Cả ba biển"], correctAnswer: 1, explanation: "Biển 'Cấm đi ngược chiều' (P.102) có nền đỏ với một vạch trắng nằm ngang ở giữa biển — đó là Biển 2." },

  // Câu 326
  { id: 22, topicId: 2, question: "Biển 1 hình tròn viền đỏ nền trắng không có hình vẽ (biển 'Đường cấm'); Biển 2 hình tròn nền đỏ có vạch trắng nằm ngang (biển 'Cấm đi ngược chiều'); Biển 3 hình tròn nền xanh có vạch chéo đỏ (biển cấm đỗ xe). Biển nào các phương tiện không được phép đi vào?", options: ["Biển 1", "Biển 2", "Biển 1 và biển 2"], correctAnswer: 2, explanation: "Biển 1 ('Đường cấm', cấm mọi loại xe) và Biển 2 ('Cấm đi ngược chiều') đều cấm phương tiện đi vào; Biển 3 chỉ cấm dừng, đỗ xe." },

  // Câu 327
  { id: 23, topicId: 2, question: "Ba biển hình tròn viền đỏ nền xanh có vạch chéo đỏ: Biển 1 (một vạch chéo) - cấm đỗ xe; Biển 2 (thêm một vạch dọc) - cấm đỗ xe ngày lẻ; Biển 3 (thêm hai vạch dọc) - cấm đỗ xe ngày chẵn. Gặp biển nào người lái xe không được đỗ xe vào ngày chẵn?", options: ["Biển 1", "Biển 1 và biển 3", "Biển 2 và biển 3", "Biển 3"], correctAnswer: 1, explanation: "Biển 3 (hai vạch dọc) cấm đỗ xe ngày chẵn; Biển 1 cấm đỗ xe mọi ngày (bao gồm ngày chẵn). Vì vậy không được đỗ vào ngày chẵn khi gặp Biển 1 và Biển 3." },

  // Câu 328
  { id: 24, topicId: 2, question: "Ba biển hình tròn viền đỏ nền xanh có vạch chéo đỏ: Biển 1 (một vạch chéo) - cấm đỗ xe; Biển 2 (thêm một vạch dọc) - cấm đỗ xe ngày lẻ; Biển 3 (thêm hai vạch dọc) - cấm đỗ xe ngày chẵn. Gặp biển nào người lái xe không được đỗ xe vào ngày lẻ?", options: ["Biển 1 và biển 2", "Biển 2", "Biển 2 và biển 3", "Biển 3"], correctAnswer: 0, explanation: "Biển 2 (một vạch dọc) cấm đỗ xe ngày lẻ; Biển 1 cấm đỗ xe mọi ngày (bao gồm ngày lẻ). Vì vậy không được đỗ vào ngày lẻ khi gặp Biển 1 và Biển 2." },

  // Câu 329
  { id: 25, topicId: 2, question: "Biển 1 hình tròn viền đỏ nền trắng không có hình vẽ ('Đường cấm'); Biển 2 hình bát giác màu đỏ có chữ 'STOP' màu trắng (biển 'Dừng lại'); Biển 3 biển 'Cấm đi ngược chiều'. Khi gặp biển nào xe ưu tiên theo luật định vẫn phải dừng lại?", options: ["Biển 1", "Biển 2", "Cả ba biển"], correctAnswer: 1, explanation: "Biển STOP (R.122) yêu cầu mọi xe, kể cả xe ưu tiên, phải dừng hẳn lại trước khi đi tiếp." },

  // Câu 330
  { id: 26, topicId: 2, question: "Biển 1 hình tròn viền đỏ nền trắng không có hình vẽ (biển 'Đường cấm' P.101); Biển 2 hình bát giác đỏ có chữ 'STOP' (biển 'Dừng lại'). Biển nào cấm tất cả các loại xe cơ giới và thô sơ đi lại trên đường, trừ xe ưu tiên theo luật định (nếu đường vẫn cho xe chạy được)?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 0, explanation: "Biển 'Đường cấm' (P.101) cấm tất cả các loại xe cơ giới và thô sơ đi lại, trừ các xe ưu tiên theo luật định." },

  // Câu 331
  { id: 27, topicId: 2, question: "Biển 1 hình tròn viền đỏ có hình xe ô tô tải bị gạch chéo (cấm ô tô tải); Biển 2 hình xe tải ghi '2.5t' (hạn chế tải trọng); Biển 3 hình tròn viền đỏ có hình kiện hàng màu da cam. Biển nào là biển 'Cấm xe chở hàng nguy hiểm'?", options: ["Biển 1", "Biển 2", "Biển 3"], correctAnswer: 2, explanation: "Biển 3 có hình kiện hàng màu da cam là biển 'Cấm xe chở hàng nguy hiểm'." },

  // Câu 332
  { id: 28, topicId: 2, question: "Biển 1 cấm xe lam (xe ba bánh có động cơ chở hàng); Biển 2 cấm xe súc vật kéo; Biển 3 cấm xe xích lô (xe ba bánh đạp). Gặp biển nào xe xích lô được phép đi vào?", options: ["Biển 1", "Biển 2", "Biển 3", "Biển 1 và biển 2"], correctAnswer: 3, explanation: "Chỉ Biển 3 cấm xe xích lô. Tại Biển 1 (cấm xe lam) và Biển 2 (cấm xe súc vật kéo), xe xích lô vẫn được phép đi vào." },

  // Câu 333
  { id: 29, topicId: 2, question: "Biển 1 cấm xe lam (xe ba bánh có động cơ chở hàng); Biển 2 cấm xe súc vật kéo; Biển 3 cấm xe xích lô (xe ba bánh đạp, xe thô sơ). Gặp biển nào xe lam, xe xích lô máy được phép đi vào?", options: ["Biển 1", "Biển 2", "Biển 3"], correctAnswer: 2, explanation: "Biển 3 chỉ cấm xe thô sơ (xích lô đạp). Xe lam và xe xích lô máy (có động cơ) vẫn được đi vào khi gặp Biển 3." },

  // Câu 334
  { id: 30, topicId: 2, question: "Biển hình tròn viền đỏ nền trắng có hình súc vật (trâu/bò) kéo xe bị gạch chéo. Biển báo này có ý nghĩa như thế nào?", options: ["Đường cấm súc vật vận tải hàng hóa.", "Đường cấm súc vật vận tải hành khách.", "Đường cấm súc vật vận tải hàng hóa hoặc hành khách dù kéo xe hay chở trên lưng đi qua."], correctAnswer: 2, explanation: "Biển cấm đường đối với súc vật vận tải hàng hóa hoặc hành khách, dù kéo xe hay chở trên lưng, đều không được đi qua." },

  // Câu 335
  { id: 31, topicId: 2, question: "Biển hình tròn viền đỏ, nền đen có chữ 'ĐÊM' và số '70', kèm biển phụ ghi khung giờ '22:00 - 5:00'. Biển báo này có ý nghĩa như thế nào?", options: ["Tốc độ tối đa cho phép về ban đêm cho các phương tiện là 70 km/h.", "Tốc độ tối thiểu cho phép về ban đêm cho các phương tiện là 70 km/h."], correctAnswer: 0, explanation: "Biển nền đen có chữ ĐÊM và khung giờ ban đêm báo hiệu tốc độ tối đa cho phép về ban đêm cho các phương tiện là 70 km/h." },

  // Câu 336
  { id: 32, topicId: 2, question: "Ba biển hình tròn viền đỏ: Biển 1 ghi '3,5m' với mũi tên lên - xuống (hạn chế chiều cao); Biển 2 ghi '7t' với hình trục xe (hạn chế tải trọng trục); Biển 3 ghi '10t' (hạn chế tải trọng toàn bộ). Khi gặp các biển này, xe ưu tiên theo luật định (có tải trọng hay chiều cao toàn bộ vượt quá chỉ số ghi trên biển) có được phép đi qua hay không?", options: ["Được phép.", "Không được phép."], correctAnswer: 1, explanation: "Đây là các biển hạn chế vì lý do kỹ thuật/an toàn cầu đường. Xe (kể cả xe ưu tiên) có tải trọng hoặc chiều cao vượt quá chỉ số ghi trên biển không được phép đi qua." },

  // Câu 337
  { id: 33, topicId: 2, question: "Ba biển hình tròn viền đỏ: Biển 1 ghi '3,5m' với mũi tên lên - xuống; Biển 2 ghi '7t' với hình trục xe; Biển 3 ghi '10t'. Biển nào hạn chế chiều cao của xe và hàng?", options: ["Biển 1", "Biển 2", "Biển 3"], correctAnswer: 0, explanation: "Biển 1 (ghi 3,5m với mũi tên chỉ lên - xuống) là biển hạn chế chiều cao của xe và hàng." },

  // Câu 338
  { id: 34, topicId: 2, question: "Ba biển hình tròn viền đỏ: Biển 1 ghi '3,5m' (hạn chế chiều cao); Biển 2 ghi '7t' kèm hình trục xe; Biển 3 ghi '10t'. Biển số 2 có ý nghĩa như thế nào?", options: ["Cho phép xe ô tô có tải trọng trục lớn hơn 7 tấn đi qua.", "Cho phép xe ô tô có tải trọng trên trục xe từ 7 tấn trở xuống đi qua."], correctAnswer: 1, explanation: "Biển ghi '7t' kèm hình trục xe hạn chế tải trọng trên trục xe: chỉ cho phép xe có tải trọng trên trục từ 7 tấn trở xuống đi qua." },

  // Câu 339
  { id: 35, topicId: 2, question: "Ba biển hình tròn viền đỏ: Biển 1 ghi '3,5m' (hạn chế chiều cao); Biển 2 ghi '7t' kèm hình trục xe (hạn chế tải trọng trục); Biển 3 ghi '10t'. Biển số 3 có ý nghĩa như thế nào?", options: ["Cấm các loại xe có tải trọng toàn bộ trên 10 tấn đi qua.", "Hạn chế khối lượng hàng hóa chở trên xe.", "Hạn chế tải trọng trên trục xe."], correctAnswer: 0, explanation: "Biển ghi '10t' (không kèm hình trục xe) cấm các loại xe có tải trọng toàn bộ trên 10 tấn đi qua." },

  // Câu 340
  { id: 36, topicId: 2, question: "Biển 1 hình tròn viền đỏ có hình xe kéo rơ moóc bị gạch chéo; Biển 2 hình tròn viền đỏ có hình máy kéo bị gạch chéo. Biển nào cấm máy kéo kéo theo rơ moóc?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 2, explanation: "Máy kéo kéo theo rơ moóc bị cấm bởi cả Biển 1 (cấm xe kéo rơ moóc) và Biển 2 (cấm máy kéo)." },

  // Câu 341
  { id: 37, topicId: 2, question: "Biển 1 hình tròn viền đỏ có hình xe kéo rơ moóc bị gạch chéo (cấm xe kéo rơ moóc); Biển 2 hình máy kéo bị gạch chéo; Biển 3 hình xe ô tô tải bị gạch chéo. Khi gặp biển số 1, xe ô tô tải (không kéo moóc) có được đi vào không?", options: ["Được đi vào.", "Không được đi vào."], correctAnswer: 0, explanation: "Biển 1 chỉ cấm xe kéo rơ moóc và xe sơ mi rơ moóc; xe ô tô tải không kéo moóc vẫn được đi vào." },

  // Câu 342
  { id: 38, topicId: 2, question: "Biển 1 hình tròn viền đỏ có hình xe kéo rơ moóc bị gạch chéo (cấm xe kéo rơ moóc); Biển 2 hình máy kéo bị gạch chéo (cấm máy kéo); Biển 3 hình xe ô tô con bị gạch chéo (cấm ô tô con). Biển nào không có hiệu lực đối với xe ô tô tải không kéo moóc?", options: ["Biển 1 và biển 2", "Biển 2 và biển 3", "Biển 1 và biển 3", "Cả ba biển"], correctAnswer: 0, explanation: "Xe ô tô tải không kéo moóc không bị cấm bởi Biển 1 (cấm xe kéo rơ moóc) và Biển 2 (cấm máy kéo). Biển 3 cấm ô tô con nên cũng không liên quan, nhưng đáp án chuẩn là Biển 1 và Biển 2." },

  // Câu 343
  { id: 39, topicId: 2, question: "Biển 1 hình tròn viền đỏ có hình xe kéo rơ moóc bị gạch chéo; Biển 2 hình máy kéo bị gạch chéo; Biển 3 hình xe ô tô tải bị gạch chéo. Biển nào cấm máy kéo?", options: ["Biển 1 và biển 2", "Biển 1 và biển 3", "Biển 2 và biển 3", "Cả ba biển"], correctAnswer: 2, explanation: "Biển 2 là biển cấm máy kéo; Biển 3 (cấm ô tô tải) cũng có hiệu lực đối với máy kéo. Do đó cả Biển 2 và Biển 3 đều cấm máy kéo." },

  // Câu 346
  { id: 40, topicId: 2, question: "Biển hình tròn viền đỏ vẽ hình xe ô tô con và xe mô tô, phía dưới có biển phụ hình chữ nhật với mũi tên hai chiều nằm ngang (chỉ hướng trái và phải). Biển này có ý nghĩa như thế nào?", options: ["Cấm xe cơ giới (trừ xe ưu tiên theo luật định) đi thẳng.", "Cấm các loại xe cơ giới và xe mô tô (trừ xe ưu tiên theo luật định) đi về bên trái và bên phải.", "Hướng trái và phải không cấm xe cơ giới."], correctAnswer: 1, explanation: "Biển kèm biển phụ mũi tên hai chiều báo hiệu cấm các loại xe cơ giới và xe mô tô (trừ xe ưu tiên) đi về cả bên trái và bên phải." },

  // Câu 347
  { id: 41, topicId: 2, question: "Biển hình tròn viền đỏ có hình chiếc còi bị gạch chéo (cấm bóp còi), phía dưới có biển phụ ghi '500m'. Biển phụ đặt dưới biển cấm bóp còi có ý nghĩa như thế nào?", options: ["Báo khoảng cách đến nơi cấm bóp còi.", "Chiều dài đoạn đường cấm bóp còi từ nơi đặt biển.", "Báo cấm dùng còi có độ vang xa 500m."], correctAnswer: 1, explanation: "Biển phụ '500m' báo hiệu chiều dài đoạn đường cấm bóp còi, tính từ vị trí đặt biển." },

  // Câu 348
  { id: 42, topicId: 2, question: "Biển hình tròn viền đỏ có hình chiếc còi bị gạch chéo (cấm bóp còi), kèm biển phụ ghi '500m'. Chiều dài đoạn đường 500 m từ nơi đặt biển này, người lái xe có được phép bấm còi không?", options: ["Được phép.", "Không được phép."], correctAnswer: 1, explanation: "Biển phụ '500m' cho biết cấm bóp còi trong suốt đoạn đường 500 m kể từ nơi đặt biển, nên không được phép bấm còi." },

  // Câu 351
  { id: 43, topicId: 2, question: "Ba biển 'Đường cấm' hình tròn viền đỏ, mỗi biển kèm một biển phụ vẽ một loại xe (Biển 1: xe ô tô con; Biển 2: xe mô tô; Biển 3: xe ô tô tải). Ba biển này có hiệu lực như thế nào?", options: ["Cấm các loại xe ở biển phụ đi vào.", "Cấm các loại xe cơ giới đi vào trừ loại xe ở biển phụ."], correctAnswer: 0, explanation: "Biển tròn đỏ kèm biển phụ vẽ loại xe có hiệu lực cấm đúng loại xe ghi ở biển phụ đi vào." },

  // Câu 352
  { id: 44, topicId: 2, question: "Hai biển hình tròn viền đỏ vẽ hai xe ô tô cách nhau và ghi '8m': Biển 1 kèm biển phụ '800m' có mũi tên (báo chiều dài đoạn đường); Biển 2 kèm biển phụ '200m' (không có mũi tên). Biển nào báo hiệu chiều dài đoạn đường phải giữ cự ly tối thiểu giữa hai xe?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 0, explanation: "Biển phụ có mũi tên ('800m') báo hiệu chiều dài đoạn đường phải giữ cự ly tối thiểu giữa hai xe — đó là Biển 1." },

  // Câu 353
  { id: 45, topicId: 2, question: "Hai biển hình tròn viền đỏ vẽ hai xe ô tô ghi '8m': Biển 1 kèm biển phụ '800m' có mũi tên; Biển 2 kèm biển phụ '200m' (không có mũi tên). Biển nào báo hiệu khoảng cách thực tế từ nơi đặt biển đến nơi cần cự ly tối thiểu giữa hai xe?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 1, explanation: "Biển phụ '200m' (không có mũi tên) báo khoảng cách thực tế từ nơi đặt biển đến nơi cần giữ cự ly tối thiểu — đó là Biển 2." },

  // Câu 354
  { id: 46, topicId: 2, question: "Biển hình tròn nền xanh, viền đỏ, có dấu chữ thập (X) màu đỏ (biển cấm dừng và đỗ xe), kèm biển phụ hình chữ nhật có mũi tên chỉ sang phải. Biển này có ý nghĩa như thế nào?", options: ["Cấm dừng xe về hướng bên trái.", "Cấm dừng và đỗ xe theo hướng bên phải.", "Được phép đỗ xe và dừng xe theo hướng bên phải."], correctAnswer: 1, explanation: "Biển cấm dừng và đỗ xe kèm biển phụ mũi tên chỉ sang phải: cấm dừng và đỗ xe theo hướng bên phải." },

  // Câu 355
  { id: 47, topicId: 2, question: "Biển hình tròn nền xanh có dấu chữ thập (X) màu đỏ (cấm dừng và đỗ xe), kèm biển phụ có mũi tên chỉ sang phải. Theo hướng bên phải có được phép đỗ xe, dừng xe không?", options: ["Không được phép.", "Được phép."], correctAnswer: 0, explanation: "Biển cấm dừng và đỗ xe với mũi tên chỉ sang phải nghĩa là không được phép dừng, đỗ xe theo hướng bên phải." },

  // Câu 356
  { id: 48, topicId: 2, question: "Biển hình tròn viền đỏ vẽ hình xe ô tô kéo rơ moóc và ghi '14 m'. Gặp biển này, xe ô tô sơ mi rơ moóc có chiều dài toàn bộ kể cả xe, moóc và hàng lớn hơn trị số ghi trên biển có được phép đi vào hay không?", options: ["Không được phép.", "Được phép."], correctAnswer: 0, explanation: "Biển hạn chế chiều dài (14 m): xe có chiều dài toàn bộ lớn hơn trị số ghi trên biển không được phép đi vào." },

  // Câu 357
  { id: 49, topicId: 2, question: "Biển hình tròn viền đỏ vẽ hình xe kéo rơ moóc và ghi '14 m'. Xe ô tô chở hàng vượt quá phía trước và sau thùng xe, mỗi phía quá 10% chiều dài toàn bộ thân xe, nhưng tổng chiều dài xe (cả hàng) từ trước đến sau nhỏ hơn trị số ghi trên biển thì có được phép đi vào không?", options: ["Không được phép.", "Được phép."], correctAnswer: 0, explanation: "Xe chở hàng vượt quá phía trước và sau thùng mỗi phía quá 10% chiều dài thân xe là vi phạm quy định về xếp hàng, nên không được phép đi vào." },

  // Câu 358
  { id: 50, topicId: 2, question: "Biển hình tròn viền đỏ có hình xe ô tô khách (xe buýt/xe khách) bị gạch chéo. Biển này có ý nghĩa như thế nào?", options: ["Cấm ô tô buýt.", "Cấm xe ô tô khách.", "Cấm xe ô tô con."], correctAnswer: 1, explanation: "Biển hình tròn viền đỏ có hình xe ô tô khách là biển 'Cấm xe ô tô khách'." },

  // Câu 359
  { id: 51, topicId: 2, question: "Biển hình tròn viền đỏ ghi '3,2m' với hai mũi tên nằm ngang chỉ vào nhau. Biển này có ý nghĩa như thế nào?", options: ["Hạn chế chiều cao của xe và hàng.", "Hạn chế chiều ngang của xe và hàng.", "Hạn chế chiều dài của xe và hàng."], correctAnswer: 1, explanation: "Biển có hai mũi tên nằm ngang chỉ vào nhau và trị số '3,2m' là biển hạn chế chiều ngang của xe và hàng." },

  // Câu 360
  { id: 52, topicId: 2, question: "Biển 1 hình tròn viền đỏ nền đen ghi chữ 'ĐÊM' và số '70', kèm biển phụ '22:00 - 5:00'; Biển 2 hình tròn viền đỏ nền trắng ghi '50'. Biển nào là biển 'Tốc độ tối đa cho phép về ban đêm'?", options: ["Biển 1", "Biển 2", "Cả hai biển"], correctAnswer: 0, explanation: "Biển 1 (nền đen, có chữ ĐÊM và khung giờ ban đêm) là biển 'Tốc độ tối đa cho phép về ban đêm'. Biển 2 là biển hạn chế tốc độ tối đa thông thường." },
];
