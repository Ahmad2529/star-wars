import { API_ENDPOINT } from "contant";
import HttpService from "./http.service";
import { ISpecie, Service } from "../typings";

/**
 * The specie service is responsible for creating and handling specie in the UI.
 */
namespace SpecieService {
  const ENDPOINT = 'species'

  export const getSpecieByUrl = async (url: string): Promise<ISpecie> => {
    const specie = await HttpService.sendRequest(url, Service.Method.GET);
    return specie as ISpecie;
  }
}

export default SpecieService;
