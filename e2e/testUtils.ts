import { BrowserContext, Page } from "@playwright/test";

export async function setupRetroPage(page: Page) {
  await page.goto("http://localhost:3000/", { timeout: 60000 });
  await page.getByRole("button", { name: "Retrospective" }).click();
  const inputs = await page.getByRole("textbox").all();
  await inputs[0]?.fill("User 1");
  await inputs[1]?.fill("Test Session");
  await page.selectOption("select", "Went Well, To Improve, Action Items");
  await page.getByRole("button", { name: "Create" }).click();
}

export async function joinNewUser(urlWithRoomId: string, context: BrowserContext, name: string) {
  const page = await context.newPage();
  await page.goto(urlWithRoomId);
  await page.getByRole("textbox").fill(name);
  await page.getByRole("button", { name: "Join" }).click();
  return page;
}

export async function setupPokerPage(page: Page) {
  await page.goto("http://localhost:3000/", { timeout: 60000 });
  await page.getByRole("button", { name: "Planning Poker" }).click();
  await page.getByRole("button", { name: "Start" }).click();
  await page.getByLabel("Name").fill("User 1");
  await page.getByRole("button", { name: "Join" }).click();
}
