import express from "express";

import publicRoutes from "./public.js";

const router = express.Router({ mergeParams: true });
router.use("/", publicRoutes);

export default router;
