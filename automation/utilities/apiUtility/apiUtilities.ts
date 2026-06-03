import { APIRequestContext } from '@playwright/test';
import { AddToCartBuilder } from '../../builderPatternObjects/addToCartBuilder';

export class ApiUtilities {

    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async postCallUsingFormData(url: string, formData: Record<string, string>, headersData: Record<string, string>){
        return await this.apiContext.post(url, {
            form: formData,
            headers: headersData
        });
    }

    async getCall(url: string, headersData: Record<string, string>){
        return await this.apiContext.post(url, {
            headers: headersData
        });
    }

    async getStorageState() {
        return await this.apiContext.storageState();
    }

    async addProductUsingApiAndInjectCookies(products:any, addToCartBuilder:AddToCartBuilder, apiUtilities :ApiUtilities, context:any){
        for (const product of products) {
            const requestBody = addToCartBuilder.setCompleteData(product.product_id, product.quantity, product.product_sku)
            await apiUtilities.postCallUsingFormData(`${process.env.BASE_URL}${process.env.API_ADD_TO_CART}`, requestBody, {});
        }
    
        const storageState = await apiUtilities.getStorageState();
    
        await context.addCookies(
            storageState.cookies.map(cookie => ({
                name: cookie.name,
                value: cookie.value,
                domain: cookie.domain,
                path: cookie.path,
                expires: cookie.expires,
                httpOnly: cookie.httpOnly,
                secure: cookie.secure,
                sameSite: cookie.sameSite
            }))
        );
    }
}