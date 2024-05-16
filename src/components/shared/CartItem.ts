import { ComponentSelectors, ICartItem } from "../../types";
import { Component } from "../base/Component";

interface ICartListAction {
    onClick: (event: MouseEvent) => void;
}

export class CartListItem extends Component<ICartItem> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	
	constructor(container: HTMLElement, protected events: ICartListAction) {
		super(container);

		this._title = container.querySelector(`.${ComponentSelectors.CartItem}__title`) as HTMLElement;
		this._price = container.querySelector(`.${ComponentSelectors.CartItem}__price`) as HTMLElement;
		this._button = container.querySelector(`.${ComponentSelectors.CartItem}__button`) as HTMLButtonElement;

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