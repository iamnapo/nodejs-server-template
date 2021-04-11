import path from "path";
import { fileURLToPath } from "url";

import plugin from "fastify-plugin";

import errorHandler from "./error-handler.js";
import serveFavicon from "./serve-favicon.js";
import graphql from "./graphql.js";

export default plugin((fastify, opts, done) => {
	fastify.register(errorHandler);
	fastify.register(serveFavicon, { path: path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "assets", "images", "favicon.ico") });
	fastify.register(graphql);

	done();
});
