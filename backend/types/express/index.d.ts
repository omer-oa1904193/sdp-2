import {EntityManager} from "@mikro-orm/postgresql";
import {User} from "../../src/models/entities/User.js";

declare module "express-serve-static-core" {
    export interface Request {
        user: User | null;
        em: EntityManager;
    }

}