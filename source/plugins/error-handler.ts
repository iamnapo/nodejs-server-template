import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import Sentry from "@sentry/node";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, _opts, done) => {
	fastify.setErrorHandler(async (err: Error, _req: FastifyRequest, reply: FastifyReply) => {
		Sentry.captureException(err);
		console.error(err);
		await reply.code(500).send({ message: "Something went wrong." });
	});

	done();
};

export default fp(plugin);
