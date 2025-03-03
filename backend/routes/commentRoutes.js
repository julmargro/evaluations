const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get comments for a question and assessment
router.get('/:assessmentId/:questionId', async (req, res) => {
    try {
        const { assessmentId, questionId } = req.params;
        if (isNaN(assessmentId) || isNaN(questionId)) {
            return res.status(400).json({ message: "Invalid assessmentId or questionId" });
        }

        const query = 'SELECT * FROM comment WHERE assessmentId = $1 AND questionId = $2 ORDER BY date ASC';
        const result = await pool.query(query, [assessmentId, questionId]);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new comment
router.post('/:assessmentId/:questionId', async (req, res) => {
    try {
        const { assessmentId, questionId } = req.params;
        const { userId, commentText } = req.body;

        const query = `
        INSERT INTO comment (questionId, assessmentId, userId, commentText) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
        const result = await pool.query(query, [questionId, assessmentId, userId, commentText]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Edit a comment
router.put('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, commentText } = req.body;

        const query = `UPDATE comment SET commentText = $1 WHERE commentId = $2 AND userId = $3`;
        await pool.query(query, [commentText, commentId, userId]);

        res.status(201).json({ message: "Comment updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a comment
router.delete('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;

        const query = `DELETE FROM comment WHERE commentId = $1`;
        const result = await pool.query(query, [commentId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
