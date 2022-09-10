import dotenv from "dotenv";
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.
import express from "express";
import * as http from "http";
//for logging requests to our API and responses.
import * as winston from "winston";
import * as expressWinston from "express-winston";
//cross origin resource sharing
//import * as cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { OrdersRoutes } from "./orders/orders.routes.config";
import Debug from "debug";
//variables to be used:
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debug: debug.IDebugger = Debug("app");

//middleware to parse all incoming requests as JSON
app.use(express.json());

//expressWinston logging middleware configuration
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}
//initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

/**--------------------------------------------------------------------------------------- */

// here we are adding the OrderRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new OrdersRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

app.get("/", (req, res) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debug(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});