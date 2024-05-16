import { AppStateEvents, CartItem, ComponentSelectors, ICart, ICartItem } from "../../types";
import { cloneTemplate, createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";

export class Cart extends Component<ICart> {
    protected _list: HTMLElement;
	protected _totalElement: HTMLElement;
	protected _button: HTMLButtonElement;

	protected _totalPrice = 0;
	protected _cartIds: string[] = [];
	// protected _cartItems: string[] = [];

	// get total(): number {
	// 	return this._totalPrice;
	// }

	// set total(value: number) {
	// 	this._totalPrice = value;
	// }

	private getTotalPriceString(value: number): string {
		return `${value} синапсов`;
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this._button.disabled = false;
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this._button.disabled = true;
		}
	}

	set total(total: number) {
		this.setText(this._totalElement, total + ' синапсов');
		if (this._button && !total) {
			this._button.disabled = true;
		}
	}

	// set cartItems(items: CartItem[]) {
	// 	const cartItemsList = items.map((item) => {
	// 		this.total += item.price;
	// 		return this.renderCartItem(item);
	// 	});
	// 	this._list.replaceChildren(...cartItemsList);

	// 	this._button?.removeAttribute('disabled');
	// 	this.changeTotalElem();
	// }

	changeTotalElem() {
		this._totalElement.textContent = this.getTotalPriceString(this.total);

		if (!this.total) {
			this._button?.setAttribute('disabled', 'disabled');
		}
	}

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = this.container.querySelector(`.${ComponentSelectors.Cart}__list`);
		this._totalElement = this.container.querySelector(`.${ComponentSelectors.Cart}__price`);
		this._button = this.container.querySelector(`.${ComponentSelectors.Cart}__button`);

		this._button?.setAttribute('disabled', 'disabled');

		this._button?.addEventListener('click', () => {
			events.emit(AppStateEvents.OrderOpen);
			console.log(AppStateEvents.OrderOpen);
		});
	}

	getCartIds(): string[] {
		return this._cartIds;
	}

	// я хотела попробовать рендер одного компонента внутри другого
	// это не противоречит ооп, но я уберу рендер в index.ts, если это необходимо
	// private renderCartItem(item: CartItem): HTMLElement {
	// 	const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
	// 	const basketItem = new CartListItem(
	// 		cloneTemplate(cardBasketTemplate), {
	// 			// удаление карточки
	// 			onClick: () => {
	// 				this._cartIds = this._cartIds.filter((itemId) => {
	// 					if (itemId !== item.id) {
	// 						return true;
	// 					}
	// 					return false;
	// 				});
	// 				this.total -= item.price;
	// 				this.changeTotalElem();

	// 				this.events.emit(AppStateEvents.CartDelete);
	// 			},
	// 		}
	// 	);
	// 	return basketItem.render({
	// 		title: item.title,
	// 		price: item.price
	// 	});
	// }
}