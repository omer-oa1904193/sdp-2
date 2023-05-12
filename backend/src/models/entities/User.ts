import {Collection, Entity, Enum, ManyToMany, OneToMany, Property, types, Unique} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {UserRole} from "../enums/UserRole.js";
import {StudyPlan} from "./StudyPlan.js";
import {Comment} from "./Comment.js";
import {Season} from "../enums/Season.js";
import {AdmissionTest} from "./AdmissionTest.js";
import {AdmissionTestResult} from "./AdmissionTestResult.js";
import {Department} from "./Department.js";
import {Enrollment} from "./Enrollment.js";

@Entity()
export class User extends CustomBaseEntity {
    @Property({type: types.string})
    @Unique()
    email!: string;

    @Property({type: types.string, hidden: true})
    password!: string;

    @Enum({items: () => UserRole, type: types.enum})
    role!: UserRole;

    @Property({type: types.string, nullable: true})
    name!: string;

    @OneToMany({entity: () => StudyPlan, mappedBy: (s: StudyPlan) => s.author})
    studyPlans: Collection<StudyPlan> = new Collection<StudyPlan>(this);

    @OneToMany({entity: () => Comment, mappedBy: (c: Comment) => c.author})
    comments: Collection<Comment> = new Collection<Comment>(this);

    // student fields
    @Property({type: types.string, nullable: true})
    universityId?: string;

    @Enum({items: () => Season, type: types.enum, nullable: true})
    enrollmentSeason?: Season;

    @Property({type: types.integer, nullable: true})
    enrollmentYear?: number;

    @ManyToMany({entity: () => AdmissionTest, mappedBy: (p: AdmissionTest) => p.student, pivotEntity: () => AdmissionTestResult})
    admissionTestsTaken: Collection<AdmissionTest> = new Collection<AdmissionTest>(this);

    @OneToMany({entity: () => AdmissionTestResult, mappedBy: (a: AdmissionTestResult) => a.student, persist: false})
    admissionTestResults: Collection<AdmissionTestResult> = new Collection<AdmissionTestResult>(this);

    @OneToMany({entity: () => Enrollment, mappedBy: (a: Enrollment) => a.student})
    courseEnrollments: Collection<Enrollment> = new Collection<Enrollment>(this);
}
