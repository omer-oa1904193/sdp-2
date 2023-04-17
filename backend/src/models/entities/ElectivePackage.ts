import {Collection, Entity, ManyToMany, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Course} from "./Course.js";
import {MapCourseElectivePackage} from "./MapCourseElectivePackage.js";
import {Program} from "./Program.js";
import {StudyPlan} from "./StudyPlan.js";
import {MapElectivePackageProgram} from "./MapElectivePackageProgram.js";
import {MapElectivePackageStudyPlan} from "./MapElectivePackageStudyPlan.js";

@Entity()
export class ElectivePackage extends CustomBaseEntity {
    @Property({type: types.string})
    title!: string

    @ManyToMany({entity: () => Course, mappedBy: (c: Course) => c.electivePackagesAppearingIn, pivotEntity: () => MapCourseElectivePackage})
    courses: Collection<Course> = new Collection<Course>(this);

    @ManyToMany({entity: () => Program, inversedBy: (p: Program) => p.electives, pivotEntity: () => MapElectivePackageProgram})
    programsAppearingIn: Collection<Program> = new Collection<Program>(this);

    @ManyToMany({entity: () => StudyPlan, inversedBy: (s: StudyPlan) => s.electives, pivotEntity: () => MapElectivePackageStudyPlan})
    studyPlansAppearingIn: Collection<StudyPlan> = new Collection<StudyPlan>(this);
}