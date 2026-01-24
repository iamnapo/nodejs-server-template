import { Router } from "express";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import helmet from "helmet";
import { ruruHTML } from "ruru/server";
import { serveStatic } from "ruru/static";

import resolvers from "#graphql/resolvers.ts";
import schema from "#graphql/schema.ts";

const router = Router({ mergeParams: true });

router.use(serveStatic("/static/"));

router.get(
	"/",
	helmet({
		contentSecurityPolicy: {
			directives: {
				scriptSrc: ["'self'", "'unsafe-inline'"],
			},
		},
	}),
	(_, res) =>
		res.format({
			html: () => res.send(ruruHTML({ endpoint: "/graphql", staticPath: "/graphql/static/" })),
			default: () => res.status(406).end(),
		}),
);

router.all("/", createHandler({ schema: buildSchema(schema), rootValue: resolvers }));

export default router;
