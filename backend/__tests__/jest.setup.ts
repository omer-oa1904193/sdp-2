import {beforeEach, expect, test} from "@jest/globals";
import {initORM} from "../src/server.js";
import {EntityManager} from "@mikro-orm/postgresql";


export const testContext: { em: EntityManager } = {em: null!};

beforeEach(async () => {
    const orm = await initORM()
    testContext.em = orm.em.fork() as EntityManager;
})
