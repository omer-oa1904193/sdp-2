import express from "express";
import morgan from "morgan";

export const server = express();
server.use(morgan("tiny"));
server.get("/", (req, res) => {
    res.send("Hello World!");
});
