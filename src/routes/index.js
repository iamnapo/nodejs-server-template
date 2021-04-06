import publicRoutes from "./public.js";

export default (fastify, opts, done) => {
	fastify.register(publicRoutes, { prefix: "/" });

	done();
};
