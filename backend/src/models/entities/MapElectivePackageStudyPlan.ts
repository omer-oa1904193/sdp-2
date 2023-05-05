import {Entity, EntityData, EntityDTO, Enum, Index, ManyToOne, OneToMany, Property, types, Unique} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {ElectivePackage} from "./ElectivePackage.js";
import {StudyPlan} from "./StudyPlan.js";
import type {Rel} from "@mikro-orm/core";
import {Season} from "../enums/Season.js";
import {Course} from "./Course.js";
import {MapCourseStudyPlan} from "./MapCourseStudyPlan.js";

@Entity()
@Index({properties: ["electivePackage", "studyPlan"]})
export class MapElectivePackageStudyPlan extends CustomBaseEntity {
    @ManyToOne({entity: () => ElectivePackage})
    electivePackage!: Rel<ElectivePackage>;

    @ManyToOne({entity: () => StudyPlan})
    studyPlan!: Rel<StudyPlan>;

    @Enum({items: () => Season, type: types.enum})
    season!: Season;

    @Property({type: types.integer})
    yearOrder!: number;

    @ManyToOne({entity: () => Course, nullable: true})
    currentCourse!: Rel<Course>;

}