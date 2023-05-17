import {NextFunction, Request, Response} from "express";
import {initORM} from "../server.js";


export async function attachOrmEntityManagerMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    // @ts-ignore
    req.em = (await initORM()).em.fork();
    next();
}
