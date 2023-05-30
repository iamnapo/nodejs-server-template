import "dotenv/config";

import Fastify from "fastify";
import compress from "@fastify/compress";
import cors from "@fastify/cors";
import Sentry from "@sentry/node";
import helmet from "@fastify/helmet";
import cookie from "@fastify/cookie";

import routes from "./routes/index.js";
import plugins from "./plugins/index.js";

Sentry.init({ enabled: process.env.NODE_ENV === "production" });

const app = (opts = {}) => {
	const fastify = Fastify({ ...opts, ignoreTrailingSlash: true });

	void fastify.register(helmet, { contentSecurityPolicy: process.env.NODE_ENV === "production" });
	void fastify.register(cookie);
	void fastify.register(cors, { credentials: true, origin: true });
	void fastify.register(compress);

	void fastify.register(plugins);
	void fastify.register(routes, { prefix: "/" });

	return fastify;
};

export default app;
