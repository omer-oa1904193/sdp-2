import {Collection, Entity, Enum, ManyToOne, OneToMany, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Course} from "./Course.js";
import {SectionType} from "../enums/SectionType.js";
import {SectionTimeSlot} from "./SectionTimeSlot.js";
import {Instructor} from "./Instructor.js";
import type {Rel} from "@mikro-orm/core";
import {Season} from "../enums/Season.js";
@Entity()
export class Section extends CustomBaseEntity {
    @ManyToOne({entity: () => Course, inversedBy: (c: Course) => c.sections})
    course!: Rel<Course>;

    @Enum({items: () => SectionType, type: types.enum})
    type!: SectionType;

    @Enum({items: () => Season, type: types.enum})
    season!: Season;

    @Property({type: types.integer})
    year!: number;

    @OneToMany({entity: () => SectionTimeSlot, mappedBy: (t: SectionTimeSlot) => t.section})
    schedule: Collection<SectionTimeSlot> = new Collection<SectionTimeSlot>(this);

    @ManyToOne({entity: () => Instructor, inversedBy: (i: Instructor) => i.sectionsTeaching})
    instructor!: Instructor;
}