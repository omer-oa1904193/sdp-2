import {CustomBaseEntity} from "./CustomBaseEntity.js";
import type {Rel} from "@mikro-orm/core";
import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property, types} from "@mikro-orm/core";
import {User} from "./User.js";
import {ElectivePackage} from "./ElectivePackage.js";
import {Course} from "./Course.js";
import {Program} from "./Program.js";
import {MapCourseStudyPlan} from "./MapCourseStudyPlan.js";
import {MapElectivePackageStudyPlan} from "./MapElectivePackageStudyPlan.js";
import {Comment} from "./Comment.js";

@Entity()
export class StudyPlan extends CustomBaseEntity {
    @Property({type: types.string})
    name!: string;

    @ManyToOne({entity: () => Program, inversedBy: (p: Program) => p.studyPlans})
    program!: Rel<Program>;

    @ManyToOne({entity: () => User, inversedBy: (u: User) => u.studyPlans})
    author!: Rel<User>;

    @ManyToMany({entity: () => Course, inversedBy: (c: Course) => c.studyPlansAppearingIn, pivotEntity: () => MapCourseStudyPlan})
    courses: Collection<Course> = new Collection<Course>(this);

    @ManyToMany({
        entity: () => ElectivePackage,
        inversedBy: (p: ElectivePackage) => p.studyPlansAppearingIn,
        pivotEntity: () => MapElectivePackageStudyPlan
    })
    electives: Collection<ElectivePackage> = new Collection<ElectivePackage>(this);

    @OneToMany({entity: () => Comment, mappedBy: (c: Comment) => c.studyPlan})
    comments: Collection<Comment> = new Collection<Comment>(this);
}