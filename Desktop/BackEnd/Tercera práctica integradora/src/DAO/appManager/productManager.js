import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    return await this.read(this.file);
  }

  async getProductById(id) {
    let allProductsArray = await this.read(this.file);
    const product = allProductsArray.find((product) => product.id == id);
    return product;
  }

  async addProduct(newProduct) {
    let allProductsArray = await this.read(this.file);
    let nextId = await this.getNextId(allProductsArray);
    newProduct.id = nextId;
    newProduct.status = true;
    allProductsArray.push(newProduct);
    await this.write(allProductsArray);
    return newProduct;
  }

  async updateProduct(id, newProduct) {
    let allProductsArray = await this.read(this.file);
    const productToUpdate = allProductsArray.find(
      (product) => product.id == id
    );
    if (!productToUpdate) {
      console.log("producto no encontrado", productToUpdate);
      return {
        status: "error",
        message: "Sorry, no product found by id: " + id,
        payload: {},
      };
    }
    newProduct = this.updateProductFields(productToUpdate, newProduct);
    const index = allProductsArray.indexOf(productToUpdate);
    allProductsArray[index] = newProduct;
    await this.write(allProductsArray);
    return newProduct;
  }

  async deleteProduct(id) {
    let allProductsArray = await this.read(this.file);
    const productToDelete = allProductsArray.find(
      (product) => product.id == id
    );
    if (!productToDelete) {
      return {
        status: "error",
        message: "Sorry, no product found by id: " + id,
        payload: {},
      };
    }
    const index = allProductsArray.indexOf(productToDelete);
    allProductsArray.splice(index, 1);
    await this.write(allProductsArray);
    return productToDelete;
  }

  updateProductFields(productToUpdate, newProduct) {
    const updatedProduct = {
      ...productToUpdate,
      ...newProduct,
    };
    return updatedProduct;
  }

  async read() {
    let allProductsArray = [];
    try {
      let allproductstring = await fs.promises.readFile(this.path, "utf-8");
      allproductstring.length > 0
        ? (allProductsArray = JSON.parse(allproductstring))
        : (allProductsArray = []);
    } catch (error) {
      console.log("Error en la lectura del archivo", error);
    }
    return allProductsArray;
  }

  async write(allProductsArray) {
    let allproductstring = JSON.stringify(allProductsArray, null, 2);
    try {
      await fs.promises.writeFile(this.path, allproductstring);
    } catch (error) {
      console.log("Error en la escritura", error);
    }
  }

  async getNextId(allProductsArray) {
    let lastId = 0;
    const allIdsArray = allProductsArray.map((product) => product.id);
    allIdsArray.filter((id) => typeof id === "number");
    if (allIdsArray.length > 0) {
      lastId = Math.max(...allIdsArray);
    }
    return lastId + 1;
  }
}

export default ProductManager;