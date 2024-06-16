import { test, expect, Page, Locator } from '@playwright/test';
import { LandingPage } from '../po/landing-page';
import { ScreenPage } from '../po/sunscreen-page';
import { MoisturizersPage } from '../po/moisturizers-page';

export class BuyGoodsHelper {
    readonly page: Page;
    readonly landingPage: LandingPage;
    readonly screenPage: ScreenPage;
    readonly moisturizersPage: MoisturizersPage;
    readonly cart: Locator;

    //*[@id='cart']/..

    constructor(page : Page) {
        this.page = page;
        this.landingPage = new LandingPage(page);
        this.screenPage = new ScreenPage(page);
        this.moisturizersPage = new MoisturizersPage(page);
        this.cart = this.page.locator("//*[@id='cart']/..");
    }

    async addTwoMoisturizersToCart() {
        await this.landingPage.buyMoisturizersBtn.click();
        await this.moisturizersPage.addFilterredMoisturizers();
    }

    async buySunscreens() {
        await this.landingPage.buySunscreensBtn.click();
        await this.screenPage.addFilterredSunScreens();
    }


}

    