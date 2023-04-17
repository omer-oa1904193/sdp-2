import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Department} from "./Department.js";
import {Course} from "./Course.js";
import {MapCourseProgram} from "./MapCourseProgram.js";
import {StudyPlan} from "./StudyPlan.js";
import {ElectivePackage} from "./ElectivePackage.js";
import {MapElectivePackageProgram} from "./MapElectivePackageProgram.js";
import type {Rel} from "@mikro-orm/core";

@Entity()
export class Program extends CustomBaseEntity {
    @Property({type: types.string})
    name!: string;

    @ManyToOne({entity: () => Department, inversedBy: (d: Department) => d.programs})
    department!: Rel<Department>;

    @Property({type: types.integer})
    yearCreated!: number;

    @ManyToMany({entity: () => Course, mappedBy: (c: Course) => c.programsAppearingIn, pivotEntity: () => MapCourseProgram})
    courses: Collection<Course> = new Collection<Course>(this);

    @ManyToMany({
        entity: () => ElectivePackage,
        mappedBy: (p: ElectivePackage) => p.programsAppearingIn,
        pivotEntity: () => MapElectivePackageProgram
    })
    electives: Collection<ElectivePackage> = new Collection<ElectivePackage>(this);

    @OneToMany({entity: () => StudyPlan, mappedBy: (s: StudyPlan) => s.program})
    studyPlans: Collection<StudyPlan> = new Collection<StudyPlan>(this);
}