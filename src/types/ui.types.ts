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

export interface Basket {
    items: BasketItem[],
    total: number,
    order: (request: BasketItem[]) => void,
    closeModal: () => void
}

export interface Order {
    items: BasketItem[],
    confirmOrder: (request: BasketItem[] & CustomerInfo) => void,
    closeModal: () => void
}

export interface OrderConfirmed {
    message: string,
    closeModal: () => void
}