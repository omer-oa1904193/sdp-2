import {Collection, Entity, OneToMany, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Department} from "./Department.js";

@Entity()
export class College extends CustomBaseEntity {
    @Property({type: types.string})
    name!: string;

    @OneToMany({entity: () => Department, mappedBy: (d: Department) => d.college})
    departments: Collection<Department> = new Collection<Department>(this);
}