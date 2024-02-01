import React, { useEffect, useState } from 'react';
import './App.css';
import PeopleService from './services/people.service';
import { Box, Grid, Pagination } from '@mui/material';
import Navbar from './components/navbar/index';
import { IApiResponsePeople, IPeople } from './typings';
import CharacterCard from './components/card/index';
import CharacterDetail from './components/detail';
import PlanetService from './services/planet.service';
import Loader from './components/loader';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<IApiResponsePeople>();
  const [activePeople, setActivePeople] = useState<IPeople>();

  useEffect(() => {
    fetchPeople()
  }, [])

  const fetchPeople = async () => {
    setIsLoading(true)
    try {
      const response = await PeopleService.getPeople();
      setPeople(response);
      console.log(response);
      setIsLoading(false)
    } catch {
      setIsLoading(false);
      alert('Server is down! Please try again later');
    }
  }

  const onPaginationChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    setIsLoading(true);
    try {
      const response = await PeopleService.getPeopleByPage(page);
      setPeople(response);
      console.log(response)
      setIsLoading(false)
    } catch {
      setIsLoading(false);
      alert('Server is down! Please try again later');
    }
  }

  const fetchDetails = async (selected: IPeople) => {
    setIsLoading(true);
    console.log(selected)
    try {
      const details = await PlanetService.getPlanetByUrl(selected.homeworld as string);
      const peoplePlanetDet = {
        ...selected,
        homeworld: details
      }
      setActivePeople(peoplePlanetDet);
      setIsLoading(false)
    } catch {
      setIsLoading(false)
      alert('Server is down! Please try again later');
    }
  }

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <Navbar />
      <div className="App">
        {
          people ? (
            <div>
              <Box sx={{ width: '90%', margin: 'auto' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
                  {
                    people.results.map((result, index) => {
                      return (
                        <Grid key={result.name} container item xs={12} sm={6} md={4} lg={3}>
                          <CharacterCard
                            index={index}
                            key={result.name}
                            people={result}
                            onClick={() => fetchDetails(result)}
                          />
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Box>
              {activePeople && <CharacterDetail open={!!activePeople} people={activePeople} onClose={() => setActivePeople(undefined)} />}
              <Pagination
                data-testid='pagination'
                className='pagination'
                count={Math.ceil(people.count / 10)}
                shape="rounded"
                onChange={onPaginationChange}
              />
            </div>
          ) : null
        }
      </div>
    </ React.Fragment>
  );
}

export default App;
