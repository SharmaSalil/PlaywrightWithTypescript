import { Page } from '@playwright/test'

export class Store {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private readonly productList_Lst = (): string => `li.product`;
    private readonly productNames_Txt = (): string => `h2.woocommerce-loop-product__title`;
    private readonly productId_Txt = (): string => `a[data-product_id]`;
    private readonly productIdClass_Txt = (): string => `data-product_id`;
    private readonly product_Price_Txt = (): string => `.woocommerce-Price-amount bdi`;

    async productList_Lst_GetElement() {
        return await this.productList_Lst();
    }

    async productNames_Txt_GetElement() {
        return await this.productNames_Txt();
    }

    async productId_Txt_GetElement() {
        return await this.productId_Txt();
    }

    async productIdClass_Txt_GetElement() {
        return await this.productIdClass_Txt();
    }

    async product_Price_Txt_GetElement() {
        return await this.product_Price_Txt();
    }
}