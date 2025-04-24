import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// Create assignment
router.post("/", async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json({ message: "Assignment created", assignment });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// (Optional) Get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
