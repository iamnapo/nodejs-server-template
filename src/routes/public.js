const publicRoutes = (fastify, opts, done) => {
	fastify.get("/", (req, reply) => reply.send({ message: "'sup bruh?" }));

	fastify.get("/ping/", (req, reply) => reply.send({ message: "pong" }));

	done();
};

export default publicRoutes;
