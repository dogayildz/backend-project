import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import customerRoutes from './routes/customerRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
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
app.use('/customers', customerRoutes(pool));
app.use('/products', productRoutes(pool));
app.use('/orders', orderRoutes(pool));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
