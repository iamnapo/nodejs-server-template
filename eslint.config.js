import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigIamnapo from "eslint-config-iamnapo";

const config = defineConfig([
	{
		files: [eslintConfigIamnapo.filePatterns.default],
		extends: [eslintConfigIamnapo.configs.default],
	},
	{
		files: [eslintConfigIamnapo.filePatterns.typescript],
		extends: [eslintConfigIamnapo.configs.typescript],
		rules: {
			"import-x/extensions": ["error", { ignorePackages: true, pattern: { ts: "always", json: "always" } }],
		},
	},
	globalIgnores(["distribution"]),
]);

export default config;
