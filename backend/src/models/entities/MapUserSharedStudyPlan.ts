import {CustomBaseEntity} from "./CustomBaseEntity.js";
import type {Rel} from "@mikro-orm/core";
import {Entity, ManyToOne, Unique} from "@mikro-orm/core";
import {StudyPlan} from "./StudyPlan.js";
import {User} from "./User.js";

@Entity()
@Unique({properties: ["studyPlan", "userSharedWith"]})
export class MapUserSharedStudyPlan extends CustomBaseEntity {
    @ManyToOne({entity: () => User})
    userSharedWith!: Rel<User>;

    @ManyToOne({entity: () => StudyPlan})
    studyPlan!: Rel<StudyPlan>;

}
