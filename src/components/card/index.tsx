import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IPeople } from '../../typings';

interface props {
  index: number,
  people: IPeople,
  onClick: () => void
}

const CharacterCard = ({
  index,
  people,
  onClick
}: props) => {
  return (
    <Card sx={{ 
      maxWidth: 345,
      backgroundColor: people.skin_color,
    }} className='hover-effect' data-testid='character-card'>
      <CardActionArea onClick={onClick} >
        <CardMedia
          component="img"
          height="160"
          image={`https://picsum.photos/280/160?random=${index+1}`}
          alt="random img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {people.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CharacterCard;