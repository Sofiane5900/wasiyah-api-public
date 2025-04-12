import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Collection } from 'typeorm';

type EntityClass = { new (...args: any[]): any; name: string };

const ApiCommonResponses = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Invalid input or parameters.',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden request.',
    }),
    ApiResponse({
      status: 404,
      description: 'Resource not found.',
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable entity, invalid data provided.',
    }),
  );
};

const ApiOptionParam = (entity: EntityClass, collection: boolean) => {
  if (!collection) {
    return applyDecorators(
      ApiParam({
        name: 'id',
        description: `${entity.name} identifier`,
        type: Number,
      }),
    );
  } else {
    return applyDecorators();
  }
};

export function ApiGetResource(
  entity: EntityClass,
  collection: boolean = false,
) {
  const collectionOperation: string = `Retrieves the collection of ${entity.name} resources`;
  const itemOperation: string = `Retrieves a ${entity.name} resource.`;
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: collection
        ? `${entity.name} collection`
        : `${entity.name} ressource`,
      type: collection ? Collection : entity,
      isArray: collection ?? false,
    }),
    ApiResponse({
      status: 404,
      description: 'Resource not found.',
    }),
    ApiOperation({
      summary: collection ? collectionOperation : itemOperation,
      description: collection ? collectionOperation : itemOperation,
    }),
    ApiOptionParam(entity, collection),
  );
}

export function ApiPostRessource(entity: EntityClass) {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: `${entity.name} resource created`,
      type: entity,
    }),
    ApiCommonResponses(),
    ApiOperation({
      summary: `Creates the ${entity.name} ressource`,
      description: `Creates the ${entity.name} ressource`,
    }),
  );
}

export function ApiPatchRessource(entity: EntityClass) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: `${entity.name} resource updated`,
      type: entity,
    }),
    ApiCommonResponses(),
    ApiOperation({
      summary: `Replaces the ${entity.name} ressource`,
      description: `Replaces the ${entity.name} ressource`,
    }),
    ApiOptionParam(entity, false),
  );
}

export function ApiDeleteRessource(entity: EntityClass) {
  return applyDecorators(
    ApiResponse({
      status: 204,
      description: `${entity.name} resource deleted`,
      type: entity,
    }),
    ApiCommonResponses(),
    ApiOperation({
      summary: `Removes the ${entity.name} ressource`,
      description: `Removes the ${entity.name} ressource`,
    }),
    ApiOptionParam(entity, false),
  );
}
