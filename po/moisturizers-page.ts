import { expect, type Locator, type Page } from '@playwright/test';

export class MoisturizersPage {
  readonly page: Page;
  readonly priceElements: Locator;
  readonly almond: Locator;
  readonly aloe: Locator;

  constructor(page: Page) {
    this.page = page;
    this.priceElements = page.locator("//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), 'Almond') or contains(text(), 'Aloe')]/../p[2]");
    this.almond = page.locator("//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), 'Almond')]/../p[2]")
    this.aloe = page.locator("//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), 'Aloe')]/../p[2]")
}

  async addFilterredMoisturizers() {
    let chipestAloe = await this.getChipest("Aloe");
    let chipestAlmond = await this.getChipest("Almond");

    await this.page.locator(`//div[@class='container']//div[contains(@class, 'text-center')]//p[2][contains(text(), '${chipestAlmond}')]/../button`).click();
    await this.page.locator(`//div[@class='container']//div[contains(@class, 'text-center')]//p[2][contains(text(), '${chipestAloe}')]/../button`).click();
  }

  async getChipest(moisturizersType: string){
    let pricesAsString: string[] = [];
    let priceNumbers: number[] = [];

    for(let i = 0; i < 20; i++){
        const count = await this.page.locator(`//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), '${moisturizersType}')]/../p[2]`).count();
        if(count < 6){
            await this.page.waitForTimeout(500);
        }else {
            break;
        }
    }

    for(const elem of await this.page.locator(`//div[@class='container']//div[contains(@class, 'text-center')]//p[1][contains(text(), '${moisturizersType}')]/../p[2]`).all()){
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