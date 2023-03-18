import type {Rel} from "@mikro-orm/core";
import {Entity, ManyToOne, Property, types} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {User} from "./User.js";
import {StudyPlan} from "./StudyPlan.js";

@Entity()
export class Comment extends CustomBaseEntity {
    @Property({type: types.string})
    text!: string;

    @Property({type: types.datetime, defaultRaw: "now()"})
    timePosted!: Date;

    @ManyToOne({entity: () => StudyPlan, inversedBy: (s: StudyPlan) => s.comments})
    studyPlan!: Rel<StudyPlan>;

    @ManyToOne({entity: () => User, inversedBy: (u: User) => u.comments})
    author!: Rel<User>;
}