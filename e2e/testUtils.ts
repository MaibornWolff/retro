import { BrowserContext, Page } from "@playwright/test";

export function isChromium(browserName: string) {
  return browserName === "chromium";
}

export async function setupRetroPage(page: Page) {
  await page.getByRole("button", { name: "Retrospective" }).click();
  const inputs = await page.getByRole("textbox").all();
  await inputs[0]?.fill("User name");
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

export async function acceptUser(page: Page) {
  await page.getByRole("button", { name: "Accept" }).first().click();
}

export async function rejectUser(page: Page) {
  await page.getByRole("button", { name: "Reject" }).first().click();
}

export async function transferModeratorRole(page: Page) {
  await page.getByRole("button", { name: "Transfer Moderator Role" }).last().click();
}
