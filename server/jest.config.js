module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  // moduleNameMapper: {
  //   "@/(.*)": "<rootDir>/src/$1",
  // },
};
