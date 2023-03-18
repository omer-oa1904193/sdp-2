import {User} from "@prisma/client";

class UserRepo {
    async findUser(email: string) {
    }

    async bulkUpsertUsers(users: User[]) {
        console.log(users);
    }
}

export const userRepo = new UserRepo();