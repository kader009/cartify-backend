import { Request, Response } from 'express';
import ProductValidatoinSchema from './product.validation';
import { ProductService } from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    const zodParser = ProductValidatoinSchema.parse(req.body);
    const result = await ProductService.createProductIntoDb(zodParser);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
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

const getAllProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  const result = await ProductService.getAllProductIntoDb(searchTerm as string);

  res.status(200).json({
    success: true,
    message: 'Product fetch successfully',
    data: result,
  });
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductIntoDb(productId);

    res.status(200).json({
      success: true,
      message: 'Single product fetch successfully',
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

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const result = await ProductService.updateSingleProductIntoDb(
      productId,
      data,
    );

    res.status(200).json({
      success: true,
      message: 'Product update successfully',
      data: result,
    });
  } catch (error) {
    let message = 'Can not update product data';
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({
      success: false,
      message: message,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductService.deletSingleProductIntoDb(productId);

    res.status(200).json({
      success: true,
      message: 'Product delete successfully',
      data: null,
    });
  } catch (error) {
    let message = 'Can not delete product data';
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({
      success: false,
      message: message,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
