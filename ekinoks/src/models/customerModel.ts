import { Pool } from 'pg';

export interface Customer {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const createCustomerModel = (pool: Pool) => {
  const create = async (customer: Customer) => {
    const { name, email, password } = customer;
    const result = await pool.query('INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
      name,
      email,
      password,
    ]);
    return result.rows[0];
  };

  const findByEmail = async (email: string) => {
    const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    return result.rows[0];
  };

  const update = async (customerId: number, updatedCustomer: Customer) => {
    const { name, email, password } = updatedCustomer;
    const result = await pool.query('UPDATE customers SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [
      name,
      email,
      password,
      customerId,
    ]);
    return result.rows[0];
  };

  const findById = async (customerId: number) => {
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);
    return result.rows[0];
  };

  // Export all functions here
  return {
    create,
    findByEmail,
    update,
    findById,
  };
};
