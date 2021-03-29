import "dotenv/config.js";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import morgan from "morgan";
import compression from "compression";
import favicon from "serve-favicon";
import cors from "cors";
import chalk from "chalk";
import Sentry from "@sentry/node";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import routes from "./src/routes/index.js";

Sentry.init({ enabled: process.env.NODE_ENV === "production" });

const app = express();

app.use(helmet());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "short", {
	skip: (req) => process.env.NODE_ENV === "test" || req.originalUrl === "/favicon.ico" || req.method === "OPTIONS",
}));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(favicon(path.join(path.dirname(fileURLToPath(import.meta.url)), "src", "assets", "images", "favicon.ico")));

app.use(routes);

app.all("/*", (req, res) => res.status(404).json({ message: "Page not found 😞" }));

const port = process.env.PORT || 4000;
app.listen(port, () => process.env.NODE_ENV !== "test" && console.log(chalk.bold.cyan(`>>> Live at http://localhost:${port}`)));

export default app;
