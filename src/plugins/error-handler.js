import Sentry from "@sentry/node";
import plugin from "fastify-plugin";

export default plugin((fastify, opts, done) => {
	fastify.setErrorHandler((err, req, reply) => {
		Sentry.captureException(err);
		console.error(err);
		reply.code(500).send({ message: "Something went wrong." });
	});

	done();
});
