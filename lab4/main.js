// 1
db.emp.aggregate([
  { $match: { level: 'Middle' } },
  {
    $group: {
      _id: null,
      avgAge: { $avg: '$age' },
    },
  },
]);

// 2
db.emp.aggregate([
  {
    $group: {
      _id: null,
      max: { $max: '$salary' },
      min: { $min: '$salary' },
    },
  },
]);

// 3
db.emp.aggregate([
  {
    $group: {
      _id: '$level',
      avgSalary: { $avg: '$salary' },
    },
  },
  { $sort: { avgSalary: 1 } },
]);

// 4
db.emp.aggregate([
  { $match: { salary: { $gt: 7000 } } },
  { $count: 'salaries >7000' },
]);

// 5
db.emp.aggregate([
  { $match: { age: { $gte: 20, $lte: 30 } } },
  { $unwind: '$skills' },
  { $group: { _id: '$skills' } },
]);

// 6
db.emp.aggregate([
  { $unwind: '$skills' },
  { $group: { _id: '$skills' } },
  { $count: 'unique skills' },
]);

// 7
db.emp.aggregate([
  { $match: { $expr: { $in: ['Python', '$skills'] } } },
  { $unwind: '$skills' },
  { $group: { _id: null, skills: { $addToSet: '$skills' } } },
  {
    $project: {
      skills: {
        $filter: {
          input: '$skills',
          as: 'item',
          cond: {
            $ne: ['$$item', 'Python'],
          },
        },
      },
    },
  },
]);

// 8
db.emp.aggregate([
  { $unwind: '$skills' },
  { $group: { _id: '$skills', count: { $sum: 1 } } },
]);

// 9
db.emp.aggregate([
  {
    $group: {
      _id: '$level',
      minAge: { $min: '$age' },
    },
  },
]);

// 10
db.emp.aggregate([
  { $unwind: '$skills' },
  { $group: { _id: '$skills', avgSalary: { $avg: '$salary' } } },
  { $sort: { avgSalary: -1 } },
]);
