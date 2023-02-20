const express = require("express");
const mongoose = require("mongoose");
const port = 3030;
const app = express();

const todoRoutes = require("./routes/todoRoutes");
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

app.use(express.json());

mongoose.set('strictQuery', false);

const uri = "mongodb+srv://valemorenodev:michipantera1@cluster0.rqzi6mu.mongodb.net/test"


mongoose.connect(uri, connectionOptions)
  .then(() =>
    console.log("Mongoose connected succcessfully"),
  )
  .catch((err) =>
    console.error(err)
  );

app.use("/todos", todoRoutes);

app.listen(port, () => {
  console.log("-------------------------------------------")
  console.log("Server on port:" + port + "http://localhost:3030/")
  console.log("-------------------------------------------")
});