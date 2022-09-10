import { CommonRoutesConfig } from "../common/common.routes.config";
import ordersController from "./controllers/orders.controller";
import ordersMiddleware from "./middleware/orders.middleware";
import express from "express";

export class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "OrdersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/OrderStatus/:orderNumber")
      .get(
        ordersMiddleware.validateOrderExists,
        ordersController.getOrderByOrderNumber);

    this.app
      .route("/Create")
      .post(
        ordersMiddleware.validateRequiredOrdersBodyFields,
        ordersController.createOrder
      );

    return this.app;
  }
}
