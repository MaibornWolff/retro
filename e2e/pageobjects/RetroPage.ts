import { PageObject } from "./PageObject";
import { HeaderPageObject } from "./Header";
import { LandingPagePageObject } from "./LandingPage";

export class RetroPagePageObject extends PageObject {
  async setup() {
    const landingPage = new LandingPagePageObject(this.page, this.context);
    await landingPage.visitRetroPage();
    await this.createSession();
  }

  async createSession({
    username = "User 1",
    sessionName = "Test Session",
    retroFormat = "Went Well, To Improve, Action Items",
  }: {
    username?: string;
    sessionName?: string;
    retroFormat?: string;
  } = {}) {
    const inputs = await this.page.getByRole("textbox").all();
    await inputs[0]?.fill(username);
    await inputs[1]?.fill(sessionName);
    await this.page.selectOption("select", retroFormat);
    await this.page.getByRole("button", { name: "Create" }).click();
    await new HeaderPageObject(this.page, this.context).waitForHeaderVisible();
    await this.page.waitForURL("**/retro/**");
  }

  async addColumn(columnName: string = "New Column") {
    await this.page.getByRole("button", { name: "Add Column" }).click();
    await this.page.getByRole("textbox").fill(columnName);
    await this.page.getByRole("button", { name: "Create" }).click();
  }

  async blurBoard() {
    await this.page.getByRole("button", { name: "Blur Board" }).click();
  }
}
