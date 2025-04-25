import * as fs from 'fs';
import * as path from 'path';
import chalk from "chalk";

// Fonction pour générer un Repository
function generateRepository(entityName: string): void {
  const repositoryPath = path.join(__dirname, '..', 'src', entityName.toLowerCase(), `${entityName.toLowerCase()}.repository.ts`);
  const repositoryContent = `
import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { ${entityName} } from './${entityName.toLowerCase()}.entity';
import {DataSource} from "typeorm";

@Injectable()
export class ${entityName}Repository extends ServiceEntityRepository<${entityName}> {
   constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<${entityName} | null> {
    return this.findOne({ where: { value } });
  }*/
}
  `;

  // Vérifie si le fichier existe déjà
  if (fs.existsSync(repositoryPath)) {
    console.log(chalk.yellow(`Le repository de l'entité ${entityName} existe déjà.`));
  } else {
    // Crée le dossier si nécessaire
    const modulePath = path.dirname(repositoryPath);
    if (!fs.existsSync(modulePath)) {
      fs.mkdirSync(modulePath, { recursive: true });
    }

    // Crée le fichier repository
    fs.writeFileSync(repositoryPath, repositoryContent);
    console.log(chalk.green(`Le repository de l'entité ${entityName} a été créé avec succès.`));
  }
}

const entityName = process.argv[2];

if (!entityName) {
  console.log(chalk.red('Veuillez spécifier le nom de l\'entité.'));
  process.exit(1);
}

generateRepository(entityName)