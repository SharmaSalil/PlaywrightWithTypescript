import { test, expect } from '../fixtures/pagesFixtures';
import productsData from '../testData/products.json';
import taxOnOrderAmountFixed from '../testData/taxOnOrderAmountFixed.json'
import taxOnOrderAmountPercent from '../testData/taxOnOrderAmountPercent.json'

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
});

test('To verify the sub price visible in the cart after adding a product in the cart', async ({ apiUtilities, page, context, productPrice, store, checkout, addToCartBuilder }) => {
    const productPrices = await productPrice.getProductPrices(`${process.env.BASE_URL}${process.env.API_STORE}`, apiUtilities, store, productsData.products);
    const cart = {
        products: productsData.products
    };

    const finalCalculatedSubTotalPrice = await checkout.calculateTotalAmount(productPrices, cart);
    const finalAmountCalculated = await checkout.calculateTotalAmountWithTax(taxOnOrderAmountFixed, taxOnOrderAmountPercent, finalCalculatedSubTotalPrice.total);
    await apiUtilities.addProductUsingApiAndInjectCookies(productsData.products, addToCartBuilder, apiUtilities, context);
    await page.goto(`${process.env.BASE_URL}${process.env.WEB_ADD_TO_CART}`);
    const webSubTotal = await checkout.subTotalAmount_Txt_GetText();
    const webFinalAmount = await checkout.finalTotalAmount_Txt_GetText();

    expect.soft(webSubTotal).toEqual(finalCalculatedSubTotalPrice.total)
    expect.soft(webFinalAmount).toEqual(finalAmountCalculated)
});

test('To verify the user get landed on the checkout page after clicking on the proceed to checkout', async ({ apiUtilities, page, context, cart, addToCartBuilder, checkout }) => {
    await apiUtilities.addProductUsingApiAndInjectCookies(productsData.products, addToCartBuilder, apiUtilities, context);
    await page.goto(`${process.env.BASE_URL}${process.env.WEB_ADD_TO_CART}`);
    await cart.proceedToCheckout_Btn_Click();
    const checkoutHeader = await checkout.header_Txt_GetText();

    expect(checkoutHeader).toEqual("Checkout")
});