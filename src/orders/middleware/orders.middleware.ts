import express from "express";
import ordersService from "../services/orders.service";
import Debug from "debug";

const debug: Debug.IDebugger = Debug("app: users-controller/middleware");

class OrdersMiddleware {
  async validateRequiredOrdersBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.id &&
      req.body.orderNumber &&
      req.body.customerNumber &&
      req.body.status
    ) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields order Number, Customer Number or status`,
      });
    }
  }

  async validateOrderExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const order = await ordersService.readById(req.params.orderNumber);
    if (order) {
      next();
    } else {
      res.status(404).send({
        error: `Order ${req.params.orderNumber} not found`,
      });
    }
  }

  async extractOrderId() {
    //dont need it yet.
  }
}

export default new OrdersMiddleware();

/**
 *     orderNumber: string;
    customerNumber: string;
    status: string;
 */
