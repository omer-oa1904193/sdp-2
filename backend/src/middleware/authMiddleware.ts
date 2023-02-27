import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import {User} from "@prisma/client";

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const tokenArray = req.headers?.authorization?.split(" ");

    if (!tokenArray || tokenArray.length !== 2 || tokenArray[0] !== "Bearer" || !tokenArray[1]) {
        res.status(401).json({details: "Authentication token was not provided"});
        return;
    }
    const token = tokenArray[1];
    try {
        const jwtPayload = await jwt.verify(token, process.env.JWT_KEY!) as JwtPayload;
        delete jwtPayload.iat;
        req.user = jwtPayload as unknown as User;
        next();
    } catch (e) {
        res.status(401).json({details: "Invalid credentials"});
    }
}

