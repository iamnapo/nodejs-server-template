import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { URL } from "node:url";

import fp from "fastify-plugin";
import type { FastifyPluginCallback } from "fastify";

const plugin: FastifyPluginCallback<{ path: URL }> = (fastify, opts, done) => {
	let iconBuf: Buffer;

	fastify.route({
		method: ["GET", "HEAD"],
		url: "/favicon.ico",
		handler: async (_req, reply) => {
			iconBuf ||= await readFile(opts.path);

			await reply
				.headers({
					"Cache-Control": "public, max-age=31536000",
					ETag: `${iconBuf.length.toString(16)}-${createHash("sha1").update(iconBuf.toString("binary"), "utf8").digest("base64").slice(0, 27)}`,
					"Content-Type": "image/x-icon",
					"Content-Length": iconBuf.length,
				})
				.send(iconBuf);
		},
	});

	done();
};

export default fp(plugin);
