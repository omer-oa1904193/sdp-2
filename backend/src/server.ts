import express from "express";
import morgan from "morgan";
import {router} from "./router.js";

export const server = express();
server.use(morgan("tiny"));
server.use(router);