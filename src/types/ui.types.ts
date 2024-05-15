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
    description?: string,
    selected?: boolean
}

export type CartItem = Pick<ProductItem, 'id' | 'title' | 'price'>

export interface ICartItem extends CartItem {};

export enum PaymentMethod {
    Cash = 'cash',
    Card = 'card'
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
	items: string[];
	total: number;
}

export interface ICart {
    items: CartItem[],
    total: number
}

export interface IOrderConfirmed {
    message: string,
    closeModal: () => void
}

export interface ISuccess {
	total: number;
}

export interface IProductItem extends ProductItem {};

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface WebApi {
    getProductItem: (id: string) => Promise<ProductItem>;
    getProductsList: () => Promise<ProductItem[]>;
    orderProducts: (order: IOrder) => Promise<OrderResponce>;
}

export interface IModalData {
    data: HTMLElement
}

export enum ComponentSelectors {
    OrderSuccess = 'order-success',
    Cart = 'basket',
    CartItem = 'card',
    Order = 'order'
};