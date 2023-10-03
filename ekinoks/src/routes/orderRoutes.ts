import express from 'express';
import { Pool } from 'pg';

const router = express.Router();

export default function orderRoutes(pool: Pool) {


  // Example route: Make a new order
  router.post('/', async (req, res) => {
    try {
      const { customer_id, product_id, quantity } = req.body;
      // Validate input and insert order into the database
      const result = await pool.query('INSERT INTO orders (customer_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [
        customer_id,
        product_id,
        quantity,
      ]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error making an order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const { customer_id, product_id, quantity } = req.body;

      // Validate input and update the order in the database
      const result = await pool.query('UPDATE orders SET customer_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *', [
        customer_id,
        product_id,
        quantity,
        orderId,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete an order by ID
  router.delete('/:id', async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);

      // Delete the order from the database
      const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [orderId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(204).send(); // No content, as the order is deleted
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Implement other order-related routes as needed

  return router;
}
