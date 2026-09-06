# Cài đặt — 5 phút, làm một lần duy nhất

## Vì sao phải làm thêm bước này

Trình duyệt không được phép đọc nội dung trang của tên miền khác. Đó là quy tắc bảo mật
của mọi trình duyệt, không phải lỗi của trang web này. Muốn lách thì phải đi nhờ qua
một dịch vụ trung chuyển miễn phí — và các dịch vụ đó thường xuyên bị chặn, hết lượt
hoặc sập. Vì vậy nút "Cập nhật ngay" quét thẳng từ trình duyệt rất hay thất bại.

Cách chắc chắn: cho một con robot chạy trên máy chủ của GitHub. Máy chủ đọc trang trực
tiếp, không qua trình duyệt, nên không bị chặn. Robot chạy mỗi sáng 5 giờ, ghi kết quả
vào tệp `capnhat.json`. Nút "Cập nhật ngay" chỉ việc đọc tệp đó — luôn thành công và
hiện ra ngay lập tức.

Toàn bộ miễn phí, không cần thẻ, không cần máy chủ riêng.

## Các tệp trong gói

    index.html                            trang web
    capnhat.json                          nơi robot ghi kết quả
    scripts/quet.mjs                      mã của robot
    .github/workflows/quet-luat.yml       lịch chạy robot

## Bước 1 — Đưa tệp lên GitHub

Vào repo → **Add file** → **Upload files** → kéo thả cả 4 tệp giữ nguyên thư mục.

Nếu kéo thả không giữ được thư mục có dấu chấm ở đầu, làm cách này:
**Add file** → **Create new file** → ô tên tệp gõ đúng dòng sau rồi dán nội dung:

    .github/workflows/quet-luat.yml

Gõ dấu `/` là GitHub tự tạo thư mục. Làm tương tự với `scripts/quet.mjs`.

## Bước 2 — Cho robot quyền ghi

Repo → **Settings** → **Actions** → **General** → kéo xuống mục
**Workflow permissions** → chọn **Read and write permissions** → **Save**.

Bỏ qua bước này thì robot chạy được nhưng không lưu được kết quả.

## Bước 3 — Chạy thử ngay

Repo → tab **Actions** → chọn **Quét văn bản pháp luật** ở cột trái →
nút **Run workflow** → **Run workflow**.

Đợi khoảng một phút. Chấm xanh là xong. Bấm vào lần chạy đó xem được nhật ký:
nguồn nào đọc được, nguồn nào lỗi, tìm thấy bao nhiêu văn bản mới.

Xong bước này, mở trang web bấm **Cập nhật ngay** là ra kết quả.

## Từ đó về sau

Không phải làm gì nữa. Mỗi sáng 5 giờ robot tự chạy. Ai mở trang bấm
**Cập nhật ngay** sẽ thấy kết quả mới nhất.

## Khi robot báo một nguồn bị lỗi

Trang vẫn hiện nguồn đó kèm nút mở trang để xem tay. Một vài cổng thông tin chặn
truy cập từ máy chủ nước ngoài hoặc thỉnh thoảng sập — chuyện bình thường, các
nguồn còn lại vẫn chạy.

## Muốn đổi giờ chạy

Sửa dòng `cron` trong `.github/workflows/quet-luat.yml`. Giờ ghi theo giờ quốc tế,
Việt Nam nhanh hơn 7 tiếng. `0 22 * * *` nghĩa là 5 giờ sáng giờ Việt Nam.
