import fs from "fs";
import {User} from "../entities/User.js";

export async function seedUsers() {
    process.stdout.write("seeding users...");
    await User.deleteMany({});

    const usersJSON = JSON.parse(fs.readFileSync("data/users.json", "utf8"));
    for (let userData of usersJSON)
        await User.create(userData);

    console.log("done");
}
