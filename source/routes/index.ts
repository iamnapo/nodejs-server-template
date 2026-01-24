import { Router } from "express";

import graphqlRoutes from "./graphql.ts";
import publicRoutes from "./public.ts";

const router = Router({ mergeParams: true });

router.use("/", publicRoutes);
router.use("/graphql/", graphqlRoutes);

export default router;
