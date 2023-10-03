"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });  //The createOrder function creates a new order. This function receives an HTTP request (req) and returns an HTTP response (res).
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const createOrder = (req, res, pool) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id, product_id, quantity } = req.body;
        //get the customer ID, product ID and quantity from the incoming request.
        // Validate input
        if (!customer_id || !product_id || !quantity) {
            return res.status(400).json({ error: 'Customer ID, product ID, and quantity are required' });
        }
        // Insert order into the database
        const result = yield pool.query('INSERT INTO orders (customer_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [
            customer_id,
            product_id,
            quantity,
        ]);
        res.status(201).json(result.rows[0]); //We check the information we receive. If there is missing information, we return an error response.
    }
    catch (error) {
        console.error('Error making an order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createOrder = createOrder;
// Implement other order-related controller functions (e.g., list, get details)
