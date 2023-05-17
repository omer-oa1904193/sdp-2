export default {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    "moduleNameMapper": {
        "^(\\.\\.?\\/.+)\\.js$": "$1",
    },
    setupFilesAfterEnv: ["./__tests__/jest.setup.ts"]
};