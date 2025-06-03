import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDb = async (OrderData: TOrder) => {
  const result = await Order.create(OrderData);
  return result;
};

const getOrdersIntoDb = async (query: string | undefined) => {
  const filter = query ? { email: query } : {};
  const result = await Order.find(filter);
  return result;
};

export const OrderService = {
  createOrderIntoDb,
  getOrdersIntoDb,
};
