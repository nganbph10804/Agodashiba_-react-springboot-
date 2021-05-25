
import { makeStyles,SwipeableDrawer,Icon,Divider,List,ListItem,ListItemIcon ,ListItemText} from '@material-ui/core';
import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

// icons
import ApartmentIcon from '@material-ui/icons/Apartment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HotelIcon from '@material-ui/icons/Hotel';
import ReceiptIcon from '@material-ui/icons/Receipt';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,

    },
    sidebar :{
      padding: '5px  20px 5px 70px',
      width: '300px'
    },
    sidebarItem:{
      marginLeft: '20px'
    }
  }));
const HeaderAdmin = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(false);
      
    };
const listUnLogon = () => (
    <div >
      <div className={classes.sidebar}>
       
        <Typography  variant='h5'>Dash Board</Typography>

      </div>
      <Divider />
      <List>
        <ListItem className={classes.sidebarItem} button component={Link} to='/userManagement' onClick={handleClose} >
          <ListItemIcon><AccountBoxIcon /> </ListItemIcon>
          <ListItemText primary='User Management' />
        </ListItem>
        <ListItem className={classes.sidebarItem} button component={Link} to='/userManagement' onClick={handleClose} >
          <ListItemIcon><ApartmentIcon /> </ListItemIcon>
          <ListItemText primary='Hotel Management' />
        </ListItem>
        <ListItem className={classes.sidebarItem} button component={Link} to='/userManagement' onClick={handleClose} >
          <ListItemIcon><HotelIcon /> </ListItemIcon>
          <ListItemText primary='Room Management' />
        </ListItem>
        <ListItem className={classes.sidebarItem} button component={Link} to='/userManagement' onClick={handleClose} >
          <ListItemIcon><ReceiptIcon /> </ListItemIcon>
          <ListItemText primary='Bill Management' />
        </ListItem>


      </List>
    </div>
  );
    return (
        <div className={classes.root}>
                <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <React.Fragment >
              <SwipeableDrawer
                anchor='left'
                open={Boolean(anchorEl)}
                onClose={handleClose}
                
              >
                {listUnLogon()}
              </SwipeableDrawer>
            </React.Fragment>
          <Typography variant="h5" className={classes.title}>
           Administrator
          </Typography>
           
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default HeaderAdmin
