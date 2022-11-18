const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const error = require("./middleware/error");
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
// const authMiddleware = require("./middlewares/auth");

app.use(express.json());
app.use(cors());
app.options("*", cors());
require("dotenv").config();
app.use(express.static("public"));
app.use(fileUpload());

app.use(api + "/auth", auth);
app.use(api + "/user", user);
app.use(error);

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
