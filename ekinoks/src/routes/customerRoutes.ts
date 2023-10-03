import express from 'express';
import { Pool } from 'pg';

const router = express.Router();

export default function customerRoutes(pool: Pool) {
  // Add a new customer
  router.post('/', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // Validate input and insert customer into the database
      const result = await pool.query('INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
        name,
        email,
        password,
      ]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update an existing customer by ID
  router.put('/:id', async (req, res) => {
    try {
      const customerId = parseInt(req.params.id);
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      // Check if the customer exists
      const customerCheck = await pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);

      if (customerCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Update customer information
      const result = await pool.query('UPDATE customers SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [
        name,
        email,
        password,
        customerId,
      ]);

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // List all customers
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM customers');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error listing customers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get customer by ID
  router.get('/:id', async (req, res) => {
    try {
      const customerId = parseInt(req.params.id);
      const result = await pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error getting customer by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete customer by ID
  router.delete('/:id', async (req, res) => {
    try {
      const customerId = parseInt(req.params.id);
      const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [customerId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting customer by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
