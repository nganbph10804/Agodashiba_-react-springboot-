import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../CustomForm/Button';
import Typography from '../CustomForm/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import {Link} from 'react-router-dom'

const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

const styles = (theme) => ({
  background: {
    display:'inline-block',
    marginTop:'62px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    
    minWidth: 200,
    

  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  buttonGroup:{
    display:'inline',
    padding:'0 20px'
  }
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Đặt phòng ngay
      </Typography>
     
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Giảm giá lên đến 70% cho các ngày chủ nhật.
      </Typography>
      <div className={classes.buttonGroup}>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button}
        component={Link}
       to='/search'
      > ĐẶT PHÒNG </Button>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component={Link}
       to='/signup'
      >
        Đăng kí
      </Button>
      </div>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);