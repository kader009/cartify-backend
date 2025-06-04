import express, { Application } from 'express';
import cors from 'cors';
import { ProductRouter } from './app/modules/products/product.routes';
import { OrderRouter } from './app/modules/orders/order.routes';
import { UserRouter } from './app/modules/users/user.routes';
import globalErrorHandler from './app/middleware/globalErrorhandler';
const app: Application = express();

// middileware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/orders', OrderRouter);
app.use('/api/v1/users', UserRouter);

app.get('/', (req, res) => {
  res.send({
    status: true,
    message: 'Server Live',
  });
});

// global error handler
app.use(globalErrorHandler);

export default app;
