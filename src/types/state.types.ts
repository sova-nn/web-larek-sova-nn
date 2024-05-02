import {ProductItem, IOrder} from './ui.types';

export interface IAppState {
	catalog: ProductItem[];
	basket: string[];
	preview: string | null;
	order: IOrder | null;
}