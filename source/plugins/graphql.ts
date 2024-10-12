import mercurius, { type MercuriusOptions } from "mercurius";
import fp from "fastify-plugin";
import type { FastifyPluginAsync, FastifyPluginCallback } from "fastify";

import { schema, resolvers } from "../graphql/index.js";

const plugin: FastifyPluginCallback<MercuriusOptions> = (fastify, opts, done) => {
	fastify.register(mercurius as unknown as FastifyPluginAsync, {
		schema,
		resolvers,
		graphiql: process.env.NODE_ENV !== "production",
		...opts,
	});

	done();
};

export default fp(plugin);
