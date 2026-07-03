# PLAN.md — Kế hoạch hoàn thiện "Phần mềm thi thử lái xe B1"

> Tài liệu sống. Cập nhật checklist mỗi khi task hoàn thành hoặc phạm vi thay đổi.
> Vai trò: Claude Sonnet 5 CLI (Tech Lead/Orchestrator) lập kế hoạch, review, quyết định kiến trúc.
> Antigravity CLI (`agy`, model Gemini) thực thi phần lớn code theo task được giao.

## Trạng thái hạ tầng điều phối

- [x] Xác nhận `agy` (Antigravity CLI v1.0.16) đã cài đặt và authenticate thành công.
- [x] Xác nhận `agy` có thể trỏ đúng vào thư mục repo (`--new-project` bắt buộc — mặc định `agy` dùng scratch workspace khác, KHÔNG phải cwd). **Ghi chú vận hành:** mọi lệnh gọi `agy` cho task của dự án này phải chạy từ đúng `cwd` của repo và dùng `--new-project` cho phiên đầu tiên, sau đó `--continue`/`--conversation <id>` để nối tiếp cùng phiên — không gọi `agy -p` trần vì sẽ rơi vào scratch project mặc định.
- [x] Repo đã được giải nén từ file zip Figma Make export vào gốc thư mục, khởi tạo git, commit baseline (`f7d18d4`).

## Phân tích codebase thực tế (đọc toàn bộ `src/app/App.tsx`, 1260 dòng)

- Toàn bộ nghiệp vụ nằm trong 1 file: 21 component SVG biển báo inline, `SIGN_MAP`, `TOPICS` (6 chủ đề), `ALL_QUESTIONS` (75 câu — không phải 81 như ước tính ban đầu, xem badge "75 câu hỏi" trong `AuthScreen` và đếm thực tế mảng), `generateExam()` (phân bổ câu theo chủ đề: 6/8/5/5/5/6 = 35 câu), `AuthScreen` (giả lập, `setTimeout` fake network), `GoalsTab` (tính điều kiện sẵn sàng thi từ `topicProgress`/`examHistory`), và component `App` chính (state cho tab, luyện tập, thi thử, đồng hồ đếm ngược bằng `setInterval`).
- State toàn cục (`user`, `topicProgress`, `examHistory`, v.v.) chỉ tồn tại trong React state — **mất hoàn toàn khi F5**, kể cả việc đăng nhập.
- Hằng số đề thi (`EXAM_QUESTIONS_COUNT=35`, `EXAM_TIME=19*60`, `PASS_SCORE=32`) đã khớp đúng cấu trúc đề B1 thật (35 câu/19 phút/đỗ ≥32) — không cần sửa, chỉ cần đảm bảo ngân hàng câu hỏi đủ lớn để `generateExam` không lặp câu giữa các đề.
- Câu điểm liệt (`isCritical`) đã có cơ chế đúng (rớt ngay nếu sai bất kỳ câu điểm liệt nào, dù đủ điểm) nhưng dữ liệu mới có rải rác (~6 câu) — cần khớp với bộ câu điểm liệt chính thức (thường ~11 nhóm/60 câu tùy phiên bản).
- `package.json` build từ Figma Make: thiếu `"type": "module"` tường minh (dù `vite.config.ts` dùng ESM) — không phải lỗi chặn build nhưng cần Antigravity xác minh khi chạy `npm run dev`/`build` lần đầu.
- Không có test, không có CI, không có `.env`, không có backend nào.

## Milestone 1 — Refactor App.tsx thành module (Ưu tiên cao nhất, độ phức tạp: Vừa)

**Mục tiêu:** Tách 1260 dòng thành cấu trúc theo domain để các milestone sau dễ giao task nhỏ, không đụng lẫn nhau.

**Cấu trúc đích:**
```
src/app/
  App.tsx                        <- chỉ còn shell: layout, tab nav, compose các feature
  data/
    questions.ts                 <- ALL_QUESTIONS, TOPICS
    exam-config.ts                <- EXAM_QUESTIONS_COUNT, EXAM_TIME, PASS_SCORE, OPTION_LABELS
  lib/
    utils.ts                      <- shuffle, formatTime, generateExam
  components/
    signs/                        <- 21 SVG biển báo + SIGN_MAP + SignWrapper
    auth/AuthScreen.tsx
    goals/GoalsTab.tsx
  features/
    practice/                     <- màn hình luyện tập theo chủ đề (topics/practice/result)
    exam/                         <- màn hình thi thử (setup/taking/result)
```

- [x] **Task 1.1** (Antigravity): Tách `data/questions.ts` + `data/exam-config.ts` từ App.tsx. SCOPE: tạo file mới, sửa import trong App.tsx. DO NOT TOUCH: components/ui/*. — Hoàn thành, commit `81a5455`. Verify: dữ liệu byte-identical với bản gốc, `pnpm run build` pass, không đụng file ngoài phạm vi.
- [x] **Task 1.2** (Antigravity): Tách `lib/utils.ts` (shuffle, formatTime, generateExam). — Hoàn thành. Ghi chú: agy đã tự thêm import thừa `EXAM_QUESTIONS_COUNT` không dùng tới kèm biến chết để né lint — quá nhỏ nên tôi tự sửa trực tiếp (xóa import + biến chết) thay vì giao lại. Build pass.
- [x] **Task 1.3** (Antigravity): Tách 21 SVG biển báo + `SIGN_MAP` sang `components/signs/`. — Hoàn thành (`components/signs/index.tsx`). SVG nội dung xác nhận byte-identical với bản gốc (diff trắng ngoài 1 dòng comment header), build pass.
- [x] **Task 1.4** (Antigravity): Tách `AuthScreen` sang `components/auth/AuthScreen.tsx`. — Hoàn thành, `UserProfile` được export từ App.tsx để AuthScreen import (tự đổi sang `import type` cho an toàn). Build pass.
- [x] **Task 1.5** (Antigravity): Tách `GoalsTab` sang `components/goals/GoalsTab.tsx`. — Hoàn thành, nội dung/logic byte-identical, import TOPICS/ALL_QUESTIONS từ data/questions. Build pass.
- [x] **Task 1.6** (Antigravity, phụ thuộc 1.1–1.5): Tách phần luyện tập (topics/practice/result) và phần thi thử (setup/taking/result) ra `features/practice/PracticeFeature.tsx` và `features/exam/ExamFeature.tsx`; `App.tsx` chỉ còn giữ state điều phối top-level + layout (311 dòng, từ 1260 dòng ban đầu). State KHÔNG chuyển ra khỏi App.tsx — 2 component mới chỉ nhận state/handlers qua props. Verify: `pnpm run build` pass + kiểm thử thủ công end-to-end qua trình duyệt thật (demo login → luyện tập chủ đề có ảnh biển báo → thi thử đủ 35 câu, nộp bài → xem kết quả + chi tiết từng câu → tab Mục tiêu phản ánh đúng lịch sử thi) — toàn bộ hành vi y hệt bản gốc.

**→ Milestone 1 hoàn thành 6/6 task.** App.tsx: 1260 → 311 dòng.
- **Acceptance chung mỗi task:** `npm run dev` chạy không lỗi console, `npm run build` pass, hành vi UI y hệt trước khi tách (test thủ công: đăng nhập demo → luyện tập 1 chủ đề → làm 1 đề thi thử → xem mục tiêu).
- Task 1.6 phụ thuộc phải làm sau 1.1–1.5. Các task 1.1–1.5 độc lập, có thể giao song song nếu Antigravity hỗ trợ, nhưng nên làm tuần tự để tránh xung đột merge trong cùng 1 file App.tsx đang bị sửa liên tục.

## Milestone 2 — Lớp persistence bằng localStorage (Ưu tiên cao, độ phức tạp: Nhỏ–Vừa)

**Phụ thuộc:** Milestone 1 hoàn thành (cần state đã tách rõ ràng để biết lưu gì).

- **Task 2.1**: Tạo `src/app/lib/storage.ts` — wrapper an toàn quanh `localStorage` (try/catch, versioned key, JSON serialize).
- **Task 2.2**: Lưu/khôi phục `user` (session giả lập) — vẫn ghi rõ đây không phải xác thực thật, chỉ giữ trạng thái "đã đăng nhập" qua refresh.
- **Task 2.3**: Lưu/khôi phục `topicProgress` và `examHistory`.
- **Acceptance:** F5 trang giữa chừng (đã đăng nhập, đã luyện 1 chủ đề) → dữ liệu vẫn còn. Xóa localStorage → app reset về AuthScreen sạch, không crash.
- Antigravity làm toàn bộ; tôi tự làm phần review đảm bảo không có race condition giữa `useEffect` load ban đầu và các lần set sau.

## Milestone 1.7 — Sửa độ chính xác biển báo theo QCVN 41:2019/BGTVT (Hoàn thành)

- [x] Đối chiếu 19 SVG biển báo hiện có với chuẩn QCVN 41 (mã số 102, 122, 123a, 124a, 125, 127, 130, 131a, 208, 211a, 225, 401, 407a, 301a...), sửa màu sắc/hình dạng/tỷ lệ, gắn nhãn mã số biển chính thức. Thêm mới `NoStoppingSign` (P.130) còn thiếu. Sửa 1 `signKey` sai (câu hỏi id 25). Verify: build pass + kiểm tra trực quan qua trình duyệt thật (2 biển mẫu: P.124a, DP.134) — hiển thị đúng, rõ ràng, đúng như mô tả.
- **Lưu ý:** mã số biển báo (102, 122, 123a...) khớp với kiến thức phổ biến, ổn định, được trích dẫn nhất quán qua rất nhiều nguồn độc lập từ nhiều năm nay — độ tin cậy cao hơn nhiều so với các trích dẫn văn bản pháp luật gần đây (xem cảnh báo ở Milestone 3 bên dưới).

### Quyết định đã duyệt (2026-07-03)
- Gộp chương "Văn hóa & Đạo đức người lái xe" (~21 câu chính thức) vào Topic 6, đổi tên Topic 6 thành **"Văn hóa, Đạo đức & Pháp luật"**.
- Giữ lại 5 câu hỏi mức phạt (Nghị định 100/123) hiện có trong Topic 6 dù không thuộc bộ 574 câu chính thức — coi là nội dung tham khảo bổ sung hữu ích.
- Mục tiêu số câu mỗi topic (nguồn: agy research, cross-check độ tin cậy trung bình — xem cảnh báo bên dưới): Topic 1 ~166 (+146), Topic 2 ~182 (+165), Topic 3 ~114 (+106), Topic 4 ~56 (+46), Topic 5 ~35 (+25), Topic 6 ~21 câu đạo đức mới + giữ 10 câu cũ.
- **Cảnh báo về nguồn:** Các trích dẫn văn bản pháp luật cụ thể (số hiệu Thông tư/Quyết định) do agy đưa ra KHÔNG được tin tưởng tuyệt đối (mô hình có xu hướng bịa số hiệu văn bản nghe hợp lý, đã phát hiện 2 lần trùng hợp đáng ngờ với ngày hiện tại). Tuy nhiên đã tự xác minh độc lập: repo GitHub thật `truonganhhoang/INT3120-2020` chứa dữ liệu câu hỏi/đáp án/giải thích thật (không phải AI paraphrase) khớp với kiến thức đã biết (vd. nồng độ cồn xe máy 50mg/100ml). Chiến lược: mỗi task mở rộng câu hỏi bắt buộc agy phải fetch nội dung thật từ nguồn cụ thể (không suy luận từ "trí nhớ"), ưu tiên bắt đầu từ repo đã xác minh, và phải liệt kê nguồn cho từng câu.

### Phương pháp đã kiểm chứng cho việc mở rộng câu hỏi
Task Topic 5 (pilot) đã tìm và tải trực tiếp file PDF chính thức **"Bộ 600 câu hỏi sát hạch"** tại `https://cdn.thuvienphapluat.vn/Uploads/danluat/FileAttack/TT/15694/bo-600-cau-hoi.pdf` (Thư Viện Pháp Luật, ~5.8MB, 4118 dòng text sau khi `pdftotext`). Tôi đã tự tải lại file này và đối chiếu độc lập nhiều câu hỏi (id 76, 77, 78, 79, 80, 102, 103, 104, 105) — khớp CHÍNH XÁC 100% với văn bản gốc, kể cả đáp án đúng. agy cũng đã đúng khi từ chối thêm 6 câu (285-289, 295) vì các câu này chỉ mô tả "hình vẽ dưới đây" (icon đèn cảnh báo táp-lô) không có mô tả chữ nào phân biệt được — không đủ dữ kiện để xác định đáp án đúng, tránh bịa. **→ Dùng chính xác URL PDF này làm nguồn chính cho mọi batch tiếp theo (Topic 1, 2, 3, 4, 6)** — bỏ qua bước tự tìm kiếm nguồn (tiết kiệm rất nhiều thời gian, giảm rủi ro lạc hướng).

- [x] **Topic 5 (Cấu tạo xe):** +30 câu (id 76-105, mục tiêu +25, vượt nhẹ vì nguồn đủ tốt). Nguồn: PDF trên, Chương IV câu 264-300 (trừ 6 câu phụ thuộc hình ảnh không xác định được). Verify: build pass, đối chiếu độc lập nhiều câu khớp 100%, không trùng lặp id, không sửa câu cũ.
- [x] **Topic 6 (Văn hóa, Đạo đức):** +23 câu (id 106-128, mục tiêu 25, loại 2 câu chỉ áp dụng xe mô tô: câu 191, 200). Nguồn: PDF trên, Chương II câu 181-205. **Cải tiến phương pháp:** agy tự viết script Python dùng `pdfplumber` để so khớp tọa độ hình học của nét gạch chân (rects mỏng) với vị trí text từng phương án — xác định đáp án đúng bằng phát hiện gạch chân thật (không suy đoán). Verify: đối chiếu độc lập nội dung câu hỏi khớp 100%, suy luận logic đáp án đúng hợp lý cho toàn bộ mẫu kiểm tra, xác nhận đúng 2 câu bị loại thực sự là nội dung xe mô tô, build pass, không trùng id.
- [x] **Topic 4 (Kỹ thuật lái xe):** +44 câu (id 129-172, mục tiêu tối đa 48). Nguồn: PDF trên, Chương III câu 206-263. Loại các câu chỉ áp dụng xe mô tô, các câu phụ thuộc hình ảnh táp-lô không xác định được, và phát hiện đúng 1 câu trùng lặp với câu đã có sẵn (câu 246 PDF ≡ id 47 hiện có) — tự loại bỏ trùng lặp mà không cần nhắc. Gắn đúng `isCritical` cho 5 câu điểm liệt (đường vòng, đường trơn, mở cửa xe, tăng tốc/giảm tốc nguy hiểm, dùng điện thoại). Verify: đối chiếu độc lập nội dung + đáp án khớp 100% cho mẫu kiểm tra, build pass, không trùng id, diff thuần túy addition.

## Milestone 3 — Mở rộng ngân hàng câu hỏi + câu điểm liệt (Ưu tiên cao, độ phức tạp: Lớn) — **HOÀN THÀNH phần lớn**

**Phụ thuộc:** Milestone 1 (đã có `data/questions.ts` riêng).

- **Ràng buộc bắt buộc:** Đây là nội dung pháp lý/an toàn giao thông. Không tự bịa câu hỏi — mọi câu phải trích từ nguồn xác thực được (PDF chính thức, xem trên). Đã tuân thủ nghiêm ngặt xuyên suốt.

### Kết quả cuối cùng (2026-07-03)

Chuyển sang dùng **Claude Opus (qua Agent tool) làm subagent thay cho `agy`** ở giai đoạn nước rút (theo yêu cầu người dùng, vì lo ngại token Antigravity cạn và cần tăng tốc song song hóa). 8 subagent Opus chạy song song, mỗi cái ghi vào 1 file riêng (`src/app/data/_batches/*.ts`) để tránh xung đột khi merge — sau đó tôi tự gộp lại bằng script Node (renumber id tuần tự, dedupe, insert vào `questions.ts`), verify kỹ rồi mới xoá các file batch.

| Chương chính thức | Topic | Câu gốc PDF | Số thêm | Ghi chú |
|---|---|---|---|---|
| Chương I – Quy tắc | 1 | 1-180 | +150 (3 batch song song) | |
| Chương II – Đạo đức | 6 | 181-205 | +23 | Dùng `pdfplumber` so khớp gạch chân |
| Chương III – Kỹ thuật | 4 | 206-263 | +44 | |
| Chương IV – Cấu tạo | 5 | 264-300 | +30 | Batch pilot đầu tiên |
| Chương V – Biển báo | 2 | 301-485 | +174 (3 batch song song) | signKey chỉ gán khi khớp CHÍNH XÁC key có sẵn trong SIGN_MAP, còn lại mô tả bằng chữ |
| Chương VI – Sa hình | 3 | 486-600 | +98 (2 batch song song) | Dùng khả năng vision của Claude (đọc PDF qua Read tool) để hiểu sơ đồ giao thông — agy (Gemini) không làm được việc này, phải chuyển sang Opus |

**Tổng: 172 → 593 câu hỏi.** Phân bố theo topic: 169/191/106/54/40/33.

**Verify đã thực hiện:**
- Dedup 2 lớp: cross-batch (phát hiện 1 trùng lặp thật giữa topic1-b/topic1-c) + vs 172 câu cũ (0 trùng) — bằng cách `require()` thực sự các file JS/TS chứ không chỉ regex.
- Phát hiện và sửa 1 bug thật: 1 dấu phẩy thừa từ lần merge Topic 4 trước đó tạo "hole" trong mảng (length 173 thay vì 172) — vô hại lúc runtime (`.filter`/`.map` bỏ qua hole) nhưng đã fix.
- Toàn bộ `signKey` mới đối chiếu tồn tại thật trong `SIGN_MAP`.
- Đối chiếu độc lập (tự tải lại PDF, tự chạy `pdfplumber`) nhiều mẫu across tất cả 8 batch — khớp 100%, kể cả 1 trường hợp agent tự flag nghi ngờ (câu 136) đã verify lại bằng tay và xác nhận agent đúng.
- Build pass, test end-to-end thật trên trình duyệt (đăng nhập → đủ 6 topic với số câu mới → thi thử 35 câu → nộp bài → xem kết quả) — chạy mượt.

**Còn thiếu (không chặn, có thể làm sau nếu cần):**
- Danh sách câu điểm liệt (isCritical) chưa đối chiếu với danh sách 60 câu điểm liệt chính thức đầy đủ — hiện chỉ gắn dựa trên phán đoán ngữ cảnh nguy hiểm rõ ràng của từng batch, nên coi là gần đúng chứ chưa phải danh sách chính thức 100%.

### Milestone 3.1 — Ảnh thật cắt từ PDF (Hoàn thành)

Người dùng cung cấp thêm 1 bản PDF khác (`600-cau-hoi-thi-ly-thuyet-lai-xe_hoclaixehcm.vn.pdf`, cùng nội dung 600 câu nhưng có nhúng ảnh gốc chất lượng cao — 321 ảnh embedded, PyMuPDF trích xuất trực tiếp không mất chất lượng) — yêu cầu: nhiều câu không có ảnh thì không thể trả lời được, phải cắt ảnh thật gắn vào đúng câu.

- Thêm field `imageUrl?: string` vào `Question` interface (ưu tiên hơn `signKey` khi cả hai cùng có).
- Extract 321 ảnh bằng PyMuPDF (`get_images`/`extract_image`), map ảnh → đúng "Câu N" bằng tọa độ Y trên trang (pdfplumber). Lưu tại `public/question-images/cau-N-idx.{ext}`.
- **Bài học quan trọng:** Ban đầu thử match câu hỏi hiện có (593 câu) với "Câu N" gốc bằng fuzzy text-matching trên nội dung câu hỏi — THẤT BẠI nặng (nhiều câu bị gán trùng cùng 1 ảnh, vd Câu 306 bị dùng cho 32 câu khác nhau) vì các batch trước đó **tự mô tả** biển báo/sơ đồ bằng lời (do lúc đó chưa có ảnh) nên câu hỏi/option dạng "Biển 1/2/3" bị trùng lặp cấu trúc quá nhiều giữa các câu khác nhau.
- **Giải pháp đúng:** Dựng lại mapping chính xác id↔"Câu N" bằng cách dựa vào thứ tự xử lý tuần tự đã biết của từng batch gốc (báo cáo chi tiết mỗi batch đã liệt kê chính xác câu nào được thêm/loại theo đúng thứ tự) — không dùng suy đoán nội dung. Verify bằng lấy mẫu ngẫu nhiên đối chiếu trực tiếp với PDF gốc — khớp 100%, 0 trùng lặp ảnh.
- Áp dụng ảnh cho 270 câu (topic 2, 3 chủ yếu) bằng mapping chính xác này.
- **Khôi phục 11 câu hỏi "biểu tượng táp-lô"** trước đó bị loại bỏ hoàn toàn (vì không có ảnh nên không xác định được đáp án) — nay xem trực tiếp ảnh (đèn phanh tay, dầu, cửa xe, dây an toàn, nhiên liệu, check engine, TPMS, ABS, trợ lực lái, ECO...) để xác định chính xác đáp án, đối chiếu với gạch chân trong PDF — khớp 100% cho tất cả 11 câu.
- Cập nhật `PracticeFeature.tsx` và `ExamFeature.tsx`: hiển thị `imageUrl` (ảnh thật) ưu tiên hơn `signKey` (SVG vẽ tay) khi cả hai cùng tồn tại.
- **Tổng số câu hỏi: 604** (tăng từ 593). Có ảnh thật: 286 câu.
- Verify: build pass, toàn bộ 286 imageUrl trỏ đến file thật tồn tại, không trùng lặp ảnh, test trực tiếp trên trình duyệt (ảnh biển báo, ảnh sa hình hiển thị đúng).

## Milestone 4 — Hoàn thiện chế độ thi thử (Ưu tiên vừa, độ phức tạp: Nhỏ)

Cấu trúc đề (35 câu/19 phút/đỗ ≥32/rớt nếu sai câu điểm liệt) **đã đúng**. Việc còn lại:
- **Task 4.1**: Đảm bảo `generateExam` không lặp câu hỏi giữa các lần thi gần nhau khi ngân hàng câu hỏi đã lớn (sau Milestone 3) — có thể cần thêm cơ chế tránh lặp câu đã ra gần đây (tuỳ chọn, đánh giá sau khi có đủ câu hỏi).
- ~~**Task 4.2**: Thêm màn hình xem lại chi tiết bài thi~~ — **đã có sẵn**, xác nhận khi đọc `ExamFeature.tsx` (`examView === "result"` render đủ danh sách câu, đáp án đúng/sai, giải thích). Không cần làm thêm.

## Milestone 5 — Xác thực thật (Tuỳ chọn — CHỈ làm nếu user xác nhận cần multi-device)

Không triển khai trừ khi user yêu cầu rõ ràng.

## Milestone 6 — Testing (Ưu tiên vừa, độ phức tạp: Nhỏ)

**Phụ thuộc:** Milestone 1 (cần `lib/utils.ts` tách riêng để test được).

- **Task 6.1**: Thêm Vitest, test `generateExam` (đúng phân bổ theo chủ đề, đủ 35 câu, không trùng id trong 1 đề) và `shuffle` (giữ nguyên phần tử, thứ tự ngẫu nhiên).
- **Task 6.2**: Test tính điểm/đỗ-rớt (`submitExam` logic: điểm ≥32 nhưng có câu điểm liệt sai → vẫn rớt).

## Milestone 7 — Polish UI/UX & responsive (Ưu tiên thấp, độ phức tạp: Vừa)

Kiểm tra trên mobile viewport (app dùng chủ yếu trên điện thoại). Giao Antigravity từng màn hình một, kèm ảnh chụp/màn hình mong muốn nếu có.

## Milestone 8 — Build & deploy pipeline (Ưu tiên thấp, độ phức tạp: Nhỏ)

- **Task 8.1**: Xác nhận `package.json`/`vite.config.ts` build production sạch (`npm run build`), sửa field thiếu nếu cần.
- **Task 8.2** (tuỳ chọn): Thêm GitHub Actions CI chạy build + test khi có Milestone 6.

## Việc tôi (Sonnet 5) tự làm trực tiếp, không giao Antigravity

- Toàn bộ quyết định kiến trúc trên (cấu trúc thư mục, thứ tự milestone).
- Review diff mọi task Antigravity trả về + chạy `npm run build`/`npm run dev`.
- Soạn/duyệt nguồn câu hỏi thi (Milestone 3) trước khi giao task sinh dữ liệu.
- Ghi log tiến độ vào `PROGRESS.md`, cập nhật checklist trong file này.
- Các thay đổi quá nhỏ (1 dòng, không đáng tách task riêng) như sửa typo, thêm field thiếu trong `package.json`.

## Quy trình lặp

Theo đúng Bước 2–5 trong prompt điều phối gốc: mỗi task giao cho `agy` theo format TASK/CONTEXT/SCOPE/DO NOT TOUCH/REQUIREMENTS/ACCEPTANCE CRITERIA/OUTPUT; review diff thật, chạy build; nếu agy lặp lỗi 2 lần liên tiếp cùng 1 task → dừng, tự phân tích hoặc hỏi user thay vì giao lại lần 3.
