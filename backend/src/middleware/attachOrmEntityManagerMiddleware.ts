import {NextFunction, Request, Response} from "express";
// import {initORM} from "../server.js";
import {orm} from "../server.js"

export async function attachOrmEntityManagerMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    // @ts-ignore
    req.em = orm.em.fork();
    next();
}
