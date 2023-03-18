import type {Rel} from "@mikro-orm/core";
import {Entity, Enum, ManyToOne, Property, types} from "@mikro-orm/core";

import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {DayOfWeek} from "../enums/DayOfWeek.js";
import {Section} from "./Section.js";

@Entity()
export class SectionTimeSlot extends CustomBaseEntity {
    @Enum({items: () => DayOfWeek, type: types.enum})
    dayOfWeek!: DayOfWeek;

    @Property({type: types.time})
    startTime!: string;

    @Property({type: types.time})
    endTime!: string;

    @ManyToOne({entity: () => Section, inversedBy: (s: Section) => s.schedule})
    section!: Rel<Section>;
}