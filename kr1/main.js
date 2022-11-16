// 3
db.articles.find({ author: "Author 4", tags: { $all: ["Science", "Mathematics"]} })

// 4
db.articles.find().sort({ uploadDate: 1 }).limit(1)

// 5
db.articles.find({
    uploadDate: {
        $gte: ISODate("2020-01-01"),
        $lt: ISODate("2021-01-01")
    }
}, { author: 1, title: 1, tags: {$slice : 1}, _id: 0 })

// 6
db.articles.aggregate([
    { $match: {
        tags: {
            $elemMatch: {
                $eq: "Politics"
            }
        },
        $expr: {
            $gte: [{$size: "$comments"}, 2]
        }
    }}
])

// 7
db.articles.aggregate([
    { $project: {
        _id: 0,
        author: 1,
        title: 1,
        uploadDate: 1,
        avgScore: {
            $avg: "$comments.rating"
        }
    }}
])

// 8
db.articles.aggregate([
    { $unwind: "$comments" },
    { $group: {
        _id: "$_id",
        authors: {
            $addToSet: "$comments.name"
        }
    }},
    { $unwind: "$authors" }
])

// 9
db.articles.aggregate([
    { $unwind: "$comments" },
    { $match: {
        "comments.email": /gmail.com/i,
        "comments.text": /.*(coo)|(ife).*/i
    }},
    { $project: {
        _id: 0,
        comments: 1
    }}
])

// 10
db.articles.aggregate([
    { $unwind: "$comments" },
    { $match: {
        "comments.phone": /2[()-]?7/i
    }},
    { $project: {
        _id: 0,
        comments: 1
    }}
])