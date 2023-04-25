import {Entity, Enum, ManyToOne, Property, types, Unique} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Program} from "./Program.js";
import {ElectivePackage} from "./ElectivePackage.js";
import type {Rel} from "@mikro-orm/core";
import {Season} from "../enums/Season.js";

@Entity()
export class MapElectivePackageProgram extends CustomBaseEntity {
    @ManyToOne({entity: () => ElectivePackage})
    electivePackage!: Rel<ElectivePackage>;

    @ManyToOne({entity: () => Program})
    program!: Rel<Program>;

    @Enum({items: () => Season, type: types.enum})
    season!: Season;

    @Property({type: types.integer})
    yearOrder!: number;
}