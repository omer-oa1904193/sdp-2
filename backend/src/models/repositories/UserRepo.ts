import {User} from "../entities/User.js";
import {Collection, EntityData, EntityManager, Enum, OneToMany, Property, types, Unique} from "@mikro-orm/core";
import {UserRole} from "../enums/UserRole.js";
import {StudyPlan} from "../entities/StudyPlan.js";
import {Season} from "../enums/Season.js";
import {Comment} from "../entities/Comment.js";

export class UserRepo {
    em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async findUser(email: string) {
    }

    async bulkUpsertUsers(usersData: EntityData<User>[]) {
        await this.em.upsertMany(User, usersData.map(u => ({
            id: u.id,
            email: u.email,
            password: u.password,
            role: u.role,
            universityId: u.universityId,
            name: u.name,
            enrollmentSeason: u.enrollmentSeason,
            enrollmentYear: u.enrollmentYear
        })));
    }
}