import express, {static} from "express";
import morgan from "morgan";
import {router} from "./router.js";
import {MikroORM} from "@mikro-orm/core";
import {mikroOrmConfig} from "./models/mikro-orm.config.js";
import {attachOrmEntityManagerMiddleware} from "./middleware/attachOrmEntityManagerMiddleware.js";
import cors from "cors";

export const server = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

server.use(cors(corsOptions))
server.use(express.static('public'))
server.use(express.json())
server.use(morgan("tiny"));
server.use("/api", attachOrmEntityManagerMiddleware, router);

export const orm = await MikroORM.init(mikroOrmConfig);


