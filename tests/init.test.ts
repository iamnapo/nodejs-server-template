import "dotenv/config";

import { createServer, type Server } from "node:http";

import { listen } from "async-listen";
import anyTest, { type TestFn } from "ava";
import { fileTypeFromBuffer } from "file-type";
import { got, type Got } from "got";
import nock from "nock";

import app from "../source/app.ts";

import type * as z from "zod";

const test = anyTest as TestFn<{ server: Server; got: Got }>;

test.before(async (t) => {
	const server = createServer(app);
	const url = await listen(server);

	t.context.server = server;
	t.context.got = got.extend({ throwHttpErrors: false, responseType: "json", prefixUrl: String(url) });
});

test.after.always((t) => t.context.server.close());

test("GET /favicon.ico returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("favicon.ico", { responseType: "buffer" });
	const type = await fileTypeFromBuffer(body);
	t.is(type?.mime, "image/x-icon");
	t.is(statusCode, 200);
});

test("GET /cat returns correct response and status code", async (t) => {
	nock("https://api.thecatapi.com")
		.get("/v1/images/search")
		.reply(200, [{ url: "https://cdn2.thecatapi.com/images/360.jpg" }]);

	nock("https://cdn2.thecatapi.com")
		.get("/images/360.jpg")
		.reply(200, Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64"), {
			"Content-Type": "image/gif",
		});
	const { body, statusCode } = await t.context.got("cat", { responseType: "buffer" });
	const type = await fileTypeFromBuffer(body);
	t.true(type?.mime.startsWith("image/"));
	t.is(statusCode, 200);
});

test("GET /ping returns correct response and status code", async (t) => {
	const {
		body: { message },
		statusCode,
	} = await t.context.got<{ message: string }>("ping");
	t.is(message, "pong");
	t.is(statusCode, 200);
});

test("GET /ping-pong returns correct response and status code for valid payload", async (t) => {
	const {
		body: { message },
		statusCode,
	} = await t.context.got.post<{ message: string }>("ping-pong", { json: { message: "ping" } });
	t.is(message, "pong");
	t.is(statusCode, 200);
});

test("GET /ping-pong returns correct response and status code for invalid payload", async (t) => {
	const {
		body: { message, details },
		statusCode,
	} = await t.context.got.post<{ message: string; details: z.core.$ZodFlattenedError<{ message: string }> }>(
		"ping-pong",
		{
			json: { message: "invalid" },
		},
	);
	t.is(message, "Invalid payload");
	t.like(details, {
		fieldErrors: {
			message: ["Invalid option: expected one of \"ping\"|\"pong\""],
		},
	});
	t.is(statusCode, 400);
});

test("GET /whatever returns 404", async (t) => {
	const {
		body: { message },
		statusCode,
	} = await t.context.got<{ message: string }>("whatever");
	t.is(message, "Page not found 😞");
	t.is(statusCode, 404);
});

test("POST /graphql returns correct response and status code", async (t) => {
	const {
		body: {
			data: {
				ping: { message },
			},
		},
		statusCode,
	} = await t.context.got.post<{ data: { ping: { message: string } } }>("graphql", {
		json: {
			query: `query {
				ping {
					message
				}
			}`,
		},
	});
	t.is(message, "pong");
	t.is(statusCode, 200);
});
