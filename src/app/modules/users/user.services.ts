import { User } from './user.model';
import bcrypt from 'bcrypt';

const registerUser = async (email: string) => {
  return await User.findOne({ email: email });
};

const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });
  return await newUser.save();
};

const ValidatePassword = async (
  inputPassword: string,
  userPassword: string,
) => {
  return bcrypt.compare(inputPassword, userPassword);
};

export const UserServices = {
  registerUser,
  createUser,
  ValidatePassword,
};
