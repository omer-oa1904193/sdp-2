import type {Rel} from "@mikro-orm/core";
import {Collection, Entity, ManyToOne, OneToMany, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {College} from "./College.js";
import {Course} from "./Course.js";
import {Program} from "./Program.js";

@Entity()
export class Department extends CustomBaseEntity {
    @Property({type: types.string})
    name!: string;

    @Property({type: types.string})
    code!: string;

    @ManyToOne({entity: () => College, inversedBy: (c: College) => c.departments, nullable: true})
    college?: Rel<College>;

    @OneToMany({entity: () => Course, mappedBy: (c: Course) => c.department})
    courses: Collection<Course> = new Collection<Course>(this);

    @OneToMany({entity: () => Program, mappedBy: (p: Program) => p.department})
    programs: Collection<Program> = new Collection<Program>(this);
}