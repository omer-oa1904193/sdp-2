import type {Rel} from "@mikro-orm/core";
import {Entity, ManyToOne, Property, types, Unique} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {AdmissionTest} from "./AdmissionTest.js";
import {User} from "./User.js";

@Entity()
@Unique({properties: ["admissionTest", "student"]})
export class AdmissionTestResult extends CustomBaseEntity {
    @ManyToOne({entity: () => AdmissionTest})
    admissionTest!: Rel<AdmissionTest>;

    @ManyToOne({entity: () => User})
    student!: Rel<User>;

    @Property({type: types.decimal, serializer: value => Number(value)})
    score!: number;

}