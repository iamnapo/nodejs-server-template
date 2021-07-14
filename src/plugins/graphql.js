import mercurius from "mercurius";
import plugin from "fastify-plugin";

import { schema, resolvers } from "../graphql/index.js";

export default plugin((fastify, opts = {}, done) => {
	fastify.register(mercurius, {
		schema,
		resolvers,
		graphiql: process.env.NODE_ENV !== "production",
		...opts,
	});

	done();
});
