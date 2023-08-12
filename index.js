const express = require("express");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");

//connecting to database
const ConnectionString =
  "mongodb+srv://Khoja1211:Mushtarak32@cluster0.xntjyns.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(ConnectionString, {
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rasmla papkasini statik atish
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "news-image")));

app.get("/news", async (req, res) => {
  console.log("news being sent");
  res.header("Access-Control-Allow-Origin", "*");
  await client.connect();
  const main_data = await client
    .db("news")
    .collection("news")
    .aggregate()
    .toArray();
  res.json(main_data);
});

app.get("/galereya", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  await client.connect();
  const main_data = await client
    .db("news")
    .collection("galereya")
    .aggregate()
    .toArray();
  res.json(main_data);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
