# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Паттерн программирования: паттерн MVP.

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Спецификация.

### Тип ProductItem
Типизирует объект карточки товара.
- id: уникальный id товара,
- title: название товара,
- image: изображение товара (необязательное поле),
- category: категория товара (необязательное поле),
- price: цена товара,
- description: описание товара (необязательное поле)

### Тип CustomerInfo
Типизирует форму заказа.
paymentMethod: тип оплаты,
address: адрес клиента,
postalCode: почтовый код клиента,
telephoneNumber: номер телефона клиента

### Интерфейс ProductCard
Типизирует основные поля и методы карточки товара.
- item: поле для хранения объекта карточки товара,
- order: метод заказа товара,
- closeModal: метод закрытия модального окна

### Интерфейс Basket
Типизирует основные поля и методы корзины.
items: массив товаров корзины,
total: общее количество товаров,
order: метод заказа товаров,
closeModal: метод закрытия модального окна

### Интерфейс Order
Типизирует основные поля и методы формы заказа.
items: массив товаров корзины,
confirmOrder: метод подтверждения заказа,
closeModal: метод закрытия модального окна

### Интерфейс OrderConfirmed
Типизирует основные поля и методы успешного заказа товаров.
message: сообщение об успешном заказе товаров,
closeModal: метод закрытия модального окна

## Работа с данными

### Класс Api
Обеспечивает работу с данными с бэка.
Принимает в конструктор:
1. baseUrl: string – базовый адрес
2. options: RequestInit = {} – свойства

Методы класса:
1. get(uri: string) - получение данных с сервера по заданному урлу.
2. post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправка данные на сервер по заданному урлу с необязательным параметром указания метода.

### Класс WebLarekApi
Имплементирует интерфейс WebApi, отвечает за получение данных с бэка и их гармонизацию.

Методы класса:
1. getProductItem - получение продукта по id.
2. getProductsList - получения списка продуктов.
3. orderProducts - заказ списка выбранных товаров.

## Компоненты модели 

### Абстрактный класс Model<T>
Базовый абстрактный класс - представляет собой дженерик — принимает в переменной любой тип данных Т. Принимает в конструктор:(data: Partial<T>, protected events: IEvents)
1. data: Partial<T> — опциональные свойства данных.
2. protected events: IEvents — защищенные события.

Методы класса: 
1. emitChanges(event: string, payload?: object) — принимает как аргумент событие, и необязательный параметр данные. Метод отвечает за эмит новых данных при наступлении события.

### Класс EventEmitter.
Представляет паттерн наблюдателя для подписки на события и отписки от них.

Методы класса:
1. on - установить обработчик на событие.
2. off - снять обработчик с события.
3. emit — инициировать событие с данными.
4. onAll - слушать все события.
5. offAll - сбросить все обработчики.
6. trigger - сделать коллбек триггер, генерирующий событие при вызове.

### Абстрактный класс Component
Абстрактный базовый класс для работы с DOM в дочерних компонентах. 

Методы класса:
1. toggleClass(element: HTMLElement, className: string, force?: boolean) - переключить класс.
2. setText(element: HTMLElement, value: unknown) - установить текстовое содержимое.
3. setDisabled(element: HTMLElement, state: boolean) - сменить статус блокировки.
4. setHidden(element: HTMLElement) - скрыть элемент.
5. setVisible(element: HTMLElement) - показать элемент.
6. setImage(element: HTMLImageElement, src: string, alt?: string) - установить изображение с альтернативным текстом.
7. render(data?: Partial): HTMLElement - вернуть корневой DOM-элемент.


## Компоненты представления(Presenter)

Слой архитектуры необходимый для связывания слоя Model и слоя View.

Список событий.
	// События Карточки товара
	CardPreviewOpen = 'card: preview',
	// События Списка товаров
	ProductsListChange = 'products: change',
	// События Корзины
	CartChange = 'cart: change',
	CartOpen = 'cart: open',
	CartDelete = 'cart: delete',
	// События формы заказа
	OrderOpen = 'order: open',
	OrderChange = 'order: change',
	ContactsOpen = 'contacts: open',
	SuccessClose = 'success: close',
	// События модалки
	ModalClose = 'modal: close',
	// События формы
	FormSubmit = 'form: submit'








