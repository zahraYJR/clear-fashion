const {MongoClient} = require('mongodb');
const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_URI = "mongodb+srv://user:web_clear_fashion@clearfashion.biwwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function connect() {
    try 
    {
        console.log("In connect function");
        const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(MONGODB_DB_NAME)
        console.log('Connected to database')
        return db
    }
    catch (err) 
    {
        console.error(`Error connecting to the database.\n${err}`);
    }
}

connect();

// 4. Insert the Products into this database
const all_products = require('./all_products.json');

async function Insert_products(products) 
{
    const db = await connect();
    const collection = db.collection('products');
    for (product of products) 
    {
        const result = collection.insertMany(product);
    }
}
//Insert_products([all_products])



// 5. Create at least 3 methods to find products according query

//Find all products related to a given brand
brand_name = "dedicatedbrand"

async function Find_by_brand(brand_name) 
{
    const db = await connect();
    const collection = db.collection('products');

    var query = {brand: brand_name};
    collection.find(query).toArray(function (err, result) {
        if(err) 
        {
            throw err;
        }
        console.log(result);
    });
}
//Find_by_brand(brand_name)



//Find all products less than a price
price = 25

async function Find_by_price_less_than(price) 
{
    const db = await connect();
    const collection = db.collection('products');

    var query = {price: { $lt: price } }
    products = await collection.find(query).toArray(function (err, result) {
        if(err) 
        {
            throw err;
        }
        console.log(result);
    });
}
//Find_by_price_less_than(price)



//Find all products sorted by price (desc order)
async function Sort_by_desc_price() 
{
    const db = await connect();
    const collection = db.collection('products');

    var query = [{ $sort: { "price": -1 } }]
    products = await collection.aggregate(query).toArray();
    
    console.log(products);
}
//Sort_by_desc_price()

