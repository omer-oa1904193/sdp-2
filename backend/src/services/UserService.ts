import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import {UserRepo} from "../models/repositories/UserRepo.js";

class UserService {
    async login(req: Request, res: Response) {
        const body = req.body ?? {};

        if (!body.email || !body.password) {
            res.status(400).send({details: "Authentication credentials were not provided"});
            return;
        }
        const userRepo = new UserRepo(req.em);
        const user = await userRepo.getUser(body.email);

        if (user && await bcrypt.compare(body.password, user.password)) {
            const token = jwt.sign(user.toObject(), process.env.JWT_KEY!);
            res.status(200).send({authToken: token});
        } else
            res.status(401).send({details: "Email and/or password is incorrect"});
    }


    async getUser(req: Request, res: Response) {
        res.json(req.user);
    }

    async getUsers(req: Request, res: Response) {
        const userRepo = new UserRepo(req.em);
        const users = await userRepo.getUsers();
        res.json(users);
    }

}

export default new UserService();