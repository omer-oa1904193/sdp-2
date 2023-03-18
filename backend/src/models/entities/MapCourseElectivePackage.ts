import {Entity, ManyToOne} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Course} from "./Course.js";
import {ElectivePackage} from "./ElectivePackage.js";
import type {Rel} from "@mikro-orm/core";

@Entity()
export class MapCourseElectivePackage extends CustomBaseEntity {
    @ManyToOne({entity: () => Course})
    course!: Rel<Course>;

    @ManyToOne({entity: () => ElectivePackage})
    electivePackage!: Rel<ElectivePackage>;
}