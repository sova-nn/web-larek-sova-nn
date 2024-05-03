import { EventEmitter } from './components/base/events';
import { WebLarekApi } from './components/shared/API';
import { CDN_URL, API_URL } from './utils/constants';
import { App } from './components/shared/App';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Page } from './components/shared/Page';
import { ProductCard, CatalogItem } from './components/shared/ProductCard';

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

events.on('products: change', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card-catalog:select', item),
		});

		return card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
});

api
	.getProductsList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});