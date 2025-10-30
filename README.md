# 1) DB (docker) bật trước bật Docker Destop

docker compose up -d

# 2) Generate Prisma client (lần đầu hoặc sau khi đổi schema)

npm run build

# 3) Migrate DB (lần đầu sẽ tạo bảng)

npm run prisma:migrate

# 4) Chạy dev server

npm run dev
