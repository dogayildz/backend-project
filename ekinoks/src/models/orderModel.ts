import { Pool } from 'pg';

export interface Order {
  id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  order_date: Date;
}

export const createOrderModel = (pool: Pool) => {
  const create = async (order: Order) => {
    const { customer_id, product_id, quantity } = order;
    const result = await pool.query('INSERT INTO orders (customer_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [
      customer_id,
      product_id,
      quantity,
    ]);
    return result.rows[0];
  };

  const listByCustomerId = async (customerId: number) => {
    const result = await pool.query('SELECT * FROM orders WHERE customer_id = $1 ORDER BY order_date DESC', [customerId]);
    return result.rows;
  };

  const getById = async (orderId: number) => {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    return result.rows[0];
  };

  // Export all functions here
  return {
    create,
    listByCustomerId,
    getById,
  };
};
