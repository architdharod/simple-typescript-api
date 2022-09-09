import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";

export class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "OrdersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/OrderStatus/:orderNumber")
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          //place for middleware.
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(`GET requested for order ${req.params.orderNumber}`);
      });

    return this.app;
  }
}
