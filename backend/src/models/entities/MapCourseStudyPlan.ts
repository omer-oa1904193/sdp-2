import {Entity, EntityData, EntityDTO, Enum, ManyToOne, Property, types, Unique} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Course} from "./Course.js";
import {StudyPlan} from "./StudyPlan.js";
import type {Rel} from "@mikro-orm/core";
import {Season} from "../enums/Season.js";
import {MapCourseProgram} from "./MapCourseProgram.js";

@Entity()
@Unique({properties: ["course", "studyPlan"]})
export class MapCourseStudyPlan extends CustomBaseEntity {
    @ManyToOne({entity: () => Course})
    course!: Rel<Course>;

    @ManyToOne({entity: () => StudyPlan})
    studyPlan!: Rel<StudyPlan>;

    @Enum({items: () => Season, type: types.enum})
    season!: Season;

    @Property({type: types.integer})
    yearOrder!: number;


    toObject(ignoreFields?: string[]): EntityDTO<this> {
        return {
            ...((super.toObject() as EntityData<MapCourseStudyPlan>)?.course as Course),
            season: this.season,
            yearOrder: this.yearOrder,
        } as EntityDTO<this>
    }
}