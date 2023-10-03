"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pg_1 = require("pg");
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// PostgreSQL connection setup
const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    port: 5432,
    database: 'online_shopping',
});
pool.on('error', (err) => {
    console.error('PostgreSQL error:', err);
});
// Routes
app.use('/customers', (0, customerRoutes_1.default)(pool));
app.use('/products', (0, productRoutes_1.default)(pool));
app.use('/orders', (0, orderRoutes_1.default)(pool));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
