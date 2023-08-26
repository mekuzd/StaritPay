const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = require("./src/Config/config");
const Error404 = require("./src/middleware/error404");

const app = express();

//test route
app.get("/", (req, res) => {
  res.status(200).send("working");
});

app.use(Error404); // unavailable route

// connect to db and listen on PORT
const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
