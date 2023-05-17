import { Migration } from '@mikro-orm/migrations';

export class Migration20230517091950 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comment" alter column "text" type text using ("text"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "comment" alter column "text" type varchar(255) using ("text"::varchar(255));');
  }

}
