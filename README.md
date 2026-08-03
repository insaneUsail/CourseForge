# CourseForge 🚀

CourseForge is a modern, open-source educational platform designed to empower teachers and students. It allows educators to create structured classes, build rich interactive chapters, and share knowledge publicly, while providing students with a seamless learning and assessment experience.

## ✨ Features

- **For Teachers:**
  - Create and manage classes with unique enrollment keys.
  - Build comprehensive chapters using a rich text editor.
  - Create quizzes and assessments for students.
  - View detailed analytics and performance metrics for all students.
  - Share chapters to the public directory for open access.

- **For Students:**
  - Join classes using secure enrollment keys.
  - Access learning materials and interactive chapters.
  - Take quizzes to test knowledge and track personal progress.
  - Browse the public directory to learn new topics for free without enrolling.

- **Modern & Responsive Design:**
  - Built with a vibrant, modern UI using Tailwind CSS.
  - Fully responsive and accessible.
  - Dark mode and Light mode support.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Auth.js](https://authjs.dev/) (NextAuth)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Rich Text:** Tiptap Editor

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL database (Local or Cloud like Neon/Supabase)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/courseForge.git
   cd courseForge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database connection string
   DATABASE_URL="postgresql://user:password@localhost:5432/courseforge"
   
   # Auth secret (generate with `openssl rand -base64 32`)
   NEXTAUTH_SECRET="your_super_secret_string"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize the Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deployment

CourseForge is optimized for deployment on Vercel. 
Ensure you set your `DATABASE_URL` and `NEXTAUTH_SECRET` in the Vercel project settings before deploying. The build script will automatically run Prisma migrations.

---
Built with ❤️ for education.
