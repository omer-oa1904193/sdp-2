import { CustomBaseEntity } from "./CustomBaseEntity.js";
import type { Rel } from "@mikro-orm/core";
import { Collection, Entity, ManyToMany, ManyToOne, Property, types } from "@mikro-orm/core";
import { StudyPlan } from "./StudyPlan.js";
import { User } from "./User.js";

@Entity()
export class SharedStudyPlan extends CustomBaseEntity {

    @ManyToOne({ entity: () => StudyPlan })
    studyPlan!: Rel<StudyPlan>;
    
    @ManyToMany({  entity: () => User })
    SharedUser!: Rel<User>;

    

}
