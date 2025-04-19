import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityTarget, ObjectLiteral } from 'typeorm';

@ValidatorConstraint({ name: 'UniqueEntity', async: true })
@Injectable()
export class UniqueEntityConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, property] = args.constraints as [
      EntityTarget<ObjectLiteral>,
      string,
    ];

    const repo = this.entityManager.getRepository(EntityClass);

    const exists = await repo.exists({ where: { [property]: value } });

    return !exists;
  }

  defaultMessage(args: ValidationArguments): string {
    const [EntityClass, property] = args.constraints as [
      EntityTarget<ObjectLiteral>,
      string,
    ];
    const className =
      typeof EntityClass === 'function' ? EntityClass.name : 'Entity';
    return `${property} of class ${className} already exists.`;
  }
}

/**
 * @param entity {EntityTarget}
 * @param property {string}
 * @param validationOptions {ValidationOptions}
 * @constructor
 */
export function UniqueEntity<T extends ObjectLiteral>(
  entity: EntityTarget<T>,
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, property],
      validator: UniqueEntityConstraint,
    });
  };
}
