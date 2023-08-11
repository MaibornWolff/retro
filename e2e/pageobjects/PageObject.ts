import { BrowserContext, Page } from "@playwright/test";

export abstract class PageObject {
  constructor(public readonly page: Page, public readonly context: BrowserContext) {}
}
