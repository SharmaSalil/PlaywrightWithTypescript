import { test as base, expect, request, APIRequestContext } from '@playwright/test';
import { HeaderPage } from '../objects/headerPage';
import { ApiUtilities } from '../utilities/apiUtility/apiUtilities';
import { ProductPrice } from '../utilities/apiUtility/productPrice';
import { Store } from '../objects/storePage';
import { Checkout } from '../objects/checkoutPage';
import { Cart } from '../objects/cartPage';
import { AddToCartBuilder } from '../builderPatternObjects/addToCartBuilder';
import { OrderConfirmationPage } from '../objects/orderConfirmationPage'
import * as dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.ENV || 'prod';

dotenv.config({
    path: path.resolve(`./automation/configFile/.env.${ENV}`)
});

type MyFixtures = {
    headerPage: HeaderPage;
    apiUtilities: ApiUtilities;
    productPrice: ProductPrice;
    store: Store;
    checkout:Checkout;
    addToCartBuilder:AddToCartBuilder;
    orderConfirmationPage:OrderConfirmationPage;
    cart:Cart;
};

export const test = base.extend<MyFixtures>({

    headerPage: async ({ page }, use) => {
        const headerPage = new HeaderPage(page);
        await use(headerPage);
    },

    checkout: async ({ page }, use) => {
        const checkout = new Checkout(page);
        await use(checkout);
    },

    cart: async ({ page }, use) => {
        const cart = new Cart(page);
        await use(cart);
    },

    orderConfirmationPage: async ({ page }, use) => {
        const orderConfirmationPage = new OrderConfirmationPage(page);
        await use(orderConfirmationPage);
    },

    store: async ({ page }, use) => {
        const store = new Store(page);
        await use(store);
    },

    apiUtilities: async ({ }, use) => {
        const apiContext: APIRequestContext =
            await request.newContext();

        const apiUtilities =
            new ApiUtilities(apiContext);

        await use(apiUtilities);

        await apiContext.dispose();
    },

    productPrice: async ({ }, use) => {
        const productPrice = new ProductPrice();
        await use(productPrice);
    },

    addToCartBuilder: async ({ }, use) => {
        const addToCartBuilder = new AddToCartBuilder();
        await use(addToCartBuilder);
    },
});

export { expect };