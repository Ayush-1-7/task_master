const error= require('../middleware/error')

const cors = require("cors");
const express= require('express')
const users = require("../routes/users");
const auth = require("../routes/auth");
const spaces = require("../routes/spaces");
const tasks = require("../routes/tasks");
module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/spaces", spaces);
  app.use("/api/tasks", tasks);
  app.use(error);
};
