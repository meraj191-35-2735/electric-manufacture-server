const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;
// const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5t0iy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const toolCollection = client
      .db("electric_manufacturing")
      .collection("tools");

    app.get("/tool", async (req, res) => {
      const query = {};
      const cursor = toolCollection.find(query);
      const tools = await cursor.toArray();
      res.send(tools);
    });
    app.get("/tool/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toolCollection.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Electric Manufacturing Server Is Here!");
});

app.listen(port, () => {
  console.log(`Doctor Portal CRUD running successfully on ${port}`);
});
