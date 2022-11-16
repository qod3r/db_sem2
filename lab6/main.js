// 1
db.Emps.aggregate([
    { $match: {
        start_date: { 
            $gt: ISODate("1990-05-14"),
            $lt: ISODate("1991-05-26")
        }
    }},
    { $project: {
        _id: 0,
        userid: 1,
        start_date: 1,
    }},
    { $sort: {
        start_date: -1
    }}
]);

// 2
db.Emps.aggregate([
    { $match: {
        "dept.number": { $in: [31, 42, 50] },
        $or: [
            { salary: { $lt: 1000 } },
            { salary: { $gt: 2500 } }
        ]
    }},
    { $project: {
        _id: 0,
        last_name: 1,
        salary: 1
    }}
])

// 3
db.Emps.aggregate([
    { $set: {
        monthCount: {
            $toInt: {
                $dateDiff: {
                    startDate: "$start_date",
                    endDate: new Date(),
                    unit: "month"
                }   
            }
        },
        start_day: {
            $dayOfWeek: "$start_date"
        }
    }},
    { $project: {
        _id: 0,
        last_name: 1,
        monthCount: 1,
        start_day: 1
    }},
    { $sort: {
        monthCount: -1
    }}
])

// 4
db.Emps.aggregate([
    { $group: {
        _id: "$title",
        minSalary: { $min: "$salary" },
        maxSalary: { $max: "$salary" }
    }},
    { $sort: {
        _id: 1
    }}
])

// 5
db.Ords.aggregate([
    { $set: {
        count: {
            $size: "$products"
        }
    }},
    { $project: {
        count: 1
    }}
])

// 6
db.Emps.aggregate([
    { $lookup: {
        from: "Emps",
        localField: "_id",
        foreignField: "manager",
        as: "subordinates"
    }},
    { $unwind: "$subordinates" },
    { $group: {
        _id: "$_id",
        lowestPaid: {
            $min: "$subordinates.salary"
        }
    }},
    { $match: {
        lowestPaid: { $gt: 1000 }
    }},
    { $sort: {
        lowestPaid: -1
    }}
])

// 7
db.Ords.aggregate([
    { $unwind: "$products" },
    { $group: {
        _id: "$products.product._id",
        count: { $sum: 1 }
    }},
    { $match: {
        count: { $gte: 3 }
    }},
    { $sort: { _id: 1 }}
])

// 8
db.Regions.aggregate([
    { $lookup: {
        from: "Depts",
        localField: "_id",
        foreignField: "region",
        as: "depts"
    }},
    { $project: {
        deptCount: {
            $size: "$depts"
        }
    }}
])

// 9
db.Customers.aggregate([
    { $lookup: {
        from: "Ords",
        localField: "_id",
        foreignField: "customer._id",
        as: "orders"
    }},
    { $project: {
        orderCount: { $size: "$orders" }
    }}
])

// 10
db.Emps.aggregate([
    { $set: {
        salary_consider: {
            $dateAdd: {
                startDate: "$start_date",
                unit: "month",
                amount: 6
            }
        }
    }},
    { $project: {
        _id: 0,
        last_name: 1,
        start_date: {
            $dateToString: {
                format: "%d.%m.%Y",
                date: "$start_date"
            }
        },
        salary_consider: {
            $dateToString: {
                format: "%d.%m.%Y",
                date: {
                    $dateAdd: {
                        startDate: "$salary_consider",
                        unit: "day",
                        amount: {
                            $subtract: [9, {$dayOfWeek: "$salary_consider"}]
                        }
                    }
                }
            }
        }
    }}
])
