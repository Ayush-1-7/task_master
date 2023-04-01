const express = require("express");

require("winston-mongodb");
require("express-async-errors");
require("./startup/config")();
const config = require("config");
const winston = require("winston");
const app = express();
require("./startup/db")();

require("./startup/routes")(app);
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "expection.log", level: "error" }),
    new winston.transports.File({ filename: "logfile.log", level: "info" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/taskmaster",
      collection: "loginfo",
      level: "info",
      capped: true,
    }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/taskmaster",
      collection: "logerror",
      level: "error",
      capped: true,
    }),
  ],
});



winston.exceptions.handle();

process.on("uncaughtException", (ex) => {
  console.log("WE GOT AND UNCAUGTH EXCEPTION");
  logger.error(ex);

  process.exit(1);
});
process.on("unhandledRejection", (ex) => {
  logger.error(ex.message, ex);
  throw ex;

  process.exit(1);
});


const port = process.env.PORT || 70;
app.listen(port, () => {
  console.log("listen on port ", port);
});
