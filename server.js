import app from "./src/app.js";

app({
	logger: {
		transport: process.env.NODE_ENV === "development"
			? { target: "pino-pretty", options: { translateTime: "SYS:HH:MM:ss", ignore: "pid,hostname" } }
			: undefined,
	},
}).listen({
	port: process.env.PORT || 4000,
	host: process.env.HOST || "localhost",
});
