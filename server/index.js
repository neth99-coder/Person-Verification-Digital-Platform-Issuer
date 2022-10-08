const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

//routers

const auth = require("./routes/auth");
const user = require("./routes/users");

const api = process.env.API_URL;
//middleware
const bodyParser = require("body-parser");
app.use(morgan("tiny"));

app.use(express.json());
app.use(cors());
app.options("*", cors());
require("dotenv").config();
app.use(express.static("public"));
app.use(fileUpload());

app.use(api + "/auth", auth); // TODO: "wrong url ????"
app.use(api + "/user", user);

//establish database connection
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
