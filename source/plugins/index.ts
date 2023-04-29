import type { FastifyPluginCallback } from "fastify";
import plugin from "fastify-plugin";

import errorHandler from "./error-handler.js";
import serveFavicon from "./serve-favicon.js";
import graphql from "./graphql.js";

const plugins: FastifyPluginCallback = (fastify, _opts, done) => {
	void fastify.register(errorHandler);
	void fastify.register(serveFavicon, { path: new URL("../assets/images/favicon.ico", import.meta.url) });
	void fastify.register(graphql);

	done();
};

export default plugin(plugins);
