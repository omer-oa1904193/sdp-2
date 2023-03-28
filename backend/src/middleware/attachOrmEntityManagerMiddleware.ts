import {NextFunction, Request, Response} from "express";
import {orm} from "../server.js";


export async function attachOrmEntityManagerMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.em = orm.em.fork();
    next();
}
