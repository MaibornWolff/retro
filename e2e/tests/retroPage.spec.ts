import { expect, test } from "@playwright/test";
import { HeaderPageObject } from "../pageobjects/Header";
import { JoinSessionDialogPageObject } from "../pageobjects/JoinSessionDialog";
import { RetroPagePageObject } from "../pageobjects/RetroPage";

test("should have all required elements as moderator", async ({ page, context }) => {
  const retroPage = new RetroPagePageObject(page, context);
  await retroPage.setup();

  await retroPage.addColumn();
  await retroPage.blurBoard();

  await expect(page).toHaveTitle(/Retro/);
  await expect(page.getByRole("button", { name: "Unblur Board" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Test Session" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Went Well" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "To Improve" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Action Items" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "New Column" })).toBeVisible();
});

test("should accept user and show required elements as participant", async ({ context, page }) => {
  const retroPage = new RetroPagePageObject(page, context);
  const header = new HeaderPageObject(page, context);
  const joinSessionDialog = new JoinSessionDialogPageObject(page, context);

  await retroPage.setup();

  const newUser = "User 2";
  const newPage = await joinSessionDialog.joinNewUser({ username: newUser });

  await header.openParticipants();
  await header.acceptParticipant(newUser);
  await header.closeParticipants();

  await expect(newPage.getByRole("button", { name: "Blur Board" })).not.toBeVisible();
  await expect(newPage.getByRole("button", { name: "Add Column" })).not.toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Test Session" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Went Well" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "To Improve" })).toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Action Items" })).toBeVisible();
});

test("should reject user and show error page", async ({ context, page }) => {
  const retroPage = new RetroPagePageObject(page, context);
  const header = new HeaderPageObject(page, context);
  const joinSessionDialog = new JoinSessionDialogPageObject(page, context);

  await retroPage.setup();

  const newUser = "User 2";
  const newPage = await joinSessionDialog.joinNewUser({ username: newUser });

  await header.openParticipants();
  await header.rejectParticipant(newUser);

  await expect(page.getByRole("listitem", { name: newUser })).not.toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Test Session" })).not.toBeVisible();
  await expect(newPage.getByText("Your join request has been rejected.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should kick user and show error page", async ({ context, page }) => {
  const retroPage = new RetroPagePageObject(page, context);
  const header = new HeaderPageObject(page, context);
  const joinSessionDialog = new JoinSessionDialogPageObject(page, context);

  await retroPage.setup();

  const newUser = "User 2";
  const newPage = await joinSessionDialog.joinNewUser({ username: newUser });

  await header.openParticipants();
  await header.acceptParticipant(newUser);
  await header.kickParticipant(newUser);

  await expect(page.getByRole("listitem", { name: newUser })).not.toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Test Session" })).not.toBeVisible();
  await expect(newPage.getByText("You have been removed from the session.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should accept user and promote to moderator", async ({ context, page }) => {
  const retroPage = new RetroPagePageObject(page, context);
  const header = new HeaderPageObject(page, context);
  const joinSessionDialog = new JoinSessionDialogPageObject(page, context);

  await retroPage.setup();

  const newUser = "User 2";
  const newPage = await joinSessionDialog.joinNewUser({ username: newUser });

  await header.openParticipants();
  await header.acceptParticipant(newUser);
  await header.promoteToModerator(newUser);
  await header.closeParticipants();

  await expect(newPage.getByRole("heading", { name: "Test Session" })).toBeVisible();
  await expect(newPage.getByRole("button", { name: "Blur Board" })).toBeVisible();
  await expect(newPage.getByRole("button", { name: "Add Column" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Blur Board" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Add Column" })).not.toBeVisible();
});
