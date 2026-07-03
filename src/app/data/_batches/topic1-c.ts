import type { Question } from "../questions";

// Chương I - "Quy định chung và quy tắc giao thông đường bộ"
// Nguồn: Bộ 600 câu hỏi dùng cho sát hạch lái xe (Cục CSGT, 2025) - Câu 121 đến 180.
// Đã loại các câu chỉ dành cho xe mô tô/xe gắn máy và các câu trùng nội dung đã có.
// Đáp án lấy theo phương án được GẠCH CHÂN trong bản gốc.
export const BATCH: Question[] = [
  {
    id: 1,
    topicId: 1,
    question:
      "Tuổi tối đa của người lái xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe), xe ô tô chở người giường nằm là bao nhiêu tuổi?",
    options: [
      "Đủ 55 tuổi đối với nam và 50 tuổi đối với nữ",
      "Đủ 55 tuổi đối với nam và nữ",
      "Đủ 57 tuổi đối với nam và đủ 55 tuổi đối với nữ",
    ],
    correctAnswer: 2,
    explanation:
      "Tuổi tối đa của người lái xe ô tô chở người trên 29 chỗ và xe chở người giường nằm là đủ 57 tuổi đối với nam và đủ 55 tuổi đối với nữ.",
  },
  {
    id: 2,
    topicId: 1,
    question:
      "Người lái xe ô tô chở người (kể cả xe buýt) trên 16 chỗ đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg phải đủ bao nhiêu tuổi trở lên?",
    options: ["23 tuổi", "24 tuổi", "22 tuổi"],
    correctAnswer: 1,
    explanation:
      "Người lái các loại xe thuộc giấy phép lái xe hạng D2 phải đủ 24 tuổi trở lên.",
  },
  {
    id: 3,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe ô tô hạng B được phép điều khiển loại xe nào dưới đây?",
    options: [
      "Xe ô tô chở người đến 08 chỗ (không kể chỗ của người lái xe)",
      "Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg",
      "Cả hai ý trên",
    ],
    correctAnswer: 2,
    explanation:
      "Giấy phép lái xe hạng B cho phép điều khiển cả xe ô tô chở người đến 08 chỗ và xe ô tô tải, ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg.",
  },
  {
    id: 4,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe hạng C1 được điều khiển loại xe nào dưới đây?",
    options: [
      "Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Cả hai ý trên",
    ],
    correctAnswer: 1,
    explanation:
      "Hạng C1 được điều khiển xe ô tô tải, ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg và kéo rơ moóc đến 750 kg.",
  },
  {
    id: 5,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe hạng C được điều khiển loại xe nào dưới đây?",
    options: [
      "Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Cả hai ý trên",
    ],
    correctAnswer: 2,
    explanation:
      "Hạng C bao gồm cả nhóm xe tải trên 3.500 kg đến 7.500 kg (như C1) và nhóm xe tải trên 7.500 kg, kéo rơ moóc đến 750 kg.",
  },
  {
    id: 6,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe hạng D1 được điều khiển loại xe nào dưới đây?",
    options: [
      "Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Xe ô tô chở người trên 08 chỗ (không kể chỗ của người lái xe) đến 16 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Cả hai ý trên",
    ],
    correctAnswer: 1,
    explanation:
      "Hạng D1 được điều khiển xe ô tô chở người trên 08 chỗ đến 16 chỗ và kéo rơ moóc đến 750 kg.",
  },
  {
    id: 7,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe hạng D2 được điều khiển loại xe nào dưới đây?",
    options: [
      "Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Xe ô tô chở người trên 08 chỗ (không kể chỗ của người lái xe) đến 16 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Cả hai ý trên",
    ],
    correctAnswer: 2,
    explanation:
      "Hạng D2 được điều khiển cả nhóm xe chở người trên 16 chỗ đến 29 chỗ và nhóm xe của hạng D1 (trên 08 chỗ đến 16 chỗ).",
  },
  {
    id: 8,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe hạng D được điều khiển loại xe nào dưới đây?",
    options: [
      "Xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe); xe ô tô chở người giường nằm; các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
      "Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ đến 29 chỗ (không kể chỗ của người lái xe)",
      "Các loại xe ô tô quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô đầu kéo kéo sơ mi rơ moóc",
      "Ý 1 và ý 2",
    ],
    correctAnswer: 3,
    explanation:
      "Hạng D được điều khiển xe chở người trên 29 chỗ, xe giường nằm, kéo rơ moóc đến 750 kg và cả nhóm xe của hạng D2 (trên 16 chỗ đến 29 chỗ).",
  },
  {
    id: 9,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe hạng BE được điều khiển loại xe nào dưới đây?",
    options: [
      "Xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe); xe ô tô chở người giường nằm",
      "Các loại xe ô tô quy định cho giấy phép lái xe hạng B kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg",
      "Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg",
    ],
    correctAnswer: 1,
    explanation:
      "Hạng BE được điều khiển các loại xe của hạng B kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg.",
  },
  {
    id: 10,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe hạng CE được điều khiển loại xe nào dưới đây?",
    options: [
      "Các loại xe ô tô quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô đầu kéo kéo sơ mi rơ moóc",
      "Các loại xe ô tô quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg",
      "Cả hai ý trên",
    ],
    correctAnswer: 0,
    explanation:
      "Hạng CE được điều khiển các loại xe của hạng C kéo rơ moóc trên 750 kg và xe ô tô đầu kéo kéo sơ mi rơ moóc.",
  },
  {
    id: 11,
    topicId: 1,
    question:
      "Người có Giấy phép lái xe hạng DE được điều khiển loại xe nào dưới đây?",
    options: [
      "Các loại xe ô tô quy định cho giấy phép lái xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô chở khách nối toa",
      "Các loại xe ô tô quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô đầu kéo kéo sơ mi rơ moóc",
      "Cả hai ý trên",
    ],
    correctAnswer: 0,
    explanation:
      "Hạng DE được điều khiển các loại xe của hạng D kéo rơ moóc trên 750 kg và xe ô tô chở khách nối toa.",
  },
  {
    id: 12,
    topicId: 1,
    question:
      "Người tập lái xe ô tô khi tham gia giao thông đường bộ phải bảo đảm các điều kiện nào dưới đây?",
    options: [
      "Phải thực hành trên xe tập lái, trên tuyến đường tập lái và có giáo viên dạy lái bảo trợ tay lái",
      "Phải mang theo giấy phép xe tập lái",
      "Cả hai ý trên",
    ],
    correctAnswer: 0,
    explanation:
      "Người tập lái xe ô tô phải thực hành trên xe tập lái, đi đúng tuyến đường tập lái và có giáo viên dạy lái bảo trợ tay lái.",
  },
  {
    id: 13,
    topicId: 1,
    question:
      "Người lái xe khi tham gia giao thông đường bộ phải đảm bảo các điều kiện nào dưới đây?",
    options: [
      "Phải đủ tuổi, sức khỏe theo quy định của pháp luật; có giấy phép lái xe đang còn điểm, còn hiệu lực phù hợp với loại xe đang điều khiển do cơ quan có thẩm quyền cấp (trừ người lái xe gắn máy)",
      "Phải là người đứng tên trong đăng ký xe",
      "Cả hai ý trên",
    ],
    correctAnswer: 0,
    explanation:
      "Người lái xe phải đủ tuổi, đủ sức khỏe và có giấy phép lái xe đang còn điểm, còn hiệu lực, phù hợp với loại xe điều khiển; không bắt buộc phải là người đứng tên đăng ký xe.",
  },
  {
    id: 14,
    topicId: 1,
    question:
      "Khi tham gia giao thông đường bộ, người lái xe phải mang theo các giấy tờ gì?",
    options: [
      "Chứng nhận đăng ký xe hoặc bản sao Chứng nhận đăng ký xe có chứng thực kèm bản gốc giấy tờ xác nhận của tổ chức tín dụng, chi nhánh ngân hàng nước ngoài còn hiệu lực trong trường hợp xe đang được thế chấp",
      "Giấy phép lái xe phù hợp với loại xe đang điều khiển; chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường; chứng nhận bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới",
      "Trường hợp các giấy tờ nêu trên đã được tích hợp vào tài khoản định danh điện tử thì việc xuất trình, kiểm tra có thể thực hiện thông qua tài khoản định danh điện tử",
      "Cả ba ý trên",
    ],
    correctAnswer: 3,
    explanation:
      "Người lái xe phải mang theo đăng ký xe, giấy phép lái xe, chứng nhận kiểm định, bảo hiểm TNDS; các giấy tờ này có thể xuất trình qua tài khoản định danh điện tử nếu đã tích hợp.",
  },
  {
    id: 15,
    topicId: 1,
    question:
      "Giấy phép lái xe bị thu hồi trong các trường hợp nào sau đây?",
    options: [
      "Người được cấp giấy phép lái xe không đủ điều kiện sức khỏe theo kết luận của cơ sở khám bệnh, chữa bệnh đối với từng hạng giấy phép lái xe",
      "Giấy phép lái xe được cấp sai quy định",
      "Giấy phép lái xe đã quá thời hạn tạm giữ hoặc hết thời hiệu thi hành quyết định xử phạt vi phạm hành chính mà người vi phạm không đến nhận và không có lý do chính đáng",
      "Cả ba ý trên",
    ],
    correctAnswer: 3,
    explanation:
      "Giấy phép lái xe bị thu hồi khi người được cấp không đủ sức khỏe, giấy phép cấp sai quy định, hoặc quá thời hạn tạm giữ mà không đến nhận không có lý do chính đáng.",
  },
  {
    id: 16,
    topicId: 1,
    question:
      "Người có giấy phép lái xe chưa bị trừ hết 12 điểm được phục hồi điểm giấy phép lái xe trong trường hợp nào sau đây?",
    options: [
      "Không được phục hồi",
      "Được phục hồi đủ 12 điểm nếu không bị trừ điểm trong thời hạn 12 tháng kể từ ngày bị trừ điểm gần nhất",
    ],
    correctAnswer: 1,
    explanation:
      "Nếu trong 12 tháng kể từ lần bị trừ điểm gần nhất mà không bị trừ thêm điểm thì được phục hồi đủ 12 điểm.",
  },
  {
    id: 17,
    topicId: 1,
    question:
      "Người có giấy phép lái xe đã bị trừ hết điểm phải làm gì để phục hồi điểm giấy phép lái xe?",
    options: [
      "Không vi phạm pháp luật trật tự, an toàn giao thông đường bộ trong thời gian 12 tháng kể từ ngày bị trừ hết điểm",
      "Sau thời hạn ít nhất là 06 tháng kể từ ngày bị trừ hết điểm, được tham gia kiểm tra nội dung kiến thức pháp luật về trật tự, an toàn giao thông đường bộ; có kết quả đạt yêu cầu thì được phục hồi đủ 12 điểm",
      "Cả hai ý trên",
    ],
    correctAnswer: 1,
    explanation:
      "Người bị trừ hết điểm phải sau ít nhất 06 tháng mới được kiểm tra kiến thức pháp luật; đạt yêu cầu thì được phục hồi đủ 12 điểm.",
  },
  {
    id: 18,
    topicId: 1,
    question:
      "Trách nhiệm của tổ chức, cá nhân đứng tên trong giấy chứng nhận đăng ký xe khi chưa thực hiện thu hồi chứng nhận đăng ký xe, biển số xe được quy định như thế nào?",
    options: [
      "Tiếp tục chịu trách nhiệm của chủ xe",
      "Không chịu trách nhiệm sau khi đã chuyển nhượng, trao đổi, tặng, cho",
    ],
    correctAnswer: 0,
    explanation:
      "Khi chưa thu hồi chứng nhận đăng ký xe, biển số xe thì người đứng tên vẫn tiếp tục chịu trách nhiệm của chủ xe.",
  },
  {
    id: 19,
    topicId: 1,
    question:
      "Để bảo đảm điều kiện tham gia giao thông đường bộ, loại phương tiện nào phải lắp thiết bị giám sát hành trình?",
    options: [
      "Xe ô tô kinh doanh vận tải",
      "Xe ô tô chở người từ 08 chỗ trở lên (không kể chỗ của người lái xe) kinh doanh vận tải, xe ô tô đầu kéo, xe cứu thương",
      "Cả hai ý trên",
    ],
    correctAnswer: 2,
    explanation:
      "Cả xe ô tô kinh doanh vận tải và xe ô tô chở người từ 08 chỗ trở lên kinh doanh vận tải, xe đầu kéo, xe cứu thương đều phải lắp thiết bị giám sát hành trình.",
  },
  {
    id: 20,
    topicId: 1,
    question:
      "Trong khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên, ô tô chở người đến 28 chỗ (không kể chỗ của người lái xe) được tham gia giao thông với tốc độ khai thác tối đa cho phép là bao nhiêu?",
    options: ["60 km/h", "50 km/h", "40 km/h"],
    correctAnswer: 0,
    explanation:
      "Trong khu đông dân cư trên đường đôi hoặc đường một chiều có từ hai làn cơ giới trở lên, tốc độ tối đa là 60 km/h.",
  },
  {
    id: 21,
    topicId: 1,
    question:
      "Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới, ô tô chở người đến 28 chỗ (không kể chỗ của người lái xe) được tham gia giao thông với tốc độ khai thác tối đa cho phép là bao nhiêu?",
    options: ["60 km/h", "50 km/h", "40 km/h"],
    correctAnswer: 1,
    explanation:
      "Trong khu đông dân cư trên đường hai chiều hoặc đường một chiều có một làn cơ giới, tốc độ tối đa là 50 km/h.",
  },
  {
    id: 22,
    topicId: 1,
    question:
      "Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới, loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 50 km/h?",
    options: [
      "Ô tô tải, ô tô chở người trên 28 chỗ không kể chỗ của người lái xe",
      "Xe gắn máy, xe máy chuyên dùng",
      "Cả hai ý trên",
    ],
    correctAnswer: 0,
    explanation:
      "Ô tô tải và ô tô chở người trên 28 chỗ được chạy tối đa 50 km/h trên đường một làn cơ giới trong khu đông dân cư.",
  },
  {
    id: 23,
    topicId: 1,
    question:
      "Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn cơ giới trở lên, loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa là 60 km/h?",
    options: [
      "Ô tô tải, ô tô chở người trên 28 chỗ không kể chỗ của người lái xe",
      "Xe gắn máy, xe máy chuyên dùng",
      "Cả hai ý trên",
    ],
    correctAnswer: 0,
    explanation:
      "Ô tô tải và ô tô chở người trên 28 chỗ được chạy tối đa 60 km/h trên đường đôi hoặc đường có từ hai làn cơ giới trở lên trong khu đông dân cư.",
  },
  {
    id: 24,
    topicId: 1,
    question:
      "Trên đường bộ (trừ đường cao tốc) ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên, loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 90 km/h?",
    options: [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc)",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc; xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động)",
    ],
    correctAnswer: 0,
    explanation:
      "Ngoài khu đông dân cư trên đường đôi hoặc đường có từ hai làn cơ giới trở lên, ô tô chở người đến 28 chỗ và ô tô tải đến 3,5 tấn được chạy tối đa 90 km/h.",
  },
  {
    id: 25,
    topicId: 1,
    question:
      "Trên đường bộ ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 80 km/h?",
    options: [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc)",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc; xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động)",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc",
    ],
    correctAnswer: 1,
    explanation:
      "Ngoài khu đông dân cư trên đường đôi hoặc đường có từ hai làn cơ giới trở lên, ô tô chở người trên 28 chỗ và ô tô tải trên 3,5 tấn được chạy tối đa 80 km/h.",
  },
  {
    id: 26,
    topicId: 1,
    question:
      "Trên đường bộ ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 70 km/h?",
    options: [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc)",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động)",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc",
    ],
    correctAnswer: 2,
    explanation:
      "Trên đường đôi ngoài khu đông dân cư, xe buýt, ô tô đầu kéo, xe mô tô, ô tô chuyên dùng được chạy tối đa 70 km/h.",
  },
  {
    id: 27,
    topicId: 1,
    question:
      "Trên đường bộ ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 60 km/h?",
    options: [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc)",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc; xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động)",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc",
    ],
    correctAnswer: 3,
    explanation:
      "Nhóm xe kéo rơ moóc, ô tô trộn bê tông, ô tô xi téc... được chạy tối đa 60 km/h trên đường đôi ngoài khu đông dân cư.",
  },
  {
    id: 28,
    topicId: 1,
    question:
      "Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 80 km/h?",
    options: [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc)",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc; xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động)",
    ],
    correctAnswer: 0,
    explanation:
      "Trên đường một làn cơ giới ngoài khu đông dân cư, ô tô chở người đến 28 chỗ và ô tô tải đến 3,5 tấn được chạy tối đa 80 km/h.",
  },
  {
    id: 29,
    topicId: 1,
    question:
      "Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 70 km/h?",
    options: [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc)",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc; xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động)",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc",
    ],
    correctAnswer: 1,
    explanation:
      "Trên đường một làn cơ giới ngoài khu đông dân cư, ô tô chở người trên 28 chỗ và ô tô tải trên 3,5 tấn được chạy tối đa 70 km/h.",
  },
  {
    id: 30,
    topicId: 1,
    question:
      "Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 60 km/h?",
    options: [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc)",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động)",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc",
    ],
    correctAnswer: 2,
    explanation:
      "Trên đường một làn cơ giới ngoài khu đông dân cư, xe buýt, ô tô đầu kéo, xe mô tô, ô tô chuyên dùng được chạy tối đa 60 km/h.",
  },
  {
    id: 31,
    topicId: 1,
    question:
      "Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 50 km/h?",
    options: [
      "Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn",
      "Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc)",
      "Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc; xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động)",
      "Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc",
    ],
    correctAnswer: 3,
    explanation:
      "Trên đường một làn cơ giới ngoài khu đông dân cư, nhóm xe kéo rơ moóc, ô tô trộn bê tông, ô tô xi téc... được chạy tối đa 50 km/h.",
  },
  {
    id: 32,
    topicId: 1,
    question:
      "Khi tham gia giao thông trên đường bộ (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 50 km/h?",
    options: [
      "Xe máy chuyên dùng, xe gắn máy và các loại xe tương tự",
      "Xe chở người bốn bánh có gắn động cơ khi tham gia giao thông trong phạm vi và thời gian cho phép hoạt động",
      "Xe chở hàng bốn bánh có gắn động cơ khi tham gia giao thông trong phạm vi và thời gian cho phép hoạt động",
    ],
    correctAnswer: 2,
    explanation:
      "Xe chở hàng bốn bánh có gắn động cơ được tham gia giao thông với tốc độ tối đa 50 km/h trong phạm vi và thời gian cho phép hoạt động.",
  },
  {
    id: 33,
    topicId: 1,
    question:
      "Trên đoạn đường không có biển báo \"Cự ly tối thiểu giữa hai xe\", trong điều kiện mặt đường khô ráo, xe cơ giới đang chạy với tốc độ trên 100 km/h đến 120 km/h, người lái xe phải giữ khoảng cách an toàn với xe chạy liền trước tối thiểu là bao nhiêu?",
    options: ["55 m", "70 m", "100 m"],
    correctAnswer: 2,
    explanation:
      "Với tốc độ trên 100 km/h đến 120 km/h, khoảng cách an toàn tối thiểu với xe liền trước là 100 m.",
    isCritical: true,
  },
  {
    id: 34,
    topicId: 1,
    question:
      "Trên đoạn đường không có biển báo \"Cự ly tối thiểu giữa hai xe\", trong điều kiện mặt đường khô ráo, xe cơ giới đang chạy với tốc độ trên 60 km/h đến 80 km/h, người lái xe phải giữ khoảng cách an toàn với xe chạy liền trước tối thiểu là bao nhiêu?",
    options: ["55 m", "70 m", "100 m"],
    correctAnswer: 0,
    explanation:
      "Với tốc độ trên 60 km/h đến 80 km/h, khoảng cách an toàn tối thiểu với xe liền trước là 55 m.",
    isCritical: true,
  },
  {
    id: 35,
    topicId: 1,
    question:
      "Trên đoạn đường không có biển báo \"Cự ly tối thiểu giữa hai xe\", trong điều kiện mặt đường khô ráo, xe cơ giới đang chạy với tốc độ 60 km/h, người lái xe phải giữ khoảng cách an toàn với xe chạy liền trước tối thiểu là bao nhiêu?",
    options: ["35 m", "55 m", "70 m"],
    correctAnswer: 0,
    explanation:
      "Với tốc độ 60 km/h, khoảng cách an toàn tối thiểu với xe liền trước là 35 m.",
    isCritical: true,
  },
  {
    id: 36,
    topicId: 1,
    question:
      "Khi điều khiển xe chạy với tốc độ dưới 60 km/h, để bảo đảm khoảng cách an toàn giữa hai xe, người lái xe phải điều khiển xe như thế nào?",
    options: [
      "Chủ động giữ khoảng cách an toàn phù hợp với xe chạy liền trước xe của mình",
      "Bảo đảm khoảng cách an toàn tùy thuộc vào mật độ phương tiện, tình hình giao thông thực tế",
      "Cả hai ý trên",
    ],
    correctAnswer: 2,
    explanation:
      "Khi chạy dưới 60 km/h, người lái xe chủ động giữ khoảng cách an toàn phù hợp và tùy theo mật độ phương tiện, tình hình giao thông thực tế.",
    isCritical: true,
  },
  {
    id: 37,
    topicId: 1,
    question:
      "Người lái xe phải giảm tốc độ thấp hơn tốc độ tối đa cho phép đến mức cần thiết, chú ý quan sát và chuẩn bị sẵn sàng những tình huống có thể xảy ra để phòng ngừa tai nạn trong các trường hợp nào dưới đây?",
    options: [
      "Gặp biển báo nguy hiểm và cảnh báo trên đường",
      "Gặp biển chỉ dẫn trên đường",
      "Gặp biển báo hết mọi lệnh cấm",
      "Gặp biển báo hết hạn chế tốc độ tối đa cho phép",
    ],
    correctAnswer: 0,
    explanation:
      "Khi gặp biển báo nguy hiểm và cảnh báo trên đường, người lái xe phải giảm tốc độ, chú ý quan sát để phòng ngừa tai nạn.",
    isCritical: true,
  },
  {
    id: 38,
    topicId: 1,
    question:
      "Xe đưa đón trẻ em mầm non, học sinh được ưu tiên gì khi tham gia giao thông đường bộ?",
    options: [
      "Tổ chức phân luồng, điều tiết giao thông, bố trí nơi dừng xe, đỗ xe tại khu vực trường học và tại các điểm trên lộ trình đưa đón trẻ em mầm non, học sinh",
      "Được bố trí xe dẫn đường để bảo đảm an toàn giao thông",
      "Cả hai ý trên",
    ],
    correctAnswer: 0,
    explanation:
      "Xe đưa đón trẻ em mầm non, học sinh được ưu tiên trong tổ chức phân luồng, điều tiết giao thông và bố trí nơi dừng, đỗ xe.",
    isCritical: true,
  },
  {
    id: 39,
    topicId: 1,
    question:
      "Người điều khiển phương tiện tham gia giao thông đường bộ phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong các trường hợp nào dưới đây?",
    options: [
      "Tại nơi có vạch kẻ đường hoặc báo hiệu khác dành cho người đi bộ hoặc tại nơi mà người đi bộ, xe lăn của người khuyết tật đang qua đường",
      "Nơi đường bộ giao nhau cùng mức với đường bộ, đường bộ giao nhau cùng mức với đường sắt; đường hẹp, đường vòng, đường quanh co, đường đèo, dốc",
      "Khu vực có trường học, bệnh viện, bến xe, công trình công cộng tập trung đông người, khu vực đông dân cư, chợ, khu vực đang thi công trên đường bộ, hiện trường vụ tai nạn giao thông đường bộ",
      "Cả ba ý trên",
    ],
    correctAnswer: 3,
    explanation:
      "Người điều khiển phương tiện phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong tất cả các trường hợp nêu trên.",
    isCritical: true,
  },
  {
    id: 40,
    topicId: 1,
    question:
      "Tại những đoạn đường không bố trí biển báo hạn chế tốc độ, không bố trí biển báo khoảng cách an toàn tối thiểu giữa hai xe, người lái xe phải thực hiện quy định nào dưới đây để bảo đảm an toàn?",
    options: [
      "Được phép lái xe không hạn chế tốc độ và khoảng cách an toàn tối thiểu với xe phía trước cùng làn đường hoặc phần đường",
      "Được phép lái xe không hạn chế tốc độ và khoảng cách an toàn tối thiểu với xe phía trước cùng làn đường hoặc phần đường khi tham gia giao thông trên đường nhánh",
      "Chấp hành quy định về tốc độ, khoảng cách an toàn tối thiểu với xe phía trước cùng làn đường hoặc phần đường",
    ],
    correctAnswer: 2,
    explanation:
      "Ngay cả khi không có biển báo, người lái xe vẫn phải chấp hành quy định về tốc độ và khoảng cách an toàn tối thiểu với xe phía trước cùng làn đường.",
  },
  {
    id: 41,
    topicId: 1,
    question:
      "Việc vận chuyển hành khách bằng xe ô tô phải tuân thủ các quy định nào dưới đây?",
    options: [
      "Đón, trả hành khách đúng nơi quy định; hướng dẫn sử dụng trang thiết bị an toàn trên xe; giữ gìn vệ sinh trong xe; vận chuyển đúng lịch trình, lộ trình đã đăng ký (trừ bất khả kháng); không chở hành khách trên nóc xe, trong khoang chở hành lý hoặc để hành khách đu, bám bên ngoài xe",
      "Đón, trả hành khách theo yêu cầu của hành khách trên xe; hướng dẫn sử dụng trang thiết bị an toàn; giữ gìn vệ sinh trong xe; vận chuyển đúng lịch trình, lộ trình đã đăng ký (trừ bất khả kháng); không chở hành khách trên nóc xe, trong khoang chở hành lý hoặc để hành khách đu, bám bên ngoài xe",
    ],
    correctAnswer: 0,
    explanation:
      "Vận chuyển hành khách bằng xe ô tô phải đón, trả khách đúng nơi quy định (không phải theo yêu cầu tùy tiện), đúng lịch trình đã đăng ký và bảo đảm an toàn.",
  },
  {
    id: 42,
    topicId: 1,
    question:
      "Trong hoạt động vận tải đường bộ, các hành vi nào dưới đây bị nghiêm cấm?",
    options: [
      "Vận chuyển hàng hóa cấm lưu hành",
      "Vận chuyển trái phép hoặc không thực hiện đầy đủ các quy định của pháp luật về vận chuyển hàng hóa nguy hiểm",
      "Vận chuyển động vật hoang dã",
      "Cả ba ý trên",
    ],
    correctAnswer: 3,
    explanation:
      "Vận chuyển hàng hóa cấm lưu hành, vận chuyển trái phép hàng nguy hiểm và vận chuyển động vật hoang dã đều là những hành vi bị nghiêm cấm.",
  },
  {
    id: 43,
    topicId: 1,
    question:
      "Trong hoạt động vận tải hành khách, những hành vi nào dưới đây bị nghiêm cấm?",
    options: [
      "Cạnh tranh nhau nhằm tăng lợi nhuận",
      "Giảm giá để thu hút khách",
      "Đe dọa, xúc phạm, tranh giành, lôi kéo hành khách; đe dọa, cưỡng ép hành khách sử dụng dịch vụ ngoài ý muốn; chuyển tải, xuống khách hoặc các hành vi khác nhằm trốn tránh phát hiện xe chở quá tải, quá số người theo quy định của pháp luật",
      "Cả ba ý trên",
    ],
    correctAnswer: 2,
    explanation:
      "Hành vi bị nghiêm cấm là đe dọa, xúc phạm, tranh giành, lôi kéo, cưỡng ép hành khách và các hành vi trốn tránh phát hiện chở quá tải, quá số người.",
  },
  {
    id: 44,
    topicId: 1,
    question:
      "Trước khi xe khởi hành, người lái xe, nhân viên phục vụ trên xe ô tô vận chuyển hành khách có trách nhiệm nào sau đây?",
    options: [
      "Kiểm tra các điều kiện bảo đảm an toàn của xe",
      "Hướng dẫn cho hành khách về an toàn giao thông đường bộ và thoát hiểm khi gặp sự cố",
      "Kiểm tra nhân thân và hành lý của hành khách đi xe",
      "Ý 1 và ý 2",
    ],
    correctAnswer: 3,
    explanation:
      "Trước khi khởi hành phải kiểm tra điều kiện an toàn của xe và hướng dẫn hành khách về an toàn giao thông, thoát hiểm khi gặp sự cố.",
  },
  {
    id: 45,
    topicId: 1,
    question:
      "Xe ô tô kinh doanh vận tải chở trẻ em mầm non, học sinh phải đáp ứng các yêu cầu nào dưới đây?",
    options: [
      "Có thiết bị ghi nhận hình ảnh trẻ em mầm non, học sinh và thiết bị có chức năng cảnh báo, chống bỏ quên trẻ em trên xe; có niên hạn sử dụng không quá 20 năm; có màu sơn theo quy định của Chính phủ",
      "Có dây đai an toàn phù hợp với lứa tuổi hoặc sử dụng xe có ghế ngồi phù hợp với lứa tuổi theo quy định của pháp luật",
      "Được cấp chứng nhận đăng ký xe và gắn biển số xe, bảo đảm an toàn kỹ thuật và bảo vệ môi trường; xe chở người từ 08 chỗ trở lên (không kể chỗ của người lái xe) phải lắp thiết bị giám sát hành trình và thiết bị ghi nhận hình ảnh người lái xe",
      "Cả ba ý trên",
    ],
    correctAnswer: 3,
    explanation:
      "Xe ô tô chở trẻ em mầm non, học sinh phải đáp ứng đầy đủ cả ba nhóm yêu cầu về thiết bị cảnh báo, dây đai an toàn và điều kiện kỹ thuật, giám sát hành trình.",
    isCritical: true,
  },
  {
    id: 46,
    topicId: 1,
    question:
      "Việc vận chuyển động vật sống khi tham gia giao thông đường bộ phải thực hiện các yêu cầu nào dưới đây?",
    options: [
      "Người lái xe phải mang đủ giấy tờ theo quy định của pháp luật",
      "Phương tiện vận chuyển phải có kết cấu phù hợp với loại động vật chuyên chở",
      "Trong quá trình vận chuyển phải chấp hành các quy định của pháp luật về trật tự, an toàn giao thông đường bộ, vệ sinh dịch tễ, phòng dịch và bảo đảm vệ sinh môi trường",
      "Cả ba ý trên",
    ],
    correctAnswer: 3,
    explanation:
      "Vận chuyển động vật sống phải mang đủ giấy tờ, phương tiện có kết cấu phù hợp và chấp hành quy định về an toàn giao thông, vệ sinh dịch tễ, môi trường.",
  },
  {
    id: 47,
    topicId: 1,
    question:
      "Việc vận chuyển hàng hóa nguy hiểm khi tham gia giao thông đường bộ phải chấp hành các quy định nào dưới đây?",
    options: [
      "Phải có giấy phép vận chuyển; trong trường hợp cần thiết, đơn vị vận chuyển hàng hoá nguy hiểm phải bố trí người áp tải để bảo đảm trật tự, an toàn giao thông đường bộ",
      "Phải có giấy phép vận chuyển; không phải bố trí người áp tải khi tham gia giao thông đường bộ",
    ],
    correctAnswer: 0,
    explanation:
      "Vận chuyển hàng hóa nguy hiểm phải có giấy phép vận chuyển và khi cần thiết phải bố trí người áp tải để bảo đảm an toàn.",
    isCritical: true,
  },
  {
    id: 48,
    topicId: 1,
    question:
      "Việc lưu hành xe ô tô của người nước ngoài đăng ký tại nước ngoài có tay lái ở bên phải tham gia giao thông tại Việt Nam, xe cơ giới nước ngoài do người nước ngoài đưa vào Việt Nam du lịch được quy định như thế nào?",
    options: [
      "Phải chấp hành quy định của pháp luật về trật tự, an toàn giao thông đường bộ của Việt Nam. Trường hợp điều ước quốc tế mà Việt Nam là thành viên có quy định khác thì áp dụng theo điều ước quốc tế đó",
      "Tham gia giao thông đúng trong phạm vi, tuyến đường, thời gian đã được cơ quan có thẩm quyền của Việt Nam cấp phép",
      "Xe ô tô của người nước ngoài đăng ký tại nước ngoài có tay lái ở bên phải phải đi theo đoàn và có người, phương tiện hỗ trợ, hướng dẫn giao thông",
      "Cả ba ý trên",
    ],
    correctAnswer: 3,
    explanation:
      "Xe nước ngoài, xe tay lái bên phải khi tham gia giao thông tại Việt Nam phải chấp hành pháp luật Việt Nam, đi đúng phạm vi được cấp phép và đi theo đoàn có người, phương tiện hỗ trợ.",
  },
  {
    id: 49,
    topicId: 1,
    question:
      "Xe vận chuyển hàng siêu trường, siêu trọng phải thực hiện các quy định nào dưới đây để bảo đảm an toàn giao thông?",
    options: [
      "Phải chạy với tốc độ quy định trong giấy phép và phải có báo hiệu kích thước của hàng; trường hợp cần thiết phải có người, phương tiện hỗ trợ lái xe, cảnh báo cho người, phương tiện tham gia giao thông khác và thực hiện các biện pháp bảo đảm an toàn khi vận chuyển trên đường bộ",
      "Phải chạy với tốc độ quy định trong giấy phép; phải có người, phương tiện hỗ trợ lái xe, cảnh báo cho người, phương tiện tham gia giao thông khác và thực hiện các biện pháp bảo đảm an toàn khi vận chuyển trên đường dành cho giao thông công cộng",
    ],
    correctAnswer: 0,
    explanation:
      "Xe chở hàng siêu trường, siêu trọng phải chạy đúng tốc độ ghi trong giấy phép, có báo hiệu kích thước hàng và khi cần thiết phải có người, phương tiện hỗ trợ, cảnh báo.",
    isCritical: true,
  },
  {
    id: 50,
    topicId: 1,
    question:
      "Xe cứu hộ giao thông đường bộ cần thực hiện yêu cầu nào sau đây để bảo đảm trật tự an toàn giao thông?",
    options: [
      "Xe cứu hộ giao thông đường bộ phải có dấu hiệu nhận diện, niêm yết thông tin trên xe, gắn thiết bị giám sát hành trình và thiết bị ghi nhận hình ảnh người lái xe",
      "Phải tuân thủ quy định của pháp luật về khối lượng hàng hóa chuyên chở của xe cứu hộ và khối lượng của xe được cứu hộ ghi trên Chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường",
      "Cả hai ý trên",
    ],
    correctAnswer: 2,
    explanation:
      "Xe cứu hộ giao thông đường bộ phải có dấu hiệu nhận diện, niêm yết thông tin, gắn thiết bị giám sát hành trình và tuân thủ quy định về khối lượng chuyên chở.",
  },
];
