// Imports
const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Database
const DB = process.env.DATABASE_URI_ONLINE;
mongoose.connect(DB).then(() => {
  console.log("database has succesfully connected");
});

// Server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("سوف يتم أغلاق السيرفر");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("سوف يتم أغلاق السيرفر");
  server.close(() => {
    process.exit(1);
  });
});
