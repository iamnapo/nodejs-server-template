import publicRoutes from "./public.js";

export default (fastify, opts, done) => {
	fastify.register(publicRoutes, { prefix: "/" });

	fastify.setNotFoundHandler((req, reply) => reply.code(404).send({ message: "Page not found 😞" }));

	done();
};
