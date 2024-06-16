import { expect, type Locator, type Page } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly buySunscreensBtn: Locator;
  readonly buyMoisturizersBtn: Locator;
  readonly temperatureSpan: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buySunscreensBtn = page.locator("//button[contains(text(), 'Buy sunscreens')]");
    this.buyMoisturizersBtn = page.locator("//button[contains(text(), 'Buy moisturizers')]");
    this.temperatureSpan = page.locator("//span[@id='temperature']");
  }

  async navigate() {
    await this.page.goto("https://weathershopper.pythonanywhere.com");
  }
}