import type {Rel} from "@mikro-orm/core";
import {Entity, Index, ManyToOne, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {Program} from "./Program.js";
import {ElectivePackage} from "./ElectivePackage.js";

@Entity()
@Index({properties: ["electivePackage", "program"]})
export class MapElectivePackageProgram extends CustomBaseEntity {
    @ManyToOne({entity: () => ElectivePackage})
    electivePackage!: Rel<ElectivePackage>;

    @ManyToOne({entity: () => Program})
    program!: Rel<Program>;

    @Property({type: types.integer})
    semesterOrder!: number;
}