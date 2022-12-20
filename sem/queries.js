// 1. Получить сведения о покупателях, которые не пришли забрать свой заказ в назначенное им время и общее их число.

db.pOrds.find({ status: "ожидает клиента", pickupDate: { $lt: new Date() } })
db.pOrds.aggregate([
    { $match: {
        status: "ожидает клиента",
        pickupDate: { $lt: new Date() }
    }},
    { $count: "общее число" },
])
// { $group: {
//     _id: null
// }},
