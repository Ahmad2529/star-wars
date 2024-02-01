export * as Service from './api';

export interface IAppContext {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

}

export interface IApiResponsePeople {
  count: number;
  previous: string;
  next: string;
  results: IPeople[]
}

export interface IPeople {
  birth_year: string,
  eye_color: string,
  films: string[],
  gender: string,
  hair_color: string,
  height: number,
  homeworld: string | IPlanet,
  mass: number,
  name: string,
  skin_color: string,
  created: string,
  edited: string,
  species: string[],
  specieDet?: ISpecie
  starships: string[],
  url: string,
  vehicles: string[]
}

export interface IPlanet {
  climate: string
  created: string
  diameter: number
  edited: string
  films: string[]
  gravity: string
  name: string
  orbital_period: number
  population: number
  residents: string[]
  rotation_period: number
  surface_water: number
  terrain: string
  url: string
}

export interface ISpecie {
  average_height: string
  average_lifespan: string
  classification: string
  created: string
  designation: string
  edited: string
  eye_colors: string
  films: string[]
  hair_colors: string
  homeworld: string
  language: string
  name: string
  people: string[]
  skin_colors: string
  url: string
}