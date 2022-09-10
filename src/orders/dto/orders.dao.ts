import { CreateOrderDto } from "./create.order.dto";
import { PutOrderDto } from "./put.order.dto";

import shortid from "shortid"; //TODO: remove this for production
import debug from "debug";

const log: debug.IDebugger = debug("app:in-memory-dao");

class OrdersDao {
  orders: Array<CreateOrderDto> = [];

  constructor() {
    log("Created new instance of OrdersDao");
  }

  async addOrder(order: CreateOrderDto) {
    //order.id = shortid.generate();
    this.orders.push(order);
    return order.id;
  }

  async getOrderByNumber(orderNumber: string) {
    const objIndex = this.orders.findIndex(
      (obj: { orderNumber: string }) => obj.orderNumber === orderNumber
    );
    let currentOrder = this.orders[objIndex];
    if (currentOrder) {
      return currentOrder;
    } else {
      return null;
    }
  }
}

export default new OrdersDao();
