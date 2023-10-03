//Controller file that manages client-related functionality. Operations such as adding new customers are done in this file.

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }  //This function creates a new customer.
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = void 0;
const createCustomer = (req, res, pool) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Validate input 
        //Processes the incoming request. Retrieves the requester's name, email address, and password.
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        // Insert customer into the database
        const result = yield pool.query('INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
            name,
            email,
            password,
        ]);
        res.status(201).json(result.rows[0]);
    } //It verifies the incoming information, and if there is missing information, an error message is returned.
    catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createCustomer = createCustomer;
// Implement other customer-related controller functions (e.g., update, list, get details)
//It adds the customer to the database and returns the created customer as a response.
