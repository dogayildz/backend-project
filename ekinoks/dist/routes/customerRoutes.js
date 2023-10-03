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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
function customerRoutes(pool) {
    // Implement your customer routes here
    // Example route: Add a new customer
    router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            // Validate input and insert customer into the database
            const result = yield pool.query('INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
                name,
                email,
                password,
            ]);
            res.status(201).json(result.rows[0]);
        }
        catch (error) {
            console.error('Error adding customer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }));
    // Implement other customer routes similarly
    return router;
}
exports.default = customerRoutes;
