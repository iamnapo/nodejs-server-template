import { Router } from "express";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

import resolvers from "../graphql/resolvers.js";
import schema from "../graphql/schema.js";

const router: Router = Router({ mergeParams: true });

router.get("/", (req, res) => {
	res.type("html").end(ruruHTML({ endpoint: req.baseUrl }));
});

router.all("/", createHandler({ schema: buildSchema(schema), rootValue: resolvers }));

export default router;
