"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    }); //The create function creates a new customer using the provided customer information and adds it to the database. It then returns the created customer.
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerModel = void 0;
const createCustomerModel = (pool) => {
    const create = (customer) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = customer;
        const result = yield pool.query('INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
            name,
            email,
            password,
        ]);
        return result.rows[0];
    });
    //The findByEmail function searches the database for the customer with the given email address and returns it if found.
    const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield pool.query('SELECT * FROM customers WHERE email = $1', [email]);
        return result.rows[0];
    });
    // Implement other customer-related model functions (e.g., update, find by ID)
    return {
        create,
        findByEmail,
        // Export other functions here
    };
};
exports.createCustomerModel = createCustomerModel;
