const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// =======middlewares======
app.use(cors());
app.use(express.json());

// mehedi117
// rjTMT9nLhkCta1Tg
// ================================================================

const uri =
  "mongodb+srv://mehedi117:rjTMT9nLhkCta1Tg@cluster0.virnuu4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db("productDB").collection("products");
    const cartCollection = client.db("productDB").collection("cart");


// ---- product collcetion crud operation
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

  //  ----cart collection crud operatioin
  app.get("/cart", async (req, res) => {
    const cursor = cartCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  });

  app.post('/cart/', async(req, res)=>{
    const card = req.body;
    const result = await cartCollection.insertOne(card);
    res.send(result)
  })

  app.delete('/cart/:id', async(req, res)=> {
    const id = req.params.id
    const query = {_id : new ObjectId(id)}
    const result = await cartCollection.deleteOne(query)
    res.send(result)
  })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// =================================================================

// const products = [
//     {"name":"iphone13", "brand":"apple", "type":"phone", "price":"100000", "description": "black silicon" , "rating":"5", "photo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkOB6IMj03xxd4kuAiGkHtwDYOtfLW1d6Lyw&usqp=CAU", "_id":1},
//     {"name":"iphone14", "brand":"apple", "type":"phone", "price":"120000", "description": "red silicon" , "rating":"4.5", "photo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkOB6IMj03xxd4kuAiGkHtwDYOtfLW1d6Lyw&usqp=CAU", "_id":2}
// ]

app.get("/", (req, res) => {
  res.send("hello server asflkjf");
});

// app.get('/products', (req, res)=>{
//     res.send(products)
// })

app.listen(port, () => {
  console.log(`running port on: ${port} `);
});
