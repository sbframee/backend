const cors = require("cors");
const express = require("express");
const connectDB = require("./config/mongoDb");
const morgan = require("morgan");

var bodyParser = require("body-parser");
const Users = require("./Routers/Users");
const Customers = require("./Routers/Customers");
const Documents = require("./Routers/Documents");
const DocumentList = require("./Routers/DocumentList");
const Cases = require("./Routers/Case");
const Country = require("./Routers/country");
const State = require("./Routers/state");
const City = require("./Routers/city");
const Priority = require("./Routers/priority");


connectDB();
app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
// app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);


app.use("/users", Users);
app.use("/customers", Customers);
app.use("/documents", Documents);
app.use("/documentList", DocumentList);
app.use("/cases", Cases);
app.use("/country", Country);
app.use("/state", State);
app.use("/city", City);
app.use("/priority", Priority);


module.exports = app;
