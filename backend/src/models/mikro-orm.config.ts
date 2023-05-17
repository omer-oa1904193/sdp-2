import * as dotenv from "dotenv";
import {LoadStrategy, Options} from "@mikro-orm/core";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";

dotenv.config();

const DEV_OPTIONS: Options = {
    type: "postgresql",
    driver: PostgreSqlDriver,
    clientUrl: process.env.DATABASE_URL,
    entities: ["src/models/entities"],
    entitiesTs: ['src/models/entities'],
    migrations: {
        path: "src/migrations",
        pathTs: "src/migrations",
    },
    loadStrategy: LoadStrategy.JOINED,
    debug: true,
    persistOnCreate: true,
};


const TEST_OPTIONS: Options = {
    ...DEV_OPTIONS,
    clientUrl: process.env.TEST_DATABASE_URL,
    debug: false,
};
let mikroOrmConfig: Options;
if (process.env.NODE_ENV == "test")
    mikroOrmConfig = TEST_OPTIONS;
else// if (process.env.NODE_ENV == "dev")
    mikroOrmConfig = DEV_OPTIONS;
export default mikroOrmConfig