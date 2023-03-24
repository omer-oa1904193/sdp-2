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

export const mikroOrmConfig = DEV_OPTIONS;
export default DEV_OPTIONS;