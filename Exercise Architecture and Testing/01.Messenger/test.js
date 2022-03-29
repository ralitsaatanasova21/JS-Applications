const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

describe("Tests", async function () {
  this.timeout(8000);

  let browser, page;

  before(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 1000 });
    // browser = await chromium.launch();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  it("load all messages", async () => {
    await page.goto("http://127.0.0.1:5500/index.html");
    await page.click('text="Refresh"');
    await page.waitForSelector(
      "#messages",
      "text=Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))"
    );
  });

  it("send messages", async () => {
    await page.goto("http://127.0.0.1:5500/index.html");
    await page.fill("#author", "rali");
    await page.fill("#content", "zdr");
    await page.click('text="Send"');
    await page.click('text="Refresh"');
    await page.waitForSelector(
      "#messages",
      "text=Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))\nrali: zdr"
    );
  });
});
