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
function productRoutes(pool) {
    // Implement your product routes here
    // Example route: Add a new product
    router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price } = req.body;
            // Validate input and insert product into the database
            const result = yield pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *', [
                name,
                description,
                price,
            ]);
            res.status(201).json(result.rows[0]);
        }
        catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }));
    // Implement other product routes similarly
    return router;
}
exports.default = productRoutes;
