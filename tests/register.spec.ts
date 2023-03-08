import { test, expect } from "@playwright/test";

test("register", async ({ page }) => {
  await page.goto(
    "https://life-cycle-frontend-git-khaimook-lca-44change-p-4c685e-lca-team.vercel.app/register"
  );
  await page.fill("input[name='full_name']", "fname lname");
  await page.fill("input[name='email']", "test@gmail.com");
  await page.fill("input[name='password']", "Test1234");
  await page.fill("input[name='confirm_password']", "Test1234");
  await page.click("//button[text()='submit']");
});
