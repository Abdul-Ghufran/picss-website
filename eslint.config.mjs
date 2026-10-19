import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

/** eslint-config-next v16 ships native flat configs — no FlatCompat shim required. */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "out/**"] },
  ...coreWebVitals,
  ...typescriptConfig,
];

export default eslintConfig;
