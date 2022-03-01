import { AutoMap } from "@automapper/classes";
import { CamelCaseNamingConvention, createMapper } from "@automapper/core";
import { mikro } from '@automapper/mikro';
import { AnyEntity, Entity, IdentifiedReference, MikroORM, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

export abstract class Base<T extends AnyEntity<T>> {
  @PrimaryKey()
  @AutoMap()
  id: number;
}

@Entity()
export class Author extends Base<Author> { 
  @OneToOne(() => Book, (book) => book.author, {
    wrappedReference: true
  })
  @AutoMap({ typeFn: () => Book })
  book: IdentifiedReference<Book>;

  @Property()
  @AutoMap()
  name: string;
}

@Entity()
export class Book extends Base<Book> {
  @OneToOne(()=> Author, (author) => author.book, {
    owner: true,
    wrappedReference: true,
  })
  @AutoMap({ typeFn: () => Author })
  author: IdentifiedReference<Author>;

  @Property()
  @AutoMap()
  name: string;
}

class AuthorDto {
  @AutoMap()
  id: number;
  
  @AutoMap()
  name: string;
}

class BookDto {
  @AutoMap()
  author: AuthorDto;

  @AutoMap()
  name: string;
}

const main = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: [Author, Book],
    dbName: 'auto-mapper-mikro-orm-sample',
    type: 'postgresql',
  });
  
  const mapper = createMapper({
    name: 'singleton-mapper',
    pluginInitializer: mikro(),
    namingConventions: new CamelCaseNamingConvention(),
  });

  try {
    mapper.createMap(Author, AuthorDto)
    mapper.createMap(Book, BookDto)

    const author = orm.em.create(Author, {id: 1234, name: "asdf"});
    
    const book = orm.em.create(Book, {id: 123, name: "John Doe", author});
    const bookDto = mapper.map(book, BookDto, Book);

    console.log(bookDto);
  } finally {
    orm.close();
  }
}

main().catch(console.error);
