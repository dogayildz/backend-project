import { Request, Response } from 'express';
import { Pool } from 'pg';

export const createProduct = async (req: Request, res: Response, pool: Pool) => {
  try {
    const { name, description, price } = req.body;
    // Validate input
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    // Insert product into the database
    const result = await pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *', [
      name,
      description,
      price,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update product information by ID
export const updateProduct = async (req: Request, res: Response, pool: Pool) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, description, price } = req.body;

    // Validate input
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    // Check if the product exists
    const productCheck = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);

    if (productCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product information
    const result = await pool.query('UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *', [
      name,
      description,
      price,
      productId,
    ]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// List all products
export const listProducts = async (req: Request, res: Response, pool: Pool) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error listing products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
