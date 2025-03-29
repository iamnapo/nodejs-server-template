import "dotenv/config.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "node:process";

import express from "express";
import morgan from "morgan";
import compression from "compression";
import favicon from "serve-favicon";
import cors from "cors";
import * as Sentry from "@sentry/node";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/index.js";

Sentry.init({ enabled: process.env.NODE_ENV === "production" });

const { NODE_ENV } = env;

const app: express.Application = express();

app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === "production" }));
app.disable("x-powered-by");
app.use(
	morgan(NODE_ENV === "development" ? "dev" : "short", {
		skip: (req) => NODE_ENV === "test" || req.originalUrl === "/favicon.ico" || req.method === "OPTIONS",
	}),
);
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(favicon(path.join(path.dirname(fileURLToPath(import.meta.url)), "assets", "images", "favicon.ico")));

app.use(routes);

app.all("/{*splat}", (_, res) => {
	res.status(404).json({ message: "Page not found 😞" });
});

Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);

export default app;
