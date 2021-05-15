import plugin from "fastify-plugin";

import errorHandler from "./error-handler.js";
import serveFavicon from "./serve-favicon.js";
import graphql from "./graphql.js";

export default plugin((fastify, opts, done) => {
	fastify.register(errorHandler);
	fastify.register(serveFavicon, { path: new URL("../assets/images/favicon.ico", import.meta.url) });
	fastify.register(graphql);

	done();
});
