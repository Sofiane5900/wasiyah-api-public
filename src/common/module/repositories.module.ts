import { Module, Global, DynamicModule } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

// Définir un type générique pour un repository
interface RepositoryProvider<T> {
  provide: T;
  useFactory: (dataSource: DataSource) => T;
  inject: [typeof DataSource];
}

// Définir un type générique pour un repository avec un constructeur spécifique
type RepositoryConstructor<T extends object> = new (
  dataSource: DataSource,
) => Repository<T>;

@Global()
@Module({})
export class RepositoriesModule {
  // Fonction statique pour charger les repositories de manière dynamique
  static forRoot(): DynamicModule {
    const repositories = getRepositories();
    return {
      module: RepositoriesModule,
      providers: repositories,
      exports: repositories.map((repo) => repo.provide),
    };
  }
}

// Fonction qui récupère et charge dynamiquement les repositories
function getRepositories(): RepositoryProvider<
  RepositoryConstructor<object>
>[] {
  const repositories: RepositoryProvider<RepositoryConstructor<object>>[] = [];

  const isDevelopment = process.env.NODE_ENV !== 'production';
  const repositoriesDir = isDevelopment
    ? path.join(__dirname, '../../../src')
    : path.join(__dirname, '../../../dist');

  const dirs = fs.readdirSync(repositoriesDir);

  dirs.forEach((dir) => {
    const repoPath = path.join(
      repositoriesDir,
      dir,
      `${dir.toLowerCase()}.repository.${isDevelopment ? 'ts' : 'js'}`,
    );

    if (fs.existsSync(repoPath)) {
      // Importation dynamique avec typage strict
      import(repoPath)
        .then((repoModule: Record<string, unknown>) => {
          const repoName = Object.keys(repoModule)[0];
          const repository = repoModule[repoName];

          // Vérifier que repository est bien une classe
          if (repository && typeof repository === 'function') {
            const repositoryConstructor =
              repository as RepositoryConstructor<object>;

            // Ajout du repository dans la liste avec un constructeur valide
            repositories.push({
              provide: repositoryConstructor,
              useFactory: (): RepositoryConstructor<object> => {
                return repositoryConstructor; // Retourner le constructeur, pas une instance
              },
              inject: [DataSource],
            });
          } else {
            console.error(
              `Le repository dans ${repoPath} n'est pas une classe valide`,
            );
          }
        })
        .catch((err) => {
          console.error(
            `Erreur lors de l'importation du repository ${repoPath}:`,
            err,
          );
        });
    }
  });

  return repositories;
}
