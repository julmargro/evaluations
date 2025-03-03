const express = require('express');
const pool = require('../db');
const router = express.Router();
const bcrypt = require("bcrypt");

// Get all managers
router.get('/managers', async (req, res) => {
    try {
        const query = 'SELECT userId, firstName, lastName, email FROM users WHERE individualContributor = false';
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error fetching managers:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create user
router.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName, managerId, individualContributor } = req.body;
        const query = `
            INSERT INTO users (email, password, firstName, lastName, managerId, individualContributor)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [email, password, firstName, lastName, managerId, individualContributor];

        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
