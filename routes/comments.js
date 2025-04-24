import express from 'express';
import Comment from '../models/Comment.js';
const router = express.Router();

// Get comments for an assignment
router.get('/:assignmentId', async (req, res) => {
  try {
    const comments = await Comment.find({ assignmentId: req.params.assignmentId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Post a new comment
router.post('/', async (req, res) => {
  try {
    const { assignmentId, userName, content } = req.body;
    const comment = new Comment({ assignmentId, userName, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

export default router;
