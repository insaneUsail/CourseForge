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

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Database**: [Neon Postgres](https://neon.tech/) with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: [Auth.js (NextAuth v5)](https://authjs.dev/)

---

## ⚙️ Environment Setup

To run this software locally, you will need Node.js and a PostgreSQL database (like Neon). 

1. **Clone the repository** and install dependencies:
   ```bash
   git clone https://github.com/your-username/CourseForge.git
   cd CourseForge
   npm install
   ```

2. **Configure Environment Variables**: Create a `.env` file in the root directory and add the following keys:
   ```env
   # Your Neon Postgres connection string
   DATABASE_URL="postgresql://user:password@hostname/db?sslmode=require"

   # Secret for NextAuth (generate one using `openssl rand -base64 32`)
   AUTH_SECRET="your_generated_secret_here"
   ```

3. **Initialize the Database**:
   ```bash
   # Generate Prisma client for your platform
   npx prisma generate

   # Push schema to your database
   npx prisma db push

   # (Optional) Seed the database with demo accounts and data
   npm run seed
   ```

---

## 🚀 How to Run and Use

Once your environment is set up, you can start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

### Using the Platform
1. **Try the Demo**: On the Signup page, you can click "Try Demo as Teacher" or "Try Demo as Student" to instantly log in using pre-populated guest accounts.
2. **Teacher Workflow**:
   - Navigate to the **Teacher Dashboard**.
   - Create a new Class and note the generated **Class Key**.
   - Create new Chapters or browse the public community database to add existing chapters to your class.
3. **Student Workflow**:
   - Navigate to the **Student Dashboard**.
   - Use the **Fast Join** widget and enter the **Class Key** provided by the teacher to gain access to the curriculum.

---

## 🌟 Credits

This project was built and developed during the **Digital Heroes trial**. Huge thanks to the Digital Heroes team for providing the environment, inspiration, and tools to make this product a reality.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
