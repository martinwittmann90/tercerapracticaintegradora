import { promises as fs } from "fs";
import SyncFs from "fs";
class CartManager {

    constructor(path) {
        this.path = path;
    }

    getCarts = async () => {
        if (!SyncFs.existsSync(this.path)) {
            return [];
        } else {
            let answer = await fs.readFile(this.path, "utf-8");
            return JSON.parse(answer);
        }}
    createCart = async () => {
        try {
            const carts = await this.getCarts();
            const newCart = { id: (Math.random() * 10000000).toFixed(0), products: [{ id: "", quantity: "" }] };
            carts.push(newCart);
            const cartsString = JSON.stringify(carts, null, 2)
            await fs.writeFile(this.path, cartsString);
            return carts;
        } catch (error) {
            console.log(error);
            throw new Error("error, reading or writting file");
        }}

    addProductToCart = async (cartId, productsId) => {
        try {
            let carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                throw new Error('Cart not found');
            }
            const productIndex = carts[cartIndex].products.findIndex(product => product.id === productsId);
            if (productIndex === -1) {
                carts[cartIndex].products.push({ id: productsId, quantity: 1 });
            } else {
                carts[cartIndex].products[productIndex].quantity++;
            }
            const cartsString = JSON.stringify(carts, null, 2);
            await fs.writeFile(this.path, cartsString);
        } catch (error) {
            console.log(error);
            throw new Error('error');
        }}

    removeProductFromCart = async (cartId, productsId) => {
        try {
            let carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                throw new Error('Cart not found');
            }
            const productIndex = carts[cartIndex].products.findIndex(product => product.id === productsId);
            if (productIndex === -1) {
                throw new Error('Product not found');
            }
            if (carts[cartIndex].products[productIndex].quantity === 0) {
                carts[cartIndex].products.splice(productIndex, 1);
            } else {
                carts[cartIndex].products[productIndex].quantity--;
            }
            const cartsString = JSON.stringify(carts, null, 2);
            await fs.writeFile(this.path, cartsString);
        } catch (error) {
                console.log(error);
                throw new Error('General error');
            }}}

export default CartManager;
