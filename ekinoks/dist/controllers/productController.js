"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    }); //The createProduct function creates a new product.
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const createProduct = (req, res, pool) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price } = req.body;
        // Validate input
        //get the product name, description and price from the incoming request.
        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }
        // Insert product into the database
        const result = yield pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *', [
            name,
            description,
            price,
        ]);
        res.status(201).json(result.rows[0]);
    } //We check the information we receive. If there is missing information, we return an error response.
    //If the information is valid, we add the product to the database and send the generated product as a response.
    catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createProduct = createProduct;
// Implement other product-related controller functions (e.g., update, list)
