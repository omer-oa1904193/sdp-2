import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Property, types} from "@mikro-orm/core";

export class GradeScale extends CustomBaseEntity {
    @Property({type: types.string})
    letterGrade!: string;

    @Property({type: types.double})
    numericalValue!: number;
}