import express from "express";

const router = express.Router();

// Mock department list
router.get("/", (req, res) => {
  res.json({ departments: ["Transport", "Road", "Water"] });
});

export default router;
