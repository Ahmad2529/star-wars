import { API_ENDPOINT } from "contant";
import HttpService from "./http.service";
import { IApiResponsePeople, IPeople, Service } from "../typings";
import SpecieService from "./specie.service";

/**
 * The People service is responsible for creating and handling People in the UI.
 */
namespace PeopleService {
  const ENDPOINT = 'people'

  export const getPeople = async (): Promise<IApiResponsePeople> => {
    const people = await HttpService.sendRequest(`${API_ENDPOINT}/${ENDPOINT}`, Service.Method.GET) as IApiResponsePeople;
    
    // return mapSpecieToPeople(people);
    return people;
  }

  export const getPeopleByPage = async (page: number): Promise<IApiResponsePeople> => {
    const people = await HttpService.sendRequest(
      `${API_ENDPOINT}/${ENDPOINT}`,
      Service.Method.GET,
      undefined,
      { 'page': page.toString() }
    ) as IApiResponsePeople;
    
    // return mapSpecieToPeople(people) 
    return people;
  }

  // Use this function to populate specie details to people object.
  const mapSpecieToPeople = async (people: IApiResponsePeople) => {
    const speciesUrl = people.results.filter(x => x.species.length).map(x => SpecieService.getSpecieByUrl(x.species[0]));
    const species = await Promise.all(speciesUrl);
    people.results.forEach((res, index) => {
      if (res.species.length) {
        const specieDetail = species.find(x => res.species[0] === x.url)!
        people.results[index].specieDet = specieDetail;
      }
    });
    return people;
  }
}

export default PeopleService;
