import { expect, test } from "@playwright/test";
import { joinNewUser, setupRetroPage, setupPokerPage } from "./testUtils";

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
  const newUser = "User 2";
  await setupRetroPage(page);

  const urlWithRoomId: string = page.url();
  const newPage = await joinNewUser(urlWithRoomId, context, newUser);

  await page.getByRole("button", { name: "Participants" }).click();

  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
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
  const newUser = "User 2";
  await setupRetroPage(page);

  const urlWithRoomId: string = page.url();
  const newPage = await joinNewUser(urlWithRoomId, context, newUser);

  await page.getByRole("button", { name: "Participants" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Reject User" })
    .click();

  await expect(page.getByRole("listitem", { name: newUser })).not.toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Test Session" })).not.toBeVisible();
  await expect(newPage.getByText("Your join request has been rejected.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should kick user and show error page", async ({ context, page }) => {
  const newUser = "User 2";
  await setupRetroPage(page);

  const urlWithRoomId: string = page.url();
  const newPage = await joinNewUser(urlWithRoomId, context, newUser);
  await page.getByRole("button", { name: "Participants" }).click();

  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Accept User" })
    .click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Kick user" })
    .click();

  await expect(page.getByRole("listitem", { name: newUser })).not.toBeVisible();
  await expect(newPage.getByRole("heading", { name: "Test Session" })).not.toBeVisible();
  await expect(newPage.getByText("You have been removed from the session.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should accept user and transfer moderator role", async ({ context, page }) => {
  const newUser = "User 2";
  await setupRetroPage(page);

  const urlWithRoomId: string = page.url();
  const newPage = await joinNewUser(urlWithRoomId, context, newUser);

  await page.getByRole("button", { name: "Participants" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Accept User" })
    .click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
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

test("should have all required elements as moderator", async ({ page }) => {
  await setupPokerPage(page);
  await page.getByRole("button", { name: "Set User Story" }).click();
  await page.getByLabel("Story Title").fill("Test User Story");
  await page.getByRole("button", { name: "Set Story" }).click();
  const frontCardOfModerator = await page.waitForSelector(".react-card-front");

  await expect(page).toHaveTitle(/Planning Poker/);
  expect(await frontCardOfModerator.innerText()).toBe("User 1");
  await expect(page.getByRole("heading", { name: "Test User Story" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Reset Votes" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Show Results" })).toBeDisabled();
});

test("should accept user, vote and show results", async ({ page, context }) => {
  const newUser = "User 2";
  await setupPokerPage(page);

  const sessionUrl = page.url();
  const newPage = await context.newPage();
  await newPage.goto(sessionUrl);
  await newPage.getByLabel("Name").fill(newUser);
  await newPage.getByRole("button", { name: "Join" }).click();

  await page.getByRole("button", { name: "Open Participants" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Accept User" })
    .click();
  await page.getByRole("button", { name: "Close" }).click();

  const frontCards = page.locator(".react-card-front");
  await expect(frontCards).toHaveCount(2);
  await expect(
    frontCards.filter({ has: page.getByRole("heading", { name: "User 1" }) })
  ).toBeVisible();
  await expect(
    frontCards.filter({ has: page.getByRole("heading", { name: newUser }) })
  ).toBeVisible();

  await page.getByRole("button", { name: "Vote", exact: true }).click();
  await page.getByText("8").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await newPage.getByRole("button", { name: "vote" }).click();
  await newPage.getByText("21").click();

  await newPage.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Show Results" }).click();

  const svg = page.locator(".recharts-surface");
  await expect(page.getByRole("img")).toHaveCount(2); // show two bars
  await expect(svg.filter({ has: page.getByText("8") })).toHaveCount(1);
  await expect(svg.filter({ has: page.getByText("21") })).toHaveCount(1);

  const backCards = page.locator(".react-card-back");
  await expect(backCards).toHaveCount(2);
  await expect(backCards.filter({ has: page.getByRole("heading", { name: "8" }) })).toBeVisible();
  await expect(backCards.filter({ has: page.getByRole("heading", { name: "21" }) })).toBeVisible();

  await page.getByRole("button", { name: "Reset Votes" }).click();
  await page.getByRole("button", { name: "Yes" }).click();

  await expect(page.getByRole("button", { name: "Show Results" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Reset Votes" })).toBeDisabled();
  await expect(newPage.getByRole("button", { name: "Set User Story" })).not.toBeVisible();
  await expect(newPage.getByRole("button", { name: "Show Results" })).not.toBeVisible();
  await expect(newPage.getByRole("button", { name: "Reset Votes" })).not.toBeVisible();
});

test("should reject user and show error page", async ({ page, context }) => {
  const newUser = "User 2";
  await setupPokerPage(page);

  const sessionUrl = page.url();
  const newPage = await context.newPage();
  await newPage.goto(sessionUrl);
  await newPage.getByLabel("Name").fill(newUser);
  await newPage.getByRole("button", { name: "Join" }).click();

  await page.getByRole("button", { name: "Open Participants" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Reject User" })
    .click();

  await expect(page.getByRole("listitem", { name: newUser })).not.toBeVisible();
  await expect(newPage.getByText("Your join request has been rejected.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should kick user and show error page", async ({ page, context }) => {
  const newUser = "User 2";
  await setupPokerPage(page);

  const sessionUrl = page.url();
  const newPage = await context.newPage();
  await newPage.goto(sessionUrl);
  await newPage.getByLabel("Name").fill(newUser);
  await newPage.getByRole("button", { name: "Join" }).click();

  await page.getByRole("button", { name: "Open Participants" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Accept User" })
    .click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Kick User" })
    .click();

  await expect(page.getByRole("listitem", { name: newUser })).not.toBeVisible();
  await expect(newPage.getByText("You have been removed from the session.")).toBeVisible();
  expect(newPage.url()).toContain("error");
});

test("should accept user and transfer moderator role", async ({ page, context }) => {
  const newUser = "User 2";
  await setupPokerPage(page);

  const sessionUrl = page.url();
  const newPage = await context.newPage();
  await newPage.goto(sessionUrl);
  await newPage.getByLabel("Name").fill(newUser);
  await newPage.getByRole("button", { name: "Join" }).click();

  await page.getByRole("button", { name: "Open Participants" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Accept User" })
    .click();
  await page
    .getByRole("listitem")
    .filter({ hasText: newUser })
    .getByRole("button", { name: "Transfer Moderator Role" })
    .click();
  await page.getByRole("button", { name: "Yes, transfer" }).click();
  await page.getByRole("button", { name: "Close" }).click();

  await expect(newPage.getByRole("button", { name: "Set User Story" })).toBeVisible();
  await expect(newPage.getByRole("button", { name: "Show Results" })).toBeDisabled();
  await expect(newPage.getByRole("button", { name: "Reset Votes" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Set User Story" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Show Results" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Reset Votes" })).not.toBeVisible();
});
