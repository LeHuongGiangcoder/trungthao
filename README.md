# Bảo Trung & Thu Thảo — thiệp cưới online

Mobile-first wedding invitation. Next.js App Router, plain CSS (custom properties +
CSS Modules), no UI framework.

## Chạy

```bash
npm run dev
```

## Cấu trúc

| Đường dẫn | Vai trò |
| --- | --- |
| `src/lib/wedding.ts` | Toàn bộ nội dung (tên, giờ, địa điểm, chương trình, dress code). Sửa ở đây, không sửa trong component. |
| `src/lib/assets.ts` | Bản đồ ảnh đã tối ưu trong `public/img`. |
| `src/app/globals.css` | Design system: bảng màu, thang chữ, khoảng cách, chuyển động. |
| `src/components/InvitationGate.tsx` | Màn intro (phong bì) và hiệu ứng mờ dần sang phần hero. |
| `src/components/PaperCard.tsx` | Thiệp chính đặt trong khung giấy xé viền. |
| `src/components/Section.tsx` | Vỏ chung của mọi section: cao đúng một màn hình, nền full-bleed, tone sáng/tối. |
| `src/components/sections/` | Hero, thông tin, chương trình, dress code, RSVP, cảm ơn. |
| `art/` | Ảnh gốc (~160MB). **Không** nằm trong `public/` để khỏi deploy kèm. |

## Bố cục & màu nền

Mọi section cao đúng `100svh` (`--section-h`), nội dung canh giữa.

Nền xen kẽ từ dưới hero xuống: `bg-damask` (kem) → `bg-damask-green` (xanh) →
kem → xanh → kem. Hero và màn intro dùng `bg-drape` / `hero`.

Màu chữ không hardcode theo section. Mỗi section khai báo `tone="light"` hoặc
`tone="dark"`, và mọi thứ bên trong đọc bốn token `--tone-fg`, `--tone-body`,
`--tone-accent`, `--tone-rule` (định nghĩa trong `globals.css`). Đổi nền chỉ cần
đổi `tone`, không phải sửa từng màu.

Hoạ tiết trang trí (`.ornament`) luôn sắc nét — chỉ giảm bằng `opacity`
(`--tone-ornament`), không bao giờ dùng `blur`.

## Ảnh

Ảnh gốc trong `art/` là PNG 3375×6000, 10–22MB mỗi tấm. Pipeline chuyển chúng
thành webp ~60–280KB trong `public/img`:

```bash
npm run assets
```

Chạy lại khi thay ảnh gốc. Pipeline gồm ba bước, theo đúng thứ tự:

1. `optimize-assets.cjs` — resize, cắt viền trong suốt, xuất webp.
2. `clean-elements.cjs` — xoá chữ mẫu in sẵn trên khung giấy (`el-5`) và
   watermark trên khung hoa văn (`el-9`).
3. `clean-hero.cjs` — xoá tên cặp đôi mẫu, chữ lồng trên dấu sáp, và tấm thiệp
   thừa thò ra dưới mép phong bì.

Tên cô dâu chú rể được đặt **lên chính phong bì** bằng HTML (không nung vào
ảnh), neo theo phần trăm trong `.photo` — một khối mô phỏng `object-fit: cover`
để toạ độ bám theo bức ảnh thay vì theo viewport.

## RSVP

`POST /api/rsvp` nhận phản hồi. Nếu có biến môi trường `RSVP_WEBHOOK_URL`
(Google Apps Script, n8n, Zapier…), route sẽ chuyển tiếp JSON tới đó; nếu không,
phản hồi chỉ được ghi ra log server.

```bash
# .env.local
RSVP_WEBHOOK_URL=https://...
```

## Lưu ý kỹ thuật (Next 16)

- `next/image` cần `images.qualities` khai báo trong `next.config.ts`; giá trị
  `quality` ngoài danh sách sẽ bị ép về giá trị gần nhất.
- `priority` đã deprecated — dùng `preload`.
- Ảnh trang trí phải có `height: auto` (đã đặt trong `.ornament`), nếu không
  thuộc tính `height` do `next/image` sinh ra sẽ đè lên chiều cao trong CSS.
- Font hiển thị phải nạp cả `style: ["normal", "italic"]`. Italic tổng hợp
  (synthetic oblique) làm sai dấu tiếng Việt — "và" hiện thành "vả".
- Cormorant Garamond mặc định dùng chữ số old-style; `globals.css` đặt
  `font-variant-numeric: lining-nums` cho toàn trang.
