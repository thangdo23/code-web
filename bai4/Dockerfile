# Sử dụng image MySQL chính thức từ Docker Hub
FROM mysql:latest

# Đặt các biến môi trường cho MySQL
ENV MYSQL_ROOT_PASSWORD=abc123-
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Sao chép file cấu hình vào container
COPY my-custom.cnf /etc/mysql/conf.d/

# Expose port 3000
EXPOSE 3000

# Chạy lệnh khởi động MySQL
CMD ["mysqld"]
