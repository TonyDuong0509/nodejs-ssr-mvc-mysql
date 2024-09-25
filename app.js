const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
require("dotenv").config();
const session = require("express-session");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(`${__dirname}/public`));

var FileStore = require("session-file-store")(session);

app.use(
  session({
    store: new FileStore({}),
    secret: "francisduong0509",
    resave: false,
    saveUninitialized: true,
  })
);

const port = process.env.PORT;
const host = process.env.HOST;

const helpers = require("./utils/helpers");
app.locals.helpers = helpers;

// Middleware
app.use((req, res, next) => {
  app.locals.currentRoute = helpers.getCurrentRoute(req.path);
  app.locals.session = req.session;
  next();
});

const indexRouter = require("./routers/IndexRouter");
app.use("/", indexRouter);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
