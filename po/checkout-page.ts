

import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly payWithCartBtn: Locator;
  readonly getPayBtn: Locator;
  readonly paymentSuccessfullHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payWithCartBtn = page.locator("//button[@type='submit']");
    this.getPayBtn = page.frameLocator("//iframe[@name='stripe_checkout_app']").locator("//span[contains(text(), 'Pay')][@class='iconTick']");
    this.paymentSuccessfullHeader = page.locator("//h2[text()='PAYMENT SUCCESS']");
  }

  async fillCardData() {
    const username = await this.page.frameLocator("//iframe[@name='stripe_checkout_app']").locator("//input[@id='email']");
    await username.pressSequentially('test1231230091@gmail.com');
    
    const cardNum = await this.page.frameLocator("//iframe[@name='stripe_checkout_app']").locator("//input[@id='card_number']");
    await cardNum.pressSequentially('4242424242424242 ');
    const expDate = await this.page.frameLocator("//iframe[@name='stripe_checkout_app']").locator("//input[@id='cc-exp']");
    await expDate.pressSequentially('1231');
    const cvv = await this.page.frameLocator("//iframe[@name='stripe_checkout_app']").locator("//input[@id='cc-csc']");
    await cvv.pressSequentially('123');
    const zip = await this.page.frameLocator("//iframe[@name='stripe_checkout_app']").locator("//input[@id='billing-zip']");
    await zip.pressSequentially('07443');
  }
}