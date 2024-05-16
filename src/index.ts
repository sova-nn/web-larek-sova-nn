import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CDN_URL, API_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { App, WebLarekApi, Page, CatalogItem, Modal, Order, Cart, Success, CartListItem } from './components/shared';
import { AppStateEvents, CartItem, IOrder, PaymentMethod, ProductItem } from './types';
// я не поняла, почему webpack ругается, если этот компонент импортировать из shared :(
import { Contacts } from './components/shared/Contacts';

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);
const appData = new App({}, events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const order = new Order(cloneTemplate(orderTemplate), events);
const basket = new Cart(cloneTemplate(basketTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

events.on(AppStateEvents.ProductsListChange, () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit(AppStateEvents.CardPreviewOpen, item),
		});

		return card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
});

events.on(AppStateEvents.CardPreviewOpen, (item: ProductItem) => {
    const card = new CatalogItem(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit(AppStateEvents.CartChange, item),
    });

    modal.render({
		data: card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			category: item.category,
			price: item.price,
			selected: appData.order.items.includes(item.id)
		}),
	});

});

events.on(AppStateEvents.CartChange, (item: ProductItem) => {
    item.selected = true;

    if (item.id) {
        appData.addToCart(item.id);
		page.counter++;
    }

    modal.close();
});

events.on(AppStateEvents.CartOpen, () => {
	const basketItems = appData.cartItemsList.map((item) => {
		const basketItem = new CartListItem(
			cloneTemplate(cardBasketTemplate),
			{
				onClick: () => events.emit(AppStateEvents.CartDelete, item),
			}
		);
		return basketItem.render({
			title: item.title,
			price: item.price
		});
	});

	modal.render({
		data: basket.render({
			items: basketItems,
			total: appData.order.total,
		}),
	});
});

events.on(AppStateEvents.CartDelete, (item: CartItem) => {
	const ids = appData.order.items.filter((itemId) => (itemId !== item.id));
	appData.updateCartItemList(ids);
	basket.total = appData.order.total;
	page.counter--;
});

events.on(AppStateEvents.OrderOpen, () => {
    modal.render({
        data: order.render({
            address: '',
			payment: PaymentMethod.Card,
            isValid: false,
            errorsMsgs: []
        })
    });
});

events.on(AppStateEvents.OrderChange, (e: {field?: string, value?: string, payment?: string}) => {
	const {field, payment, value} = e;

	switch(field) {
		case 'payment':
			appData.updatePayment(payment as PaymentMethod);
			break;
		case 'address':
			order.valid = !!value.length;
			appData.updateAddress(value);
			break;
		case 'email':
			contacts.valid = contacts.validateEmail(value);
			appData.updateEmail(value);
			break;
		case 'phone':
			contacts.valid = contacts.validatePhoneNumber(value);
			appData.updatePhone(value);			
			break;
	}
});

events.on(AppStateEvents.ContactsOpen, () => {
	modal.render({
        data: contacts.render({
            email: '',
			phone: '',
            isValid: false,
            errorsMsgs: []
        })
    });
});

events.on(AppStateEvents.FormSubmit, (e) => {
	const success = new Success(cloneTemplate(successTemplate), events);
	
	api.orderProducts(appData.order).then(() => {
		modal.render({
			data: success.render({
				total: appData.order.total
			}),
		});
		appData.flushCart();
		page.counter = 0;
	})
	.catch((err) => {
		console.error(err);
	});	
});

events.on(AppStateEvents.SuccessClose, () => {
	modal.close();
});


events.on(AppStateEvents.ModalOpen, () => {
	page.blocked = true;
});

events.on(AppStateEvents.ModalClose, () => {
	page.blocked = false;
});

api
	.getProductsList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});