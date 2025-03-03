const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all employees under a manager/director
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId || isNaN(userId)) {
            return res.status(400).json({ message: "Invalid or missing userId" });
        }

        const query = `
            WITH RECURSIVE subordinates AS (
                -- Start with the given userId
                SELECT userId FROM users WHERE userId = $1
                UNION ALL
                -- Recursively find subordinates by matching managerId
                SELECT u.userId 
                FROM users u
                INNER JOIN subordinates s ON u.managerId = s.userId
            )
            SELECT 
                u.userId, 
                u.firstName, 
                u.lastName, 
                u.managerId,
                m.firstName AS managerFirstName,
                m.lastName AS managerLastName
            FROM users u
            JOIN subordinates s ON u.userId = s.userId
            JOIN users m ON u.managerId = m.userId
            WHERE u.individualContributor = true
            ORDER BY u.firstName ASC, u.lastName ASC;
        `;

        const { rows } = await pool.query(query, [userId]);

        res.status(200).json(rows);

    } catch (err) {
        console.error("Error fetching employee data:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get employee info
router.get('/info/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "Invalid or missing user id" });
        }

        const query = `
            SELECT *
            FROM users
            WHERE userId = $1
        `;

        const result = await pool.query(query, [id]);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error("Error fetching user data:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;