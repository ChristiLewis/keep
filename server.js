//IMPORT TO INITIALIZE MONGOOSE FOR MONGODB
const express = require("express");
const mongoose = require("mongoose");

//ADDITIONAL IMPORTS
const logger = require("morgan");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require('./routes'));

//LOG MONGO QUERIES EXECUTED
mongoose.set('debug', true);

app.listen(PORT, () => {
  console.log(`🌍 Connected on port ${PORT}!`);
});