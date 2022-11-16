// 1
db.Emps.aggregate([
    { $match: {
        commission_pct: { $ne: null }
    }},
    { $lookup: {
        from: "Regions",
        localField: "dept.region",
        foreignField: "_id",
        as: "region"
    }},
    { $project: {
        _id: 0,
        last_name: 1,
        "dept.name": 1,
        "region.name": 1
    }}
])

// 2
db.Emps.aggregate([
    { $match: {
        last_name: "Smith"
    }},
    { $lookup: {
        from: "Emps",
        localField: "dept._id",
        foreignField: "dept._id",
        as: "emp"
    }},
    { $lookup: {
        from: "Regions",
        localField: "emp.dept.region",
        foreignField: "_id",
        as: "region"
    }}, { $unwind: "$emp" }, { $unwind: "$region" },
    { $project: {
        _id: 0,
        last_name: "$emp.last_name",
        dept: "$emp.dept.name",
        region: "$region.name"
    }}
])

// 3
db.Ords.aggregate([
    { $match: {
        date_ordered: { "$gte": ISODate("1992-08-31"),
                        "$lt": ISODate("1992-09-01")}
    }},
    { $unwind: "$products" },
    { $project: {
        name: "$products.product.name",
        _id: 1,
        quant: "$products.quantity"
    }}
])

// 4
db.Customers.aggregate([
    { $lookup: {
        from: "Ords",
        localField: "_id",
        foreignField: "customer._id",
        as: "orders"
    }},
    { $project: {
        name: 1,
        orders: "$orders._id"
    }}
])

// 5
db.Emps.aggregate([
    { $match: {
        manager: { $ne: null }
    }},
    { $lookup: {
        from: "Emps",
        localField: "manager",
        foreignField: "_id",
        as: "manager"
    }},
    { $unwind: "$manager" },
    { $project: {
        last_name: 1,
        _id: 1,
        manager_last_name: "$manager.last_name",
        manager_id: "$manager._id"
    }}
])

// 6
db.Customers.aggregate([
    { $lookup: {
        from: "Ords",
        localField: "_id",
        foreignField: "customer._id",
        as: "order"
    }},
    { $set: {
        orderSum: {
            $sum: "$order.total"
        }
    }},
    { $match: {
        orderSum: { $gt: 100000 }
    }},
    { $unwind: "$order" },
    { $unwind: "$order.products"},
    { $project: {
        _id: 0,
        name: 1,
        products: "$order.products.product.name",
        quant: "$order.products.quantity"
    }},
])

// 7
db.Regions.aggregate([
    { $lookup: {
        from: "Depts",
        localField: "_id",
        foreignField: "region",
        as: "depts"
    }},
    { $project: {
        regionName: "$name",
        deptCount: { $size: "$depts" }
    }}
])

// 8
db.Customers.aggregate([
    { $lookup: {
        from: "Ords",
        localField: "_id",
        foreignField: "customer._id",
        as: "ords"
    }},
    { $project: {
        _id: 0,
        name: 1,
        ordCount: { $size: "$ords" }
    }}
])

// 9
db.Products.aggregate([
    { $lookup: {
        from: "Ords",
        localField: "_id",
        foreignField: "products.product._id",
        as: "ords"
    }},
    { $set: {
        ordCount: { $size: "$ords" }
    }},
    { $match: {
        ordCount: { $gte: 3 }
    }},
    { $project: {
        _id: 0,
        name: 1,
        ordCount: 1
    }}
])

// 10
db.Ords.aggregate([
    { $set: {
        quantSum: { $sum: "$products.quantity" }
    }},
    { $match: {
        quantSum: { $gte: 100 }
    }},
    { $project: {
        quantSum: 1
    }}
])