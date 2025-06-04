# Dự đoán chất lượng khóa học
**Phân tích & dự đoán chất lượng khóa học từ bộ dữ liệu MOOCCubeX**

---

## Mô tả dự án

Dự án này sử dụng các kỹ thuật khai phá dữ liệu và học máy để phân tích, trực quan hóa và dự đoán chất lượng các khóa học dựa trên các đặc trưng như điểm số, phản hồi sinh viên, số lượng bài tập, video, trường học, v.v. Ứng dụng cung cấp giao diện trực quan với các biểu đồ, bảng số liệu và kết quả dự đoán, hỗ trợ đánh giá và nâng cao chất lượng đào tạo.

### Tính năng chính

- **Phân tích tổng quan:** Thống kê các chỉ số quan trọng về khóa học, phân phối điểm, v.v.
- **Tương quan dữ liệu:** Hiển thị mối liên hệ giữa các đặc trưng và nhãn chất lượng, biểu đồ tương quan phản hồi.
- **Dự đoán chất lượng:** Sử dụng mô hình học máy để dự đoán chất lượng khóa học.
- **Đánh giá chất lượng dữ liệu:** Kiểm tra và hiển thị mức độ đầy đủ, hợp lệ của dữ liệu đầu vào.

---

## Cài đặt

1. **Clone dự án:**
   ```
   git clone https://github.com/chankiet1804/course-quality-data-mining.git
   cd course-quality-data-mining
   ```

2. **Cài đặt các thư viện cần thiết:**
   ```
   npm install
   ```

3. **Chạy ứng dụng ở môi trường local:**
   ```
   npm run dev
   ```

---

## Sử dụng

Sau khi chạy ứng dụng, bạn sẽ thấy giao diện dashboard với các tab:
- **Tổng quan:** Xem thống kê, bảng đặc trưng, biểu đồ phân phối điểm, số lượng sinh viên, v.v.
- **Tương quan:** Xem các biểu đồ thể hiện mối liên hệ giữa các đặc trưng và nhãn chất lượng.
- **Kết quả dự đoán:** Xem kết quả dự đoán chất lượng khóa học dựa trên mô hình học máy.
- **Chất lượng dữ liệu:** Đánh giá mức độ đầy đủ, hợp lệ của dữ liệu đầu vào.