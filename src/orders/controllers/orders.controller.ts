//express: to add types to the request/response objects
import express from "express";

import ordersService from "../services/orders.service";

//password hashing:
import argon2 from "argon2";
import Debug from "debug";

const debug: Debug.IDebugger = Debug("app: orders-controller");

class OrdersController {
  async getOrderByOrderNumber(req: express.Request, res: express.Response) {
    const order = await ordersService.readById(req.params.orderNumber);
    res.status(200).send(order);
  }

  async createOrder(req: express.Request, res: express.Response) {
    //req.body.password = await argon2.hash(req.body.password);
    const orderId = await ordersService.create(req.body);
    res.status(201).send({ id: orderId });
  }
}

export default new OrdersController();
