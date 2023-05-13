import type { FastifyPluginCallback } from "fastify";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const publicRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
	fastify.get("/", async (_req, reply) => {
		await reply.send({ message: "'sup bruh?" });
	});

	fastify.get("/ping/", async (_req, reply) => {
		await reply.send({ message: "pong" });
	});

	fastify.post("/ping-pong/", async (req, reply) => {
		const inputSchema = z.object({
			message: z.enum(["ping", "pong"]),
		});
		const payload = await inputSchema.spa(req.body);
		if (payload.success) {
			const { message } = payload.data;
			await reply.send({ message: message === "ping" ? "pong" : "ping" });
		} else {
			await reply.status(400).send({
				message: "Invalid payload",
				details: fromZodError(payload.error).details,
			});
		}
	});

	done();
};

export default publicRoutes;
