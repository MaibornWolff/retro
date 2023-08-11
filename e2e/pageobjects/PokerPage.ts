import { PageObject } from "./PageObject";
import { LandingPagePageObject } from "./LandingPage";
import { HeaderPageObject } from "./Header";

export class PokerPagePageObject extends PageObject {
  async setup() {
    const landingPage = new LandingPagePageObject(this.page, this.context);
    await landingPage.visitPlanningPokerPage();
    await this.createSession();
  }

  async createSession(username: string = "User 1") {
    await this.page.getByLabel("Name").fill(username);
    await this.page.getByRole("button", { name: "Join" }).click();
    await new HeaderPageObject(this.page, this.context).waitForHeaderVisible();
    await this.page.waitForURL("**/poker/**");
  }

  async setStory(title: string = "Test User Story") {
    await this.page.getByRole("button", { name: "Set User Story" }).click();
    await this.page.getByLabel("Story Title").fill(title);
    await this.page.getByRole("button", { name: "Set Story" }).click();
  }

  async vote(count: number) {
    await this.page.getByRole("button", { name: "Vote", exact: true }).click();
    await this.page.getByText(String(count)).click();
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async showResults() {
    await this.page.getByRole("button", { name: "Show Results" }).click();
  }

  async resetVotes() {
    await this.page.getByRole("button", { name: "Reset Votes" }).click();
    await this.page.getByRole("button", { name: "Yes" }).click();
  }
}
