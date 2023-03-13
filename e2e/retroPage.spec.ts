import { expect, test } from "@playwright/test";
import { joinNewUser, setupRetroPage } from "./testUtils";

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

test("should accept user and show required elements as participant", async ({ context, page }) => {
  const user = "User 1";
  await setupRetroPage(page);

  const urlWithRoomId: string = page.url();
  const newPage = await joinNewUser(urlWithRoomId, context, user);

  await page.getByRole("button", { name: "Participants" }).click();

  await page
    .getByRole("listitem")
    .filter({ hasText: user })
    .getByRole("button", { name: "Accept User" })
    .click();

  await expect(newPage.getByRole("button", { name: "Blur Board" })).not.toBeVisible();
  await expect(newPage.getByRole("button", { name: "Add Column" })).not.toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Test Session" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Went Well" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "To Improve" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Action Items" })).toBeVisible();
});

test("should reject user and show error page", async ({ context, page }) => {
  const user = "User 1";
  await setupRetroPage(page);

  const urlWithRoomId: string = page.url();
  const newPage = await joinNewUser(urlWithRoomId, context, user);

  await page.getByRole("button", { name: "Participants" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: user })
    .getByRole("button", { name: "Reject User" })
    .click();

  await expect(newPage.getByRole("heading", { name: "Test Session" })).not.toBeVisible();
  await expect(newPage.getByText("Your join request has been rejected.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should kick user and show error page", async ({ context, page }) => {
  const user = "User 1";
  await setupRetroPage(page);

  const urlWithRoomId: string = page.url();
  const newPage = await joinNewUser(urlWithRoomId, context, user);
  await page.getByRole("button", { name: "Participants" }).click();

  await page
    .getByRole("listitem")
    .filter({ hasText: user })
    .getByRole("button", { name: "Accept User" })
    .click();
  await page
    .getByRole("listitem")
    .filter({ hasText: user })
    .getByRole("button", { name: "Kick user" })
    .click();

  await expect(newPage.getByRole("heading", { name: "Test Session" })).not.toBeVisible();
  await expect(newPage.getByText("You have been removed from the session.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should accept user and transfer moderator role", async ({ context, page }) => {
  const user = "User 1";
  await setupRetroPage(page);

  const urlWithRoomId: string = page.url();
  const newPage = await joinNewUser(urlWithRoomId, context, user);

  await page.getByRole("button", { name: "Participants" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: user })
    .getByRole("button", { name: "Accept User" })
    .click();
  await page
    .getByRole("listitem")
    .filter({ hasText: user })
    .getByRole("button", { name: "Transfer Moderator Role" })
    .click();

  await page.getByRole("button", { name: "Yes, transfer" }).click();
  await page.getByRole("button", { name: "Close" }).click();

  await expect(newPage.getByRole("heading", { name: "Test Session" })).toBeVisible();
  await expect(newPage.getByRole("button", { name: "Blur Board" })).toBeVisible();
  await expect(newPage.getByRole("button", { name: "Add Column" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Blur Board" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Add Column" })).not.toBeVisible();
});
