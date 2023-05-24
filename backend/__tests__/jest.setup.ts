import {beforeEach, test} from "@jest/globals";
import {EntityManager} from "@mikro-orm/postgresql";
import {ormPromise} from "../src/server.js";


export const testContext: { em: EntityManager } = {em: null!};

beforeEach(async () => {
    testContext.em = (await ormPromise).em.fork() as EntityManager;
});

test("Placeholder test", () => {
});