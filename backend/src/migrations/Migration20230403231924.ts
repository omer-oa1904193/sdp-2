import { Migration } from '@mikro-orm/migrations';

export class Migration20230403231924 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "course" alter column "prerequisites" type jsonb using ("prerequisites"::jsonb);');
    this.addSql('alter table "course" alter column "prerequisites" set default \'{"and": []}\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "course" alter column "prerequisites" type jsonb using ("prerequisites"::jsonb);');
    this.addSql('alter table "course" alter column "prerequisites" set default {"and": []}::jsonb;');
  }

}
