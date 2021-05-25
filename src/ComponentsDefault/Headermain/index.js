import { makeStyles,Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { React } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 2,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
        textTransform: 'uppercase',
        marginLeft: '110px',
        fontWeight: 500
    },
    AppBar :{
      position: 'sticky',
    position: '-webkit-sticky',
     top: 0,
        backgroundColor: '#373b3a',
        
       
    },
    Button :{
        textTransform:'uppercase',
        fontSize:'0.9rem',
        color: '#ffffff',
        '&:hover': {
            color :'orange',
            cursor: 'pointer'
        }
    },
   
  }));
const HeaderMain = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar className={classes.AppBar} >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
         
          <Typography variant="h5" className={classes.title}>
           Agoda Shiba
          </Typography>  
          <Button className={classes.Button} >Sign Up</Button> 
          <Button className={classes.Button} >Login</Button> 
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default HeaderMain
