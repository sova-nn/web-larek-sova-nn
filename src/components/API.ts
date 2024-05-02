import {  } from "../types/ui.types";
import { ProductItem } from "../types/index";
import { Api } from "./base/api";

export class WebLarekApi extends Api{
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(id: string): Promise<ProductItem> {
        return this.get(`/product/${id}`).then(
            (data: ProductItem) => ({
                ...data,
                image: this.cdn + data.image
            })
        );
    }
}