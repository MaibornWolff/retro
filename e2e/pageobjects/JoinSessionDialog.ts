import { PageObject } from "./PageObject";
import { HeaderPageObject } from "./Header";
import { Page } from "@playwright/test";

export class JoinSessionDialogPageObject extends PageObject {
  async joinNewUser({
    urlWithRoomId = this.page.url(),
    username = "User 2",
  }: {
    urlWithRoomId?: string;
    username?: string;
  } = {}) {
    const page = await this.context.newPage();
    await this.gotoJoinSessionPage(urlWithRoomId, page);
    await page.getByRole("textbox").fill(username);
    await page.getByRole("button", { name: "Join" }).click();
    return page;
  }

  private async gotoJoinSessionPage(urlWithRoomId: string, page: Page) {
    await page.goto(urlWithRoomId);
    await new HeaderPageObject(page, this.context).waitForHeaderVisible();
  }
}
