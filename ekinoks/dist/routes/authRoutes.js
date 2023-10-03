"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
function authRoutes(pool) {
    // Admin registration
    router.post('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            // Check if the username is already taken
            const existingUser = yield pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            // Insert the new admin user into the database
            yield pool.query('INSERT INTO admin_users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
            res.status(201).json({ message: 'Admin user registered successfully' });
        }
        catch (error) {
            console.error('Error registering admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }));
    // Admin login
    router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            // Check if the admin user exists
            const userResult = yield pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
            const user = userResult.rows[0];
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // Compare the hashed password
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            // Generate and send a JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'your-secret-key', {
                expiresIn: '1h', // Token expires in 1 hour
            });
            res.json({ token });
        }
        catch (error) {
            console.error('Error logging in admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }));
    return router;
}
exports.default = authRoutes;
