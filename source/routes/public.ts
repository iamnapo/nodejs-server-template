import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";

const publicRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
	fastify.get("/", (_req: FastifyRequest, reply: FastifyReply) => reply.send({ message: "'sup bruh?" }));

	fastify.get("/ping/", (_req: FastifyRequest, reply: FastifyReply) => reply.send({ message: "pong" }));

	done();
};

export default publicRoutes;
