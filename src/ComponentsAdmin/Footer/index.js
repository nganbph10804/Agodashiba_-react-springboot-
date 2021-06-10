import { CssBaseline, Typography,Container, makeStyles } from '@material-ui/core'
import React from 'react'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <a color="inherit" href="https://fb.com/Ngafko.lacaf">
          Contact me
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '10vh',
    },
   
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
  }));

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
      <CssBaseline />
    
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">ngabinh239@gmail.com </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
    )
}

export default Footer
