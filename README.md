# Nguyễn Kim Thu — Portfolio

Personal portfolio built with Astro 7, Tailwind CSS 4 and Decap CMS.

## Commands

```sh
npm install
npm run dev
npm run build
```

## Decap CMS

Chạy website và local authoring proxy trong hai terminal riêng:

```sh
npm run dev
npm run cms
```

Sau đó mở `http://localhost:4321/admin/index.html`. `local_backend: true` cho phép Decap CMS ghi trực tiếp vào các JSON trong `src/content/cms` thông qua `decap-server`; chỉ sử dụng cơ chế này khi phát triển trên máy tin cậy.

Nội dung được tổ chức thành:

- `src/content/cms/settings`: nội dung singleton của website.
- `src/content/cms/projects`: project/case study.
- `src/content/cms/blog`: blog và insight.
- `src/content/cms/policies`: các trang policy.
- `public/uploads`: media được upload từ CMS.

Môi trường production dùng Decap GitHub backend với repository `Kim-Thu/folio-x-v1` và branch `main`. Trước khi phát hành trang quản trị, Netlify cần được cài GitHub OAuth provider với callback `https://api.netlify.com/auth/done`; OAuth Client Secret chỉ được lưu trong Netlify, không được commit vào repository.

Các ảnh Unsplash hiện tại là placeholder. Có thể thay chúng trong Decap CMS; media upload mới được lưu tại `public/uploads`.
