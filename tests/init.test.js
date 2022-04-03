import "dotenv/config";

import test from "ava";
import got from "got";
import { fileTypeFromBuffer } from "file-type";

import app from "../src/app.js";

test.before(async (t) => {
	t.context.server = app();
	await t.context.server.listen();
	const { address, port } = t.context.server.server.address();
	t.context.got = got.extend({
		throwHttpErrors: false,
		responseType: "json",
		prefixUrl: `http://${address}:${port}`,
	});
});

test.after.always((t) => t.context.server.close());

test("GET /favicon.ico returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("favicon.ico", { responseType: "buffer" });
	const { ext } = await fileTypeFromBuffer(body);
	t.is(ext, "ico");
	t.is(statusCode, 200);
});

test("GET /ping/ returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("ping");
	t.is(body.message, "pong");
	t.is(statusCode, 200);
});

test("GET /whatever/ returns 404", async (t) => {
	const { body, statusCode } = await t.context.got("whatever");
	t.is(body.message, "Page not found 😞");
	t.is(statusCode, 404);
});

test("POST /graphql/ returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got.post("graphql", { json: { query: `query {
		ping {
			message
		}
	}` } });
	t.is(body.data.ping.message, "pong");
	t.is(statusCode, 200);
});
