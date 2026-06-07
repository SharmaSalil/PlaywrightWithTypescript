import { test, expect } from '../fixtures/pagesFixtures';
import { BillingAddress } from '../interface/billingAddress';
import productsData from '../testData/products.json';
import taxOnOrderAmountFixed from '../testData/taxOnOrderAmountFixed.json'
import taxOnOrderAmountPercent from '../testData/taxOnOrderAmountPercent.json'
import validations from '../testData/validations.json'
import billingDetail from '../testData/billingDetail.json'


test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}`);
});

test('To verify that the subtotal and final price are correctly displayed in the checkout page after adding a product.', async ({ apiUtilities, page, context, productPrice, store, checkout, addToCartBuilder }) => {
    const productPrices = await productPrice.getProductPrices(`${process.env.BASE_URL}${process.env.API_STORE}`, apiUtilities, store, productsData.products);
    const cart = {
        products: productsData.products
    };

    const finalCalculatedSubTotalPrice = await checkout.calculateTotalAmount(productPrices, cart);
    const finalAmountCalculated = await checkout.calculateTotalAmountWithTax(taxOnOrderAmountFixed, taxOnOrderAmountPercent, finalCalculatedSubTotalPrice.total);
    await apiUtilities.addProductUsingApiAndInjectCookies(productsData.products, addToCartBuilder, apiUtilities, context);
    await page.goto(`${process.env.BASE_URL}${process.env.WEB_ADD_TO_CHECKOUT}`);

    expect.soft(await checkout.subTotalAmount_Txt_GetText()).toEqual(finalCalculatedSubTotalPrice.total)
    expect.soft(await checkout.finalTotalAmount_Txt_GetText()).toEqual(finalAmountCalculated)
});

test('To verify that an error message is shown when the user clicks Place Order without filling in the required form fields.', async ({ apiUtilities, page, context, checkout, addToCartBuilder }) => {
    await apiUtilities.addProductUsingApiAndInjectCookies(productsData.products, addToCartBuilder, apiUtilities, context);
    await page.goto(`${process.env.BASE_URL}${process.env.WEB_ADD_TO_CHECKOUT}`);
    await checkout.placeOrder_Btn_Click();

    expect(await checkout.checkForAllTheMandatoryChecks(validations.checkOutRequiredFields)).toBeTruthy();
});

test('To verify that after filling the required billing address fields, user is able to place an order.', async ({ apiUtilities, page, context, checkout, addToCartBuilder, orderConfirmationPage }) => {
    const data: BillingAddress = billingDetail;
    await apiUtilities.addProductUsingApiAndInjectCookies(productsData.products, addToCartBuilder, apiUtilities, context);
    await page.goto(`${process.env.BASE_URL}${process.env.WEB_ADD_TO_CHECKOUT}`);
    await checkout.fillBillingDetails(data);
    await checkout.placeOrder_Btn_Click();

    expect(await orderConfirmationPage.orderConfirmation_Txt_GetText()).toEqual('Thank you. Your order has been received.')
});