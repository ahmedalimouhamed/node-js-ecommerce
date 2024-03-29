const express = require('express');
const dbConnect = require('./dbConnect/dbConnection');
const app = express();
const routes = require("./routes/routes.js")

app.use(express.json());

app.use("/", routes)

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
  dbConnect();
});