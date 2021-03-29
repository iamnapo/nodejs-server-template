import "dotenv/config.js";
import http from "http";

import test from "ava";
import got from "got";
import listen from "test-listen";

import app from "../server.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
	const prefixUrl = await listen(t.context.server);
	t.context.got = got.extend({ throwHttpErrors: false, responseType: "json", prefixUrl });
});

test.after.always((t) => t.context.server.close());

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
