import { cwd } from "node:process";

import cleanStack from "clean-stack";

import type { ErrorRequestHandler } from "express";

const errorBoundary: ErrorRequestHandler = (err, _, res, next) => {
	if (res.headersSent) return next(err);

	console.error(cleanStack((err as Error).stack, { pretty: true, basePath: cwd() }));

	return res.status(500).send({ message: "Something went wrong." });
};

export default errorBoundary;
