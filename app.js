// Express App
const express = require("express");
const app = express();

// Middlewares Import
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// App Error
const AppError = require("./utils/appError");
const errorHandler = require("./controllers/errors/errorController");

// Middlewares
const auth = require("./controllers/auth/authController");

app.use(cookieParser());
app.use(express.json({ limit: "15kb" }));
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ["name", "price"],
  })
);
app.use(
  cors({
    origin: "*",
    credentials: true,
    sameSite: "none",
  })
);

// Routes Import
const allRoutes = require(`${__dirname}/routes/allRoutes.js`);
const userRoutes = require(`${__dirname}/routes/userRoutes.js`);

// Routes
app.use("/api/sizzler/v1/", allRoutes);
app.use("/api/sizzler/v1/users", userRoutes);
app.use(express.static(path.join(__dirname, "public")));
app.all("*", (req, res, next) => {
  next(new AppError(`لا يمكن العثور علي ${req.originalUrl}`, 404));
});

app.use(errorHandler);
module.exports = app;
