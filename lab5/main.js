// 2
db.emp5.find({
    email: /@gmail.com/i,
});

// 3
db.emp5.find({
    email: { $not: /\w+@\w+\.\w+/i },
});

// 4
db.emp5.find({ hobbies: /^п.*е$/i, });

// 5
db.emp5.find({
    document: /404/i,
});

// 6
db.emp5.find({
    phoneNumber: /3[()-]?6/i,
});

// 7
db.emp5.find({
    phoneNumber: /\d\(\d{3}\)\d{3}(-\d{2}){2}/i,
});

// 8
db.emp5.aggregate([
    { $match: { email: /(a.*v)|(v.*a)/i } },
    { $project: {
        _id: 0,
        name: { $concat: [ "$surname", " ", "$name", " ", "$fatherName" ] },
        hobbies: { $size: "$hobbies" }
    }}
]);

// 9
db.emp5.find({
    birthDate: /10\.\d+\.1987/i
});

// 10
db.emp5.aggregate([
    { $match: {
        birthDate: { $ne: null }
    }},
    { $set: {
        birthString: {
            $regexFind: {
                input: "$birthDate",
                regex: /\d+\.\d+\.\d+/i 
            }
        }
    }},
    { $set: {
        birthISO: {
            $dateFromString: {
                dateString: "$birthString.match",
                format: "%d.%m.%Y"
            }
        }
    }},
    { $set: {
        age: {
            $dateDiff: {
                startDate: "$birthISO",
                endDate: new Date(),
                unit: "year"
            }
        }
    }},
    { $match: {
        age: { $gt: 30 }
    }},
    { $unset: ["birthString", "birthISO", "age"] }
])

