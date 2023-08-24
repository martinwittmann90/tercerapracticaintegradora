import { faker } from '@faker-js/faker';

class ServiceMock {
  async getAllProductsMock() {
    try {
      const products = [];
      const generateProduct = () => {
        return {
          _id: faker.database.mongodbObjectId(),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          thumbnail: faker.image.imageUrl(),
          code: faker.random.alphaNumeric(10),
          stock: faker.datatype.number(1000),
          category: faker.commerce.department(),
          status: faker.datatype.boolean(),
        };
      };
      do {
        products.push(generateProduct());
      } while (products.length < 100);
      return { status: 200, result: { status: 'success', payload: products } };
    } catch (error) {
      logger.error(error);
      return {
        status: 500,
        result: { status: 'error', msg: 'Internal Server Error', payload: {} },
      };
    }
  }
}

export default ServiceMock;
