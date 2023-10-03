import { Request, Response } from 'express';
import { Pool } from 'pg';

export const createCustomer = async (req: Request, res: Response, pool: Pool) => {
  try {
    const { name, email, password } = req.body;
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    // Insert customer into the database
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
};

// Update customer information by ID
export const updateCustomer = async (req: Request, res: Response, pool: Pool) => {
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
};

// List all customers
export const listCustomers = async (req: Request, res: Response, pool: Pool) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error listing customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get customer details by ID
export const getCustomerDetails = async (req: Request, res: Response, pool: Pool) => {
  try {
    const customerId = parseInt(req.params.id);

    // Check if the customer exists
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error getting customer details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
