"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}; //import the jsonwebtoken module. This module is used to create and validate JWT.
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("types.d.ts");
const authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, 'your-secret-key');
        //(req as Request).adminId = decoded.userId;
        next();
    }
    catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticateAdmin = authenticateAdmin;
// Use this middleware in routes that require authentication
