import "dotenv/config";

import anyTest, { type TestFn } from "ava";
import got, { type Got } from "got";
import { fileTypeFromBuffer } from "file-type";
import { type FastifyInstance } from "fastify";

import app from "../source/app.js";

const test = anyTest as TestFn<{ server: FastifyInstance; got: Got }>;

test.before(async (t) => {
	t.context.server = app();
	await t.context.server.listen({ host: "127.0.0.1", port: 0 });
	const { address, port } = t.context.server.server.address() as { address: string; port: number };
	t.context.got = got.extend({
		throwHttpErrors: false,
		responseType: "json",
		prefixUrl: `http://${address}:${port}`,
	});
});

test.after.always((t) => {
	void t.context.server.close();
});

test("GET /favicon.ico returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("favicon.ico", { responseType: "buffer" });
	const type = await fileTypeFromBuffer(body);
	t.is(type?.ext, "ico");
	t.is(statusCode, 200);
});

test("GET /ping/ returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got<{ message: string }>("ping");
	t.is(body.message, "pong");
	t.is(statusCode, 200);
});

test("GET /whatever/ returns 404", async (t) => {
	const { body, statusCode } = await t.context.got<{ message: string }>("whatever");
	t.is(body.message, "Page not found 😞");
	t.is(statusCode, 404);
});

test("POST /graphql/ returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got.post<{ data: { ping: { message: string } } }>("graphql", {
		json: {
			query: `query {
				ping {
					message
				}
			}`,
		},
	});
	t.is(body.data.ping.message, "pong");
	t.is(statusCode, 200);
});
