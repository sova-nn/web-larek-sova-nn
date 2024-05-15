import { Component } from '../base/Component';
import { AppStateEvents, IModalData } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<IModalData> {
    protected _data: HTMLElement;
    protected _closeBtn: HTMLButtonElement;

    set data(value: HTMLElement) {
		this._data.replaceChildren(value);
	}

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeBtn = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._closeBtn.addEventListener('click', (event) => event.stopPropagation());
		this._closeBtn.addEventListener('click', this.close.bind(this));
		this._data = ensureElement<HTMLElement>('.modal__content', container);
		this._data.addEventListener('click', (event) => event.stopPropagation());
		this.container.addEventListener('click', this.close.bind(this));
    }

    open(): void {
		this.container.classList.add('modal_active');
	}

	close(): void {
		console.log('close modal from modal');
		this.container.classList.remove('modal_active');
		this.data = null!;
		this.events.emit(AppStateEvents.ModalClose);
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}