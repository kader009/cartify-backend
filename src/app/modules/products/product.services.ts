import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDb = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductIntoDb = async (searchTerm = '') => {
  const query = searchTerm
    ? { name: { $regex: searchTerm, $options: 'i' } }
    : {};

  const result = await Product.find(query);
  return result;
};

const getSingleProductIntoDb = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateSingleProductIntoDb = async (productId: string, data: TProduct) => {
  const result = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });
  return result;
};

const deletSingleProductIntoDb = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductService = {
  createProductIntoDb,
  getAllProductIntoDb,
  getSingleProductIntoDb,
  updateSingleProductIntoDb,
  deletSingleProductIntoDb,
};
