import express from 'express';
import { OrderController } from './order.controllers';

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrder);

export const OrderRouter = router;
