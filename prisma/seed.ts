import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Setup Prisma with the Postgres driver adapter (required by Neon)
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean up existing guest data to allow re-running
  const guestEmails = ['teacher@guest.com', 'student@guest.com'];
  for (const email of guestEmails) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      await prisma.user.delete({ where: { id: user.id } });
      console.log(`🧹 Deleted existing user: ${email}`);
    }
  }

  // 2. Create Guest Teacher
  const teacherPassword = await bcrypt.hash('guest123', 10);
  const teacher = await prisma.user.create({
    data: {
      name: 'Guest Teacher',
      email: 'teacher@guest.com',
      passwordHash: teacherPassword,
      role: Role.TEACHER,
    }
  });
  console.log(`👨‍🏫 Created Guest Teacher (ID: ${teacher.id})`);

  // 3. Create Guest Student
  const studentPassword = await bcrypt.hash('guest123', 10);
  const student = await prisma.user.create({
    data: {
      name: 'Guest Student',
      email: 'student@guest.com',
      passwordHash: studentPassword,
      role: Role.STUDENT,
    }
  });
  console.log(`🎒 Created Guest Student (ID: ${student.id})`);

  // 4. Create 10th Standard Math Class
  const mathClass = await prisma.class.create({
    data: {
      name: '10th Standard Mathematics',
      key: 'MATH-10-GUEST',
      teacherId: teacher.id,
    }
  });
  console.log(`📘 Created Class: ${mathClass.name}`);

  // Create Math Chapters & Content
  const mathCh1 = await prisma.chapter.create({
    data: {
      title: 'Quadratic Equations',
      ownerTeacherId: teacher.id,
      isPublic: true,
      contents: {
        create: [
          { title: 'Standard Form', text: '<p>The standard form of a quadratic equation is <strong>ax² + bx + c = 0</strong>, where a, b, and c are known values and <em>a ≠ 0</em>.</p>', orderIndex: 0 },
          { title: 'The Quadratic Formula', text: '<p>The solutions can be found using the quadratic formula: <br/><code>x = (-b ± √(b² - 4ac)) / 2a</code></p>', orderIndex: 1 },
          { title: 'Discriminant', text: '<p>The expression <strong>b² - 4ac</strong> is called the discriminant. It determines the nature of the roots (real and distinct, real and equal, or complex).</p>', orderIndex: 2 }
        ]
      }
    }
  });
  // Link chapter to class
  await prisma.classChapterLink.create({ data: { classId: mathClass.id, chapterId: mathCh1.id } });

  const mathCh2 = await prisma.chapter.create({
    data: {
      title: 'Trigonometry Basics',
      ownerTeacherId: teacher.id,
      isPublic: true,
      contents: {
        create: [
          { title: 'Introduction to Sine, Cosine, Tangent', text: '<p>In a right-angled triangle:</p><ul><li><strong>Sine (sin)</strong> = Opposite / Hypotenuse</li><li><strong>Cosine (cos)</strong> = Adjacent / Hypotenuse</li><li><strong>Tangent (tan)</strong> = Opposite / Adjacent</li></ul>', orderIndex: 0 },
          { title: 'Pythagorean Identities', text: '<p>The fundamental identity is: <strong>sin²(θ) + cos²(θ) = 1</strong></p>', orderIndex: 1 }
        ]
      }
    }
  });
  await prisma.classChapterLink.create({ data: { classId: mathClass.id, chapterId: mathCh2.id } });

  // 5. Create 11th Standard Web Dev Class
  const webClass = await prisma.class.create({
    data: {
      name: '11th Standard Web Development',
      key: 'WEB-11-GUEST',
      teacherId: teacher.id,
    }
  });
  console.log(`💻 Created Class: ${webClass.name}`);

  // Create Web Dev Chapters & Content
  const webCh1 = await prisma.chapter.create({
    data: {
      title: 'Introduction to HTML5',
      ownerTeacherId: teacher.id,
      isPublic: true,
      contents: {
        create: [
          { title: 'The Document Object Model', text: '<p>The DOM represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects.</p>', orderIndex: 0 },
          { title: 'Semantic HTML', text: '<p>Semantic HTML introduces meaning to the web page rather than just presentation. Examples include <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code>.</p>', orderIndex: 1 }
        ]
      }
    }
  });
  await prisma.classChapterLink.create({ data: { classId: webClass.id, chapterId: webCh1.id } });

  const webCh2 = await prisma.chapter.create({
    data: {
      title: 'Modern CSS & Flexbox',
      ownerTeacherId: teacher.id,
      isPublic: true,
      contents: {
        create: [
          { title: 'The CSS Box Model', text: '<p>Every element in web design is a rectangular box. The CSS box model consists of: margins, borders, padding, and the actual content.</p>', orderIndex: 0 },
          { title: 'Flexbox Basics', text: '<p>Flexbox is a one-dimensional layout method. Important properties include <code>justify-content</code> for aligning items along the main axis, and <code>align-items</code> for the cross axis.</p>', orderIndex: 1 }
        ]
      }
    }
  });
  await prisma.classChapterLink.create({ data: { classId: webClass.id, chapterId: webCh2.id } });

  // 6. Enroll Guest Student into both classes
  await prisma.classMembership.create({
    data: {
      studentId: student.id,
      classId: mathClass.id,
      rollNo: 'MATH-001',
      school: 'Course Forge Academy'
    }
  });
  console.log(`✅ Enrolled Student in ${mathClass.name}`);

  await prisma.classMembership.create({
    data: {
      studentId: student.id,
      classId: webClass.id,
      rollNo: 'WEB-001',
      school: 'Course Forge Academy'
    }
  });
  console.log(`✅ Enrolled Student in ${webClass.name}`);

  console.log('🚀 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
