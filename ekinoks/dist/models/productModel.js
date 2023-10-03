"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductModel = void 0;
const createProductModel = (pool) => {
    // Function to create a new product
    //The create function creates a new product using the provided product information and adds it to the database. It then returns the created product.
    const create = (product) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, description, price } = product;
        try {
            const result = yield pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *', [
                name,
                description,
                price,
            ]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Error creating a new product');
        }
    });
    // Function to update an existing product
    //The update function updates the corresponding product with the given product ID and updated product information and returns the updated product.
    const update = (productId, updatedProduct) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, description, price } = updatedProduct;
        try {
            const result = yield pool.query('UPDATE products SET name = $2, description = $3, price = $4 WHERE id = $1 RETURNING *', [
                productId,
                name,
                description,
                price,
            ]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Error updating the product');
        }
    });
    // Function to list all products
    //list function returns all products from the database.
    const list = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield pool.query('SELECT * FROM products');
            return result.rows;
        }
        catch (error) {
            throw new Error('Error fetching products');
        }
    });
    // Function to get details of a product by ID
    const getById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield pool.query('SELECT * FROM products WHERE id = $1', [productId]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Error fetching product details');
        }
    });
    return {
        create,
        update,
        list,
        getById,
    };
};
exports.createProductModel = createProductModel;
