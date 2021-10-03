import publicRoutes from "./public.js";

const routes = (fastify, opts, done) => {
	fastify.register(publicRoutes, { prefix: "/" });

	fastify.setNotFoundHandler((req, reply) => reply.code(404).send({ message: "Page not found 😞" }));

	done();
};

export default routes;
