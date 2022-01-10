const express = require("express");
const app = express();
var MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
var url = "mongodb://localhost:27017/";
const bodyParser = require("body-parser");
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
//Creating articles
app.post("/create", (req, res) => {
  console.log(req.body);
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("articles");
    var myobj = req.body;
    dbo.collection("article").insertOne(myobj, (err, res) => {
      if (err) throw err;
      console.log("1 article inserted");
    });
  });
});
//Listind of all Articles
app.get("/create", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("articles");

    dbo
      .collection("article")
      .find({})
      .toArray((err, articles) => {
        console.log("data", articles);
        res.send(articles);
      });
  });
});

//List Categories

app.get("/create/categories", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("articles");

    dbo
      .collection("article")
      .find({}, { projection: { _id: 0, categories: 1 } })
      .toArray((err, articles) => {
        console.log("data", articles);
        res.send(articles);
      });
  });
});

//Listing of article based on Categories
app.get("/create/categories/:categories", (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("articles");

    const result = req.params;
    dbo
      .collection("article")
      .find(result)
      .toArray((err, articles) => {
        console.log("data", articles);
        res.send(articles);
      });
  });
});

//Edit Based on Categoires
app.put("/create", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("articles");
    var myquery = { categories: "Tech" };
    var newvalues = {
      $set: {
        heading: "Canyon 123",
        readtime: "",
        description: "",
        categories: "",
        urltoimage: "",
        verified: false,
        newest: true,
        trending: true,
      },
    };
    dbo
      .collection("article")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        console.log("1 document updated");
        res.send(result);
      });
  });
});

//Delete article on id
app.delete("/delete/:id", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("articles");
    var id = req.params;
    dbo
      .collection("article")
      .deleteOne({ _id: ObjectId(id) }, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
      });
  });
});
app.listen(5000);
