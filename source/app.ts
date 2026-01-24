import { env } from "node:process";
import { fileURLToPath } from "node:url";

import * as Sentry from "@sentry/node";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import favicon from "serve-favicon";

import errorBoundary from "#middleware/error-boundary.ts";
import routes from "#routes/index.ts";

const { NODE_ENV } = env;

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(
	morgan(NODE_ENV === "development" ? "dev" : "short", {
		skip: (req) => NODE_ENV === "test" || req.originalUrl === "/favicon.ico" || req.method === "OPTIONS",
	}),
);
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true, limit: "1mb" }));
app.use(favicon(fileURLToPath(new URL("assets/images/favicon.ico", import.meta.url))));

app.use(routes);

app.all("/{*splat}", (_, res) => res.status(404).json({ message: "Page not found 😞" }));

Sentry.setupExpressErrorHandler(app);

app.use(errorBoundary);

export default app;
