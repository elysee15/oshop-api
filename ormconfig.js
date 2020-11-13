module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'bleu_app_db',
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
