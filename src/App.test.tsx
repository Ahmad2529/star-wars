import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import PeopleService from './services/people.service';
import PlanetService from './services/planet.service';
import { wait } from '@testing-library/user-event/dist/utils';

jest.mock('./services/people.service');
jest.mock('./services/planet.service');

const mockPeople = {
  count: 20,
  next: "https://swapi.dev/api/people/?page=2",
  previous: 'null',
  results: [{
    birth_year: 'string',
    eye_color: 'string',
    films: ['string'],
    gender: 'string',
    hair_color: 'string',
    height: 1,
    homeworld: 'string',
    mass: 2,
    name: 'string',
    skin_color: 'string',
    created: 'string',
    edited: 'string',
    species: ['string'],
    starships: ['string'],
    url: 'string',
    vehicles: ['string']
  }],
};

describe('App component', () => {
  beforeEach(() => {
    const getPeopleSpy = jest.spyOn(PeopleService, 'getPeople')
    const getPeopleByPageSpy = jest.spyOn(PeopleService, 'getPeopleByPage')
    const getPlanetByUrlSpy = jest.spyOn(PlanetService, 'getPlanetByUrl')
    getPeopleSpy.mockResolvedValue(mockPeople)
    getPeopleByPageSpy.mockResolvedValue(mockPeople)
  });

  test('renders App component', async () => {
    render(<App />);

    expect(PeopleService.getPeople).toBeCalled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('fetches people data and displays cards', async () => {
    render(<App />);

    await wait(1000);
    expect(screen.getByTestId('character-card')).toBeInTheDocument();
    expect(screen.getByText('string')).toBeInTheDocument();
  });

  test('fetches people data on pagination change', async () => {
    render(<App />);

    await wait(1000);
    screen.findByTestId('character-card');
    fireEvent.click(screen.getByText('2'));
    expect(PeopleService.getPeopleByPage).toHaveBeenCalledWith(2);
    expect(screen.getByText('string')).toBeInTheDocument();
  });

  test('fetches and displays character details', async () => {
    render(<App />);

    await wait(1000);
    await screen.findByTestId('character-card');
    fireEvent.click(screen.getByText('string'));

    expect(PlanetService.getPlanetByUrl).toHaveBeenCalled();
  });

});