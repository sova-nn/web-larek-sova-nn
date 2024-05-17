import { AppStateEvents, IFormState } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			events.emit(AppStateEvents.OrderChange, {field, value});
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(AppStateEvents.FormSubmit, {name: this.container.name});
		});
    }

    render(state: Partial<T> & IFormState) {
		const { isValid, errorsMsgs, ...inputs } = state;
		super.render({ isValid, errorsMsgs });
		Object.assign(this, inputs);
		return this.container;
	}

	flushForm(): void {
		this.valid = false;
	}
}