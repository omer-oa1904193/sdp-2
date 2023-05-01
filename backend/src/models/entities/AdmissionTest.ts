import {Collection, Entity, ManyToMany, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {AdmissionTestResult} from "./AdmissionTestResult.js";
import {User} from "./User.js";

@Entity()
export class AdmissionTest extends CustomBaseEntity {
    @Property({type: types.string})
    name!: string;

    @Property({type: types.decimal, serializer: value => Number(value)})
    maxScore!: number;

    @ManyToMany({entity: () => User, inversedBy: (p: User) => p.admissionTestsTaken, pivotEntity: () => AdmissionTestResult})
    student: Collection<User> = new Collection<User>(this);
}