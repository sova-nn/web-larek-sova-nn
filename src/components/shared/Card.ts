import { Component } from "../base/Component";
import { ComponentSelectors, IProductItem, ProductCategory } from "../../types";
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
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${ComponentSelectors.CartItem}__title`, container);
		this._image = ensureElement<HTMLImageElement>(
			`.${ComponentSelectors.CartItem}__image`,
			container
		);
		this._description = container.querySelector(`.${ComponentSelectors.CartItem}__text`) ?? undefined;
		this._category = ensureElement<HTMLElement>(
			`.${ComponentSelectors.CartItem}__category`,
			container
		);
		this._price = ensureElement<HTMLElement>(`.${ComponentSelectors.CartItem}__price`, container);
		this._button = container.querySelector(`.${ComponentSelectors.CartItem}__button`);

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

	set category(value: ProductCategory) {
		this.setText(this._category, value);
		switch (value) {
			case ProductCategory.SoftSkill:
				this._category.classList.add('card__category_soft');
				break;
			case ProductCategory.HardSkill:
				this._category.classList.add('card__category_hard');
				break;
			case ProductCategory.Other:
				this._category.classList.add('card__category_other');
				break;
			case ProductCategory.Button:
				this._category.classList.add('card__category_button');
				break;
			case ProductCategory.Additional:
				this._category.classList.add('card__category_additional');
				break;
		}
	}

	get category(): ProductCategory {
		return this._category.textContent as ProductCategory;
	}

}

export class CatalogItem extends ProductCard {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
	}	
}
