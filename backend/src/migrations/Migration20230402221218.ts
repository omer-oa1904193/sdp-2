import { Migration } from '@mikro-orm/migrations';

export class Migration20230402221218 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "course" alter column "description" type text using ("description"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "course" alter column "description" type varchar(512) using ("description"::varchar(512));');
  }

}
