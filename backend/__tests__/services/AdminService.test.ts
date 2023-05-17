import request from 'supertest';
import {describe, test, expect} from '@jest/globals';
import {server} from "../../src/server.js";
import {Season} from "../../src/models/enums/Season.js";


describe('AdminService', () => {
    describe('importDataFromSIS', () => {

    })
    describe('getCurrentSemester', () => {
        test("It should return the current semester", async () => {
            const response = await request(server)
                .get("/api/semesters/current/")
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                season: Season.FALL,//expect.any([Season.SPRING, Season.FALL]),
                year: 2021
            });
        })
    })
});

