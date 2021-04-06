export default (fastify, opts, done) => {
	fastify.get("/ping/", (req, reply) => reply.send({ message: "pong" }));

	done();
};
