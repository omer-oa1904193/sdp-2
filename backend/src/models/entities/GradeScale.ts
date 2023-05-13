import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Entity, Property, types} from "@mikro-orm/core";
@Entity()
export class GradeScale extends CustomBaseEntity {
    @Property({type: types.string})
    letterGrade!: string;

    @Property({type: types.double})
    numericalValue!: number;
}