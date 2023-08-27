const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = require("./src/Config/config");
const Error404 = require("./src/middleware/error404");
const taskRouter = require("./src/Routes/taskRouter");
const app = express();

// security packages
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

//middleware
app.use(cors({ origin: ["http://localhost:3030"] }));
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

// route
app.get("/", (req, res) => {
  res.status(200).send("working");
});
app.use("/api/task", taskRouter);
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
