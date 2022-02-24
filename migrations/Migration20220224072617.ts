import { Migration } from '@mikro-orm/migrations';

export class Migration20220224072617 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "author" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "book" ("id" serial primary key, "author_id" int4 not null, "name" varchar(255) not null);');
    this.addSql('alter table "book" add constraint "book_author_id_unique" unique ("author_id");');

    this.addSql('alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade;');
  }

}
