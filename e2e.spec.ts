import { test, expect } from '@playwright/test';

test.describe('CourseForge Critical Path', () => {
  // Use unique identifiers for each run
  const runId = Date.now();
  const teacherEmail = `teacher_${runId}@example.com`;
  const studentEmail = `student_${runId}@example.com`;
  const password = 'password123';
  let classJoinCode = '';

  test('Teacher Flow: Signup, Create Class, and Add Chapter', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1. Teacher Signup
    await page.goto('http://localhost:3000/signup');
    await page.click('button:has-text("I want to teach")');
    await page.fill('input[name="name"]', 'Test Teacher');
    await page.fill('input[name="email"]', teacherEmail);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for redirect to teacher dashboard
    await page.waitForURL('**/teacher/dashboard');
    expect(page.url()).toContain('/teacher/dashboard');

    // 2. Create a Class
    await page.click('button:has-text("Create New Class")');
    await page.fill('input[name="name"]', 'Automated Testing 101');
    await page.click('button:has-text("Create Class")');
    
    // Wait for the class link to appear (using a partial text match on "Automated Testing 101")
    const classLink = page.locator('a:has-text("Automated Testing 101")');
    await expect(classLink).toBeVisible();

    // Get the join code from the page text or by navigating to class details
    await classLink.click();
    await page.waitForURL('**/teacher/classes/*');
    
    // The join code is usually displayed in the class detail page. 
    // We will look for a badge or text containing "Key:"
    const joinCodeLocator = page.locator('text=/Key:/i');
    await expect(joinCodeLocator).toBeVisible();
    const joinCodeText = await joinCodeLocator.innerText();
    classJoinCode = joinCodeText.replace(/Key:/i, '').trim();
    
    console.log('Obtained Class Join Code:', classJoinCode);

    // 3. Add a Chapter
    await page.click('button:has-text("+ Add Chapter")');
    await page.fill('input[name="title"]', 'Introduction to E2E Testing');
    await page.click('button:has-text("Create")');
    
    // Check that chapter is listed
    await expect(page.locator('text=Introduction to E2E Testing')).toBeVisible();

    await context.close();
  });

  test('Student Flow: Signup, Join Class, View Chapter', async ({ browser }) => {
    // Make sure we have a join code before starting student flow
    expect(classJoinCode).toBeTruthy();

    const context = await browser.newContext();
    const page = await context.newPage();

    // 1. Student Signup
    await page.goto('http://localhost:3000/signup');
    await page.click('button:has-text("I want to learn")');
    await page.fill('input[name="name"]', 'Test Student');
    await page.fill('input[name="email"]', studentEmail);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for redirect to student dashboard
    await page.waitForURL('**/student/dashboard');

    // 2. Join the Class
    await page.fill('input[name="key"]', classJoinCode);
    await page.fill('input[name="rollNo"]', 'R123');
    await page.fill('input[name="school"]', 'Test High School');
    await page.click('button:has-text("Join Class")');

    // Wait for the class card to appear
    const classCard = page.locator('text=Automated Testing 101');
    await expect(classCard).toBeVisible();

    // 3. View the Class and Chapters
    await classCard.click();
    await page.waitForURL('**/student/classes/*');
    
    // Ensure the chapter created by the teacher is visible
    await expect(page.locator('text=Introduction to E2E Testing')).toBeVisible();
    
    await context.close();
  });
});
