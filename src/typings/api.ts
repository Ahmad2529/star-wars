/**
 * Defines the request types used by the Service for communication with the API.
 */

/**
 * Defines the available request methods for the API.
 */
export enum Method {
  POST = 'post',
  GET = 'get',
  PATCH = 'patch',
}

/**
 * Interface for key value pair.
 */
export interface IKeyValue {
  [key: string]: any;
}

/**
 * Interface for get params in query url.
 */
export interface Query {
  [key: string]: string;
}

/**
 * Defines the general response type.
 */
export interface Response extends IKeyValue {}

/**
 * Interface for data object for api call.
 */
export interface Request extends IKeyValue {}
