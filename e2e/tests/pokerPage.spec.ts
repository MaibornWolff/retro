import { expect, test } from "@playwright/test";
import { PokerPagePageObject } from "../pageobjects/PokerPage";
import { HeaderPageObject } from "../pageobjects/Header";
import { JoinSessionDialogPageObject } from "../pageobjects/JoinSessionDialog";

test("should have all required elements as moderator", async ({ page, context }) => {
  const pokerPage = new PokerPagePageObject(page, context);

  await pokerPage.setup();
  await pokerPage.setStory();

  await expect(page).toHaveTitle(/Planning Poker/);
  const frontCardOfModerator = await page.waitForSelector(".react-card-front");
  expect(await frontCardOfModerator.innerText()).toBe("User 1");
  await expect(page.getByRole("heading", { name: "Test User Story" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Reset Votes" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Show Results" })).toBeDisabled();
});

test("should accept user, vote and show results", async ({ page, context }) => {
  const pokerPage = new PokerPagePageObject(page, context);
  const header = new HeaderPageObject(page, context);
  const joinSessionDialog = new JoinSessionDialogPageObject(page, context);

  await pokerPage.setup();
  const newUser = "User 2";
  const newPage = await joinSessionDialog.joinNewUser({ username: newUser });
  const newPokerPage = new PokerPagePageObject(newPage, context);

  await header.openParticipants();
  await header.acceptParticipant(newUser);
  await header.closeParticipants();

  const frontCards = page.locator(".react-card-front");
  await expect(frontCards).toHaveCount(2);
  await expect(
    frontCards.filter({ has: page.getByRole("heading", { name: "User 1" }) })
  ).toBeVisible();
  await expect(
    frontCards.filter({ has: page.getByRole("heading", { name: newUser }) })
  ).toBeVisible();

  await pokerPage.vote(8);
  await newPokerPage.vote(21);

  await pokerPage.showResults();

  const svg = page.locator(".recharts-surface");
  await expect(page.locator(".recharts-bar-rectangle")).toHaveCount(2); // show two bars
  await expect(svg.filter({ has: page.getByText("8") })).toHaveCount(1);
  await expect(svg.filter({ has: page.getByText("21") })).toHaveCount(1);

  const backCards = page.locator(".react-card-back");
  await expect(backCards).toHaveCount(2);
  await expect(backCards.filter({ has: page.getByRole("heading", { name: "8" }) })).toBeVisible();
  await expect(backCards.filter({ has: page.getByRole("heading", { name: "21" }) })).toBeVisible();

  await pokerPage.resetVotes();

  await expect(page.getByRole("button", { name: "Show Results" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Reset Votes" })).toBeDisabled();
  await expect(newPage.getByRole("button", { name: "Set User Story" })).not.toBeVisible();
  await expect(newPage.getByRole("button", { name: "Show Results" })).not.toBeVisible();
  await expect(newPage.getByRole("button", { name: "Reset Votes" })).not.toBeVisible();
});

test("should reject user and show error page", async ({ page, context }) => {
  const pokerPage = new PokerPagePageObject(page, context);
  const header = new HeaderPageObject(page, context);
  const joinSessionDialog = new JoinSessionDialogPageObject(page, context);
  await pokerPage.setup();

  const newUser = "User 2";
  const newPage = await joinSessionDialog.joinNewUser({ username: newUser });

  await header.openParticipants();
  await header.rejectParticipant(newUser);

  await expect(page.getByRole("listitem", { name: newUser })).not.toBeVisible();
  await expect(newPage.getByText("Your join request has been rejected.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should kick user and show error page", async ({ page, context }) => {
  const pokerPage = new PokerPagePageObject(page, context);
  const header = new HeaderPageObject(page, context);
  const joinSessionDialog = new JoinSessionDialogPageObject(page, context);
  await pokerPage.setup();

  const newUser = "User 2";
  const newPage = await joinSessionDialog.joinNewUser({ username: newUser });

  await header.openParticipants();
  await header.acceptParticipant(newUser);
  await header.kickParticipant(newUser);

  await expect(page.getByRole("listitem", { name: newUser })).not.toBeVisible();
  await expect(newPage.getByText("You have been removed from the session.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should accept user and promote to moderator", async ({ page, context }) => {
  const pokerPage = new PokerPagePageObject(page, context);
  const header = new HeaderPageObject(page, context);
  const joinSessionDialog = new JoinSessionDialogPageObject(page, context);
  await pokerPage.setup();

  const newUser = "User 2";
  const newPage = await joinSessionDialog.joinNewUser({ username: newUser });

  await header.openParticipants();
  await header.acceptParticipant(newUser);
  await header.promoteToModerator(newUser);
  await header.closeParticipants();

  await expect(newPage.getByRole("button", { name: "Set User Story" })).toBeVisible();
  await expect(newPage.getByRole("button", { name: "Show Results" })).toBeDisabled();
  await expect(newPage.getByRole("button", { name: "Reset Votes" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Set User Story" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Show Results" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Reset Votes" })).not.toBeVisible();
});
