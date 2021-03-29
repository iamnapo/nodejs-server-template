import express from "express";

const router = express.Router({ mergeParams: true });

router.get("/ping/", (req, res) => res.json({ message: "pong" }));

export default router;
