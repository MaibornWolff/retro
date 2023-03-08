import { expect, test } from "@playwright/test";
import {
  acceptUser,
  isChromium,
  joinNewUser,
  rejectUser,
  setupRetroPage,
  transferModeratorRole,
} from "./testUtils";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("should have all required elements as moderator", async ({ page }) => {
  await setupRetroPage(page);

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

test("should accept user and show required elements as participant", async ({
  context,
  page,
  browserName,
}) => {
  await setupRetroPage(page);

  await page.getByText("Share Session").click();
  const urlWithRoomId: string = isChromium(browserName)
    ? await page.evaluate("navigator.clipboard.readText()")
    : page.url();

  const newPage = await joinNewUser(urlWithRoomId, context, "User1");

  const waitingForApprovalLocator = newPage.getByRole("heading", {
    name: "Waiting for approval...",
  });

  await page.getByText("Participants").click();

  const participantsDialog = page.getByRole("heading", { name: "Waiting for approval" });
  await Promise.all([participantsDialog.waitFor({ state: "visible" }), acceptUser(page)]);
  await Promise.all([waitingForApprovalLocator.waitFor({ state: "hidden" })]);

  await expect(waitingForApprovalLocator).not.toBeVisible();
  await expect(newPage.getByRole("button", { name: "Blur Board" })).not.toBeVisible();
  await expect(newPage.getByRole("button", { name: "Add Column" })).not.toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Test Session" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Went Well" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "To Improve" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Action Items" })).toBeVisible();
});

test("should reject user and show error page", async ({ context, page, browserName }) => {
  await setupRetroPage(page);

  await page.getByText("Share Session").click();
  const urlWithRoomId: string = isChromium(browserName)
    ? await page.evaluate("navigator.clipboard.readText()")
    : page.url();

  const newPage = await joinNewUser(urlWithRoomId, context, "User1");

  await page.getByText("Participants").click();
  const participantsDialog = page.getByRole("heading", { name: "Waiting for approval" });
  await Promise.all([participantsDialog.waitFor({ state: "visible" }), rejectUser(page)]);

  await expect(newPage.getByRole("heading", { name: "Test Session" })).not.toBeVisible();
  await expect(newPage.getByText("You were disconnected from the session.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should accept user and transfer moderator role", async ({ context, page, browserName }) => {
  await setupRetroPage(page);

  await page.getByText("Share Session").click();
  const urlWithRoomId: string = isChromium(browserName)
    ? await page.evaluate("navigator.clipboard.readText()")
    : page.url();

  const newPage = await joinNewUser(urlWithRoomId, context, "User1");

  const waitingForApprovalLocator = newPage.getByRole("heading", {
    name: "Waiting for approval...",
  });

  await page.getByText("Participants").click();

  const participantsDialog = page.getByRole("heading", { name: "Waiting for approval" });
  await Promise.all([participantsDialog.waitFor({ state: "visible" }), acceptUser(page)]);
  await Promise.all([waitingForApprovalLocator.waitFor({ state: "hidden" })]);

  await Promise.all([participantsDialog.waitFor({ state: "hidden" }), transferModeratorRole(page)]);
  await page.getByRole("button", { name: "Yes, transfer" }).click();
  await page.getByRole("button", { name: "Close" }).click();

  await expect(newPage.getByRole("heading", { name: "Test Session" })).toBeVisible();
  await expect(newPage.getByRole("button", { name: "Blur Board" })).toBeVisible();
  await expect(newPage.getByRole("button", { name: "Add Column" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Blur Board" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Add Column" })).not.toBeVisible();
});
