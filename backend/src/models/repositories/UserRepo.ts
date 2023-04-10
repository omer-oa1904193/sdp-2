import {User} from "../entities/User.js";
import {EntityData, EntityManager} from "@mikro-orm/core";

export class UserRepo {
    em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async findUser(email: string) {
        return this.em.findOne(User, {email: email});
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