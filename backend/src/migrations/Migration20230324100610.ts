import { Migration } from '@mikro-orm/migrations';

export class Migration20230324100610 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "college" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "department" ("id" serial primary key, "name" varchar(255) not null, "college_id" int not null);');

    this.addSql('create table "course" ("id" serial primary key, "title" varchar(255) not null, "code" varchar(255) not null, "credit_hours" int not null, "description" varchar(255) not null, "cost" real not null, "department_id" int not null, "prerequisites" jsonb not null);');

    this.addSql('create table "elective_package" ("id" serial primary key, "title" varchar(255) not null);');

    this.addSql('create table "instructor" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "map_course_elective_package" ("id" serial primary key, "course_id" int not null, "elective_package_id" int not null);');

    this.addSql('create table "program" ("id" serial primary key, "name" varchar(255) not null, "department_id" int not null, "year_created" int not null);');

    this.addSql('create table "map_elective_package_program" ("id" serial primary key, "elective_package_id" int not null, "program_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_order" int not null);');

    this.addSql('create table "map_course_program" ("id" serial primary key, "course_id" int not null, "program_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_order" int not null);');

    this.addSql('create table "section" ("id" serial primary key, "course_id" int not null, "type" text check ("type" in (\'Lecture\', \'Lab\')) not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year" int not null, "instructor_id" int not null);');

    this.addSql('create table "section_time_slot" ("id" serial primary key, "day_of_week" text check ("day_of_week" in (\'Sunday\', \'Monday\', \'Tuesday\', \'Wednesday\', \'Thursday\', \'Friday\', \'Saturday\')) not null, "start_time" time(0) not null, "end_time" time(0) not null, "section_id" int not null);');

    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "type" text check ("type" in (\'Student\', \'Academic Advisor\', \'Program Coordinator\')) not null, "university_id" varchar(255) null, "name" varchar(255) null, "enrollment_season" text check ("enrollment_season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) null, "enrollment_year" int null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "study_plan" ("id" serial primary key, "name" varchar(255) not null, "program_id" int not null, "author_id" int not null);');

    this.addSql('create table "map_elective_package_study_plan" ("id" serial primary key, "elective_package_id" int not null, "study_plan_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_order" int not null);');

    this.addSql('create table "map_course_study_plan" ("id" serial primary key, "course_id" int not null, "study_plan_id" int not null, "season" text check ("season" in (\'Fall\', \'Winter\', \'Spring\', \'Summer\')) not null, "year_order" int not null);');

    this.addSql('create table "comment" ("id" serial primary key, "text" varchar(255) not null, "time_posted" timestamptz(0) not null default now(), "study_plan_id" int not null, "author_id" int not null);');

    this.addSql('alter table "department" add constraint "department_college_id_foreign" foreign key ("college_id") references "college" ("id") on update cascade;');

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

    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');
    this.addSql('alter table "map_course_study_plan" add constraint "map_course_study_plan_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_study_plan_id_foreign" foreign key ("study_plan_id") references "study_plan" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

}
