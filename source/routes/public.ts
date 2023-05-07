import type { FastifyPluginCallback } from "fastify";

const publicRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
	fastify.get("/", (_req, reply) => reply.send({ message: "'sup bruh?" }));

	fastify.get("/ping/", (_req, reply) => reply.send({ message: "pong" }));

	done();
};

export default publicRoutes;
