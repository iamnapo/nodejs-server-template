import eslintConfigIamnapo from "eslint-config-iamnapo";

const config = [
	...eslintConfigIamnapo.configs.typescript.map((cfg) => ({ ...cfg, files: [eslintConfigIamnapo.filePatterns.typescript] })),
	{ ignores: ["distribution"] },
];

export default config;
