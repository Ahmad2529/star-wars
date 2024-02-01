import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { IPeople, IPlanet } from '../../typings/index';

interface props {
  open: boolean,
  people: IPeople,
  onClose: () => void,
  onClick?: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: '#eee',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export default function CharacterDetail({
  open,
  people,
  onClose
}: props) {

  const getFormattedDate = (str: string) => {
    const dateObject = new Date(str);

    if (isNaN(dateObject.getTime())) {
      return "Invalid Date";
    }
  
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2>{people.name}</h2>
            <h3>Character Details:</h3>
            <ul>
              <li className='list-item'><div>Height: </div> <span>{(people.height / 100).toFixed(2)} (meters)</span></li>
              <li className='list-item'><div>Mass: </div> <span>{people.mass} (kg)</span></li>
              <li className='list-item'><div>Birth Year: </div> <span>{people.birth_year}</span></li>
              <li className='list-item'><div>No. of Films: </div> <span>{people.films.length}</span></li>
              <li className='list-item'><div>Added at: </div> <span>{
                getFormattedDate(people.created)
              }</span></li>
            </ul>
            <br />
            <h3>Home World Details:</h3>
            <ul>
              <li className='list-item'><div>Name: </div> <span>{(people.homeworld as IPlanet).name}</span></li>
              <li className='list-item'><div>Terrain: </div> <span>{(people.homeworld as IPlanet).terrain}</span></li>
              <li className='list-item'><div>Climate: </div> <span>{(people.homeworld as IPlanet).climate}</span></li>
              <li className='list-item'><div>No. of Residents: </div> <span>{(people.homeworld as IPlanet).residents.length}</span></li>
            </ul>
            <br />
            <Button data-testid='close' variant="contained" onClick={onClose}>Close</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}