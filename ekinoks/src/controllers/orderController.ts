import { Request, Response } from 'express';
import { Pool } from 'pg';

export const createOrder = async (req: Request, res: Response, pool: Pool) => {
  try {
    const { customer_id, product_id, quantity } = req.body;
    // Validate input
    if (!customer_id || !product_id || !quantity) {
      return res.status(400).json({ error: 'Customer ID, product ID, and quantity are required' });
    }
    // Insert order into the database
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
};

// List orders by customer ID
export const listOrdersByCustomer = async (req: Request, res: Response, pool: Pool) => {
  try {
    const customerId = parseInt(req.params.customerId);

    // Validate input
    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Check if the customer exists
    const customerCheck = await pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);

    if (customerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // List orders for the specified customer
    const result = await pool.query('SELECT * FROM orders WHERE customer_id = $1', [customerId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error listing orders by customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get order details by order ID
export const getOrderDetails = async (req: Request, res: Response, pool: Pool) => {
  try {
    const orderId = parseInt(req.params.orderId);

    // Validate input
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Get order details
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error getting order details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
