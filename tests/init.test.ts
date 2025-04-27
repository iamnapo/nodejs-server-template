import "dotenv/config";

import anyTest, { type TestFn } from "ava";
import { fileTypeFromBuffer } from "file-type";
import ky, { type KyInstance } from "ky";

import app from "../source/app.js";

import type { Server } from "node:http";
import type { AddressInfo } from "node:net";

const test = anyTest as TestFn<{ server: Server; ky: KyInstance }>;

test.before((t) => {
	t.context.server = app.listen();
	const { port } = t.context.server.address() as AddressInfo;
	t.context.ky = ky.extend({ throwHttpErrors: false, prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => t.context.server.close());

test.only("GET /favicon.ico returns correct response and status code", async (t) => {
	const response = await t.context.ky("favicon.ico");
	const type = await fileTypeFromBuffer(await response.arrayBuffer());
	t.is(type?.mime, "image/x-icon");
	t.is(response.status, 200);
});

test("GET /cat returns correct response and status code", async (t) => {
	const response = await t.context.ky("cat");
	const type = await fileTypeFromBuffer(await response.arrayBuffer());
	t.true(type?.mime.startsWith("image/"));
	t.is(response.status, 200);
});

test("GET /ping returns correct response and status code", async (t) => {
	const response = await t.context.ky<{ message: string }>("ping");
	const { message } = await response.json();
	t.is(message, "pong");
	t.is(response.status, 200);
});

test("GET /ping-pong returns correct response and status code for valid payload", async (t) => {
	const response = await t.context.ky.post<{ message: string }>("ping-pong", { json: { message: "ping" } });
	const { message } = await response.json();
	t.is(message, "pong");
	t.is(response.status, 200);
});

test("GET /ping-pong returns correct response and status code for invalid payload", async (t) => {
	const response = await t.context.ky.post<{ message: string; details: { code: string; message: string }[] }>("ping-pong", {
		json: { message: "invalid" },
	});
	const { message, details } = await response.json();
	t.is(message, "Invalid payload");
	t.like(details[0], { code: "invalid_enum_value", message: "Invalid enum value. Expected 'ping' | 'pong', received 'invalid'" });
	t.is(response.status, 400);
});

test("GET /whatever returns 404", async (t) => {
	const response = await t.context.ky<{ message: string }>("whatever");
	const { message } = await response.json();
	t.is(message, "Page not found 😞");
	t.is(response.status, 404);
});

test("POST /graphql returns correct response and status code", async (t) => {
	const response = await t.context.ky.post<{ data: { ping: { message: string } } }>("graphql", {
		json: {
			query: `query {
				ping {
					message
				}
			}`,
		},
	});
	const { data } = await response.json();
	t.is(data.ping.message, "pong");
	t.is(response.status, 200);
});
