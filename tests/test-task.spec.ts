import { test, expect } from '@playwright/test';
import { LandingPage } from '../po/landing-page';
import { BuyGoodsHelper } from '../helpers/buy-goods-helper';
import { CheckoutPage } from '../po/checkout-page';

test('check buyMoisturizersBtn displayed on landing', async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.navigate();

  await expect(landingPage.buyMoisturizersBtn).toBeVisible();
});

test('check temperature exists', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const buyGoodsHelper = new BuyGoodsHelper(page);
    const checkoutPage = new CheckoutPage(page);

    await landingPage.navigate();
  
    await expect(landingPage.temperatureSpan).toBeVisible();

    let temperatureAsStr = await landingPage.temperatureSpan.innerText();
    let temperature: number = parseInt(temperatureAsStr);

    if(temperature < 19){
        await buyGoodsHelper.addTwoMoisturizersToCart();
    }else if(temperature > 34){
        await buyGoodsHelper.buySunscreens();
    }else {
        // todo!!! 
        console.log("your temperature is out of range");
    }

    await buyGoodsHelper.cart.click();
    await checkoutPage.payWithCartBtn.click();
    await checkoutPage.fillCardData();
    await checkoutPage.getPayBtn.click();
    await expect(checkoutPage.paymentSuccessfullHeader).toBeVisible();
});
