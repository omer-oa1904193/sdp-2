import { Migration } from '@mikro-orm/migrations';

export class Migration20230501212814 extends Migration {

  async up(): Promise<void> {
    this.addSql('create index "department_college_id_index" on "department" ("college_id");');

    this.addSql('create index "course_department_id_index" on "course" ("department_id");');

    this.addSql('create index "map_elective_package_program_elective_package_id_pr_7ee95_index" on "map_elective_package_program" ("elective_package_id", "program_id");');

    this.addSql('create index "map_elective_package_study_plan_elective_package_id_70522_index" on "map_elective_package_study_plan" ("elective_package_id", "study_plan_id");');

    this.addSql('create index "comment_author_id_index" on "comment" ("author_id");');
    this.addSql('create index "comment_study_plan_id_index" on "comment" ("study_plan_id");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "department_college_id_index";');

    this.addSql('drop index "course_department_id_index";');

    this.addSql('drop index "map_elective_package_program_elective_package_id_pr_7ee95_index";');

    this.addSql('drop index "map_elective_package_study_plan_elective_package_id_70522_index";');

    this.addSql('drop index "comment_author_id_index";');
    this.addSql('drop index "comment_study_plan_id_index";');
  }

}
