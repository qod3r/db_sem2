from pymongo import MongoClient
from pymongo.collection import Collection
from pprint import pprint
from datetime import datetime


def get_db():
    uri = "mongodb://localhost:27017/"
    client = MongoClient(uri)
    return client['firstbase']


def _1(db):
    pipeline = { 
        "status": "ожидает клиента",
        "pickupDate": { "$lt": datetime.now() } 
    }
    
    res = list(db['pOrds'].find(pipeline))
    pprint(res)
    print(f"Всего: {len(res)}")

def _2(db, category=None):
    # в целом
    if category is None:
        res = list(db['pOrds'].find({
            "status": "ожидание материалов"
        }))
    # для указанной категории
    else:
        res = list(db['pOrds'].aggregate([
            { "$lookup": {
                "from": "pMeds",
                "localField": "products.product",
                "foreignField": "_id",
                "as": "fullProducts"
            }},
            { "$match": {
                "status": "ожидание материалов",
                "fullProducts.type": category
            }},
            { "$unset": "fullProducts" }
        ]))
    
    pprint(res)
    print(f"Всего: {len(res)}")

def _3(db, category=None):
    # в целом
    pipeline = [
        { "$lookup": {
            "from": "pOrds",
            "localField": "_id",
            "foreignField": "products.product",
            "as": "ords"
        }},
        { "$set": {
            "Ordered": {
                "$size": "$ords"
            }
        }},
        { "$sort": { "Ordered": -1 } },
        { "$project": {
            "_id": 0,
            "name": 1,
            "type": 1,
            "Ordered": 1
        }}
    ]
    # если указана категория
    if category is not None:
        pipeline.insert(0, {
            "$match": {
                "type": category
            }
        })
        
    res = list(db['pMeds'].aggregate(pipeline))
    # выводим первые 10
    pprint(res[:10])

def _4(db, t1, t2, name=None, category=None):
    a = {}
    # определенное лекарство
    if name is not None:
        a = { "fullProducts.name": name }
    # тип лекарств
    elif category is not None:
        a = { "fullProducts.type": category }
        
    timewindow = {
        "orderDate": { "$gt": t1 },
        "orderDate": { "$lt": t2 }
    }
    
    pipeline = [
        { "$lookup": {
            "from": "pMeds",
            "localField": "products.product",
            "foreignField": "_id",
            "as": "fullProducts"
        }},
        # { "$unwind": "$fullProducts" },
        { "$match": a },
        { "$match": timewindow },
        { "$unset": "fullProducts" }
    ]
    
    res = list(db['pOrds'].aggregate(pipeline))
    pprint(res)
    print(f"Всего: {len(res)}")

def _5(db):
    res = list(db['pMeds'].find({
        "$expr": {
            "$lte": ["$amount", "$criticalAmount"]
        }
    }, {
        "_id": 0,
        "name": 1,
        "type": 1,
        "amount": 1,
        "criticalAmount": 1
       }))
    
    pprint(res)

def _6(db):
    pipeline = {
        "status": "изготавливается"
    }
    
    res = list(db['pOrds'].find(pipeline))
    pprint(res)
    print(f"Всего: {len(res)}")

def _7(db):
    pipeline = [
        { "$match": {
            "status": "изготавливается"
        }},
        { "$lookup": {
            "from": "pMeds",
            "localField": "products.product",
            "foreignField": "_id",
            "as": "fullProducts"
        }},
        { "$unwind": "$fullProducts"},
        { "$group": {
            "_id": 0,
            "meds": { 
                "$addToSet": "$fullProducts.name"
            }
        }},
        { "$project": {
            "_id": 0,
            "meds": 1,
            "total": {
                "$size": "$meds"
            }
        }}
    ]
    
    res = list(db['pOrds'].aggregate(pipeline))
    pprint(res)
    # print(f"Всего: {len(res)}")

def _8(db, categories=None, names=None):
    a = {}
    cat = 'pMeds'
    
    # конкретных лекарств
    if names is not None:
        pipeline = [
            { "$match": {
                "name": { "$in": names }
            }},
            { "$project": {
                "_id": 0,
                "name": 1,
                "технология": "$manufacturing"
            }}
        ]
    # указанных типов
    elif categories is not None:
        pipeline = [
            { "$match": {
                "type": { "$in": categories }
            }},
            { "$project": {
                "_id": 0,
                "name": 1,
                "технология": "$manufacturing"
            }}
        ]
    # лекарств, находящихся в справочнике заказов в производстве
    elif categories is None and names is None:
        cat = 'pOrds'
        a = { "status": "изготавливается" }    
        pipeline = [
            { "$lookup": {
                "from": "pMeds",
                "localField": "products.product",
                "foreignField": "_id",
                "as": "fullProducts"
            }},
            { "$unwind": "$fullProducts" },
            { "$match": a },
            { "$group": {
                "_id": 0,
                "meds": { 
                    "$addToSet": "$fullProducts.name"
                }
            }}
        ]
    
    res = list(db[cat].aggregate(pipeline))
    pprint(res)

def _9(db, med):
    pipeline = [
        { "$match": {
            "name": med
        }},
        { "$lookup": {
            "from": "pComponents",
            "localField": "manufacturing.ingredients",
            "foreignField": "_id",
            "as": "components"
        }},
        { "$project": {
            "_id": 0,
            "name": 1,
            "price": 1,
            "componentPrice": {
                "$sum": "$components.price"
            }
        }}
    ]
    
    res = list(db['pMeds'].aggregate(pipeline))
    pprint(res)

def _10(db, name=None, category=None):
    a = {}
    if name is not None:
        a = { "meds.name": name }
    elif category is not None:
        a = { "meds.type": category }
    
    pipeline = [
        { "$lookup": {
            "from": "pMeds",
            "localField": "products.product",
            "foreignField": "_id",
            "as": "meds"
        }},
        { "$unwind": "$meds" },
        { "$match": a },
        { "$group": {
            "_id": "$fullName",
            "count": {"$sum": 1 }
        }},
        { "$sort": { "count": -1 } },
        { "$project": {
            "_id": 0,
            "Покупатель": "$_id",
            "Кол-во заказов": "$count"
        }},
    ]
    print(f"{list(a.values())[0]}: ")
    res = list(db['pOrds'].aggregate(pipeline))
    pprint(res)


if __name__ == "__main__":
    db = get_db()
    # _1(db)
    
    # print("\nДля категории 'Мазь'")
    # _2(db, "Мазь")
    # print("\nВ целом")
    # _2(db)
    
    # _3(db)
    # _3(db, "Мазь")
    
    # t1 = datetime(2022, 11, 1)
    # t2 = datetime(2022, 11, 28)
    # print(f"между {t1} и {t2}")
    # _4(db, t1, t2, category='Мазь')
    # _4(db, t1, t2, name='Найз')
    
    # _5(db)
    
    # _6(db)
    
    # _7(db)
    
    # _8(db, names=['Мазин'])
    # _8(db)
    
    # _9(db, 'Мазин')
    
    _10(db, name='Мазин')
    # _10(db, category='Мазь')
