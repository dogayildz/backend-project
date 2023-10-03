import express from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

export default function authRoutes(pool: Pool) {
  // Admin registration
  router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the username is already taken
      const existingUser = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert the new admin user into the database
      await pool.query('INSERT INTO admin_users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

      res.status(201).json({ message: 'Admin user registered successfully' });
    } catch (error) {
      console.error('Error registering admin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Admin login
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the admin user exists
      const userResult = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);

      const user = userResult.rows[0];

      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Generate and send a JWT token
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
        expiresIn: '1h', // Token expires in 1 hour
      });

      res.json({ token });
    } catch (error) {
      console.error('Error logging in admin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
