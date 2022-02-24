import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Author, Book } from "./src/index";

const MIKRO_ORM_CONFIG: Options<PostgreSqlDriver> = {
  entities: [Author, Book],
  type: 'postgresql',
  dbName: 'auto-mapper-mikro-orm-sample',
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  charset: 'utf-8',
  forceUtcTimezone: true,
  debug: true,
  strict: true,
  metadataProvider: ReflectMetadataProvider,
  cache: { enabled: false },
  
  // Configure migrations.
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    pattern: /^[\w-]+\d+\.ts$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    emit: 'ts',
  },
};

// Need this for `mikro-orm` CLI tool.
// eslint-disable-next-line import/no-default-export
export default MIKRO_ORM_CONFIG;
