import {EntityManager} from "@mikro-orm/core";
import {User} from "../../src/models/entities/User.js";

declare module "express-serve-static-core" {
    export interface Request {
        user: User | null;
        em: EntityManager;
    }

}