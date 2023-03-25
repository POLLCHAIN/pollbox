const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const app = express();
const route = require("./index");
const sync = require('./sync');
const cors = require('cors');

mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/',  route);

app.listen(process.env.PORT || 6001, async function() {
  console.log("server started");

  // Blochchain Syncing Start  
  await sync.init([1,56,137,8217]);
  await Promise.all([
    sync.sync_data(1, 12000),
    sync.sync_data(56, 5000),
    sync.sync_data(137, 3000),
    sync.sync_data(8217, 3000)
  ]); 
  await sync.execute();

});
