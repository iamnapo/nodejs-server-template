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

test.after.always(async (t) => {
	await t.context.server.close();
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

test("GET /ping-pong returns correct response and status code for valid payload", async (t) => {
	const { body, statusCode } = await t.context.got.post<{ message: string }>("ping-pong", {
		json: { message: "ping" },
	});
	t.is(body.message, "pong");
	t.is(statusCode, 200);
});

test("GET /ping-pong returns correct response and status code for invalid payload", async (t) => {
	const { body, statusCode } = await t.context.got.post<{ message: string; details: { code: string; message: string }[] }>("ping-pong", {
		json: { message: "invalid" },
	});
	t.is(body.message, "Invalid payload");
	t.like(body.details[0], {
		code: "invalid_enum_value",
		message: "Invalid enum value. Expected 'ping' | 'pong', received 'invalid'",
	});
	t.is(statusCode, 400);
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
