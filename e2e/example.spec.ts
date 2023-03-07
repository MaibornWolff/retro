import { test, expect, Page, BrowserContext } from "@playwright/test";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("/");
  await loginToRetroPage(page);
});

test.afterAll(async () => {
  await page.close();
});

async function loginToRetroPage(page: Page) {
  await page.getByRole("button", { name: "Retrospective" }).click();
  const inputs = await page.getByRole("textbox").all();
  await inputs[0]?.fill("User name");
  await inputs[1]?.fill("Test Session");
  await page.selectOption("select", "Went Well, To Improve, Action Items");
  await page.getByRole("button", { name: "Create" }).click();
}

async function joinNewUser(urlWithRoomId: string, context: BrowserContext, numberOfUsers: number) {
  const newPages = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const newPage = await context.newPage();
    await newPage.goto(urlWithRoomId);
    await newPage.getByRole("textbox").fill(`new User ${i}`);
    await newPage.getByRole("button", { name: "Join" }).click();
    newPages.push(newPage);

    expect(await newPage.textContent("h2")).toBe("Waiting for approval...");
  }
  return newPages;
}

async function acceptUser(page: Page, numberOfUsers: number) {
  for (let i = 0; i < numberOfUsers; i++) {
    await page.locator("button[aria-label='Accept']").nth(i).click();
  }
}

async function rejectUser(page: Page) {
  await page.locator("button[aria-label='Reject']").first().click();
}

async function transferModeratorRole(page: Page) {
  await page.locator("button[aria-label='Transfer Moderator Role']").last().click();
  await page.getByRole("button", { name: "Yes, transfer" }).click();
  await page.getByRole("button", { name: "Close" }).click();

  expect(page.getByRole("button", { name: "Add Column" })).toBeNull();
}

test("should have all required elements", async () => {
  await page.getByRole("button", { name: "Add Column" }).click();
  await page.getByRole("textbox").fill("New Column");
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByRole("button", { name: "Blur Board" }).click();

  await expect(page).toHaveTitle(/Retro/);
  await expect(page.getByRole("button", { name: "Unblur Board" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Test Session" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Went Well" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "To Improve" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Action Items" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "New Column" })).toBeVisible();
});

/*
test("should accept user", async ({ context }) => {
  await page.getByText("Share Session").click();
  const urlWithRoomId: string = await page.evaluate("navigator.clipboard.readText()");

  const [userPage1, userPage2, userPage3] = await joinNewUser(urlWithRoomId, context, 3);

  await page.getByText("Participants").click();

  // await page.locator('button[aria-label=Accept]:right-of(:text("new User 0"))').click();

  expect(userPage3?.getByText("You were disconnected from the session.")).not.toBeNull();
  expect(userPage2?.getByRole("button", { name: "Add Column" })).not.toBeNull();
});
*/

test("from landing to retro page", async ({ context }) => {
  await page.getByText("Share Session").click();
  const urlWithRoomId: string = await page.evaluate("navigator.clipboard.readText()");

  const [userPage1, userPage2, userPage3] = await joinNewUser(urlWithRoomId, context, 3);

  await page.getByText("Participants").click();

  await acceptUser(page, 2);
  await rejectUser(page);
  await transferModeratorRole(page);

  expect(userPage1?.getByText("Test Session")).not.toBeNull();
  // await expect(userPage2?.getByRole("button", { name: "Add Column" })).toBeVisible();
  expect(userPage3?.getByText("You were disconnected from the session.")).not.toBeNull();
});
