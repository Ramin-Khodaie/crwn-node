require("dotenv").config();
const express = require('express');
const app = express();

const port = process.env.PORT
const helmet = require("helmet");
const morgan = require("morgan");

const cors = require("cors");
const mongoose = require("mongoose");

//mongodb connection statement
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
})

//create mongodb connection
if (process.env.NODE_ENV !== "production") {
  const mDB = mongoose.connection;
  mDB.on("open", () => {
    console.log("mongo is open");
  });
  mDB.on("error", (error) => {
    console.log(error);
  });
  app.use(morgan("tiny"));
}

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const userRouter = require("./src/userRouter/userRouter")
const productionRouter = require("./src/productionRouter/productionRouter");

app.use(cors())
app.use("/user",userRouter);
app.use("/product",productionRouter);


app.listen(port, () => {
    console.log(`API is runing on http://localhost:${port}`);
  });