import { AppStateEvents, CartItem, ComponentSelectors, ICart, ICartItem } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/events";

interface ICartListAction {
    onClick: (event: MouseEvent) => void;
}

export class Cart extends Component<ICart> {
    protected _list: HTMLElement;
	protected _totalElement: HTMLElement;
	protected _button: HTMLButtonElement;

	protected _totalPrice = 0;
	protected _cartIds: string[] = [];
	protected _cartItems: string[] = [];

	get total(): number {
		return this._totalPrice;
	}

	set total(value: number) {
		this._totalPrice = value;
	}

	private getTotalPriceString(value: number): string {
		return `${value} синапсов`;
	}

	set cartItems(items: CartItem[]) {
		let totalPrice = 0;

		const cartItemsList = items.map((item) => {
			this.total += item.price;
			return this.renderCartItem(item);
		});
		this._list.replaceChildren(...cartItemsList);

		this._button?.removeAttribute('disabled');
		this.changeTotalElem();
	}

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
	private renderCartItem(item: CartItem): HTMLElement {
		const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
		const basketItem = new CartListItem(
			cloneTemplate(cardBasketTemplate), {
				// удаление карточки
				onClick: () => {
					this._cartIds = this._cartIds.filter((itemId) => {
						if (itemId !== item.id) {
							return true;
						}
						return false;
					});
					this.total -= item.price;
					this.changeTotalElem();

					this.events.emit(AppStateEvents.CartDelete);
				},
			}
		);
		return basketItem.render({
			title: item.title,
			price: item.price
		});
	}
}

export class CartListItem extends Component<ICartItem> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	
	constructor(container: HTMLElement, protected events?: ICartListAction) {
		super(container);

		this._title = container.querySelector(`.${ComponentSelectors.CartItem}__title`);
		this._price = container.querySelector(`.${ComponentSelectors.CartItem}__price`);
		this._button = container.querySelector(`.${ComponentSelectors.CartItem}__button`);

		if (this._button) {
			// для кнопки единственный вариант - удаление карточки, поэтому не эмитим доп событие
			this._button.addEventListener('click', (e) => {
				this.container.remove();
				this.events.onClick(e);
			});
		}
	}

	set title(value: string) {
		this._title.textContent = value;
	}

	set price(value: number) {
		this._price.textContent = `${value.toString()} синапсов`;
	}
}