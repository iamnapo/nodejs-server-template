import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import { env } from "node:process";

import chalk from "chalk";

import app from "./app.js";

const numWorkers = availableParallelism();
const { NODE_ENV, PORT = 4000 } = env;

if (NODE_ENV === "production" && cluster.isPrimary) {
	for (let i = 0; i < numWorkers; i++) cluster.fork();

	let onlineWorkers = 0;
	cluster.on("online", () => {
		onlineWorkers += 1;
		if (onlineWorkers === numWorkers) {
			console.log(chalk.bold.cyan(`>>> Live at http://localhost:${PORT} with ${numWorkers} worker processes.`));
		}
	});

	cluster.on("exit", () => cluster.fork());
} else {
	app.listen(PORT, () => NODE_ENV === "development" && console.log(chalk.bold.cyan(`>>> Live at http://localhost:${PORT}`)));
}
