// const { productsMock } = require('../utils/mocks');
const mongoLib = require('../lib/mongo');

class ProductService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new mongoLib();
  }

  async getProducts({ categories }) {
    const query = categories && { categories: { $in : [categories] }};
    console.log('query', query);
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.getById(this.collection,productId);
    return product || {};
  }

  async createProduct({ product }) {
    const productId = await this.mongoDB.create(this.collection, product);
    return productId;
  }

  // importante la forma de pasar los parámetros
  async updateProduct({ productId, product } = {}) {
    const updatedProductId = await this.mongoDB.update(this.collection, productId, product);
    return updatedProductId;
  }

  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(this.collection, productId);
    return deletedProductId;
  }
}

module.exports = ProductService;
