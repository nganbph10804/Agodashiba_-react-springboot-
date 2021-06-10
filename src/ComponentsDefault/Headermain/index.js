import { makeStyles,Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

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
        fontWeight: 500,
        '&:hover' :{
          cursor:"pointer"
        }
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


const HeaderMain = ({user,setUser}) => {
  const his = useHistory();
  const classes = useStyles();
  const handleLogout = ()=>{
    let cnf = window.confirm('do you want to logout?');
    if(cnf===true){
      setUser({});
    }else{
      return;
    }
}
  const listUnLog =()=> (
    <>
    <Button className={classes.Button} component={Link} to="/signup" >Sign Up</Button> 
    <Button className={classes.Button} component={Link} to="/signin" >Login</Button> 
    </>
  )

  const listLoged =() =>(
        <>
      <IconButton style={{color:'white'}} onClick={()=>his.push(`/profile/${user.phone}`)}>
          <PersonIcon/>
          <Typography >
           {user.username}
           </Typography>
           </IconButton>
           <IconButton onClick={handleLogout}>
              <ExitToAppIcon color='primary'/>
           </IconButton>
          
         
         
        </>
  )
   
    return (
        <div className={classes.root}>
        <AppBar className={classes.AppBar} >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        
          <Typography variant="h5" onClick={()=>{his.push("/")}} className={classes.title}>
           Agoda Shiba
          </Typography> 
          {!user.username ? listUnLog() : listLoged()}
         
          
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default HeaderMain
