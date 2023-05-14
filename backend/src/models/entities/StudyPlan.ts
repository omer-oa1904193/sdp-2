import {CustomBaseEntity} from "./CustomBaseEntity.js";
import type {Rel} from "@mikro-orm/core";
import {Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, Property, types} from "@mikro-orm/core";
import {User} from "./User.js";
import {ElectivePackage} from "./ElectivePackage.js";
import {Course} from "./Course.js";
import {Program} from "./Program.js";
import {MapCourseStudyPlan} from "./MapCourseStudyPlan.js";
import {MapElectivePackageStudyPlan} from "./MapElectivePackageStudyPlan.js";
import {Comment} from "./Comment.js";
import {Season} from "../enums/Season.js";

@Entity()
export class StudyPlan extends CustomBaseEntity {
    @Property({type: types.string})
    name!: string;

    @Enum({items: () => Season, type: types.enum})
    seasonStarted!: Season;

    @Property({type: types.integer})
    yearStarted!: number;

    @ManyToOne({entity: () => Program, inversedBy: (p: Program) => p.studyPlans})
    program!: Rel<Program>;

    @ManyToOne({entity: () => User, inversedBy: (u: User) => u.studyPlans})
    author!: Rel<User>;

    @ManyToMany({entity: () => Course, mappedBy: (c: Course) => c.studyPlansAppearingIn, pivotEntity: () => MapCourseStudyPlan, hidden: true})
    courses: Collection<Course> = new Collection<Course>(this);

    // dummy field used to fetch courses WITH pivot data
    @OneToMany({entity: () => MapCourseStudyPlan, mappedBy: (m: MapCourseStudyPlan) => m.studyPlan, persist: false})
    courseMappings: Collection<MapCourseStudyPlan> = new Collection<MapCourseStudyPlan>(this);

    @ManyToMany({
        entity: () => ElectivePackage,
        mappedBy: (p: ElectivePackage) => p.studyPlansAppearingIn,
        pivotEntity: () => MapElectivePackageStudyPlan,
        hidden: true
    })
    electives: Collection<ElectivePackage> = new Collection<ElectivePackage>(this);

    // dummy field used to fetch elecitves WITH pivot data
    @OneToMany({
        entity: () => MapElectivePackageStudyPlan,
        mappedBy: (m: MapElectivePackageStudyPlan) => m.studyPlan,
        persist: false,
    })
    electiveMappings: Collection<MapElectivePackageStudyPlan> = new Collection<MapElectivePackageStudyPlan>(this);


    @OneToMany({entity: () => Comment, mappedBy: (c: Comment) => c.studyPlan})
    comments: Collection<Comment> = new Collection<Comment>(this);

}