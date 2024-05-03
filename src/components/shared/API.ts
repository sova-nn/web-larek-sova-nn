import { IOrder } from "../../types/ui.types";
import { GetProductListResponce, OrderResponce, ProductItem, WebApi } from "../../types";
import { Api } from "../base/api";

export class WebLarekApi extends Api implements WebApi{
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

    getProductsList(): Promise<ProductItem[]> {
        return this.get('/product').then(
            (data: GetProductListResponce) => data.items.map((item) =>({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    orderProducts(order: IOrder): Promise<OrderResponce> {
		return this.post('/order', order).then((data: OrderResponce) => data);
	}
}