import express from 'express';
import { Pool } from 'pg';

const router = express.Router();

export default function productRoutes(pool: Pool) {
  // Implement your product routes here

  // Example route: Add a new product
  router.post('/', async (req, res) => {
    try {
      const { name, description, price } = req.body;
      // Validate input and insert product into the database
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
  });

  // List all products
  router.get('/', async (req, res) => {
    try {
      // Retrieve all products from the database
      const result = await pool.query('SELECT * FROM products');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error listing products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get product by ID
  router.get('/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id);

      // Retrieve the product from the database by ID
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error getting product by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update product by ID
  router.put('/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const { name, description, price } = req.body;

      // Validate input and update the product in the database
      const result = await pool.query('UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *', [
        name,
        description,
        price,
        productId,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete product by ID
  router.delete('/:id', async (req, res) => {
    try {
      const productId = parseInt(req.params.id);

      // Delete the product from the database
      const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(204).send(); // No content, as the product is deleted
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
