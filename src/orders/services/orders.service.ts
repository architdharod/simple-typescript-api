import ordersDao from "../dto/orders.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateOrderDto } from "../dto/create.order.dto";

class OrderService implements CRUD {
  async create(resource: CreateOrderDto) {
    return ordersDao.addOrder(resource);
  }

  async readById(orderNumber: string) {
    return ordersDao.getOrderByNumber(orderNumber);
  }
  //async list(limit: number, page: number) {}
  //async putById(id: string, resource: any) {}
  //async deleteById(id: string) {}
  //async patchById(id: string, resource: any) {}
}

export default new OrderService();
