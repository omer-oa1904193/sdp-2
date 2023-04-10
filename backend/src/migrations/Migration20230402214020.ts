import { Migration } from '@mikro-orm/migrations';

export class Migration20230402214020 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "department" drop constraint "department_college_id_foreign";');

    this.addSql('alter table "department" add column "code" varchar(255) not null;');
    this.addSql('alter table "department" alter column "college_id" type int using ("college_id"::int);');
    this.addSql('alter table "department" alter column "college_id" drop not null;');
    this.addSql('alter table "department" add constraint "department_college_id_foreign" foreign key ("college_id") references "college" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "department" drop constraint "department_college_id_foreign";');

    this.addSql('alter table "department" alter column "college_id" type int using ("college_id"::int);');
    this.addSql('alter table "department" alter column "college_id" set not null;');
    this.addSql('alter table "department" drop column "code";');
    this.addSql('alter table "department" add constraint "department_college_id_foreign" foreign key ("college_id") references "college" ("id") on update cascade;');
  }

}
