import express from "express";

import graphqlRoutes from "./graphql.js";
import publicRoutes from "./public.js";

const router = express.Router({ mergeParams: true });
router.use("/", publicRoutes);
router.use("/graphql/", graphqlRoutes);

export default router;
