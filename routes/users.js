// routes/users.js (or wherever your user routes are defined)
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/contractors", async (req, res) => {
  try {
    const contractors = await User.find({ role: "contractor" }).select("companyName");
    res.json(contractors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contractors" });
  }
});

export default router;
