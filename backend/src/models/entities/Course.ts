import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Department} from "./Department.js";
import {Section} from "./Section.js";
import {Program} from "./Program.js";
import {ElectivePackage} from "./ElectivePackage.js";
import {StudyPlan} from "./StudyPlan.js";
import {MapCourseProgram} from "./MapCourseProgram.js";
import {MapCourseElectivePackage} from "./MapCourseElectivePackage.js";
import {MapCourseStudyPlan} from "./MapCourseStudyPlan.js";
import type {Rel} from "@mikro-orm/core";

@Entity()
export class Course extends CustomBaseEntity {
    @Property({type: types.string})
    title!: string;

    @Property({type: types.string})
    code!: string;

    @Property({type: types.integer})
    creditHours!: number;

    @Property({type: types.text})
    description!: string;

    @Property({type: types.float})
    cost!: number

    @ManyToOne({entity: () => Department, inversedBy: (d: Department) => d.courses})
    department!: Rel<Department>;

    @Property({type: types.json, defaultRaw: `'{"and": []}'::jsonb`})
    prerequisites!: object;

    @OneToMany({entity: () => Section, mappedBy: (s: Section) => s.course})
    sections: Collection<Section> = new Collection<Section>(this);

    @ManyToMany({entity: () => Program, inversedBy: (p: Program) => p.courses, pivotEntity: () => MapCourseProgram})
    programsAppearingIn: Collection<Program> = new Collection<Program>(this);

    @ManyToMany({entity: () => ElectivePackage, inversedBy: (p: ElectivePackage) => p.courses, pivotEntity: () => MapCourseElectivePackage})
    electivePackagesAppearingIn: Collection<ElectivePackage> = new Collection<ElectivePackage>(this);

    @ManyToMany({entity: () => StudyPlan, inversedBy: (s: StudyPlan) => s.courses, pivotEntity: () => MapCourseStudyPlan})
    studyPlansAppearingIn: Collection<StudyPlan> = new Collection<StudyPlan>(this);
}