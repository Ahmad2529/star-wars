import { Service } from '../typings';

/**
 * The http service is a wrapper for the HTML fetch method.
 */
namespace HttpService {
  /**
   * Sets the expected header details.
   *
   * @returns The headers format used by the HTML fetch API.
   */
  const setFetchHeaders = async (token?: string): Promise<Headers> => {
    try {
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token || '');
      return headers;
    } catch (error) {
      return new Headers();
    }
  };

  /**
   * Send a request to the service.
   *
   * @param url The URL that is being messaged.
   * @param method The service method that is being requested.
   * @param body The body can be any form of object with key value pairs.
   *
   * @returns The response from the service which is any form of object with key value pairs.
   */
  export const sendRequest = async (
    url: string,
    method: Service.Method,
    body?: Service.Request | string,
    queries?: Service.Query
  ): Promise<Service.Response> => {
    if (queries) {
      url = Object.keys(queries).reduce(
        (qurl, key, index, array) => (qurl += key + '=' + queries[key] + (index === array.length - 1 ? '' : '&')),
        url + '?'
      );
    }

    const headers = await setFetchHeaders();

    let options: {
      method: Service.Method;
      headers: Headers;
      body?: string;
    } = {
      method: method,
      headers: headers,
    };

    if (body && method === Service.Method.POST) {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw await response.text();
      }

      return response.json() as Service.Response;
    } catch (error) {
      throw error;
    }
  };
}

export default HttpService;
