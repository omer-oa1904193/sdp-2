import { Migration } from '@mikro-orm/migrations';

export class Migration20230514143235 extends Migration {

  async up(): Promise<void> {


    this.addSql('create table "admission_test" ("id" serial primary key, "name" varchar(255) not null, "max_score" numeric(10,0) not null);');

    this.addSql('create table "college" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "department" ("id" serial primary key, "name" varchar(255) not null, "code" varchar(255) not null, "college_id" int null);');
    this.addSql('create index "department_college_id_index" on "department" ("college_id");');

    this.addSql('create table "course" ("id" serial primary key, "title" varchar(255) not null, "code" varchar(255) not null, "credit_hours" int not null, "description" text not null, "cost" real not null, "department_id" int not null, "prerequisites" jsonb not null default \'{"and": []}\');');
    this.addSql('create index "course_department_id_index" on "course" ("department_id");');

    this.addSql('create table "elective_package" ("id" serial primary key, "title" varchar(255) not null, "category" text check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\')) not null, "credit_hours" int not null);');

    this.addSql('create table "grade_scale" ("id" serial primary key, "letter_grade" varchar(255) not null, "numerical_value" double precision not null);');

    this.addSql('create table "instructor" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "map_course_elective_package" ("id" serial primary key, "course_id" int not null, "elective_package_id" int not null);');
    this.addSql('alter table "map_course_elective_package" add constraint "map_course_elective_package_course_id_elective_package_id_unique" unique ("course_id", "elective_package_id");');

    this.addSql('create table "program" ("id" serial primary key, "name" varchar(255) not null, "department_id" int not null, "year_created" int not null);');

    this.addSql('create table "map_elective_package_program" ("id" serial primary key, "elective_package_id" int not null, "program_id" int not null, "semester_order" int not null);');
    this.addSql('create index "map_elective_package_program_elective_package_id_pr_7ee95_index" on "map_elective_package_program" ("elective_package_id", "program_id");');

    this.addSql('create table "map_course_program" ("id" serial primary key, "course_id" int not null, "program_id" int not null, "semester_order" int not null, "category" text check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\')) not null);');
    this.addSql('alter table "map_course_program" add constraint "map_course_program_course_id_program_id_unique" unique ("course_id", "program_id");');

    this.addSql('create table "section" ("id" serial primary key, "course_id" int not null, "type" text check ("type" in (\'Lecture\', \'Lab\')) not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year" int not null, "instructor_id" int not null);');

    this.addSql('create table "section_time_slot" ("id" serial primary key, "day_of_week" text check ("day_of_week" in (\'Sunday\', \'Monday\', \'Tuesday\', \'Wednesday\', \'Thursday\', \'Friday\', \'Saturday\')) not null, "start_time" time(0) not null, "end_time" time(0) not null, "section_id" int not null);');

    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'Student\', \'Academic Advisor\', \'Program Coordinator\')) not null, "name" varchar(255) null, "university_id" varchar(255) null, "enrollment_season" text check ("enrollment_season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) null, "enrollment_year" int null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "study_plan" ("id" serial primary key, "name" varchar(255) not null, "season_started" text check ("season_started" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_started" int not null, "program_id" int not null, "author_id" int not null);');

    this.addSql('create table "map_elective_package_study_plan" ("id" serial primary key, "elective_package_id" int not null, "study_plan_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year" int not null, "current_course_id" int null);');
    this.addSql('create index "map_elective_package_study_plan_elective_package_id_70522_index" on "map_elective_package_study_plan" ("elective_package_id", "study_plan_id");');

    this.addSql('create table "map_course_study_plan" ("id" serial primary key, "course_id" int not null, "study_plan_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year" int not null, "category" text check ("category" in (\'Major Course\', \'CCP Course\', \'College Requirement\', \'Major Supporting\', \'Major Elective\', \'Other\')) not null);');
    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_course_id_study_plan_id_unique" unique ("course_id", "study_plan_id");');

    this.addSql('create table "enrollment" ("id" serial primary key, "student_id" int not null, "course_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year" int not null, "grade_id" int not null);');
    this.addSql('alter table "enrollment" add constraint "enrollment_student_id_course_id_season_year_unique" unique ("student_id", "course_id", "season", "year");');

    this.addSql('create table "comment" ("id" serial primary key, "text" varchar(255) not null, "time_posted" timestamptz(0) not null default now(), "study_plan_id" int not null, "author_id" int not null);');
    this.addSql('create index "comment_author_id_index" on "comment" ("author_id");');
    this.addSql('create index "comment_study_plan_id_index" on "comment" ("study_plan_id");');

    this.addSql('create table "admission_test_result" ("id" serial primary key, "admission_test_id" int not null, "student_id" int not null, "score" numeric(10,0) not null);');
    this.addSql('alter table "admission_test_result" add constraint "admission_test_result_admission_test_id_student_id_unique" unique ("admission_test_id", "student_id");');

    this.addSql('alter table "department" add constraint "department_college_id_foreign" foreign key ("college_id") references "college" ("id") on update cascade on delete set null;');

    this.addSql('alter table "course" add constraint "course_department_id_foreign" foreign key ("department_id") references "department" ("id") on update cascade;');

    this.addSql('alter table "map_course_elective_package" add constraint "map_course_elective_package_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "map_course_elective_package" add constraint "map_course_elective_package_elective_package_id_foreign" foreign key ("elective_package_id") references "elective_package" ("id") on update cascade;');

    this.addSql('alter table "program" add constraint "program_department_id_foreign" foreign key ("department_id") references "department" ("id") on update cascade;');

    this.addSql('alter table "map_elective_package_program" add constraint "map_elective_package_program_elective_package_id_foreign" foreign key ("elective_package_id") references "elective_package" ("id") on update cascade;');
    this.addSql('alter table "map_elective_package_program" add constraint "map_elective_package_program_program_id_foreign" foreign key ("program_id") references "program" ("id") on update cascade;');

    this.addSql('alter table "map_course_program" add constraint "map_course_program_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "map_course_program" add constraint "map_course_program_program_id_foreign" foreign key ("program_id") references "program" ("id") on update cascade;');

    this.addSql('alter table "section" add constraint "section_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "section" add constraint "section_instructor_id_foreign" foreign key ("instructor_id") references "instructor" ("id") on update cascade;');

    this.addSql('alter table "section_time_slot" add constraint "section_time_slot_section_id_foreign" foreign key ("section_id") references "section" ("id") on update cascade;');

    this.addSql('alter table "study_plan" add constraint "study_plan_program_id_foreign" foreign key ("program_id") references "program" ("id") on update cascade;');
    this.addSql('alter table "study_plan" add constraint "study_plan_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "map_elective_package_study_plan" add constraint "map_elective_package_study_plan_elective_package_id_foreign" foreign key ("elective_package_id") references "elective_package" ("id") on update cascade;');
    this.addSql('alter table "map_elective_package_study_plan" add constraint "map_elective_package_study_plan_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');
    this.addSql('alter table "map_elective_package_study_plan" add constraint "map_elective_package_study_plan_current_course_id_foreign" foreign key ("current_course_id") references "course" ("id") on update cascade on delete set null;');

    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');

    this.addSql('alter table "enrollment" add constraint "enrollment_student_id_foreign" foreign key ("student_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "enrollment" add constraint "enrollment_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "enrollment" add constraint "enrollment_grade_id_foreign" foreign key ("grade_id") references "grade_scale" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "admission_test_result" add constraint "admission_test_result_admission_test_id_foreign" foreign key ("admission_test_id") references "admission_test" ("id") on update cascade;');
    this.addSql('alter table "admission_test_result" add constraint "admission_test_result_student_id_foreign" foreign key ("student_id") references "user" ("id") on update cascade;');

  }

  async down(): Promise<void> {


    this.addSql('alter table "admission_test_result" drop constraint "admission_test_result_admission_test_id_foreign";');

    this.addSql('alter table "department" drop constraint "department_college_id_foreign";');

    this.addSql('alter table "course" drop constraint "course_department_id_foreign";');

    this.addSql('alter table "program" drop constraint "program_department_id_foreign";');

    this.addSql('alter table "map_course_elective_package" drop constraint "map_course_elective_package_course_id_foreign";');

    this.addSql('alter table "map_course_program" drop constraint "map_course_program_course_id_foreign";');

    this.addSql('alter table "section" drop constraint "section_course_id_foreign";');

    this.addSql('alter table "map_elective_package_study_plan" drop constraint "map_elective_package_study_plan_current_course_id_foreign";');

    this.addSql('alter table "map_course_study_plan" drop constraint "map_course_study_plan_course_id_foreign";');

    this.addSql('alter table "enrollment" drop constraint "enrollment_course_id_foreign";');

    this.addSql('alter table "map_course_elective_package" drop constraint "map_course_elective_package_elective_package_id_foreign";');

    this.addSql('alter table "map_elective_package_program" drop constraint "map_elective_package_program_elective_package_id_foreign";');

    this.addSql('alter table "map_elective_package_study_plan" drop constraint "map_elective_package_study_plan_elective_package_id_foreign";');

    this.addSql('alter table "enrollment" drop constraint "enrollment_grade_id_foreign";');

    this.addSql('alter table "section" drop constraint "section_instructor_id_foreign";');

    this.addSql('alter table "map_elective_package_program" drop constraint "map_elective_package_program_program_id_foreign";');

    this.addSql('alter table "map_course_program" drop constraint "map_course_program_program_id_foreign";');

    this.addSql('alter table "study_plan" drop constraint "study_plan_program_id_foreign";');

    this.addSql('alter table "section_time_slot" drop constraint "section_time_slot_section_id_foreign";');

    this.addSql('alter table "study_plan" drop constraint "study_plan_author_id_foreign";');

    this.addSql('alter table "enrollment" drop constraint "enrollment_student_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_author_id_foreign";');

    this.addSql('alter table "admission_test_result" drop constraint "admission_test_result_student_id_foreign";');

    this.addSql('alter table "map_elective_package_study_plan" drop constraint "map_elective_package_study_plan_study_plan_id_foreign";');

    this.addSql('alter table "map_course_study_plan" drop constraint "map_course_study_plan_study_plan_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_study_plan_id_foreign";');

    this.addSql('drop table if exists "admission_test" cascade;');

    this.addSql('drop table if exists "college" cascade;');

    this.addSql('drop table if exists "department" cascade;');

    this.addSql('drop table if exists "course" cascade;');

    this.addSql('drop table if exists "elective_package" cascade;');

    this.addSql('drop table if exists "grade_scale" cascade;');

    this.addSql('drop table if exists "instructor" cascade;');

    this.addSql('drop table if exists "map_course_elective_package" cascade;');

    this.addSql('drop table if exists "program" cascade;');

    this.addSql('drop table if exists "map_elective_package_program" cascade;');

    this.addSql('drop table if exists "map_course_program" cascade;');

    this.addSql('drop table if exists "section" cascade;');

    this.addSql('drop table if exists "section_time_slot" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "study_plan" cascade;');

    this.addSql('drop table if exists "map_elective_package_study_plan" cascade;');

    this.addSql('drop table if exists "map_course_study_plan" cascade;');

    this.addSql('drop table if exists "enrollment" cascade;');

    this.addSql('drop table if exists "comment" cascade;');

    this.addSql('drop table if exists "admission_test_result" cascade;');
  }

}
