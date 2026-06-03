import { expect, type Page } from '@playwright/test';

export class MarketPlacePage {

    private readonly page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    private readonly search_TxtBx = (): string => `woocommerce-product-search-field-0"`;
    private readonly search_Btn = (): string => `button[value='Search']`;

    async search_TxtBx_SendKeys(searchValue: string) {
        const search_TxtBx = this.page.locator(this.search_TxtBx());
        await search_TxtBx.waitFor({ state: 'visible', timeout: 15000 });
        await search_TxtBx.clear();
        await search_TxtBx.fill(searchValue);
    }

    async search_Btn_Click() {
        const search_Btn = this.page.locator(this.search_Btn());
        await search_Btn.waitFor({ state: 'visible', timeout: 15000 });
        await search_Btn.click();
    }
}