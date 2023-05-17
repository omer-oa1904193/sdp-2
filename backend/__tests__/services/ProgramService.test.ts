import {describe, expect, it} from "@jest/globals";
import request from "supertest";
import {server} from "../../src/server.js";
import {College} from "../../src/models/entities/College.js";
import {testContext} from "../jest.setup.js";
import {Program} from "../../src/models/entities/Program.js";
import {Department} from "../../src/models/entities/Department.js";

/** @link ProgramService*/
describe('ProgramService', () => {
    describe('getColleges', () => {
        it("should return the list of all colleges", async () => {
            await testContext.em.persistAndFlush([
                testContext.em.create(College, {name: 'Test College A'}),
                testContext.em.create(College, {name: 'Test College B'}),
            ]);
            testContext.em.clear();

            const response = await request(server)
                .get("/api/colleges/")
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);

            const colleges = await testContext.em.find(College, {});
            expect(response.body).toMatchObject(colleges.map(c => c.toPOJO()));
        })


    });
    describe('getProgramStudyPlans', () => {
        it("should return a list of all programs", async () => {
            const college = testContext.em.create(College, {name: "Test College",})
            const department = testContext.em.create(Department, {name: "Test Department", code: "TEST-DEPT", college: college})
            await testContext.em.persistAndFlush([
                testContext.em.create(Program, {name: "Test Program A", yearCreated: 2001, department}),
                testContext.em.create(Program, {name: "Test Program B", yearCreated: 2005, department}),
            ]);
            testContext.em.clear();

            const response = await request(server)
                .get("/api/programs/")
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(Array.isArray(response.body)).toBe(true);

            const programs = await testContext.em.find(Program, {});
            expect(response.body).toMatchObject(programs.map(p => p.toPOJO()));
        });
    });
    describe('getElectivePackage', () => {
        it("should return an elective package with all its courses", async () => {

        });
    });
})
