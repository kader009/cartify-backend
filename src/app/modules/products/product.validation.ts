import { z } from 'zod';

const ProductValidatoinSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  description: z.string(),
  category: z.string(),
  price: z.number().positive(),
  image: z.string(),
  rating: z.number().min(0).max(5),
  stock: z.number().min(1),
});

export default ProductValidatoinSchema;
