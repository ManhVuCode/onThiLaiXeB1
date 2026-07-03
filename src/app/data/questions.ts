export interface Question {
  id: number;
  topicId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  isCritical?: boolean;
  signKey?: string;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
}

export const TOPICS: Topic[] = [
  { id: 1, name: "Khái niệm & Quy tắc", description: "Luật giao thông, nhường đường, ưu tiên", icon: "📋", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  { id: 2, name: "Biển báo hiệu", description: "Biển cấm, biển nguy hiểm, biển chỉ dẫn", icon: "🚦", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  { id: 3, name: "Sa hình & Tình huống", description: "Các tình huống giao thông thực tế", icon: "🗺️", color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  { id: 4, name: "Kỹ thuật lái xe", description: "Kỹ năng vận hành, xử lý tình huống", icon: "🚗", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  { id: 5, name: "Cấu tạo xe", description: "Động cơ, hệ thống phanh, an toàn xe", icon: "⚙️", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
  { id: 6, name: "Văn hóa, Đạo đức & Pháp luật", description: "Đạo đức người lái xe, giấy tờ, mức phạt", icon: "⚖️", color: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200" },
];

export const ALL_QUESTIONS: Question[] = [
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
  { id: 25, topicId: 2, question: "Biển báo trong hình có nghĩa gì?", options: ["Cấm đỗ xe nhưng được dừng tạm thời", "Cấm cả dừng và đỗ xe ở khu vực có biển", "Chỉ cấm xe tải dừng đỗ", "Cấm đỗ trong giờ cao điểm"], correctAnswer: 1, explanation: "Biển cấm đỗ xe (chữ P bị gạch chéo đỏ) cấm đỗ xe tại khu vực đó. Biển cấm cả dừng và đỗ có thêm đường gạch chéo.", signKey: "no-stopping" },
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

  // ── TOPIC 5 (TIẾP THEO) ──
  {
    id: 76,
    topicId: 5,
    question: "Phương pháp kiểm tra mức dầu bôi trơn động cơ nào dưới đây là đúng?",
    options: [
      "Kiểm tra que thăm dầu trên các-te. Quan sát vệt dầu trên que thăm, mức dầu này phải nằm ở mức tối đa được thể hiện trên que thăm.",
      "Rút que thăm dầu trên các-te. Quan sát vệt dầu trên que thăm, mức dầu này phải nằm ở mức tối thiểu được thể hiện trên que thăm.",
      "Rút que thăm dầu trên các-te, lau sạch que thăm sau đó cắm vào các-te và rút ra quan sát vệt dầu trên que thăm, mức dầu phải nằm trong khoảng vạch mức tối thiểu và tối đa được thể hiện trên que thăm."
    ],
    correctAnswer: 2,
    explanation: "Phương pháp kiểm tra dầu bôi trơn đúng là rút que thăm dầu ra, lau sạch, cắm ngược trở lại các-te rồi rút ra quan sát. Mức dầu đúng tiêu chuẩn phải nằm trong khoảng Min và Max trên que thăm."
  },
  {
    id: 77,
    topicId: 5,
    question: "Xe ô tô tham gia giao thông đường bộ phải bảo đảm các quy định về chất lượng, an toàn kỹ thuật và bảo vệ môi trường nào dưới đây?",
    options: [
      "Kính chắn gió, kính cửa phải là loại kính an toàn, bảo đảm tầm nhìn cho người điều khiển; có đủ hệ thống hãm và hệ thống chuyển hướng có hiệu lực, tay lái xe ô tô ở bên trái của xe, có còi với âm lượng đúng quy chuẩn kỹ thuật.",
      "Có đủ đèn chiếu sáng gần và xa, đèn soi biển số, đèn báo hãm, đèn tín hiệu; có đủ bộ phận giảm thanh, giảm khói, các kết cấu phải đủ độ bền và bảo đảm tính năng vận hành ổn định.",
      "Cả hai ý trên."
    ],
    correctAnswer: 2,
    explanation: "Xe ô tô khi tham gia giao thông phải bảo đảm đầy đủ các yêu cầu về an toàn kỹ thuật như kính chắn gió an toàn, phanh, chuyển hướng hiệu lực, tay lái bên trái, còi đúng quy chuẩn, đủ đèn chiếu sáng, đèn báo hãm, giảm thanh và giảm khói."
  },
  {
    id: 78,
    topicId: 5,
    question: "Xe mô tô và xe ô tô tham gia giao thông trên đường bộ có bắt buộc phải có đủ bộ phận giảm thanh không?",
    options: [
      "Không bắt buộc.",
      "Bắt buộc.",
      "Tùy từng trường hợp."
    ],
    correctAnswer: 1,
    explanation: "Mọi phương tiện cơ giới đường bộ (bao gồm xe mô tô và xe ô tô) đều bắt buộc phải có đủ bộ phận giảm thanh để hạn chế ô nhiễm tiếng ồn khi tham gia giao thông."
  },
  {
    id: 79,
    topicId: 5,
    question: "Xe ô tô tham gia giao thông trên đường bộ phải có đủ các loại đèn nào dưới đây?",
    options: [
      "Đèn chiếu sáng gần và xa.",
      "Đèn soi biển số, đèn báo hãm và đèn tín hiệu.",
      "Dàn đèn pha trên nóc xe.",
      "Ý 1 và ý 2."
    ],
    correctAnswer: 3,
    explanation: "Theo quy định pháp luật giao thông, xe ô tô tham gia giao thông bắt buộc phải trang bị đèn chiếu sáng gần/xa, đèn soi biển số, đèn báo hãm và đèn tín hiệu chuyển hướng."
  },
  {
    id: 80,
    topicId: 5,
    question: "Kính chắn gió của xe ô tô phải bảo đảm yêu cầu nào dưới đây?",
    options: [
      "Là loại kính an toàn, kính nhiều lớp, đúng quy cách, không rạn nứt, bảo đảm hình ảnh quan sát rõ ràng, không bị méo mó.",
      "Là loại kính trong suốt, không rạn nứt, bảo đảm tầm nhìn cho người điều khiển về phía trước mặt và hai bên."
    ],
    correctAnswer: 0,
    explanation: "Kính chắn gió xe ô tô bắt buộc phải là loại kính an toàn nhiều lớp để khi vỡ không tạo ra các mảnh vỡ sắc nhọn, đảm bảo an toàn cho người ngồi trong cabin và giữ hình ảnh quan sát rõ ràng."
  },
  {
    id: 81,
    topicId: 5,
    question: "Bánh xe, lốp lắp cho xe ô tô phải bảo đảm an toàn kỹ thuật như thế nào dưới đây?",
    options: [
      "Bánh xe phải có kết cấu chắc chắn, lắp đặt đúng quy cách của nhà sản xuất.",
      "Lốp phải đủ số lượng, đủ áp suất, không phồng rộp, đúng cỡ lốp của nhà sản xuất hoặc tài liệu kỹ thuật quy định; lốp trên cùng một trục của xe sử dụng trong điều kiện hoạt động bình thường phải cùng kiểu loại.",
      "Cả hai ý trên."
    ],
    correctAnswer: 2,
    explanation: "Bánh xe lắp cho ô tô phải chắc chắn, đúng quy cách. Lốp xe phải đủ số lượng, áp suất quy định, không bị phồng rộp, nứt nẻ và lốp trên cùng một trục phải có cùng kiểu loại để đảm bảo xe chạy cân bằng."
  },
  {
    id: 82,
    topicId: 5,
    question: "Hệ thống lái trên xe ô tô phải bảo đảm yêu cầu nào dưới đây?",
    options: [
      "Bảo đảm cho xe chuyển hướng chính xác, điều khiển nhẹ nhàng, an toàn ở mọi vận tốc và tải trọng trong phạm vi tính năng kỹ thuật cho phép của xe.",
      "Khi hoạt động các cơ cấu chuyển động của hệ thống lái không được va chạm với bất kỳ bộ phận nào của xe; khi quay vô lăng lái về bên phải và bên trái thì không được có sự khác biệt đáng kể về lực tác động lên vành tay lái.",
      "Cả hai ý trên."
    ],
    correctAnswer: 2,
    explanation: "Hệ thống lái phải giúp xe chuyển hướng chính xác, nhẹ nhàng, an toàn ở mọi tốc độ và tải trọng. Các chi tiết chuyển động không được va chạm vào khung xe và lực đánh lái hai bên phải đều nhau."
  },
  {
    id: 83,
    topicId: 5,
    question: "Mục đích của bảo dưỡng thường xuyên đối với xe ô tô có tác dụng gì dưới đây?",
    options: [
      "Bảo dưỡng ô tô thường xuyên làm cho ô tô luôn luôn có tính năng kỹ thuật tốt, giảm cường độ hao mòn của các chi tiết, kéo dài tuổi thọ của xe.",
      "Ngăn ngừa và phát hiện kịp thời các hư hỏng và sai lệch kỹ thuật để khắc phục, giữ gìn được hình thức bên ngoài.",
      "Cả hai ý trên."
    ],
    correctAnswer: 2,
    explanation: "Bảo dưỡng định kỳ và thường xuyên giúp giữ xe ở trạng thái kỹ thuật tốt nhất, giảm hao mòn chi tiết, phát hiện sớm các nguy cơ hư hỏng và giữ xe sạch đẹp."
  },
  {
    id: 84,
    topicId: 5,
    question: "Trong các nguyên nhân nêu dưới đây, nguyên nhân nào làm động cơ diesel không nổ?",
    options: [
      "Hết nhiên liệu, lõi lọc nhiên liệu bị tắc, lọc khí bị tắc, nhiên liệu lẫn không khí, tạp chất.",
      "Hết nhiên liệu, lõi lọc nhiên liệu bị tắc, lọc khí bị tắc, nhiên liệu lẫn không khí, không có tia lửa điện.",
      "Hết nhiên liệu, lõi lọc nhiên liệu bị tắc, lọc khí bị tắc, nhiên liệu lẫn không khí và nước, không có tia lửa điện."
    ],
    correctAnswer: 0,
    explanation: "Động cơ diesel sử dụng nguyên lý tự nén nổ dưới áp suất và nhiệt độ cao trong buồng đốt nên không trang bị hệ thống đánh lửa tạo tia lửa điện. Do đó nguyên nhân không nổ do không có tia lửa điện là sai."
  },
  {
    id: 85,
    topicId: 5,
    question: "Ống xả lắp trên xe ô tô phải bảo đảm yêu cầu an toàn kỹ thuật nào dưới đây?",
    options: [
      "Ống xả không được đặt ở vị trí có thể gây cháy xe hoặc ảnh hưởng đến người ngồi trên xe và gây cản trở hoạt động của hệ thống khác.",
      "Miệng thoát khí thải của ống xả không được hướng về phía trước và không được hướng về bên phải theo chiều tiến của xe.",
      "Cả hai ý trên."
    ],
    correctAnswer: 2,
    explanation: "Ống xả không được hướng về phía trước (gây cản gió và thổi vào xe đối diện) hay bên phải (thổi vào người đi bộ trên vỉa hè) và không được lắp ở vị trí dễ gây bắt lửa cháy xe."
  },
  {
    id: 86,
    topicId: 5,
    question: "Dây đai an toàn lắp trên xe ô tô phải bảo đảm yêu cầu an toàn kỹ thuật nào dưới đây?",
    options: [
      "Đủ số lượng, lắp đặt chắc chắn không bị rách, đứt, khóa cài đóng, mở nhẹ nhàng, không tự mở, không bị kẹt; kéo ra thu vào dễ dàng, cơ cấu hãm giữ chặt dây khi giật dây đột ngột.",
      "Đủ số lượng, lắp đặt chắc chắn không bị rách, đứt, khóa cài đóng, mở nhẹ nhàng, không tự mở, không bị kẹt; kéo ra thu vào dễ dàng, cơ cấu hãm mở ra khi giật dây đột ngột.",
      "Cả hai ý trên."
    ],
    correctAnswer: 0,
    explanation: "Yêu cầu cốt lõi của dây đai an toàn là cơ cấu hãm phải khóa chặt (giữ chặt dây) khi có lực giật đột ngột (tình huống va chạm hoặc phanh gấp) để bảo vệ người ngồi khỏi lao về phía trước."
  },
  {
    id: 87,
    topicId: 5,
    question: "Thế nào là động cơ 4 kỳ?",
    options: [
      "Là loại động cơ: để hoàn thành một chu trình công tác của động cơ, pít tông thực hiện 2 (hai) hành trình, trong đó có một lần sinh công.",
      "Là loại động cơ: để hoàn thành một chu trình công tác của động cơ, pít tông thực hiện 4 (bốn) hành trình, trong đó có một lần sinh công."
    ],
    correctAnswer: 1,
    explanation: "Động cơ 4 kỳ là loại động cơ hoàn thành một chu trình làm việc gồm 4 hành trình của pít-tông (Nạp, Nén, Nổ, Xả), trục khuỷu quay 2 vòng."
  },
  {
    id: 88,
    topicId: 5,
    question: "Công dụng của hệ thống bôi trơn đối với động cơ ô tô?",
    options: [
      "Cung cấp một lượng dầu bôi trơn đủ và sạch dưới áp suất nhất định đi bôi trơn cho các chi tiết của động cơ để giảm ma sát, giảm mài mòn, làm kín, làm sạch, làm mát và chống gỉ.",
      "Cung cấp một lượng nhiên liệu đầy đủ và sạch để cho động cơ ô tô hoạt động.",
      "Cả hai ý trên."
    ],
    correctAnswer: 0,
    explanation: "Hệ thống bôi trơn dùng để đưa dầu bôi trơn sạch đến các mặt ma sát của các chi tiết động cơ nhằm bôi trơn, làm sạch, làm mát, chống gỉ và làm kín khe hở."
  },
  {
    id: 89,
    topicId: 5,
    question: "Niên hạn sử dụng của xe ô tô tải (tính bắt đầu từ năm sản xuất) không quá bao nhiêu năm?",
    options: [
      "15 năm.",
      "20 năm.",
      "25 năm."
    ],
    correctAnswer: 2,
    explanation: "Theo Nghị định 95/2009/NĐ-CP, niên hạn sử dụng của xe ô tô tải tối đa là 25 năm kể từ năm sản xuất."
  },
  {
    id: 90,
    topicId: 5,
    question: "Niên hạn sử dụng của xe ô tô chở người trên 8 chỗ ngồi (không kể chỗ của người lái xe) tính bắt đầu từ năm sản xuất không quá bao nhiêu năm?",
    options: [
      "5 năm.",
      "20 năm.",
      "25 năm."
    ],
    correctAnswer: 1,
    explanation: "Theo Nghị định 95/2009/NĐ-CP, niên hạn sử dụng của xe ô tô chở người trên 8 chỗ ngồi (không tính ghế lái) tối đa là 20 năm kể từ năm sản xuất."
  },
  {
    id: 91,
    topicId: 5,
    question: "Hãy nêu công dụng của động cơ xe ô tô?",
    options: [
      "Khi làm việc, nhiệt năng được biến đổi thành cơ năng làm trục khuỷu động cơ quay, truyền lực đến các bánh xe chủ động tạo ra chuyển động tịnh tiến cho xe ô tô.",
      "Khi làm việc, cơ năng được biến đổi thành nhiệt năng và truyền đến các bánh xe chủ động tạo ra chuyển động tịnh tiến cho xe ô tô.",
      "Cả hai ý trên."
    ],
    correctAnswer: 0,
    explanation: "Động cơ đốt trong trên xe ô tô chuyển hóa nhiệt năng của quá trình đốt cháy nhiên liệu thành cơ năng làm quay trục khuỷu, truyền qua hệ thống truyền lực để làm quay bánh xe chủ động."
  },
  {
    id: 92,
    topicId: 5,
    question: "Hãy nêu công dụng hệ thống truyền lực của xe ô tô?",
    options: [
      "Dùng để truyền mô men quay từ động cơ tới các bánh xe chủ động của xe ô tô.",
      "Dùng để thay đổi hướng chuyển động hoặc giữ cho xe ô tô chuyển động ổn định theo hướng xác định.",
      "Dùng để làm giảm tốc độ, dừng chuyển động của xe ô tô."
    ],
    correctAnswer: 0,
    explanation: "Hệ thống truyền lực dùng để truyền mô-men xoắn từ trục khuỷu động cơ đến các bánh xe chủ động của xe ô tô."
  },
  {
    id: 93,
    topicId: 5,
    question: "Hãy nêu công dụng ly hợp (côn) của xe ô tô?",
    options: [
      "Dùng để truyền mô men xoắn giữa các trục không cùng nằm trên một đường thẳng và góc lệch trục luôn thay đổi trong quá trình xe ô tô chuyển động.",
      "Dùng để truyền hoặc ngắt truyền động từ động cơ đến hộp số của xe ô tô.",
      "Dùng để truyền truyền động từ hộp số đến bánh xe chủ động của ô tô."
    ],
    correctAnswer: 1,
    explanation: "Ly hợp (côn) nằm giữa động cơ và hộp số, có công dụng truyền động hoặc cắt (ngắt) truyền động từ động cơ đến hộp số khi cần khởi hành hoặc chuyển số."
  },
  {
    id: 94,
    topicId: 5,
    question: "Hãy nêu công dụng hộp số của xe ô tô?",
    options: [
      "Truyền và tăng mô men xoắn giữa các trục vuông góc nhau, bảo đảm cho các bánh xe chủ động quay với tốc độ khác nhau khi sức cản chuyển động ở bánh xe hai bên không bằng nhau.",
      "Truyền và thay đổi mô men xoắn giữa các trục không cùng nằm trên một đường thẳng và góc lệch trục luôn thay đổi trong quá trình ô tô chuyển động, chuyển số êm dịu, dễ điều khiển.",
      "Truyền và thay đổi mô men từ động cơ đến bánh xe chủ động, cắt truyền động từ động cơ đến bánh xe chủ động, bảo đảm cho xe ô tô chuyển động lùi."
    ],
    correctAnswer: 2,
    explanation: "Hộp số có công dụng truyền và thay đổi mô-men từ động cơ đến bánh xe chủ động, ngắt (cắt) truyền động từ động cơ (về số trung gian - số N) và đảo chiều quay của bánh xe để giúp xe lùi."
  },
  {
    id: 95,
    topicId: 5,
    question: "Hãy nêu công dụng hệ thống lái của xe ô tô?",
    options: [
      "Dùng để thay đổi mô men từ động cơ tới các bánh xe chủ động khi xe ô tô chuyển động theo hướng xác định.",
      "Dùng để thay đổi mô men giữa các trục vuông góc nhau khi xe ô tô chuyển động theo hướng xác định.",
      "Dùng để thay đổi hướng chuyển động hoặc giữ cho xe ô tô chuyển động ổn định theo hướng xác định."
    ],
    correctAnswer: 2,
    explanation: "Hệ thống lái được trang bị trên ô tô dùng để thay đổi hướng chuyển động hoặc giữ cho xe ô tô chuyển động ổn định theo hướng xác định do người lái điều khiển qua vô-lăng."
  },
  {
    id: 96,
    topicId: 5,
    question: "Hãy nêu công dụng hệ thống phanh của xe ô tô?",
    options: [
      "Dùng để giảm tốc độ, dừng chuyển động của xe ô tô và giữ cho xe ô tô đứng yên trên dốc.",
      "Dùng để thay đổi hướng chuyển động hoặc giữ cho xe ô tô chuyển động ổn định theo hướng xác định.",
      "Dùng để truyền hoặc ngắt truyền động từ động cơ đến bánh xe chủ động của xe ô tô."
    ],
    correctAnswer: 0,
    explanation: "Hệ thống phanh có công dụng làm giảm tốc độ, dừng hẳn xe ô tô hoặc giữ cho xe đứng yên trên dốc (phanh tay)."
  },
  {
    id: 97,
    topicId: 5,
    question: "Khi khởi động xe ô tô số tự động có trang bị chìa khóa thông minh, người lái xe có cần đạp hết hành trình bàn đạp chân phanh hay không?",
    options: [
      "Phải đạp hết hành trình bàn đạp chân phanh.",
      "Không cần đạp phanh.",
      "Tùy từng trường hợp."
    ],
    correctAnswer: 0,
    explanation: "Với xe ô tô số tự động sử dụng nút bấm khởi động Start/Stop, để đảm bảo an toàn và kích hoạt mạch điện khởi động, người lái bắt buộc phải đạp hết hành trình chân phanh."
  },
  {
    id: 98,
    topicId: 5,
    question: "Ắc quy được trang bị trên xe ô tô có tác dụng gì dưới đây?",
    options: [
      "Giúp người lái xe kịp thời tạo xung lực tối đa lên hệ thống phanh trong khoảnh khắc đầu tiên của tình huống khẩn cấp.",
      "Ổn định chuyển động của xe ô tô khi đi vào đường vòng.",
      "Hỗ trợ người lái xe khởi hành ngang dốc.",
      "Để tích trữ điện năng, cung cấp cho các phụ tải khi máy phát điện chưa làm việc."
    ],
    correctAnswer: 3,
    explanation: "Ắc quy là nguồn điện một chiều có khả năng nạp (tích điện) và phát điện để cung cấp năng lượng khởi động xe và cấp điện cho các thiết bị điện khi động cơ chưa hoạt động."
  },
  {
    id: 99,
    topicId: 5,
    question: "Máy phát điện được trang bị trên xe ô tô có tác dụng gì dưới đây?",
    options: [
      "Để phát điện năng cung cấp cho các phụ tải làm việc và nạp điện cho ắc quy.",
      "Ổn định chuyển động của xe ô tô khi đi vào đường vòng.",
      "Hỗ trợ người lái xe khởi hành ngang dốc.",
      "Để tích trữ điện năng và cung cấp điện cho các phụ tải làm việc."
    ],
    correctAnswer: 0,
    explanation: "Máy phát điện hoạt động nhờ mô-men quay từ động cơ, có vai trò phát điện để cung cấp năng lượng cho toàn bộ hệ thống điện của xe và sạc lại điện cho ắc quy khi xe nổ máy."
  },
  {
    id: 100,
    topicId: 5,
    question: "Dây đai an toàn được trang bị trên xe ô tô có tác dụng gì dưới đây?",
    options: [
      "Ổn định chuyển động của xe ô tô khi đi vào đường vòng.",
      "Giữ chặt người lái và hành khách trên ghế ngồi khi xe ô tô đột ngột dừng lại."
    ],
    correctAnswer: 1,
    explanation: "Dây đai an toàn giữ người lái và hành khách cố định tại ghế ngồi, ngăn cản hiện tượng lao về phía trước do quán tính khi xe phanh gấp hoặc va chạm trực diện."
  },
  {
    id: 101,
    topicId: 5,
    question: "Túi khí được trang bị trên xe ô tô có tác dụng gì dưới đây?",
    options: [
      "Giữ chặt người lái và hành khách trên ghế ngồi khi xe ô tô đột ngột dừng lại.",
      "Giảm khả năng va đập của một số bộ phận cơ thể quan trọng với các vật thể trong xe.",
      "Hấp thụ một phần lực va đập lên người lái và hành khách.",
      "Ý 2 và ý 3."
    ],
    correctAnswer: 3,
    explanation: "Túi khí an toàn có tác dụng giảm chấn do va đập của đầu/ngực người ngồi với vô lăng, táp lô, đồng thời hấp thụ lực tác động trực diện. Còn việc giữ chặt người trên ghế là của dây đai an toàn."
  },
  {
    id: 102,
    topicId: 5,
    question: "Thiết bị kích (hay nâng) được trang bị trên xe ô tô có tác dụng gì dưới đây?",
    options: [
      "Dùng để kích (hay nâng) xe ô tô phục vụ thay lốp hoặc sửa chữa.",
      "Vặn ốc lắp bánh xe.",
      "Ổn định chuyển động của xe ô tô khi đi vào đường vòng.",
      "Giữ chặt người lái và hành khách trên ghế ngồi khi xe ô tô đột ngột dừng lại."
    ],
    correctAnswer: 0,
    explanation: "Kích nâng xe là dụng cụ đi kèm theo xe phục vụ cho việc nâng gầm xe lên khi cần thay thế lốp xe dự phòng dọc đường."
  },
  {
    id: 103,
    topicId: 5,
    question: "Thiết bị búa chuyên dụng phá cửa kính được trang bị trên xe ô tô dùng để làm gì dưới đây?",
    options: [
      "Thay lốp xe.",
      "Chữa cháy.",
      "Phá cửa kính xe ô tô trong các trường hợp khân cấp để thoát hiểm.",
      "Vặn ốc để tháo lắp bánh xe."
    ],
    correctAnswer: 2,
    explanation: "Búa chuyên dụng phá kính được trang bị để người dùng đập vỡ các tấm kính cường lực thoát ra ngoài khi xe gặp nạn khẩn cấp, cháy nổ, rơi xuống nước."
  },
  {
    id: 104,
    topicId: 5,
    question: "Bình chữa cháy xách tay được trang bị trên xe ô tô dùng để làm gì dưới đây?",
    options: [
      "Thay lốp xe.",
      "Chữa cháy trong các trường hợp hỏa hoạn.",
      "Cầm máu cho người bị nạn."
    ],
    correctAnswer: 1,
    explanation: "Bình chữa cháy nhỏ xách tay có công dụng dập tắt các đám cháy, hỏa hoạn nhỏ vừa mới phát sinh trên xe nhằm hạn chế thiệt hại."
  },
  {
    id: 105,
    topicId: 5,
    question: "Nút bấm có biểu tượng hình tam giác màu đỏ trên xe ô tô (Hazard) có ý nghĩa như thế nào dưới đây?",
    options: [
      "Báo hiệu xin đường cho xe đi thẳng.",
      "Báo hiệu hệ thống phanh bị lỗi.",
      "Báo hiệu xe đang ở tình huống nguy hiểm cần cảnh báo khẩn cấp.",
      "Báo hiệu đến thời gian cần bảo dưỡng."
    ],
    correctAnswer: 2,
    explanation: "Nút bấm tam giác màu đỏ (Hazard light) dùng để kích hoạt các đèn xi-nhan nhấp nháy đồng thời nhằm cảnh báo nguy hiểm, sự cố hoặc khi xe phải dừng khẩn cấp trên làn đường di chuyển."
  }
];
