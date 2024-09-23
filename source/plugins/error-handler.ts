import type { FastifyPluginCallback } from "fastify";
import * as Sentry from "@sentry/node";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, _opts, done) => {
	fastify.setErrorHandler(async (err, _req, reply) => {
		Sentry.captureException(err);
		console.error(err);
		await reply.code(500).send({ message: "Something went wrong." });
	});

	done();
};

export default fp(plugin);
