const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  console.time('Native Prisma Query');
  try {
    const classes = await prisma.class.findMany({
      include: {
        teacher: true,
        memberships: true,
        chapterLinks: true,
      }
    });
    console.log(`Found ${classes.length} classes`);
  } catch (err) {
    console.error(err);
  }
  console.timeEnd('Native Prisma Query');
  await prisma.$disconnect();
  process.exit(0);
}

test();
