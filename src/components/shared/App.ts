import { AppStateEvents, CartItem, FormErrors, IAppState, IOrder, PaymentMethod, ProductCategory, ProductItem } from "../../types";
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
	order: IOrder = {
		payment: PaymentMethod.Card,
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	formErrors: FormErrors = {};

    setCatalog(items: ProductItem[]): void {
        this.catalog = items.map((item) => new Product(item, this.events));
        this.emitEvent(AppStateEvents.ProductsListChange, { catalog: this.catalog });
    }

    get cartItemsList(): CartItem[] {
        return this.order.items.map((id) => {
            const item = this.catalog.find((it) => it.id === id);
            return {
                id: item.id,
                title: item.title,
                price: item.price
            };
        });
    }

    updateCartItemList(ids: string[]) {
        this.order.items = [...ids];
        this.updateTotalSum();
    }

	addToCart(id: string): void {
        if (this.order.items.includes(id)) {
            return;
        }

        this.order.items.push(id);
        this.updateTotalSum();
    }

    private updateTotalSum(): void {
        this.order.total = this.order.items.reduce((sum, id) => {
            const item = this.catalog.find((it) => it.id === id);
            return sum += item.price;
        }, 0);
        console.log('total', this.order.total);
    }

    updatePayment(payment: PaymentMethod): void {
        this.order.payment = payment;
    }

    updateAddress(address: string): void {
        this.order.address = address;
    }

    updatePhone(phone: string): void {
        this.order.phone = phone;
    }

    updateEmail(email: string): void {
        this.order.email = email;
    }

    flushCart(): void {
        this.order = {
            payment: PaymentMethod.Card,
            address: '',
            email: '',
            phone: '',
            total: 0,
            items: []
        };
    }
}