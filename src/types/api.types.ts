import { ProductCategory } from "./ui.types";

export type Error = {
    message: string
};

export type OrderResponce = {
    id: string,
    total: number
};

export type GetProductItemResponce = {
    id: string,
    description: string,
    image: string,
    title: string,
    category: ProductCategory,
    price: number
};

type ProductItem = GetProductItemResponce;

export type GetProductListResponce = {
    total: number,
    items: ProductItem[]
};



