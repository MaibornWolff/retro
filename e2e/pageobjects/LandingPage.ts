import { PageObject } from "./PageObject";

export class LandingPagePageObject extends PageObject {
  async visitRetroPage() {
    await this.visit();
    await this.page.getByRole("button", { name: "Retrospective" }).click();
    await this.page.getByText("Create Retro Session").waitFor();
  }

  async visitPlanningPokerPage() {
    await this.visit();
    await this.page.getByRole("button", { name: "Planning Poker" }).click();
    await this.page.getByText("Create Planning Poker Session").waitFor();
  }

  private async visit() {
    const url = "/";
    await this.page.goto(url);
  }
}
