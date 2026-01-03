# 🐛 Debug White Screen

## Bước 1: Kiểm tra Browser Console

1. Mở browser (Chrome/Edge)
2. Press F12 hoặc Right click → Inspect
3. Click tab "Console"
4. Refresh page (Ctrl+R)
5. **QUAN TRỌNG**: Copy tất cả error messages màu đỏ và gửi cho tôi

## Bước 2: Kiểm tra Network Tab

1. Trong DevTools, click tab "Network"
2. Refresh page
3. Xem có file nào failed (màu đỏ) không
4. Check status code của các request

## Bước 3: Kiểm tra Terminal

- Có error nào trong terminal đang chạy `npm run dev` không?

## Common Issues:

- ❌ Import path sai
- ❌ Component export/import không match
- ❌ CSS file không tồn tại
- ❌ Missing dependencies
