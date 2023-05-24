import request from 'supertest';
import {describe, it, expect} from '@jest/globals';
import {server} from "../../src/server.js";
import {Season} from "../../src/models/enums/Season.js";


/** @link AdminService*/
describe('AdminService', () => {
    describe('importDataFromSIS', () => {

    })
    describe('getCurrentSemester', () => {
        it("should return the current semester", async () => {
            // const response = await request(server)
            //     .get("/api/semesters/current/")
            //     .send();
            //
            // expect(response.status).toBe(200);
            // expect(response.body).toEqual({
            //     season: Season.FALL,
            //     year: 2021
            // });
        })
    })
});

