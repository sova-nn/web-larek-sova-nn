import {IOrder, ProductItem} from './ui.types';

export interface IAppState {
	catalog: ProductItem[];
	basket: string[];
	preview: string | null;
	order: IOrder | null;
}

export interface IFormState {
	isValid: boolean;
	errorsMsgs: string[];	
}


export enum AppStateEvents {
	// События Карточки товара
	CardPreviewOpen = 'card: preview',
	// События Списка товаров
	ProductsListChange = 'products: change',
	// События Корзины
	CartChange = 'cart: change',
	CartOpen = 'cart: open',
	CartDelete = 'cart: delete',
	// События формы заказа
	OrderOpen = 'order: open',
	OrderChange = 'order: change',
	ContactsOpen = 'contacts: open',
	SuccessClose = 'success: close',
	// События модалки
	ModalOpen = 'modal: open',
	ModalClose = 'modal: close',
	// События формы
	FormSubmit = 'form: submit'
}