/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/tests/_mockdb.ts"],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/service/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/",
    ],
    coverageDirectory: "coverage",
    verbose: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
