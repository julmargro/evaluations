const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get questions by role
router.get('/', async (req, res) => {
    try {
        const { role } = req.query;
        let query = 'SELECT questionId, level, category, relatedPEOCapabilities, relatedPEOBehaviours, questionText FROM question WHERE 1=1';
        let params = [];

        if (role) {
            params.push(role);
            query += ` AND role = $${params.length}`;
        }
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
