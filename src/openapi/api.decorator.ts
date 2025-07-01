import {
  applyDecorators,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AllExceptionsFilter } from '../filter/filter-exception';

type EntityClass = { new (...args: any[]): any; name: string };

/**
 * @param status {number}
 * @param exception {string}
 * @return object
 */
const errorSchema = (status: number, exception: string) => {
  const error: object = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      type: { type: 'string', example: exception },
      message: { type: 'string' },
      error: { type: 'string' },
      statusCode: { type: 'number', example: status },
    },
  };
  return error;
};

const ApiCommonResponses = () => {
  return applyDecorators(
    UseFilters(AllExceptionsFilter),
    ApiResponse({
      status: 400,
      description: 'Invalid input or parameters.',
      schema: errorSchema(400, BadRequestException.name),
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden request.',
      schema: errorSchema(403, ForbiddenException.name),
    }),
    ApiResponse({
      status: 404,
      description: 'Resource not found.',
      schema: errorSchema(404, NotFoundException.name),
      // type: NotFoundException
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable entity, invalid data provided.',
      schema: errorSchema(422, UnprocessableEntityException.name),
    }),
  );
};

/**
 * @param entity {EntityClass}
 * @param collection {boolean}
 * @constructor
 */
const ApiOptionParam = (entity: EntityClass, collection: boolean) => {
  if (!collection) {
    return applyDecorators(
      ApiParam({
        name: 'id',
        description: `${entity.name} identifier`,
        type: String,
      }),
    );
  } else {
    return applyDecorators();
  }
};

/**
 * @param entity {EntityClass}
 * @param collection {boolean}
 * @constructor
 */
export function ApiGetResource(
  entity: EntityClass,
  collection: boolean = false,
) {
  const collectionOperation: string = `Retrieves the collection of ${entity.name} resources`;
  const itemOperation: string = `Retrieves a ${entity.name} resource.`;
  return applyDecorators(
    UseFilters(AllExceptionsFilter),
    ApiResponse({
      status: 200,
      description: collection
        ? `${entity.name} collection`
        : `${entity.name} ressource`,
      type: entity,
      isArray: collection ?? false,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden request.',
      schema: errorSchema(403, ForbiddenException.name),
    }),
    ApiOperation({
      summary: collection ? collectionOperation : itemOperation,
      description: collection ? collectionOperation : itemOperation,
    }),
    ApiOptionParam(entity, collection),
  );
}

/**
 * @param entity {EntityClass}
 * @constructor
 */
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

/**
 * @param entity {EntityClass}
 * @constructor
 */
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

/**
 * @param entity {EntityClass}
 * @constructor
 */
export function ApiDeleteRessource(entity: EntityClass) {
  return applyDecorators(
    UseFilters(AllExceptionsFilter),
    ApiResponse({
      status: 204,
      description: `${entity.name} resource deleted`,
    }),
    ApiResponse({
      status: 403,
      description: 'Resource not found.',
      schema: errorSchema(403, ForbiddenException.name),
    }),
    ApiResponse({
      status: 404,
      description: 'Resource not found.',
      schema: errorSchema(404, NotFoundException.name),
    }),
    ApiOperation({
      summary: `Removes the ${entity.name} ressource`,
      description: `Removes the ${entity.name} ressource`,
    }),
    ApiOptionParam(entity, false),
  );
}
