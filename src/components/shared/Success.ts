import { Component } from "../base/Component";
import { AppStateEvents, ComponentSelectors, ISuccess } from "../../types";
import { EventEmitter } from "../base/events";

export class Success extends Component<ISuccess> {
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;

	constructor( 
        container: HTMLElement,
		protected events: EventEmitter
	) {
		super(container);

        // querySelector может возвращать null, не очень поняла, как это обойти без 'as'
		this._button = container.querySelector(`.${ComponentSelectors.OrderSuccess}__close`) as HTMLButtonElement;
		this._description = container.querySelector(`.${ComponentSelectors.OrderSuccess}__description`) as HTMLElement;

		this._button?.addEventListener('click', () => {
			events.emit(AppStateEvents.SuccessClose);
		});
	}

	set total(value: number) {
		this.setText(this._description, 'Списано ' + value + ' синапсов');
	}
}