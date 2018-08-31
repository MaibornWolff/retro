import puppeteer from "puppeteer";

const appUrl = "http://localhost:3000/";
const routes = {
  home: `${appUrl}`,
  retroFormats: `${appUrl}/retro-formats`,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
});

describe("navigation", () => {
  test("can navigate to home", async () => {
    await page.goto(routes.home);
    await page.waitForSelector(".App");
    await page.click("#homeNavButton");
    await page.waitForSelector("#home");
  });
});

afterAll(() => {
  browser.close();
});
