import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {userRepo} from "../data/repositories/UserRepo.js";

class UserService {
    async login(req, res) {
        const body = req.body ?? {};

        if (!body.email || !body.password) {
            res.status(400).send({details: "Authentication credentials were not provided"});
            return;
        }
        const user = await userRepo.findUser(body.email);

        if (user && await bcrypt.compare(body.password, user.password)) {
            const token = await jwt.sign(user.toObject(), process.env.JWT_KEY);
            res.status(200).send({authToken: token});
        } else
            res.status(401).send({details: "Email and/or password is incorrect"});
    }


    async getUser(req, res) {
        res.json(req.user);
    }

}

export default new UserService();