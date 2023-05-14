import type {Rel} from "@mikro-orm/core";
import {Entity, Enum, ManyToOne, Property, types, Unique} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Course} from "./Course.js";
import {Program} from "./Program.js";
import {CourseCategory} from "../enums/CourseCategory.js";

@Entity()
@Unique({properties: ["course", "program"]})
export class MapCourseProgram extends CustomBaseEntity {
    @ManyToOne({entity: () => Course})
    course!: Rel<Course>;

    @ManyToOne({entity: () => Program})
    program!: Rel<Program>;

    @Property({type: types.integer})
    semesterOrder!: number;

    @Enum({items: () => CourseCategory, type: types.enum})
    category!: CourseCategory;

}