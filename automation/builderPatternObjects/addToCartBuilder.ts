export class AddToCartBuilder {

    private request = {
        product_sku: '',
        product_id: '',
        quantity: ''
    };

    private setProductId(productId: string) {
        this.request.product_id = productId;
        return this;
    }

    private setQuantity(quantity: string) {
        this.request.quantity = quantity;
        return this;
    }

    private setProductSku(quantity: string) {
        this.request.product_sku = quantity;
        return this;
    }

    private build() {
        return this.request;
    }

    setCompleteData(product_id: string, quantity: string, product_sku: string) {
        return new AddToCartBuilder().
            setProductId(product_id)
            .setQuantity(quantity)
            .setProductSku(product_sku)
            .build();
    }

}