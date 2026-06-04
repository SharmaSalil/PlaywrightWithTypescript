import { Page } from '@playwright/test';
import { BillingAddress } from '../interface/billingAddress';

export class Checkout {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private readonly subTotalAmount_Txt = (): string => `//tr[@class='cart-subtotal']//bdi`;
    private readonly finalTotalAmount_Txt = (): string => `//tr[@class='order-total']//bdi`;
    private readonly placeOrder_Btn = (): string => `//button[text()='Place order']`;
    private readonly mandatoryFieldsEmptyChecks_Txt_List = (): string => `//ul[@class='woocommerce-error']//li`
    private readonly billingFirstName_Txt = (): string => `#billing_first_name`;
    private readonly billingLastName_Txt = (): string => `#billing_last_name`;
    private readonly billingAddressOne_Txt = (): string => `#billing_address_1`;
    private readonly billingCity_Txt = (): string => `#billing_city`;
    private readonly billingPostCode_Txt = (): string => `#billing_postcode`;
    private readonly billingEmail_Txt = (): string => `#billing_email`;
    private readonly billingCountry_DrpDwn = (): string => `#select2-billing_country-container`;
    private readonly dropdownOptionsInput_TxtFld = (): string => `//input[@class='select2-search__field']`;
    private readonly dropdownOptionsSpecificOption_Txt = (optionText: string): string => `//li[contains(@class,'select2-results__option') and text()='${optionText}']`;
    private readonly billingState_DrpDwn = (): string => `#select2-billing_state-container`;
    private readonly header_Txt = (): string => `//h1[@class='has-text-align-center']`;

    async header_Txt_GetText() {
        const headerTxtElement = this.page.locator(this.header_Txt());
        await headerTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        return (await headerTxtElement.textContent())?.trim();
    }

    async fillBillingDetails(data: BillingAddress) {
        await this.billingFirstName_Txt_Fill(data.billingFirstName);
        await this.billingLastName_Txt_Fill(data.billingLastName);
        await this.billingCountrySelect(data.billingCountry);
        await this.billingAddressOne_Txt_Fill(data.billingAddressOne);
        await this.billingCity_Txt_Fill(data.billingCity);
        await this.billingStateSelect(data.billingState);
        await this.billingPostCode_Txt_Fill(data.billingPostCode);
        await this.billingEmail_Txt_Fill(data.billingEmail);
    }

    async billingStateSelect(billingState: string) {
        await this.billingState_DrpDwn_Click();
        await this.dropdownOptionsInput_TxtFld_Fill(billingState);
        await this.dropdownOptionsSpecificOption_Txt_Click(billingState);
    }

    async billingState_DrpDwn_Click() {
        const billingStateDrpDwnElement = this.page.locator(this.billingState_DrpDwn());
        await billingStateDrpDwnElement.waitFor({ state: 'visible', timeout: 15000 });
        await billingStateDrpDwnElement.click();
    }

    async billingCountrySelect(billingCountry: string) {
        await this.billingCountry_DrpDwn_Click();
        await this.dropdownOptionsInput_TxtFld_Fill(billingCountry);
        await this.dropdownOptionsSpecificOption_Txt_Click(billingCountry);
    }

    async dropdownOptionsSpecificOption_Txt_Click(optionText: string) {
        const dropdownOptionsSpecificOptionTxtElement = this.page.locator(this.dropdownOptionsSpecificOption_Txt(optionText));
        await dropdownOptionsSpecificOptionTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        await dropdownOptionsSpecificOptionTxtElement.click();
    }

    async dropdownOptionsInput_TxtFld_Fill(dropDownInput: string) {
        const dropdownOptionsInputTxtFldElement = this.page.locator(this.dropdownOptionsInput_TxtFld());
        await dropdownOptionsInputTxtFldElement.waitFor({ state: 'visible', timeout: 15000 });
        await dropdownOptionsInputTxtFldElement.clear();
        await dropdownOptionsInputTxtFldElement.fill(dropDownInput);
    }

    async billingCountry_DrpDwn_Click() {
        const billingCountryDrpDwnElement = this.page.locator(this.billingCountry_DrpDwn());
        await billingCountryDrpDwnElement.waitFor({ state: 'visible', timeout: 15000 });
        await billingCountryDrpDwnElement.click();
    }

    async billingEmail_Txt_Fill(billingEmail: string) {
        const billingEmailTxtElement = this.page.locator(this.billingEmail_Txt());
        await billingEmailTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        await billingEmailTxtElement.clear();
        await billingEmailTxtElement.fill(billingEmail);
    }

    async billingPostCode_Txt_Fill(billingPostCode: string) {
        const billingPostCodeTxtElement = this.page.locator(this.billingPostCode_Txt());
        await billingPostCodeTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        await billingPostCodeTxtElement.clear();
        await billingPostCodeTxtElement.fill(billingPostCode);
    }

    async billingCity_Txt_Fill(billingCity: string) {
        const billingCityTxtElement = this.page.locator(this.billingCity_Txt());
        await billingCityTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        await billingCityTxtElement.clear();
        await billingCityTxtElement.fill(billingCity);
    }

    async billingAddressOne_Txt_Fill(billingAddress: string) {
        const billingAddressOneTxtElement = this.page.locator(this.billingAddressOne_Txt());
        await billingAddressOneTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        await billingAddressOneTxtElement.clear();
        await billingAddressOneTxtElement.fill(billingAddress);
    }

    async billingLastName_Txt_Fill(billingLastName: string) {
        const billingLastNameTxtElement = this.page.locator(this.billingLastName_Txt());
        await billingLastNameTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        await billingLastNameTxtElement.clear();
        await billingLastNameTxtElement.fill(billingLastName);
    }

    async billingFirstName_Txt_Fill(billingFirstName: string) {
        const billingFirstNameTxtElement = this.page.locator(this.billingFirstName_Txt());
        await billingFirstNameTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        await billingFirstNameTxtElement.clear();
        await billingFirstNameTxtElement.fill(billingFirstName);
    }

    async checkForAllTheMandatoryChecks(validationsList: any) {
        const mandatoryCheckValues = await this.mandatoryFieldsEmptyChecks_Txt_List_GetAllText();
        for (const singleValidation of validationsList) if (!mandatoryCheckValues.includes(singleValidation)) return false;
        return true;
    }

    async mandatoryFieldsEmptyChecks_Txt_List_GetAllText() {
        const mandatoryFieldsEmptyChecksTxtListElement = this.page.locator(this.mandatoryFieldsEmptyChecks_Txt_List());
        await mandatoryFieldsEmptyChecksTxtListElement.first().waitFor({ state: 'visible', timeout: 15000 });
        return (await mandatoryFieldsEmptyChecksTxtListElement.allTextContents()).map(value => value.trim());
    }

    async placeOrder_Btn_Click() {
        const placeOrderBtnElement = this.page.locator(this.placeOrder_Btn());
        await placeOrderBtnElement.waitFor({ state: 'visible', timeout: 15000 });
        await placeOrderBtnElement.click();
    }

    async finalTotalAmount_Txt_GetText() {
        const finalTotalAmountTxtElement = this.page.locator(this.finalTotalAmount_Txt());
        await finalTotalAmountTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        return (await finalTotalAmountTxtElement.textContent())?.trim().replace('$', '');
    }

    async subTotalAmount_Txt_GetText() {
        const subTotalAmountTxtElement = this.page.locator(this.subTotalAmount_Txt());
        await subTotalAmountTxtElement.waitFor({ state: 'visible', timeout: 15000 });
        return (await subTotalAmountTxtElement.textContent())?.trim().replace('$', '');
    }

    async calculateTotalAmount(
        priceData: Record<string, { name: string; price: string }>,
        cart: { products: { product_id: string; quantity: string }[] }) {

        let totalAmount = 0;

        const breakdown: Record<string, any> = {};

        for (const item of cart.products) {
            const productId = item.product_id;
            const quantity = Number(item.quantity);
            const productInfo = priceData[productId];

            if (!productInfo) continue;

            const price = Number(productInfo.price);
            const subtotal = price * quantity;
            totalAmount += subtotal;
            breakdown[productId] = {
                name: productInfo.name,
                price: productInfo.price,
                quantity,
                subtotal: subtotal
            };
        }

        return {
            total: totalAmount.toFixed(2),
            breakdown
        };
    }

    async calculateTotalAmountWithTax(taxAmountValuesFixed: any, taxAmountValuesPercent: any, calculatedSubTotal: string) {
        let value = taxAmountValuesFixed;
        let finalAmount = Number(calculatedSubTotal)
        for (const taxAmount of Object.values(value)) {
            finalAmount = finalAmount + Number(taxAmount)
        }

        value = taxAmountValuesPercent;
        for (const taxAmount of Object.values(value)) {
            finalAmount = finalAmount + (finalAmount * (Number(taxAmount) / 100));
        }
        return finalAmount.toFixed(2);
    }
}