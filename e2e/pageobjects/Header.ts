import { PageObject } from "./PageObject";

// TODO: all participant actions do not wait correctly until they're finished. We still have to fix this.
export class HeaderPageObject extends PageObject {
  async openParticipants() {
    await this.page.getByRole("button", { name: "Participants" }).click();
  }

  async closeParticipants() {
    await this.page.getByRole("button", { name: "Close" }).click();
  }

  async acceptParticipant(username: string) {
    await this.page
      .getByRole("listitem")
      .filter({ hasText: username })
      .getByRole("button", { name: "Accept User" })
      .click();
    await this.page
      .getByRole("listitem")
      .filter({ hasText: username })
      .getByRole("button", { name: "Accept User" })
      .isHidden();
  }

  async rejectParticipant(username: string) {
    await this.page
      .getByRole("listitem")
      .filter({ hasText: username })
      .getByRole("button", { name: "Reject User" })
      .click();
    await this.page.getByRole("listitem").filter({ hasText: username }).isHidden();
  }

  async kickParticipant(username: string) {
    await this.page
      .getByRole("listitem")
      .filter({ hasText: username })
      .getByRole("button", { name: "Kick user" })
      .click();
    await this.page.getByRole("listitem").filter({ hasText: username }).isHidden();
  }

  async promoteToModerator(username: string) {
    await this.page
      .getByRole("listitem")
      .filter({ hasText: username })
      .getByRole("button", { name: "Promote to Moderator" })
      .click();
    await this.page.getByRole("button", { name: "Yes, promote" }).click();
    await this.page
      .getByRole("listitem")
      .filter({ hasText: username })
      .getByRole("button", { name: "Promote to Moderator", disabled: true })
      .isVisible();
  }

  async waitForHeaderVisible() {
    await this.page.getByLabel("Settings").waitFor();
  }
}
