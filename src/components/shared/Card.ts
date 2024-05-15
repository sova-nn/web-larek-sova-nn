import { Component } from "../base/Component";
import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class ProductCard extends Component<IProductItem> {
    protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;


    constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);
		this._description = container.querySelector(`.${blockName}__text`) ?? undefined;
		this._category = ensureElement<HTMLElement>(
			`.${blockName}__category`,
			container
		);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._button = container.querySelector(`.${blockName}__button`);

		if (actions?.onClick) {
			container.addEventListener('click', actions.onClick);
		}
	}

    set image(value: string) {
		this.setImage(this._image, value, 'Картинка товара: ' + this._title);
	}

    set title(value: string) {
		this.setText(this._title, value);
	}

    set id(value: string) {
		this.container.dataset.id = value;
	}

    set selected(value: boolean) {
        this._button.disabled = !this._button.disabled ? value : this._button.disabled;
	}

    set description(value: string) {
		this.setText(this._description, value);
	}

    set price(value: string) {
        const price = value === null ? 'Бесценно' : value + ' синапсов';
		this.setText(this._price, price);
        
		if (!this._button) {
			return;
		}
        this._button.disabled = !value;
	}

}

export class CatalogItem extends ProductCard {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
	}	
}
