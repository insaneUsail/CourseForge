import { db } from './src/lib/db';

async function test() {
  console.time('First Query');
  try {
    const classes = await db.class.findMany();
    console.log(`First query found ${classes.length} classes`);
  } catch (err) {
    console.error(err);
  }
  console.timeEnd('First Query');

  console.time('Second Query');
  try {
    const classes = await db.class.findMany();
    console.log(`Second query found ${classes.length} classes`);
  } catch (err) {
    console.error(err);
  }
  console.timeEnd('Second Query');

  process.exit(0);
}

test();
