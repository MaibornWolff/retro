import { test, expect } from "@playwright/test";

/* test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
}); */
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
test.describe("login retro page", () => {
  test("from landing to retro page", async ({ page, context }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Retrospective" }).click();
    const inputs = await page.getByRole("textbox").all();
    await inputs[0]?.fill("User name");
    await inputs[1]?.fill("Test Session");
    // await page.selectOption("format", "Went Well, To Improve, Action Items");
    await page.selectOption("select", "Went Well, To Improve, Action Items");
    await page.getByRole("button", { name: "Create" }).click();
    // console.log(await page.locator("h6").last().textContent());
    await expect(page).toHaveTitle(/Retro/);
    expect(await page.textContent("h5")).toBe("Test Session");
    // expect(await page.textContent("h6")).toBe("Test Session");

    await page.getByRole("button", { name: "Add Column" }).click();
    await page.getByRole("textbox").fill("new column");
    await page.getByRole("button", { name: "Create" }).click();
    const url = page.url();
    console.log(url);
    const newPage = await context.newPage();
    await newPage.goto(url);
    console.log(await newPage.title());
  });
});

test.describe("login poker page", () => {
  test("from landing to poker page", async ({ page }) => {
    /*
    await page.goto("/");

    await page.getByRole("button", { name: "Planning Poker" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    await page.getByRole("textbox").fill("Test Session");
    await page.getByRole("button", { name: "Join" }).click();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Poker/);
  */
  });
});
