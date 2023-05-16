import {User} from "../entities/User.js";
import {EntityData, EntityManager} from "@mikro-orm/core";

export class UserRepo {
    em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async getUser(email: string) {
        return this.em.findOne(User, {email: email}, {populate: ["admissionTestResults"]});
    }

    getUsers() {
        return this.em.find(User, {});
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

    async findUser(userId: number) {
        return this.em.findOne(User, {id: userId});
    }

}