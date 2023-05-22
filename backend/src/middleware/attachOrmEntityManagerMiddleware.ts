import {NextFunction, Request, Response} from "express";
import {ormPromise} from "../server.js"

export async function attachOrmEntityManagerMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    // @ts-ignore
    req.em = (await ormPromise).em.fork();
    next();
}
