import { DataSource } from 'typeorm';
import { execSync } from 'child_process';
import chalk from 'chalk';

const DB_SERVICE = process.env.DB_SERVICE || 'db';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER || 'database_user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'database_pass';
const DB_TEST_NAME = process.env.DB_TEST_NAME || 'wasiyah_db_test';

const dataSource = new DataSource({
  type: 'postgres',
  host: DB_SERVICE,
  port: parseInt(DB_PORT.toString(), 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: 'postgres',
  synchronize: false,
  logging: false,
});

async function dropAndCreateDatabase(databaseName: string) {
  try {
    // Connect to the 'postgres' database
    await dataSource.initialize();
    console.log(
      chalk.green(`Successfully connected to the 'postgres' database.`),
    );

    // Check if the test database exists
    const result: Array<{ '1': number }> = await dataSource.query(
      `SELECT 1 FROM pg_database WHERE datname=$1`,
      [databaseName],
    );

    if (result.length > 0) {
      console.log(
        chalk.yellow(`Database '${databaseName}' found, deleting...`),
      );
      // Delete the database if it already exists
      await dataSource.query(`DROP DATABASE IF EXISTS ${databaseName};`);
      console.log(chalk.green(`Database '${databaseName}' deleted.`));
    }

    console.log(chalk.blue(`Creating the database '${databaseName}'...`));
    await dataSource.query(`CREATE DATABASE ${databaseName};`);
    console.log(chalk.green(`Database '${databaseName}' created.`));

    await dataSource.destroy();
  } catch (error) {
    console.error(chalk.red('Error while managing the database:', error));
    throw new Error('Unable to verify or create the database.');
  }
}

// Function to run migrations
function runMigrations() {
  console.log(chalk.cyan('Running migrations...'));
  execSync('pnpm migration:run', { stdio: 'inherit' });
  console.log(chalk.green('Migrations successfully executed.'));
}

// Create the test database and run migrations
async function prepareTestDatabase() {
  try {
    await dropAndCreateDatabase(DB_TEST_NAME);
    runMigrations();
  } catch (error) {
    console.error(chalk.red('Error while preparing the test database:', error));
    process.exit(1);
  }
}

prepareTestDatabase();
