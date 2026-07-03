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
- **Task 1.4** (Antigravity): Tách `AuthScreen` sang `components/auth/AuthScreen.tsx`.
- **Task 1.5** (Antigravity): Tách `GoalsTab` sang `components/goals/GoalsTab.tsx`.
- **Task 1.6** (Antigravity, phụ thuộc 1.1–1.5): Tách phần luyện tập (topics/practice/result) và phần thi thử (setup/taking/result) ra `features/practice/` và `features/exam/`; `App.tsx` chỉ còn giữ state điều phối top-level + layout.
- **Acceptance chung mỗi task:** `npm run dev` chạy không lỗi console, `npm run build` pass, hành vi UI y hệt trước khi tách (test thủ công: đăng nhập demo → luyện tập 1 chủ đề → làm 1 đề thi thử → xem mục tiêu).
- Task 1.6 phụ thuộc phải làm sau 1.1–1.5. Các task 1.1–1.5 độc lập, có thể giao song song nếu Antigravity hỗ trợ, nhưng nên làm tuần tự để tránh xung đột merge trong cùng 1 file App.tsx đang bị sửa liên tục.

## Milestone 2 — Lớp persistence bằng localStorage (Ưu tiên cao, độ phức tạp: Nhỏ–Vừa)

**Phụ thuộc:** Milestone 1 hoàn thành (cần state đã tách rõ ràng để biết lưu gì).

- **Task 2.1**: Tạo `src/app/lib/storage.ts` — wrapper an toàn quanh `localStorage` (try/catch, versioned key, JSON serialize).
- **Task 2.2**: Lưu/khôi phục `user` (session giả lập) — vẫn ghi rõ đây không phải xác thực thật, chỉ giữ trạng thái "đã đăng nhập" qua refresh.
- **Task 2.3**: Lưu/khôi phục `topicProgress` và `examHistory`.
- **Acceptance:** F5 trang giữa chừng (đã đăng nhập, đã luyện 1 chủ đề) → dữ liệu vẫn còn. Xóa localStorage → app reset về AuthScreen sạch, không crash.
- Antigravity làm toàn bộ; tôi tự làm phần review đảm bảo không có race condition giữa `useEffect` load ban đầu và các lần set sau.

## Milestone 3 — Mở rộng ngân hàng câu hỏi + câu điểm liệt (Ưu tiên cao, độ phức tạp: Lớn)

**Phụ thuộc:** Milestone 1 (đã có `data/questions.ts` riêng).

- **Ràng buộc bắt buộc:** Đây là nội dung pháp lý/an toàn giao thông. Antigravity **không được tự bịa câu hỏi** — mỗi câu bổ sung phải đối chiếu/trích nguồn từ bộ 600 câu hỏi thi lý thuyết B1 chính thức (Cục Đường bộ/Bộ GTVT) và danh sách câu điểm liệt chính thức. Nếu không có nguồn xác thực trong tay, Antigravity phải dừng và báo lại thay vì tự sinh nội dung.
- **Task 3.x**: Chia theo lô ~50-100 câu/lần, theo từng chủ đề (1 lô = 1 task, giữ đúng schema `Question`). Tôi (Sonnet) sẽ tự cung cấp nguồn câu hỏi/đối chiếu trước khi giao task này — không giao "tự đi tìm nguồn" cho Antigravity nếu không có sẵn tài liệu.
- **Task 3.y**: Đối chiếu và gắn đúng `isCritical` theo danh sách câu điểm liệt chính thức.
- Milestone này **cần user xác nhận nguồn dữ liệu** trước khi bắt đầu — không tự động chạy.

## Milestone 4 — Hoàn thiện chế độ thi thử (Ưu tiên vừa, độ phức tạp: Nhỏ)

Cấu trúc đề (35 câu/19 phút/đỗ ≥32/rớt nếu sai câu điểm liệt) **đã đúng**. Việc còn lại:
- **Task 4.1**: Đảm bảo `generateExam` không lặp câu hỏi giữa các lần thi gần nhau khi ngân hàng câu hỏi đã lớn (sau Milestone 3) — có thể cần thêm cơ chế tránh lặp câu đã ra gần đây (tuỳ chọn, đánh giá sau khi có đủ câu hỏi).
- **Task 4.2**: Thêm màn hình xem lại chi tiết bài thi đã làm (câu nào sai, giải thích) nếu chưa có — cần tôi đọc lại đoạn `examView === "result"` để xác nhận trước khi giao task.

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
