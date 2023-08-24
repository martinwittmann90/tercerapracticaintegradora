import ProductModel from '../models/product.model.js';

class ProductsDAO {
  async getAllProductsDao(filter, options) {
    try {
      const products = await ProductModel.paginate(filter, options);
      return products;
    } catch (err) {
      throw err;
    }
  }
  async getProductByCode(code) {
    try {
      const product = await ProductModel.findOne({ code });
      return product;
    } catch (err) {
      throw `No se encontró el producto.`;
    }
  }
  async createOneProduct(productData) {
    const product = ProductModel.create(productData);
    return product;
  }
  async deleteOneProduct(productId) {
    const product = ProductModel.findByIdAndDelete(productId);
    return product;
  }
  async updateOneProduct(productId, updatedData) {
    const product = ProductModel.findByIdAndUpdate(productId, updatedData, { new: true });
    return product;
  }
  async getProduct(productId) {
    const product = ProductModel.findById(productId);
    return product;
  }
}
export default ProductsDAO;
