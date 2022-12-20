db.pOrds.drop();
db.pMeds.drop();
db.pComponents.drop();

// возможные значения
let COMPONENT = {
    name: 'asd',
    amount: 100,
    criticalAmount: 50,
};

let MED = {
    name: 'asd',
    type: ['микстура', 'мазь', 'порошок', 'настойка', 'раствор'],
    useMethod: [''],
    manufacturing:
        null |
        {
            id: 123,
            time: '2 days',
            ingredients: '',
        },
    price: 123,
    criticalAmount: 100,
};

let ORD = {
    fullName: 'Иванов Иван Иванович',
    phone: '111',
    adress: '',
    status: [
        'ожидание материалов',
        'изготавливается',
        'ожидает клиента',
        'отдан',
    ],
    orderDate: ISODate(''),
    pickupDate: ISODate(''),
    products: [
        {
            product: MED._id,
            quantity: 1,
        },
    ],
};

let COMP_1 = db.pComponents.insertOne({
    name: 'Трава 1',
    price: 10,
    amount: 100,
    criticalAmount: 50,
});

let COMP_2 = db.pComponents.insertOne({
    name: 'Трава 2',
    price: 20,
    amount: 100,
    criticalAmount: 50,
});

let COMP_3 = db.pComponents.insertOne({
    name: 'Порошок 1',
    price: 30,
    amount: 100,
    criticalAmount: 50,
});

let COMP_4 = db.pComponents.insertOne({
    name: 'Порошок 2',
    price: 40,
    amount: 100,
    criticalAmount: 50,
});

let COMP_5 = db.pComponents.insertOne({
    name: 'Жидкость 1',
    price: 5,
    amount: 200,
    criticalAmount: 90,
});

let MED_1 = db.pMeds.insertOne({
    name: 'Найз',
    type: 'Таблетки',
    useMethod: 'Внутреннее',
    manufacturing: null,
    price: 120,
    amount: 55,
    criticalAmount: 40,
});

let MED_2 = db.pMeds.insertOne({
    name: 'Парацетамол',
    type: 'Порошок',
    useMethod: 'Внутреннее',
    manufacturing: null,
    price: 70,
    amount: 40,
    criticalAmount: 50,
});

let MED_3 = db.pMeds.insertOne({
    name: 'Микстурин',
    type: 'Микстура',
    useMethod: 'Внутреннее',
    manufacturing: {
        gov_id: 111,
        ingredients: [COMP_1.insertedId, COMP_3.insertedId],
        comment: '',
    },
    price: 120,
    amount: 0,
    criticalAmount: 10,
});

let MED_4 = db.pMeds.insertOne({
    name: 'Мазин',
    type: 'Мазь',
    useMethod: 'Наружнее',
    manufacturing: {
        gov_id: 112,
        ingredients: [COMP_2.insertedId, COMP_4.insertedId],
        comment: '',
    },
    price: 200,
    amount: 12,
    criticalAmount: 7,
});

let MED_5 = db.pMeds.insertOne({
    name: 'Настойкалин',
    type: 'Настойка',
    useMethod: 'Внутреннее',
    manufacturing: {
        gov_id: 113,
        ingredients: [COMP_4.insertedId, COMP_5.insertedId],
        comment: '',
    },
    price: 180,
    amount: 20,
    criticalAmount: 4,
});

let ORD_1 = db.pOrds.insertOne({
    fullName: 'Иванов Иван Иванович',
    phone: '88005553535',
    adress: 'г. Москва, ул. Московская, д. 1',
    status: 'отдан',
    orderDate: ISODate('2022-12-04T16:00:00Z'),
    pickupDate: ISODate('2022-12-07T16:00:00Z'),
    products: [
        {
            product: MED_2.insertedId,
            quantity: 1,
        },
        {
            product: MED_3.insertedId,
            quantity: 1,
        },
    ],
});

let ORD_2 = db.pOrds.insertOne({
    fullName: 'Забывших Забрать Заказович',
    phone: '877777777',
    adress: 'г. Санкт-Петербург, ул. Петербуржская, д. 104',
    status: 'ожидает клиента',
    orderDate: ISODate('2022-11-20T16:00:00Z'),
    pickupDate: ISODate('2022-12-01T16:00:00Z'),
    products: [
        {
            product: MED_1.insertedId,
            quantity: 2,
        },
    ],
});

let ORD_3 = db.pOrds.insertOne({
    fullName: 'НеЗабывших Забрать Заказович',
    phone: '888888888',
    adress: 'г. Санкт-Петербург, ул. Петербуржская, д. 105',
    status: 'ожидает клиента',
    orderDate: ISODate('2022-12-19T16:00:00Z'),
    pickupDate: ISODate('2023-01-25T16:00:00Z'),
    products: [
        {
            product: MED_2.insertedId,
            quantity: 3,
        },
    ],
});

let ORD_4 = db.pOrds.insertOne({
    fullName: 'Ждущих Материал',
    phone: '123456',
    adress: 'г. Санкт-Петербург, пр. Химиков, д. 22',
    status: 'ожидание материалов',
    orderDate: ISODate('2022-11-20T16:00:00Z'),
    pickupDate: null,
    products: [
        {
            product: MED_3.insertedId,
            quantity: 1,
        },
        {
            product: MED_4.insertedId,
            quantity: 1
        }
    ],
});

let ORD_5 = db.pOrds.insertOne({
    fullName: 'Ждущих Изготовления',
    phone: '111111',
    adress: 'г. Кемерово, ул. Авроры, д. 10',
    status: 'изготавливается',
    orderDate: ISODate('2022-12-19T16:00:00Z'),
    pickupDate: ISODate('2022-12-22T16:00:00Z'),
    products: [
        {
            product: MED_3.insertedId,
            quantity: 1,
        },
        {
            product: MED_4.insertedId,
            quantity: 2
        }
    ],
});

let ORD_6 = db.pOrds.insertOne({
    fullName: 'Ждущих Изготовления 2',
    phone: '222222',
    adress: 'г. Кемерово, ул. Авроры, д. 11',
    status: 'изготавливается',
    orderDate: ISODate('2022-12-18T16:00:00Z'),
    pickupDate: ISODate('2022-12-23T16:00:00Z'),
    products: [
        {
            product: MED_3.insertedId,
            quantity: 3,
        },
    ],
});

let ORD_7 = db.pOrds.insertOne({
    fullName: 'Ждущих Изготовления',
    phone: '111111',
    adress: 'г. Кемерово, ул. Авроры, д. 10',
    status: 'изготавливается',
    orderDate: ISODate('2022-12-20T11:00:00Z'),
    pickupDate: ISODate('2022-12-23T16:00:00Z'),
    products: [
        {
            product: MED_4.insertedId,
            quantity: 2
        }
    ],
});