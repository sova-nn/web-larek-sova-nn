import { Form } from './index';
import { AppStateEvents, ComponentSelectors, IOrderForm } from '../../types';
import { IEvents } from '../base/events';

export class Order extends Form<IOrderForm> {
    protected _buttons: HTMLButtonElement[];
	protected _orderButton: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._buttons = Array.from(container.querySelectorAll('.button_alt'));
		this._buttons.forEach((button) => {
			button.addEventListener('click', () => {
				this.payment = button.name;
				events.emit(AppStateEvents.OrderChange, { payment: button.name });
			});
		});

		this._orderButton = container.querySelector(`.${ComponentSelectors.Order}__button`);
		this._orderButton.addEventListener('click', () => {
			events.emit(AppStateEvents.ContactsOpen);
		});
	}

	set payment(name: string) {
		this._buttons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}