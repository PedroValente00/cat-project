require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;
const { MongoClient } = require("mongodb");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// const username = process.env.USERNAME;
// const password = process.env.PASSWORD;
// const uri = `mongodb+srv://${username}:${password}@cluster0.yncnmfs.mongodb.net/test`;
const uri = "mongodb+srv://guest:publicPassword@cluster0.pwlnmte.mongodb.net/test"

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getAll = async () => {
  try {
    await client.connect();
    const collections = client.db("catsDB").collection("pictures");
    const data = await collections.find().toArray();
    return { data };
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};
const saveOne = async (data) => {
  try {
    await client.connect();
    const collections = client.db("catsDB").collection("pictures");
    await collections.insertOne(data);
    return { data };
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};
const deleteOne = async (data) => {
  try {
    await client.connect();
    const collections = client.db("catsDB").collection("pictures");
    await collections.deleteOne(data);
    return { data };
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

app
  .route("/database")

  .get((req, res) => {
    getAll().then((results) => {
      res.status(200).json(results);
    });
  })

  .post((req, res) => {
    const data = req.body;
    saveOne(data);
    res.status(200).send("response OK");
  })

  .delete((req, res) => {
    const data = req.body;
    deleteOne(data);
    return res.status(204).end();
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
