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
    // Connexion à la base de données 'postgres'
    await dataSource.initialize();
    console.log(
      chalk.green(`Connexion à la base de données 'postgres' réussie.`),
    );

    // Vérification si la base de données de test existe
    const result: Array<{ '1': number }> = await dataSource.query(
      `SELECT 1 FROM pg_database WHERE datname=$1`,
      [databaseName],
    );

    if (result.length > 0) {
      console.log(
        chalk.yellow(
          `Base de données '${databaseName}' trouvée, suppression...`,
        ),
      );
      // Supprimer la base de données si elle existe déjà
      await dataSource.query(`DROP DATABASE IF EXISTS ${databaseName};`);
      console.log(chalk.green(`Base de données '${databaseName}' supprimée.`));
    }

    console.log(
      chalk.blue(`Création de la base de données '${databaseName}'...`),
    );
    await dataSource.query(`CREATE DATABASE ${databaseName};`);
    console.log(chalk.green(`Base de données '${databaseName}' créée.`));

    await dataSource.destroy();
  } catch (error) {
    console.error(
      chalk.red('Erreur lors de la gestion de la base de données :', error),
    );
    throw new Error('Impossible de vérifier ou créer la base de données.');
  }
}

// Fonction pour lancer les migrations
function runMigrations() {
  console.log(chalk.cyan('Exécution des migrations...'));
  execSync('pnpm migration:run', { stdio: 'inherit' });
  console.log(chalk.green('Migrations exécutées avec succès.'));
}

// Créer la base de données de test et lancer les migrations
async function prepareTestDatabase() {
  try {
    await dropAndCreateDatabase(DB_TEST_NAME);
    runMigrations();
  } catch (error) {
    console.error(
      chalk.red(
        'Erreur lors de la préparation de la base de données de test:',
        error,
      ),
    );
    process.exit(1);
  }
}

prepareTestDatabase();
