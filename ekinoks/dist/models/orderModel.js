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
//The create function creates a new order using the provided order information and adds it to the database. It then returns the created order.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderModel = void 0;
const createOrderModel = (pool) => {
    const create = (order) => __awaiter(void 0, void 0, void 0, function* () {
        const { customer_id, product_id, quantity } = order;
        const result = yield pool.query('INSERT INTO orders (customer_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [
            customer_id,
            product_id,
            quantity,
        ]);
        return result.rows[0];
    });
    //The listByCustomerId function returns the orders belonging to the given customer ID, sorted by date.
    const listByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield pool.query('SELECT * FROM orders WHERE customer_id = $1 ORDER BY order_date DESC', [customerId]);
        return result.rows;
    });
    // Implement other order-related model functions (e.g., get by ID)
    return {
        create,
        listByCustomerId,
        // Export other functions here
    };
};
exports.createOrderModel = createOrderModel;
