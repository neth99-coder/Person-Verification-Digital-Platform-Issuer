const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//routers
const auth = require("./routes/auth");

//middleware
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.options("*", cors());
require("dotenv").config();
app.use(express.static("public"));

app.use("/api/auth", auth);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Listening to port number " + PORT);
});
