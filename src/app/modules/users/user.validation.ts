import { z } from 'zod';
import { Types } from 'mongoose';

const userValidation = z.object({
  _id: z.instanceof(Types.ObjectId),
  name: z.string().min(8, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  role: z.string().nonempty({ message: 'Role is required' }),
}); 

export default userValidation;
