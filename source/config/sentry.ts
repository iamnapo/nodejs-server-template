import { env } from "node:process";

import * as Sentry from "@sentry/node";

import packageJson from "../../package.json" with { type: "json" };

const { SENTRY_DSN, NODE_ENV, ENVIRONMENT = "development" } = env;

Sentry.init({
	dsn: SENTRY_DSN,
	release: `nodejs-server-template@${packageJson.version}`,
	enabled: NODE_ENV === "production",
	tracesSampleRate: 1,
	environment: ENVIRONMENT,
});

export default Sentry;
