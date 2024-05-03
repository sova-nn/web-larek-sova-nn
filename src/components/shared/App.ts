import { FormErrors, IAppState, IOrder, PaymentMethod, ProductCategory, ProductItem } from "../../types";
import { Model } from '../../components/base/Model';

export class Product extends Model<ProductItem> {
	id: string;
    title: string;
    image?: string;
    category?: ProductCategory;
    price: number | null;
    description?: string;
}

export class App extends Model<IAppState> {
    catalog: ProductItem[];
	cart: string[];
	cardId: string;
	order: IOrder = {
		payment: PaymentMethod.Online,
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	formErrors: FormErrors = {};

    setCatalog(items: ProductItem[]): void {
        this.catalog = items.map((item) => new Product(item, this.events));
        this.emitEvent('products: change', { catalog: this.catalog });
    }
}