import { Migration } from '@mikro-orm/migrations';

export class Migration20230515223749 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "map_user_shared_study_plan" ("id" serial primary key, "study_plan_id" int not null, "user_shared_with_id" int not null);');

    this.addSql('alter table "map_user_shared_study_plan" add constraint "map_user_shared_study_plan_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');
    this.addSql('alter table "map_user_shared_study_plan" add constraint "map_user_shared_study_plan_user_shared_with_id_foreign" foreign key ("user_shared_with_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "map_user_shared_study_plan" add constraint "map_user_shared_study_plan_study_plan_id_user_shar_02297_unique" unique ("study_plan_id", "user_shared_with_id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "map_user_shared_study_plan" cascade;');
  }

}
