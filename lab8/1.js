const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db("firstbase");
        const collection = db.collection("Emps");
        const count = await collection.countDocuments();
        console.log(`В коллекции users ${count} документов`);
    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

run();