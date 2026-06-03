import { Page } from '@playwright/test';

export class Cart {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private readonly proceedToCheckout_Btn = (): string => `//a[normalize-space(text())='Proceed to checkout']`;

    async proceedToCheckout_Btn_Click() {
        const proceedToCheckoutBtnElement = this.page.locator(this.proceedToCheckout_Btn());
        await proceedToCheckoutBtnElement.waitFor({ state: 'visible', timeout: 15000 });
        await proceedToCheckoutBtnElement.click();
    }
}