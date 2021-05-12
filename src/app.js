import "dotenv/config";

import fastify from "fastify";
import compress from "fastify-compress";
import cors from "fastify-cors";
import Sentry from "@sentry/node";
import helmet from "fastify-helmet";
import cookie from "fastify-cookie";

import routes from "./routes/index.js";
import plugins from "./plugins/index.js";

Sentry.init({ enabled: process.env.NODE_ENV === "production" });

export default (opts = {}) => {
	const app = fastify({ ...opts, ignoreTrailingSlash: true });

	app.register(helmet, { contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false });
	app.register(cookie);
	app.register(cors, { credentials: true, origin: true });
	app.register(compress);

	app.register(plugins);
	app.register(routes, { prefix: "/" });
	app.all("/*", (req, reply) => reply.code(404).send({ message: "Page not found 😞" }));

	return app;
};
