import {CustomBaseEntity} from "./CustomBaseEntity.js";
import type {Rel} from "@mikro-orm/core";
import {Enum, ManyToOne, Property, types} from "@mikro-orm/core";
import {Course} from "./Course.js";
import {User} from "./User.js";
import {Season} from "../enums/Season.js";
import {GradeScale} from "./GradeScale.js";

export class Enrollment extends CustomBaseEntity {

    @ManyToOne({entity: () => User})
    student!: Rel<User>;

    @ManyToOne({entity: () => Course})
    course!: Rel<Course>;

    @Enum({items: () => Season, type: types.enum})
    season!: string;

    @Property({type: types.integer})
    year!: number;

    @ManyToOne({entity: () => GradeScale})
    grade!: Rel<GradeScale>;

}
