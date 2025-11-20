MINI PROJECT "TO-DO-LIST"

## Fitur

- To-Do list (lokal) — create/read/update/delete (localStorage)
- Authentication (ReqRes) — Register / Login
- Users list dari ReqRes (GET /users?page=) dengan pagination
- User detail (GET /users/:id)
- Protected routes (mencegah akses tanpa token)
- Validasi form menggunakan Zod
- HTTP client: Axios (axios instance dengan interceptor token)
- UI: shadcn/ui + Tailwind CSS — responsive & mobile-friendly

## Setup

1. Clone repo
2. Install dependencies:
   ```bash
   npm install
   npm add axios js-cookie zod @hookform/resolvers react-hook-form @tanstack/react-query
   npm add -D tailwindcss postcss autoprefixer
   Setup Tailwind (jika belum):
   dan tanstack
   ```

bash
Copy code
npx tailwindcss init -p

# update tailwind.config.js content -> ['./index.html','./src/**/*.{js,jsx,ts,tsx}']

Install shadcn/ui (opsional, untuk komponen yg lebih baik)

bash
Copy code
npx shadcn-ui init
npx shadcn-ui add button input card pagination
Tambahkan .env:

ini
Copy code
VITE_API_URL=https://reqres.in
Run dev:

bash
Copy code
npm run dev
