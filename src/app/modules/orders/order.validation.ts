import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be string',
  }),

  productId: z.string({
    required_error: 'productId is required',
    invalid_type_error: 'productid must be a string',
  }),

  quantity: z.number({
    required_error: 'quantity is required',
    invalid_type_error: 'quantity must be a number',
  }),

  price: z.number({
    required_error: 'price is required',
    invalid_type_error: 'price must be a number',
  }),
});

export default orderValidationSchema;
