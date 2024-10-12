import type { FastifyPluginCallback } from "fastify";

import publicRoutes from "./public.js";

const routes: FastifyPluginCallback = (fastify, _opts, done) => {
	fastify.register(publicRoutes, { prefix: "/" });

	fastify.setNotFoundHandler(async (_req, reply) => {
		await reply.code(404).send({ message: "Page not found 😞" });
	});

	done();
};

export default routes;
