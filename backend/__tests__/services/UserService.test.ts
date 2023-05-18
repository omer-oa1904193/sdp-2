import {describe, it} from "@jest/globals";

/** @link UserService*/
describe('UserService', () => {
    describe('login', () => {
        it("should authenticate the user and return JWT", async () => {
        });
        it("should return 401 if the email or password is invalid", async () => {
        });
    });
    describe('getUser', () => {
        it("should return the currently logged-in user", async () => {
        });
        it("should return 401 if the user is not logged-in", async () => {
        });
    });
    describe('getUsers', () => {
        it("should return the list of all users", async () => {
        });
    });
})
