import express from "express";
import morgan from "morgan";
import {router} from "./router.js";
import {MikroORM} from "@mikro-orm/core";
import {mikroOrmConfig} from "./models/mikro-orm.config.js";

export const server = express();
server.use(morgan("tiny"));
server.use("/api", router);

const orm = await MikroORM.init(mikroOrmConfig);

