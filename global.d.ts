declare namespace NodeJS {
	interface ProcessEnv { // eslint-disable-line @typescript-eslint/consistent-type-definitions
		NODE_ENV: "development" | "production" | "test";
		PORT?: string;
	}
}
