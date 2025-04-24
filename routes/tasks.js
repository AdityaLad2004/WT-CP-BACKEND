// routes/tasks.js
import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Create Task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Tasks by Contractor's Company Name
router.get("/contractor/:companyName", async (req, res) => {
    try {
      const tasks = await Task.find({ contractor: req.params.companyName });
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Get Tasks by Assignment ID
router.get("/:assignmentId", async (req, res) => {
  try {
    const tasks = await Task.find({ assignmentId: req.params.assignmentId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:taskId", async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.taskId,
        { status: req.body.status },
        { new: true } // Return the updated task
      );
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;
