import express from "express";
import morgan from "morgan";
import {router} from "./router.js";
import {MikroORM} from "@mikro-orm/core";
import {mikroOrmConfig} from "./models/mikro-orm.config.js";
import {attachOrmEntityManagerMiddleware} from "./middleware/attachOrmEntityManagerMiddleware.js";

export const server = express();
server.use(express.json())
server.use(morgan("tiny"));
server.use("/api", attachOrmEntityManagerMiddleware, router);

export const orm = await MikroORM.init(mikroOrmConfig);

