# Sử dụng Alpine Linux làm base image
FROM alpine:latest

# Tác giả của Dockerfile này
LABEL maintainer="your_email@example.com"

# Cập nhật hệ thống và cài đặt Nginx
RUN apk update && apk add --no-cache nginx

# Tạo thư mục để chứa file cấu hình và nội dung web
RUN mkdir -p /run/nginx && mkdir -p /var/www/html

# Tạo file HTML đơn giản để kiểm tra
RUN echo "<h1>Hello, Nginx on Alpine Linux!</h1>" > /var/www/html/index.html

# Sao chép file cấu hình Nginx từ máy chủ vào container
COPY nginx.conf /etc/nginx/nginx.conf

# Mở cổng 8080
EXPOSE 8080

# Lệnh để chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
