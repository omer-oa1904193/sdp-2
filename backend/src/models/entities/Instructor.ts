import {Collection, Entity, OneToMany, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Section} from "./Section.js";

@Entity()
export class Instructor extends CustomBaseEntity {
    @Property({type: types.string})
    name!: string;

    @OneToMany({entity: () => Section, mappedBy: (s: Section) => s.instructor})
    sectionsTeaching: Collection<Section> = new Collection<Section>(this);
}