import { Page } from '@playwright/test'

export class OrderConfirmationPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private readonly orderConfirmation_Txt = (): string => `.woocommerce-notice`;

    async orderConfirmation_Txt_GetText() {
        const orderConfirmation_TxtElement = this.page.locator(this.orderConfirmation_Txt());
        await orderConfirmation_TxtElement.waitFor({ state: 'visible', timeout: 15000 });
        return (await orderConfirmation_TxtElement.textContent())?.trim();
    }
}