export default {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    "moduleNameMapper": {
        "^(\\.\\.?\\/.+)\\.js$": "$1",
    },
    globalSetup: "./__tests__/jest.global-setup.ts",
};