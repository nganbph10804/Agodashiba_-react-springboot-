
import { Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import React from 'react';
// icons
import ApartmentIcon from '@material-ui/icons/Apartment';
import HotelIcon from '@material-ui/icons/Hotel';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
     alignItems:'center'

    },
    sidebar :{
      padding: '5px  20px 5px 70px',
      width: '300px'
    },
    sidebarItem:{
      marginLeft: '20px'
    },
    AppBar:{
      position: 'sticky',
      position: '-webkit-sticky',
      top: 0
    }
  }));
const HeaderAdmin = ({user,setUser}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(false);
      
    };
    const handleLogout = ()=>{
          let cnf = window.confirm('do you want to logout?');
          if(cnf===true){
            setUser({});
          }else{
            return;
          }
    }
    const listLogon = () => (
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
        <ListItem className={classes.sidebarItem} button component={Link} to='/hotelManagement' onClick={handleClose} >
          <ListItemIcon><ApartmentIcon /> </ListItemIcon>
          <ListItemText primary='Hotel Management' />
        </ListItem>
        <ListItem className={classes.sidebarItem} button component={Link} to='/roomManagement/4' onClick={handleClose} >
          <ListItemIcon><HotelIcon /> </ListItemIcon>
          <ListItemText primary='Room Management' />
        </ListItem>
        <ListItem className={classes.sidebarItem} button component={Link} to='/billManagement' onClick={handleClose} >
          <ListItemIcon><ReceiptIcon /> </ListItemIcon>
          <ListItemText primary='Bill Management' />
        </ListItem>


      </List>
    </div>
  );
    return (
        <div className={classes.root}>
                <AppBar className={classes.AppBar}>
        <Toolbar>
          <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <React.Fragment >
              <SwipeableDrawer
                anchor='left'
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onOpen={Boolean(anchorEl)}
                
              >
                {listLogon()}
              </SwipeableDrawer>
            </React.Fragment>
          <Typography variant="h5" className={classes.title}>
           Administrator
          </Typography>

          <Typography> 
              <PersonIcon/>
           {user.username}
           <IconButton onClick={handleLogout}>
              <ExitToAppIcon/>
           </IconButton>
          </Typography>
           
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default HeaderAdmin
