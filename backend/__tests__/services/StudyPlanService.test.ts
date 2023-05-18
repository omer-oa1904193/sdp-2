import {describe, it} from "@jest/globals";

/** @link StudyPlanService*/
describe('StudyPlanService', () => {
    describe('getStudyPlans', () => {
        it("should return the list of study plans created by the logged-in user", async () => {
        });
        it("should return 401 if the user is not logged in", async () => {
        })
    });
    describe('addStudyPlan', () => {
        it("should create a new study plan and return it", async () => {
        });
        it("should return 401 if the user is not logged in", async () => {
        })
        it("should return 400 if a required body field is missing", async () => {
        })
        it("should return 400 if a body fields is invalid", async () => {
        })
    });
    describe('getSharedStudyPlans', () => {
        it("should return the list of study plans shared with the logged-in user", async () => {
        });
        it("should return 401 if the user is not logged in", async () => {
        })
    });
    describe('shareStudyPlan', () => {
        it("should share a study plan with another user", async () => {
        });
        it("should return 200 and do nothing if the study plan is already shared with that user", async () => {
        })
        it("should return 401 if the user is not logged in", async () => {
        })
        it("should return 400 if a required body field is missing", async () => {
        })
        it("should return 400 if a body field is invalid", async () => {
        })
        it("should return 404 if a study plan or user with the matching is not found", async () => {
        })
    });
    describe('getStudyPlan', () => {
        it("should return a study plan by id with program, courses, electives, enrollments", async () => {
        });
        it("should return 401 if the user is not logged in", async () => {
        })
        it("should return 400 if the study plan id is invalid", async () => {
        })
        it("should return 404 if the study plan with the id is not found", async () => {
        })
        it("should return 403 if the study plan with the id is not created by or shared with logged-in user", async () => {
        })
    });
    describe('updateStudyPlan', () => {
        it("should update a study plan: name, courses, and electives", async () => {
        });
        it("should return 401 if the user is not logged in", async () => {
        })
        it("should return 400 if the study plan id is invalid", async () => {
        })
        it("should return 404 if the study plan with the id is not found", async () => {
        })
        it("should return 400 if a required body field is missing", async () => {
        })
        it("should return 400 if a body field is invalid", async () => {
        })
        it("should return 403 if the study plan with the id is not created by logged-in user", async () => {
        })
    });
    describe('getStudyPlanComments', () => {
        it("should return a list of the comments on a study plan", async () => {
        });
        it("should return 401 if the user is not logged in", async () => {
        })
        it("should return 400 if the study plan id is invalid", async () => {
        })
        it("should return 404 if the study plan with the id is not found", async () => {
        })
        it("should return 403 if the study plan with the id is not created by or shared with logged-in user", async () => {
        })
    });
    describe('addCommentToStudyPlan', () => {
        it("should post a new comment on a study plan", async () => {
        });
        it("should return 401 if the user is not logged in", async () => {
        })
        it("should return 400 if the study plan id is invalid", async () => {
        })
        it("should return 404 if the study plan with the id is not found", async () => {
        })
        it("should return 400 if a required body field is missing", async () => {
        })
        it("should return 400 if a body field is invalid", async () => {
        })
        it("should return 403 if the study plan with the id is not created by or shared with logged-in user", async () => {
        })
    });
})