import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js";
import socket from './socket.js'
import session from "express-session";
import MongoStore from "connect-mongo";
import database from "./db.js";
import config from "./config.js";
import { winstonLogger } from "./utils/logger.js";
import routesFunction from "./routes/app.router.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import cookieParser from "cookie-parser"

//Initialization
const productServer = express();

//Middlewares
productServer.use(winstonLogger)
productServer.use(express.json());
productServer.use(express.static(`${__dirname}/public`));
productServer.use(express.urlencoded({ extended: true }));
productServer.use(express.static(`${__dirname}/public`));
productServer.use(cookieParser())

productServer.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.dbUrl,
      ttl: 6000
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSecret,
  })
);
initializePassport()
routesFunction(productServer)
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
   console.log(error)
    return res.status(500).send({
      status: "error",
      error: "Failed to the connect to the server",
  });
  }
});
database.connect();

socket.connect(httpServer)




