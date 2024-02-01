import { API_ENDPOINT } from "contant";
import HttpService from "./http.service";
import { IPlanet, Service } from "../typings";

/**
 * The Planet service is responsible for creating and handling Planet in the UI.
 */
namespace PlanetService {
  const ENDPOINT = 'planets'

  export const getPlanetByUrl = async (url: string): Promise<IPlanet> => {
    const planet = await HttpService.sendRequest(url, Service.Method.GET);
    return planet as IPlanet;
  }
}

export default PlanetService;
