import type { Question } from "../questions";

export const BATCH: Question[] = [
  {
    id: 1,
    topicId: 3,
    question:
      "Tại ngã tư có đèn tín hiệu, đèn dành cho hướng đang xét là mũi tên xanh chỉ cho phép đi thẳng. Có xe khách, xe tải, xe con và xe mô tô cùng tới ngã tư; chỉ xe con đi thẳng theo mũi tên, các xe còn lại rẽ khỏi hướng cho phép. Xe nào chấp hành đúng quy tắc giao thông?",
    options: ["Xe khách, xe tải, xe mô tô", "Xe tải, xe mô tô", "Chỉ xe con"],
    correctAnswer: 2,
    explanation:
      "Đèn mũi tên xanh chỉ cho phép đi thẳng. Chỉ có xe con đi thẳng theo đúng hướng mũi tên nên chấp hành đúng; các xe rẽ sang hướng khác là vi phạm.",
  },
  {
    id: 2,
    topicId: 3,
    question:
      "Tại ngã tư, xe tải đang đi trên đường ưu tiên (có biển báo đường ưu tiên), còn xe khách, xe con và xe mô tô đi trên đường không ưu tiên. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe tải, xe khách, xe con, xe mô tô",
      "Xe tải, xe mô tô, xe khách, xe con",
      "Xe khách, xe tải, xe con, xe mô tô",
      "Xe mô tô, xe khách, xe tải, xe con",
    ],
    correctAnswer: 1,
    explanation:
      "Xe trên đường ưu tiên (xe tải) được đi trước. Sau đó xét các xe còn lại theo nguyên tắc nhường đường cho xe bên phải không vướng và xe rẽ phải, dẫn đến thứ tự: xe tải, xe mô tô, xe khách, xe con.",
  },
  {
    id: 3,
    topicId: 3,
    question:
      "Tại ngã tư không có đèn tín hiệu, có xe công an đang đi làm nhiệm vụ khẩn cấp cùng với xe con, xe tải, xe khách đi tới từ các hướng khác nhau. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách",
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con, xe tải",
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách, xe con",
      "Xe con, xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách",
    ],
    correctAnswer: 0,
    explanation:
      "Xe công an đi làm nhiệm vụ khẩn cấp là xe ưu tiên nên đi trước tiên. Các xe còn lại đi theo nguyên tắc nhường đường: xe con, xe tải, xe khách.",
  },
  {
    id: 4,
    topicId: 3,
    question:
      "Tại ngã tư, có xe công an đang đi làm nhiệm vụ khẩn cấp cùng xe tải, xe khách và xe con đi tới từ các hướng khác nhau. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe tải, xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con",
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con, xe tải",
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách",
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách, xe con",
    ],
    correctAnswer: 3,
    explanation:
      "Xe ưu tiên (xe công an đi làm nhiệm vụ khẩn cấp) đi trước. Các xe còn lại nhường đường theo thứ tự: xe tải, xe khách, xe con.",
  },
  {
    id: 5,
    topicId: 3,
    question:
      "Tại ngã tư không có tín hiệu đèn, có xe con, xe tải và xe mô tô cùng tới từ các hướng khác nhau. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe tải, xe con, xe mô tô",
      "Xe con, xe tải, xe mô tô",
      "Xe mô tô, xe con, xe tải",
      "Xe con, xe mô tô, xe tải",
    ],
    correctAnswer: 2,
    explanation:
      "Xét quyền ưu tiên theo hướng đi và nguyên tắc nhường đường bên phải không vướng, thứ tự đi đúng là: xe mô tô, xe con, xe tải.",
  },
  {
    id: 6,
    topicId: 3,
    question:
      "Tại vòng xuyến (đảo tròn trung tâm), xe tải đang lưu thông trong vòng xuyến, xe con từ nhánh đường đang muốn nhập vào vòng xuyến. Xe nào phải nhường đường?",
    options: ["Xe con", "Xe tải"],
    correctAnswer: 0,
    explanation:
      "Xe đi trong vòng xuyến được ưu tiên. Xe con muốn nhập vào vòng xuyến phải nhường đường cho xe tải đang lưu thông trong vòng xuyến.",
  },
  {
    id: 7,
    topicId: 3,
    question:
      "Tại ngã tư, xe mô tô đi tới từ hướng có đặt biển 'Dừng lại' (biển STOP), còn xe con đi thẳng qua ngã tư từ hướng khác. Trường hợp này xe nào được quyền đi trước?",
    options: ["Xe mô tô", "Xe con"],
    correctAnswer: 1,
    explanation:
      "Xe mô tô gặp biển STOP phải dừng lại nhường đường. Vì vậy xe con được quyền đi trước.",
  },
  {
    id: 8,
    topicId: 3,
    question:
      "Tại ngã tư, xe cứu thương đang đi làm nhiệm vụ cấp cứu cùng hai xe con là xe con (A) ở bên trái và xe con (B) ở bên phải. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe con (A), xe cứu thương đi làm nhiệm vụ cấp cứu, xe con (B)",
      "Xe cứu thương đi làm nhiệm vụ cấp cứu, xe con (B), xe con (A)",
      "Xe con (B), xe con (A), xe cứu thương đi làm nhiệm vụ cấp cứu",
    ],
    correctAnswer: 0,
    explanation:
      "Xe con (A) đã bắt đầu vào và chiếm phần đường trước, tiếp đến xe cứu thương đi làm nhiệm vụ cấp cứu (xe ưu tiên), rồi đến xe con (B).",
  },
  {
    id: 9,
    topicId: 3,
    question:
      "Tại ngã tư, có xe cứu thương đang đi làm nhiệm vụ cấp cứu, xe chữa cháy đang đi làm nhiệm vụ chữa cháy và một xe con. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe cứu thương đi làm nhiệm vụ cấp cứu, xe chữa cháy đi làm nhiệm vụ chữa cháy, xe con",
      "Xe chữa cháy đi làm nhiệm vụ chữa cháy, xe cứu thương đi làm nhiệm vụ cấp cứu, xe con",
      "Xe cứu thương đi làm nhiệm vụ cấp cứu, xe con, xe chữa cháy đi làm nhiệm vụ chữa cháy",
    ],
    correctAnswer: 1,
    explanation:
      "Trong các xe ưu tiên, xe chữa cháy đi làm nhiệm vụ có mức ưu tiên cao nhất nên đi trước, tiếp đến xe cứu thương đi làm nhiệm vụ cấp cứu, cuối cùng là xe con.",
  },
  {
    id: 10,
    topicId: 3,
    question:
      "Tại ngã tư, xe mô tô đi tới từ hướng đường không ưu tiên, còn xe cứu thương đang đi làm nhiệm vụ cấp cứu tới từ hướng khác. Xe nào được quyền đi trước trong trường hợp này?",
    options: ["Xe mô tô", "Xe cứu thương đi làm nhiệm vụ cấp cứu"],
    correctAnswer: 1,
    explanation:
      "Xe cứu thương đang đi làm nhiệm vụ cấp cứu là xe ưu tiên, được quyền đi trước; xe mô tô phải nhường đường.",
  },
  {
    id: 11,
    topicId: 3,
    question:
      "Tại nơi đường giao nhau, có xe khách, xe tải và xe con cùng đi tới. Xe khách đi từ đường không ưu tiên (có biển báo). Theo hướng mũi tên, xe nào phải nhường đường, đi cuối cùng qua nơi giao nhau này?",
    options: ["Xe khách", "Xe tải", "Xe con"],
    correctAnswer: 0,
    explanation:
      "Xe khách đi trên đường không ưu tiên và phải nhường đường cho các xe trên đường ưu tiên, nên đi cuối cùng qua nơi giao nhau.",
  },
  {
    id: 12,
    topicId: 3,
    question:
      "Tại ngã tư, xe con và xe tải đi tới từ hai hướng vuông góc; xe con đi từ đường không ưu tiên (có biển báo), xe tải đi trên đường ưu tiên. Theo hướng mũi tên, xe nào phải nhường đường là đúng quy tắc giao thông?",
    options: ["Xe con", "Xe tải"],
    correctAnswer: 0,
    explanation:
      "Xe con đi từ đường không ưu tiên phải nhường đường cho xe tải đang đi trên đường ưu tiên.",
  },
  {
    id: 13,
    topicId: 3,
    question:
      "Tại nơi đường giao nhau, xe công an đang đi làm nhiệm vụ khẩn cấp và xe chữa cháy đang đi làm nhiệm vụ chữa cháy cùng tới. Xe nào được quyền đi trước trong trường hợp này?",
    options: ["Xe công an đi làm nhiệm vụ khẩn cấp", "Xe chữa cháy đi làm nhiệm vụ chữa cháy"],
    correctAnswer: 1,
    explanation:
      "Xe chữa cháy đi làm nhiệm vụ có mức ưu tiên cao nhất trong các xe ưu tiên, nên được quyền đi trước xe công an.",
  },
  {
    id: 14,
    topicId: 3,
    question:
      "Tại ngã tư có đèn tín hiệu, đèn cho hướng của xe con và xe khách đang là đèn xanh, còn hướng của xe mô tô đang là đèn đỏ. Theo tín hiệu đèn, xe nào được phép đi?",
    options: ["Xe con và xe khách", "Xe mô tô"],
    correctAnswer: 0,
    explanation:
      "Xe con và xe khách có đèn xanh nên được phép đi; xe mô tô gặp đèn đỏ phải dừng lại.",
  },
  {
    id: 15,
    topicId: 3,
    question:
      "Tại ngã tư có đèn tín hiệu dạng mũi tên: hướng của xe con và xe tải được đèn xanh cho phép đi, còn hướng của xe khách và xe mô tô bị đèn đỏ cấm. Theo tín hiệu đèn, xe nào đi là đúng quy tắc giao thông?",
    options: ["Xe khách, xe mô tô", "Xe con, xe tải", "Xe tải, xe mô tô"],
    correctAnswer: 1,
    explanation:
      "Xe con và xe tải đi theo hướng có đèn xanh nên đúng quy tắc; các xe đi khi đèn đỏ là vi phạm.",
  },
  {
    id: 16,
    topicId: 3,
    question:
      "Tại nơi đường giao nhau, xe công an đang đi làm nhiệm vụ khẩn cấp và xe quân sự đang đi làm nhiệm vụ khẩn cấp cùng tới. Trong trường hợp này xe nào được quyền đi trước?",
    options: ["Xe công an đi làm nhiệm vụ khẩn cấp", "Xe quân sự đi làm nhiệm vụ khẩn cấp"],
    correctAnswer: 1,
    explanation:
      "Theo thứ tự ưu tiên, xe quân sự đi làm nhiệm vụ khẩn cấp được xếp trên xe công an đi làm nhiệm vụ khẩn cấp, nên được quyền đi trước.",
  },
  {
    id: 17,
    topicId: 3,
    question:
      "Xe tải đến ngã tư khi đèn tín hiệu chính đang đỏ, nhưng có đèn phụ mũi tên màu xanh cho phép rẽ phải. Theo tín hiệu đèn, xe tải được đi theo hướng nào là đúng quy tắc giao thông?",
    options: [
      "Được đi thẳng, rẽ phải và rẽ trái",
      "Chỉ được rẽ phải",
      "Được đi thẳng và rẽ phải",
      "Được rẽ trái và quay đầu",
    ],
    correctAnswer: 1,
    explanation:
      "Đèn chính đỏ cấm đi thẳng và rẽ trái. Đèn phụ mũi tên xanh chỉ cho phép rẽ phải, nên xe tải chỉ được rẽ phải.",
  },
  {
    id: 18,
    topicId: 3,
    question:
      "Tại ngã tư có đèn tín hiệu, đèn cho hướng đang xét là mũi tên xanh chỉ cho phép đi thẳng. Xe khách, xe tải và xe mô tô lại rẽ khỏi hướng cho phép. Các xe đi theo hướng mũi tên, những xe nào vi phạm quy tắc giao thông?",
    options: [
      "Xe khách, xe tải, xe mô tô",
      "Xe tải, xe con, xe mô tô",
      "Xe khách, xe con, xe mô tô",
    ],
    correctAnswer: 0,
    explanation:
      "Đèn mũi tên xanh chỉ cho phép đi thẳng. Xe khách, xe tải, xe mô tô rẽ sang hướng khác nên vi phạm; xe con đi thẳng là đúng.",
  },
  {
    id: 19,
    topicId: 3,
    question:
      "Tại vòng xuyến, có xe khách, xe tải, xe con và xe mô tô cùng tới từ các nhánh đường. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe khách, xe tải, xe mô tô, xe con",
      "Xe con, xe khách, xe tải, xe mô tô",
      "Xe mô tô, xe tải, xe khách, xe con",
      "Xe mô tô, xe tải, xe con, xe khách",
    ],
    correctAnswer: 2,
    explanation:
      "Áp dụng nguyên tắc nhường đường tại vòng xuyến (nhường xe bên trái đang trong vòng xuyến, xe đã vào trước đi trước), thứ tự đúng là: xe mô tô, xe tải, xe khách, xe con.",
  },
  {
    id: 20,
    topicId: 3,
    question:
      "Trên đoạn đường có đặt biển 'Cấm dừng xe và đỗ xe', có ba xe đang đỗ ven đường gồm xe con, xe mô tô và xe tải. Trong trường hợp này xe nào đỗ vi phạm quy tắc giao thông?",
    options: ["Xe tải", "Xe con và mô tô", "Cả ba xe", "Xe con và xe tải"],
    correctAnswer: 0,
    explanation:
      "Xe tải đỗ trong phạm vi hiệu lực của biển cấm dừng, đỗ xe nên vi phạm; các xe đỗ ngoài phạm vi hiệu lực của biển thì không vi phạm.",
  },
  {
    id: 21,
    topicId: 3,
    question:
      "Tại ngã tư, xe tải, xe con (A) và xe con (B) đi tới từ các hướng khác nhau; xe con (B) đi trên đường ưu tiên. Theo hướng mũi tên, xe nào được quyền đi trước?",
    options: ["Xe tải", "Xe con (B)", "Xe con (A)"],
    correctAnswer: 1,
    explanation:
      "Xe con (B) đi trên đường ưu tiên nên được quyền đi trước các xe đi từ đường không ưu tiên.",
  },
  {
    id: 22,
    topicId: 3,
    question:
      "Trên đoạn đường có đặt biển 'Cấm đỗ xe', xe tải đỗ ở một bên và xe mô tô đỗ ở bên kia, cả hai đều nằm trong phạm vi tác dụng của biển. Xe nào đỗ vi phạm quy tắc giao thông?",
    options: ["Cả hai xe", "Không xe nào vi phạm", "Chỉ xe mô tô vi phạm", "Chỉ xe tải vi phạm"],
    correctAnswer: 0,
    explanation:
      "Cả xe tải và xe mô tô đều đỗ trong phạm vi hiệu lực của biển cấm đỗ xe nên cả hai xe đều vi phạm.",
  },
  {
    id: 23,
    topicId: 3,
    question:
      "Có ba xe (xe con, xe mô tô và xe tải) đỗ nối tiếp nhau sát ngay trước vạch kẻ đường dành cho người đi bộ qua đường. Xe nào đỗ vi phạm quy tắc giao thông?",
    options: ["Chỉ xe mô tô", "Chỉ xe tải", "Cả ba xe", "Chỉ xe mô tô và xe tải"],
    correctAnswer: 2,
    explanation:
      "Cấm đỗ xe trên phần đường dành cho người đi bộ qua đường và trong phạm vi quá gần vạch. Cả ba xe đều đỗ vi phạm.",
  },
  {
    id: 24,
    topicId: 3,
    question:
      "Xe tải kéo theo một xe mô tô ba bánh bằng dây (kéo xe không có khả năng tự chạy) như hình. Việc kéo xe này có đúng quy tắc giao thông không?",
    options: ["Đúng", "Không đúng"],
    correctAnswer: 1,
    explanation:
      "Xe ô tô tải không được phép kéo xe mô tô, xe gắn máy. Do đó việc kéo xe như trong hình là không đúng quy tắc giao thông.",
  },
  {
    id: 25,
    topicId: 3,
    question:
      "Tại ngã tư có đặt biển 'Cấm rẽ trái'. Theo hướng mũi tên, xe ô tô con không được phép đi theo hướng nào?",
    options: ["Đi thẳng", "Rẽ trái", "Rẽ phải", "Đi thẳng và rẽ phải"],
    correctAnswer: 1,
    explanation:
      "Biển 'Cấm rẽ trái' cấm các xe rẽ trái tại ngã tư. Vì vậy xe ô tô con không được đi theo hướng rẽ trái.",
  },
  {
    id: 26,
    topicId: 3,
    question:
      "Trên đoạn đường có đặt biển 'Cấm ô tô tải vượt' (biển chỉ cấm xe tải vượt nhau). Xe con vượt xe tải và xe khách vượt xe tải. Xe nào vượt đúng quy tắc giao thông?",
    options: ["Cả hai xe đều đúng", "Xe con", "Xe khách"],
    correctAnswer: 0,
    explanation:
      "Biển chỉ cấm ô tô tải vượt nhau, không cấm xe con và xe khách vượt. Do đó cả xe con và xe khách vượt xe tải đều đúng quy tắc.",
  },
  {
    id: 27,
    topicId: 3,
    question:
      "Tại ngã tư có đặt biển hiệu lệnh hình tròn nền xanh chỉ hướng phải đi. Xe ô tô con đi theo chiều mũi tên ngược với hướng mà biển hiệu lệnh cho phép. Xe ô tô con đi như vậy có vi phạm quy tắc giao thông không?",
    options: ["Không vi phạm", "Vi phạm"],
    correctAnswer: 1,
    explanation:
      "Xe ô tô con đi không theo hướng mà biển hiệu lệnh bắt buộc, nên vi phạm quy tắc giao thông.",
  },
  {
    id: 28,
    topicId: 3,
    question:
      "Trên đường có dải phân cách (vạch/hàng cọc tiêu ở giữa), xe con đi lấn sang phần đường ngược chiều, vòng qua chỗ có hàng cọc tiêu để vượt lên. Xe nào vi phạm quy tắc giao thông?",
    options: ["Xe khách", "Xe mô tô", "Xe con", "Xe con và xe mô tô"],
    correctAnswer: 2,
    explanation:
      "Xe con đi lấn qua dải phân cách, sang phần đường ngược chiều để vượt là vi phạm quy tắc giao thông.",
  },
  {
    id: 29,
    topicId: 3,
    question:
      "Người điều khiển giao thông (cảnh sát giao thông) đứng ở ngã tư và giơ một tay thẳng đứng. Trong trường hợp này các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Các xe ở phía tay phải và tay trái của người điều khiển được phép đi thẳng",
      "Cho phép các xe ở mọi hướng được phép rẽ phải",
      "Tất cả các xe phải dừng lại trước ngã tư, trừ những xe đã ở trong ngã tư được phép tiếp tục đi",
    ],
    correctAnswer: 2,
    explanation:
      "Khi người điều khiển giao thông giơ tay thẳng đứng, tất cả các xe ở mọi hướng đều phải dừng lại, trừ những xe đã ở trong ngã tư được phép tiếp tục đi.",
  },
  {
    id: 30,
    topicId: 3,
    question:
      "Người điều khiển giao thông (cảnh sát giao thông) đứng giữa ngã tư dang ngang hai tay. Xe mô tô ở bên tay trái và xe tải ở bên tay phải của người điều khiển, xe con ở phía trước mặt. Theo hiệu lệnh, xe nào được phép đi?",
    options: ["Xe mô tô, xe con", "Xe con, xe tải", "Xe mô tô, xe tải", "Cả ba xe"],
    correctAnswer: 2,
    explanation:
      "Khi người điều khiển giao thông dang ngang hai tay, người tham gia giao thông ở phía trước và phía sau phải dừng lại; ở bên trái và bên phải được đi. Do đó xe mô tô (bên trái) và xe tải (bên phải) được phép đi.",
  },
  {
    id: 31,
    topicId: 3,
    question:
      "Tại ngã tư, xe tải rẽ tại nơi đường giao nhau, xe con đi phía sau đi thẳng theo phần đường của mình theo chiều mũi tên. Xe con đi như trong trường hợp này có đúng quy tắc giao thông không?",
    options: ["Đúng", "Không đúng"],
    correctAnswer: 0,
    explanation:
      "Xe con đi thẳng theo đúng phần đường của mình trong khi xe tải rẽ sang hướng khác, không gây cản trở, nên đi như vậy là đúng quy tắc.",
  },
  {
    id: 32,
    topicId: 3,
    question:
      "Trên đường hai chiều có vạch tim đường, xe con vượt lên trước xe tải rồi trở về đúng phần đường của mình khi bảo đảm an toàn. Xe nào vượt đúng quy tắc giao thông?",
    options: ["Xe tải", "Cả hai xe", "Xe con"],
    correctAnswer: 2,
    explanation:
      "Xe con vượt bên trái, quan sát an toàn và trở về đúng làn của mình nên vượt đúng quy tắc giao thông.",
  },
  {
    id: 33,
    topicId: 3,
    question:
      "Tại ngã tư có đặt biển 'Cấm đi ngược chiều' và biển 'Cấm rẽ trái'. Xe chữa cháy đi làm nhiệm vụ chữa cháy và xe tải cùng đi theo hướng mũi tên. Đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
    options: ["Xe chữa cháy đi làm nhiệm vụ chữa cháy", "Xe tải", "Cả hai xe"],
    correctAnswer: 1,
    explanation:
      "Xe chữa cháy đi làm nhiệm vụ được quyền ưu tiên, không bị hạn chế bởi biển báo. Xe tải đi vào hướng bị biển cấm nên vi phạm.",
  },
  {
    id: 34,
    topicId: 3,
    question:
      "Tại nơi đường giao nhau, có xe tải, xe khách và xe con đi tới; xe tải đi trên đường ưu tiên (có biển báo). Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe tải, xe khách, xe con",
      "Xe con, xe tải, xe khách",
      "Xe tải, xe con, xe khách",
    ],
    correctAnswer: 0,
    explanation:
      "Xe tải trên đường ưu tiên đi trước. Sau đó xét các xe còn lại theo nguyên tắc nhường đường: xe khách, rồi đến xe con.",
  },
  {
    id: 35,
    topicId: 3,
    question:
      "Tại nơi đường giao nhau, có xe khách và xe tải cùng đi tới, và một xe con. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe khách và xe tải, xe con",
      "Xe tải, xe khách, xe con",
      "Xe con, xe khách, xe tải",
    ],
    correctAnswer: 0,
    explanation:
      "Xe khách và xe tải đi cùng nhau (không xung đột hướng) được đi trước, sau đó đến xe con.",
  },
  {
    id: 36,
    topicId: 3,
    question:
      "Tại ngã tư, có xe công an đang đi làm nhiệm vụ khẩn cấp, xe con, xe tải và xe khách đi tới từ các hướng khác nhau. Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng?",
    options: [
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách",
      "Xe con, xe khách và xe công an đi làm nhiệm vụ khẩn cấp, xe tải",
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe khách, xe tải",
      "Xe con, xe tải, xe khách, xe công an đi làm nhiệm vụ khẩn cấp",
    ],
    correctAnswer: 0,
    explanation:
      "Xe công an đi làm nhiệm vụ khẩn cấp là xe ưu tiên nên đi trước, tiếp theo là xe con, xe tải rồi xe khách theo nguyên tắc nhường đường.",
  },
  {
    id: 37,
    topicId: 3,
    question:
      "Tại ngã tư có hai cụm đèn tín hiệu, các xe (xe khách, xe tải, xe con, xe mô tô) đi theo hướng mũi tên đều tuân thủ tín hiệu đèn cho phép. Trong hình, xe nào chấp hành đúng quy tắc giao thông?",
    options: [
      "Chỉ xe khách, xe mô tô",
      "Tất cả các loại xe trên",
      "Không xe nào chấp hành đúng quy tắc giao thông",
    ],
    correctAnswer: 1,
    explanation:
      "Tất cả các xe đều đi theo đúng hướng mà tín hiệu đèn cho phép, nên tất cả các loại xe trên đều chấp hành đúng quy tắc giao thông.",
  },
  {
    id: 38,
    topicId: 3,
    question:
      "Tại ngã tư, có xe quân sự đang đi làm nhiệm vụ khẩn cấp, xe công an đang đi làm nhiệm vụ khẩn cấp, cùng xe con và xe mô tô. Theo hướng mũi tên, thứ tự xe đi như thế nào là đúng quy tắc giao thông?",
    options: [
      "Xe công an đi làm nhiệm vụ khẩn cấp, xe quân sự đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô",
      "Xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô",
      "Xe mô tô + xe con, xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp",
    ],
    correctAnswer: 1,
    explanation:
      "Theo thứ tự ưu tiên, xe quân sự đi làm nhiệm vụ khẩn cấp đi trước, rồi đến xe công an đi làm nhiệm vụ khẩn cấp, cuối cùng là xe con và xe mô tô.",
  },
];
