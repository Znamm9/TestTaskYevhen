import { expect, type Locator, type Page } from '@playwright/test';

export class ScreenPage {
  readonly page: Page;
  readonly priceElements: Locator;
  readonly spf50: Locator;
  readonly spf30: Locator;

  constructor(page: Page) {
    this.page = page;
    this.priceElements = page.locator("//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), '50') or contains(text(), '30')]/../p[2]");
    this.spf50 = page.locator("//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), '50')]/../p[2]")
    this.spf30 = page.locator("//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), '30')]/../p[2]")
}

  async addFilterredSunScreens() {
    let chipest50 = await this.getChipest("50");
    let chipest30 = await this.getChipest("30");

    await this.page.locator(`//div[@class='container']//div[contains(@class, 'text-center')]//p[2][contains(text(), '${chipest30}')]/../button`).click();
    await this.page.locator(`//div[@class='container']//div[contains(@class, 'text-center')]//p[2][contains(text(), '${chipest50}')]/../button`).click();
  }

  async getChipest(sunscreensNumber: string){
    let pricesAsString: string[] = [];
    let priceNumbers: number[] = [];

    for(let i = 0; i < 20; i++){
        const count = await this.page.locator(`//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), '${sunscreensNumber}')]/../p[2]`).count();
        if(count < 6){
            await this.page.waitForTimeout(500);
        }else {
            break;
        }
    }

    for(const elem of await this.page.locator(`//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), '${sunscreensNumber}')]/../p[2]`).all()){
        pricesAsString.push(await elem.innerText());
    }

    for(let i = 0; i < pricesAsString.length; i++){
        // "Price_rs._179" => ["Price", "rs.", "179"]
        let splitted = pricesAsString[i].split(" ");
        priceNumbers.push(parseInt(splitted[splitted.length - 1]));
    }

    const sortedPrice = priceNumbers.sort();
    return sortedPrice[0];
  }

  async navigate() {
    await this.page.goto("https://weathershopper.pythonanywhere.com/sunscreen");
  }
}