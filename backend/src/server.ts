import express from "express";
import morgan from "morgan";
import {router} from "./router.js";
import {MikroORM} from "@mikro-orm/core";
import {mikroOrmConfig} from "./models/mikro-orm.config.js";
import {attachOrmEntityManagerMiddleware} from "./middleware/attachOrmEntityManagerMiddleware.js";
import cors from "cors";

export const server = express();

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

server.use(cors(corsOptions))

server.use(express.json())
server.use(morgan("tiny"));
// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3002");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", ["GET", "POST", "OPTIONS"]);
//     next();
//   });
server.use("/api", attachOrmEntityManagerMiddleware, router);

export const orm = await MikroORM.init(mikroOrmConfig);


