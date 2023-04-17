import {Entity, Enum, ManyToOne, Property, types, Unique} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Course} from "./Course.js";
import {Program} from "./Program.js";
import type {Rel} from "@mikro-orm/core";
import {Season} from "../enums/Season.js";

@Entity()
@Unique({properties: ["course", "program"]})
export class MapCourseProgram extends CustomBaseEntity {
    @ManyToOne({entity: () => Course})
    course!: Rel<Course>;

    @ManyToOne({entity: () => Program})
    program!: Rel<Program>;

    @Enum({items: () => Season, type: types.enum})
    season!: Season;

    @Property({type: types.integer})
    yearOrder!: number;
}