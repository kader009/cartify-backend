import { RequestHandler } from 'express';
import orderValidationSchema from './order.validation';
import { OrderService } from './order.services';
import { Product } from '../products/product.model';

const createOrder: RequestHandler = async (req, res) => {
  try {
    const zodParser = orderValidationSchema.safeParse(req.body);

    if (!zodParser.success) {
      const errorMessages = zodParser.error.issues.map(err => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessages,
      });
      return;
    }

    const product = await Product.findById(zodParser.data.productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    if (product.inventory.quantity < zodParser.data.quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
      return;
    }

    product.inventory.quantity -= zodParser.data.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    const result = await OrderService.createOrderIntoDb(zodParser.data);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: result,
    });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({
      success: false,
      message: message,
    });
  }
};

const getAllOrder: RequestHandler = async (req, res) => {
  const email = req.query.email as string | undefined;

  try {
    const order = await OrderService.getOrdersIntoDb(email);

    if (order.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No order match with this email',
        data: [],
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Orders data fetched successfully',
      data: order,
    });
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({
      success: false,
      message: message,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
