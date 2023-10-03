import { Pool } from 'pg';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const createProductModel = (pool: Pool) => {
  // Function to create a new product
  const create = async (product: Product) => {
    const { name, description, price } = product;
    try {
      const result = await pool.query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *', [
        name,
        description,
        price,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating a new product');
    }
  };

  // Function to update an existing product
  const update = async (productId: number, updatedProduct: Product) => {
    const { name, description, price } = updatedProduct;
    try {
      const result = await pool.query('UPDATE products SET name = $2, description = $3, price = $4 WHERE id = $1 RETURNING *', [
        productId,
        name,
        description,
        price,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error updating the product');
    }
  };

  // Function to list all products
  const list = async () => {
    try {
      const result = await pool.query('SELECT * FROM products');
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  };

  // Function to get details of a product by ID
  const getById = async (productId: number) => {
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error fetching product details');
    }
  };

  return {
    create,
    update,
    list,
    getById,
  };
};
