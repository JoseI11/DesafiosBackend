import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils/utils.js";
import socket from './socket.js'

import session from "express-session";
import MongoStore from "connect-mongo";
import productsRouter from './routes/products.router.js';
import mailRouter from './routes/mail.router.js'
import cartrouter from './routes/cart.router.js'
import viewrouter from './routes/views.router.js'
import database from "./db.js";
import config from "./config/config.js";
import mockRouter from "./routes/mocking.router.js";
import sessionsRouter from "./routes/sessions.router.js"
import smsRouter from "./routes/sms.router.js"
import { winstonLogger,logger } from "./utils/logger.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
// import passport from "passport";
// import initializePassport from "../middlewares/passport.js";

//Initialization
const productServer = express();

//Middlewares
productServer.use(winstonLogger)
productServer.use(express.json());
productServer.use(express.static(`${__dirname}/public`));
productServer.use(express.urlencoded({ extended: true }));
productServer.use(express.static(`${__dirname}/public`));


productServer.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.dbUrl,
      ttl: 60
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSecret,
  })
);
initializePassport()
productServer.use(passport.initialize())
productServer.use(passport.session())

//View engine
productServer.engine("handlebars", handlebars.engine());
productServer.set("views", `${__dirname}/views`);
productServer.set("view engine", "handlebars");



const httpServer = productServer.listen(8080, (req, res) => {
  try {
    console.log("Listening on port 8080")
  } catch (error) {
    req.logger.error("Cannot connect to the server")
    return res.status(500).send({
      status: "error",
      error: "Failed to the connect to the server",
  });
  }
});
database.connect();

productServer.get("/mockingproducts", mockRouter)
productServer.get("/mail", mailRouter)
productServer.get("/sms", smsRouter)
//productServer.use("/chat",chatRouter);
productServer.use("/api/sessions", sessionsRouter);
//productServer.get("/loggerTest",loggerRouter)
productServer.use("/api/products", productsRouter);
productServer.get("/loggerTest", (req, res) => {
  req.logger.debug("This is a debug log");
  req.logger.http("This is an HTTP log");
  req.logger.info("This is an info log");
  req.logger.warning("This is a warning log");
  req.logger.error("This is an error log");
  req.logger.fatal("This is a fatal log");

  res.send("Logger test completed");
});
productServer.use("/api/carts", cartrouter);
productServer.use("/", viewrouter);
socket.connect(httpServer)




