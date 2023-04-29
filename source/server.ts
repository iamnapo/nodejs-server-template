import app from "./app.js";

void app({
	logger: {
		transport:
			process.env.NODE_ENV === "development"
				? { target: "pino-pretty", options: { translateTime: "SYS:HH:MM:ss", ignore: "pid,hostname" } }
				: undefined,
	},
}).listen({
	port: Number(process.env.PORT || 3000),
	host: process.env.HOST || "localhost",
});
