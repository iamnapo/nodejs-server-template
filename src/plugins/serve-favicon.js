import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

import plugin from "fastify-plugin";

export default plugin((fastify, opts, done) => {
	let iconBuf;

	fastify.route({
		method: ["GET", "HEAD"],
		url: "/favicon.ico",
		handler: async (req, reply) => {
			iconBuf ||= await readFile(opts.path);

			return reply
				.headers({
					"Cache-Control": "public, max-age=31536000",
					ETag: `${iconBuf.length.toString(16)}-${createHash("sha1").update(iconBuf, "utf8").digest("base64").slice(0, 27)}`,
					"Content-Type": "image/x-icon",
					"Content-Length": iconBuf.length,
				})
				.send(iconBuf);
		},
	});

	done();
});
