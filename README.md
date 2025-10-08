# Ứng Dụng Quản Lý Bài Viết - GraphQL API với TypeScript

Một API GraphQL hoàn chỉnh để quản lý bài viết được xây dựng bằng Node.js, TypeScript, Express và Apollo Server. Dự án này cung cấp một giải pháp backend mạnh mẽ cho việc quản lý nội dung với kiến trúc hiện đại.

## Mô Tả Tổng Quan

Ứng dụng này là một GraphQL API server được thiết kế để quản lý hệ thống bài viết với các tính năng CRUD đầy đủ. Sử dụng TypeScript để đảm bảo type safety và Apollo Server để cung cấp GraphQL endpoint hiệu quả.

## Tính Năng Chính

### Quản Lý Bài Viết
- **Tạo bài viết**: Thêm bài viết mới với tiêu đề, hình ảnh, mô tả
- **Đọc bài viết**: Lấy danh sách bài viết với phân trang và lọc
- **Cập nhật bài viết**: Chỉnh sửa thông tin bài viết
- **Xóa bài viết**: Xóa bài viết (soft delete)

### Quản Lý Danh Mục
- **CRUD danh mục**: Tạo, đọc, cập nhật, xóa danh mục
- **Phân loại bài viết**: Gán bài viết vào các danh mục cụ thể
- **Liên kết quan hệ**: Kết nối bài viết với danh mục thông qua GraphQL relations

### Hệ Thống Người Dùng
- **Xác thực người dùng**: JWT-based authentication
- **Quản lý tài khoản**: CRUD operations cho user accounts
- **Middleware bảo mật**: Bảo vệ GraphQL endpoints

### Tính Năng GraphQL
- **Query linh hoạt**: Lấy chính xác dữ liệu cần thiết
- **Mutation operations**: Thao tác dữ liệu an toàn
- **Schema introspection**: Tự động sinh documentation
- **Resolver pattern**: Tách biệt logic xử lý dữ liệu

### Tính Năng Nâng Cao
- **Phân trang**: Pagination cho danh sách lớn
- **Tìm kiếm**: Search functionality với keyword
- **Lọc và sắp xếp**: Filter và sort theo nhiều tiêu chí
- **Soft delete**: Xóa mềm để bảo toàn dữ liệu

## Công Nghệ Sử Dụng

### Core Technologies
- **Node.js**: JavaScript runtime environment
- **TypeScript**: Type-safe JavaScript với static typing
- **Express.js**: Web application framework
- **Apollo Server**: GraphQL server implementation

### Database & ODM
- **MongoDB**: NoSQL document database
- **Mongoose**: MongoDB object modeling cho Node.js

### GraphQL Stack
- **GraphQL**: Query language và runtime
- **Apollo Server Express**: GraphQL server integration
- **Type Definitions**: Schema-first GraphQL development
- **Resolvers**: Business logic handlers

### Authentication & Security
- **JWT**: JSON Web Tokens cho authentication
- **MD5**: Password hashing
- **Middleware**: Authentication middleware cho route protection

### Development Tools
- **TypeScript Compiler**: Transpilation từ TS sang JS
- **Nodemon**: Auto-restart during development
- **Pre-commit hooks**: Code quality assurance
- **Environment Variables**: Configuration management

## Cấu Trúc Thư Mục

```
Article-app-GraphQL-TS/
├── config/              # Cấu hình ứng dụng
│   └── database.ts     # Kết nối MongoDB
├── helpers/            # Utility functions
│   └── generate.ts     # Helper functions
├── middlewares/        # Express middlewares
│   └── auth.middleware.ts # JWT authentication
├── models/             # Mongoose schemas
│   ├── article.model.ts   # Article schema
│   ├── category.model.ts  # Category schema
│   └── user.model.ts      # User schema
├── resolver/           # GraphQL resolvers
│   ├── article.resolver.ts   # Article business logic
│   ├── category.resolver.ts  # Category business logic
│   ├── user.resolver.ts      # User business logic
│   └── index.resolver.ts     # Combined resolvers
├── typeDefs/          # GraphQL type definitions
│   ├── article.typeDefs.ts   # Article GraphQL schema
│   ├── category.typeDefs.ts  # Category GraphQL schema
│   ├── user.typeDefs.ts      # User GraphQL schema
│   └── index.typeDefs.ts     # Combined schemas
├── index.ts           # Application entry point
├── package.json       # Dependencies và scripts
└── tsconfig.json      # TypeScript configuration
```

## Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js (phiên bản 16 trở lên)
- MongoDB
- NPM hoặc Yarn
- TypeScript knowledge

### Cài Đặt
1. Clone repository:
```bash
git clone [repository-url]
cd Article-app-GraphQL-TS
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` và cấu hình:
```env
PORT=4000
MONGO_URL=mongodb://localhost:27017/article-graphql
JWT_SECRET=your-jwt-secret-key
```

4. Compile TypeScript:
```bash
npm run build
```

5. Chạy ứng dụng:
```bash
npm start
```

Hoặc chạy trong development mode:
```bash
npm run dev
```

GraphQL Playground sẽ có sẵn tại: http://localhost:4000/graphql

## Sử Dụng GraphQL API

### Queries Mẫu

#### Lấy danh sách bài viết:
```graphql
query {
  getListArticles(
    currentPage: 1,
    limitItem: 5,
    sortKey: "title",
    sortValue: "asc",
    keyword: "technology"
  ) {
    id
    title
    avatar
    description
    category {
      id
      title
    }
  }
}
```

#### Lấy chi tiết bài viết:
```graphql
query {
  getArticle(id: "article_id_here") {
    id
    title
    avatar
    description
    category {
      title
    }
  }
}
```

### Mutations Mẫu

#### Tạo bài viết mới:
```graphql
mutation {
  createArticle(article: {
    title: "Bài viết mới"
    avatar: "https://example.com/image.jpg"
    description: "Mô tả bài viết"
    categoryId: "category_id_here"
  }) {
    id
    title
    description
  }
}
```

#### Cập nhật bài viết:
```graphql
mutation {
  updateArticle(
    id: "article_id_here"
    article: {
      title: "Tiêu đề đã cập nhật"
      description: "Mô tả mới"
    }
  ) {
    id
    title
    description
  }
}
```

#### Xóa bài viết:
```graphql
mutation {
  deleteArticle(id: "article_id_here")
}
```




