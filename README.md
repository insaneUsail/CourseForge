# CourseForge 🎓

**CourseForge** is a modern, neo-brutalist e-learning platform that allows teachers to write lessons once and teach them everywhere. It bridges the gap between structured content creation and interactive, trackable student learning. 

Teachers can create structured chapters and deploy them to multiple private or public classes with a single click. Students can fast-join classes using secure codes, read rich curriculum content, and take quizzes to reinforce their knowledge, all tracked in their personal history.

---

## 📸 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
  <img src="./docs/images/landing-features.png" alt="Landing Page Features" width="32%" />
  <img src="./docs/images/student-reader.png" alt="Student Chapter Reader" width="32%" />
  <img src="./docs/images/teacher-dashboard.png" alt="Teacher Dashboard" width="32%" />
  <img src="./docs/images/student-dashboard.png" alt="Student Dashboard" width="32%" />
  <img src="./docs/images/teacher-browse.png" alt="Browse Public Chapters" width="32%" />
</div>

---

## 🚀 Features

- **Neo-Brutalist Design**: Vibrant colors (`#C6FF3D`, `#FF6B35`, `#834DFB`) and bold 3D card aesthetics built with TailwindCSS and Framer Motion.
- **Write Once, Teach Everywhere**: Create a chapter in your private repository and assign it to 10 different classes without duplicating content. 
- **Public & Private Chapters**: Browse community chapters from other educators to quickly construct comprehensive curriculums.
- **Interactive Reading**: Track student progress and completion of chapters.
- **Role-Based Workflows**: Separate, tailored dashboards and capabilities for `STUDENT` and `TEACHER` accounts.

---

## 🛠 Tech Stack

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
