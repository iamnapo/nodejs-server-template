import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	console.error(err);
	res.status(500).send({ message: "Something went wrong." });
};
