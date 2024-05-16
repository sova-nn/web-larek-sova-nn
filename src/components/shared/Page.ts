import { AppStateEvents } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

import { IEvents } from "../base/events";

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	blocked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit(AppStateEvents.CartOpen);
		});
	}

    set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set counter(counter: number) {
		this.setText(this._counter, counter.toString());
	}

	get counter(): number {
		return +this._counter.textContent;
	}

	set blocked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}