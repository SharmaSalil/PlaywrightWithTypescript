import * as cheerio from 'cheerio';
import { ApiUtilities } from './apiUtilities';
import { Store } from '../../objects/storePage';
import { Product } from '../../interface/product';

export class ProductPrice {

    async getProductPrices(storeUrl: string, apiUtilities: ApiUtilities, store: Store, products: Product[]) {

        const getResponse = await apiUtilities.getCall(storeUrl, {});
        const htmlResponse = await getResponse.text();

        const html = await cheerio.load(htmlResponse);

        const elementList = html(await store.productList_Lst_GetElement());

        const productPrices: Record<string, { name: string; price: string }> = {};

        for (const element of elementList) {

            const productName = html(element)
                .find(await store.productNames_Txt_GetElement())
                .text()
                .trim();

            const productId = html(element)
                .find(await store.productId_Txt_GetElement())
                .attr(await store.productIdClass_Txt_GetElement())
                ?.trim();

            const matchingProduct = products.find(
                product => product.product_id === productId
            );

            if (matchingProduct) {
                const productPrice = html(element)
                    .find(await store.product_Price_Txt_GetElement())
                    .text()
                    .replace('$', '')
                    .trim();

                // productPrices[productName] = productPrice;
                productPrices[productId!] = {
                    name: productName,
                    price: productPrice
                };
            }
        }

        return productPrices;
    }
}