import { OrderResponce } from "./api.types"

export enum ProductCategory {
    SoftSkill = 'софт-скил',
    HardSkill = 'хард-скил',
    Additional = 'дополнительное',
    Button = 'кнопка',
    Other = 'другое'
}

export type ProductItem = {
    id: string,
    title: string,
    image?: string,
    category?: ProductCategory,
    price: number | null,
    description?: string
}

export interface ProductCard {
    item: ProductItem,
    // если что, есть такой глагол - order (to order smth.)
    order: (request: ProductItem) => void,
    closeModal: () => void
}

export type BasketItem = Pick<ProductItem, 'id' | 'title' | 'price'>

export enum PaymentMethod {
    Offline = 'При получении',
    Online = 'Онлайн'
}

export type CustomerInfo = {
    paymentMethod: PaymentMethod,
    address: string,
    postalCode: string,
    telephoneNumber: string
}

export type FirstOrderStepInfo = Pick<CustomerInfo, 'postalCode' | 'telephoneNumber'>
export type SecondOrderStepInfo = Pick<CustomerInfo, 'paymentMethod' | 'address'>

export interface IOrderForm {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
}

export interface IOrder extends IOrderForm {
	items: BasketItem[];
	total: number;
}

export interface IBasketFrom {
    items: BasketItem[],
    total: number,
    order: (request: BasketItem[]) => void,
    closeModal: () => void
}

export interface IOrderConfirmed {
    message: string,
    closeModal: () => void
}

export interface IProductItem extends ProductItem {};

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface WebApi {
    getProductItem: (id: string) => Promise<ProductItem>;
    getProductsList: () => Promise<ProductItem[]>;
    orderProducts: (order: IOrder) => Promise<OrderResponce>;
}