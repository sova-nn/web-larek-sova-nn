import { Form } from './index';
import { ComponentSelectors, IOrderForm } from '../../types';
import { IEvents } from '../base/events';

export class Contacts extends Form<IOrderForm> {
    protected _orderButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._orderButton = container.querySelector(`.${ComponentSelectors.Order}__button`);
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    validatePhoneNumber(input: string): boolean {
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return regex.test(input);
    }

    validateEmail(input: string): boolean {
        const regex =  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return regex.test(input);
    }
}