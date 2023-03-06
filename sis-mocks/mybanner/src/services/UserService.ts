import {Request, Response} from "express";
import fs from "fs-extra";

class UserService {
    async getUsers(req: Request, res: Response) {
        const users = await fs.readJSON("data/users.json");
        res.json(users);
    }

}

export default new UserService();