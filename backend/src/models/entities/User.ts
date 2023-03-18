import {Collection, Entity, Enum, OneToMany, Property, types, Unique} from "@mikro-orm/core";
import {CustomBaseEntity} from "./CustomBaseEntity.js";
import {UserType} from "../enums/UserType.js";
import {StudyPlan} from "./StudyPlan.js";
import {Comment} from "./Comment.js";
import {Season} from "../enums/Season.js";

@Entity()
export class User extends CustomBaseEntity {
    @Property({type: types.string})
    @Unique()
    username!: string;

    @Property({type: types.string, hidden: true})
    password!: string;

    @Enum({items: () => UserType, type: types.enum})
    type!: UserType;

    @OneToMany({entity: () => StudyPlan, mappedBy: (s: StudyPlan) => s.author})
    studyPlans: Collection<StudyPlan> = new Collection<StudyPlan>(this);

    // student fields
    @Property({type: types.string, nullable: true})
    universityId?: string;

    @Property({type: types.string, nullable: true})
    name?: string;

    @Enum({items: () => Season, type: types.enum, nullable: true})
    enrollmentSeason?: Season;

    @Property({type: types.integer, nullable: true})
    enrollmentYear?: number;

    @OneToMany({entity: () => Comment, mappedBy: (c: Comment) => c.author})
    comments: Collection<Comment> = new Collection<Comment>(this);
}
