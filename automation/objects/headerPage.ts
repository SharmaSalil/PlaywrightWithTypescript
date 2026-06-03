import { Page } from '@playwright/test';

export class HeaderPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private readonly store_TxtLnk = (): string =>
        "//div[@id='ast-desktop-header']//a[normalize-space(text())='Store']";

    async store_TxtLnk_Click() {
        const storeLink = this.page.locator(this.store_TxtLnk());
        await storeLink.waitFor({ state: 'visible', timeout: 15000 });
        await storeLink.click();
    }
}