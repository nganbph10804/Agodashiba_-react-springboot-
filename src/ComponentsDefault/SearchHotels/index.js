import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import React, { useEffect, useState } from 'react';
import HotelService from '../../Service/HotelService';
import StarRatings from 'react-star-ratings'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  container:{
 
    padding:'80px 20px'
  },
  title:{
      height:90,
      textTransform: 'uppercase',
     

  },
  root: {
    width:300,
    height:570 ,
    maxWidth: 300,
    padding: '10px 20px',
    margin:'30px'
  },
  media: {
    height: 240,
    paddingTop: '56.25%', // 16:9
    '& :hover':{
      cursor: 'pointer'
    }
    
  },
  content:{
    height:150,
  
  },
  desc:{
    height:80
  },
  location:{
    color: 'blue',
    display:'flex',
    marginLeft:'70px',
    fontSize:'15px'
  },
  bookButton:{
    color : "red",
    fontSize:'20px'
  }

  

}));

export default function ListHotels() {
  const classes = useStyles();

  const [lstHotel, setLstHotel] = useState([]);
  const history = useHistory();


useEffect(() => {

        HotelService.getAllHotels().then((res) => {
          setLstHotel(res.data);
        })
          .catch(err => {
            console.log(err);
          })
          
    

      }, [])


     

function FormRow() {
      return(
          <React.Fragment>
        {lstHotel.map((hotel)=>{
            return(
            <Card key={hotel.id_hotels} className={classes.root}>
            <CardHeader className={classes.title}
              title={hotel.name}
            />
            <Link to={`/hotel/${hotel.id_hotels}`} >
            <CardMedia
              
              className={classes.media}
              image={`http://localhost:8080//${hotel.img}`}
              title="Paella dish"
            />
            </Link>
            <CardContent className={classes.content} >
              <Typography className={classes.desc} variant="body2" color="textSecondary" component="p">
                {hotel.sort_desc}
              </Typography>
              <StarRatings
              starDimension="30px"
              starSpacing="2px"
              starRatedColor="yellow"
              rating={hotel.star_rate}
              />
              <Typography className={classes.location}><LocationOnIcon color="primary"/>{hotel.address.substring(hotel.address.indexOf(',')+1)}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton component={Link} to={`/hotel/${hotel.id_hotels}`} className={classes.bookButton} aria-label="add to favorites">
                Đặt Ngay <EventAvailableIcon/>
              </IconButton>
              <IconButton style={{marginLeft:'40px'}} aria-label="share">
                <ShareIcon color="primary" />
              </IconButton>
              
            </CardActions>
            
          </Card>
            )
        })}
        </React.Fragment>
      )
  }

  return (
      <div className={classes.container}>
       <Grid  container spacing={2}>
           <Grid container item xs={12} spacing={3}>
                <FormRow/>
           </Grid>

       </Grid>
    </div>
  );
}