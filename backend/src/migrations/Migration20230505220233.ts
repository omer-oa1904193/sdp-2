import { Migration } from '@mikro-orm/migrations';

export class Migration20230505220233 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "elective_package" drop constraint if exists "elective_package_category_check";');

    this.addSql('alter table "map_course_program" drop constraint if exists "map_course_program_category_check";');

    this.addSql('alter table "map_course_study_plan" drop constraint if exists "map_course_study_plan_category_check";');

    this.addSql('alter table "elective_package" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "elective_package" add constraint "elective_package_category_check" check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\'));');

    this.addSql('alter table "map_course_program" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "map_course_program" add constraint "map_course_program_category_check" check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\'));');

    this.addSql('alter table "map_elective_package_study_plan" add column "current_course_id" int null;');
    this.addSql('alter table "map_elective_package_study_plan" add constraint "map_elective_package_study_plan_current_course_id_foreign" foreign key ("current_course_id") references "course" ("id") on update cascade on delete set null;');

    this.addSql('alter table "map_course_study_plan" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_category_check" check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "elective_package" drop constraint if exists "elective_package_category_check";');

    this.addSql('alter table "map_course_program" drop constraint if exists "map_course_program_category_check";');

    this.addSql('alter table "map_elective_package_study_plan" drop constraint "map_elective_package_study_plan_current_course_id_foreign";');

    this.addSql('alter table "map_course_study_plan" drop constraint if exists "map_course_study_plan_category_check";');

    this.addSql('alter table "elective_package" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "elective_package" add constraint "elective_package_category_check" check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\'));');

    this.addSql('alter table "map_course_program" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "map_course_program" add constraint "map_course_program_category_check" check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\'));');

    this.addSql('alter table "map_elective_package_study_plan" drop column "current_course_id";');

    this.addSql('alter table "map_course_study_plan" alter column "category" type text using ("category"::text);');
    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_category_check" check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\'));');
  }

}
