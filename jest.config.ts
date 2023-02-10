import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  transform: { "^.+\\.ts?$": "ts-jest" },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
