import { Router } from "express";

import graphqlRoutes from "./graphql.js";
import publicRoutes from "./public.js";

const router: Router = Router({ mergeParams: true });

router.use("/", publicRoutes);
router.use("/graphql/", graphqlRoutes);

export default router;
