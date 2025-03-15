import express from "express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";
import { createHandler } from "graphql-http/lib/use/express";

import schema from "../graphql/schema.js";
import resolvers from "../graphql/resolvers.js";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
	res.type("html").end(ruruHTML({ endpoint: req.baseUrl }));
});

router.all(
	"/",
	createHandler({
		schema: buildSchema(schema),
		rootValue: resolvers,
	}),
);

export default router;
