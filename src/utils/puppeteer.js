import puppeteer from "puppeteer";

const initPuppeteer = async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  return { browser, page };
};

export { initPuppeteer };