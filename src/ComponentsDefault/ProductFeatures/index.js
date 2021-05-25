import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../CustomForm/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: '#f5cee5',
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
      fontWeight: '600',
    marginTop: theme.spacing(5),
    
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://material-ui.com/static/themes/onepirate/productValues1.svg"
                alt="suitcase"
              />
              <Typography variant="h6" className={classes.title}>
                Một trong những hệ thống khách sạn hàng đầu
              </Typography>
              <Typography variant="h5">
                {'Từ những hệ thống tuyệt nhất với không gian cổ điển và bể bơi cỡ XXL'}
                {', đến với kì nghỉ mini này chỉ với 30 phút đi xe từ Hà Nội.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://material-ui.com/static/themes/onepirate/productValues2.svg"
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Trải nghiệm mới
              </Typography>
              <Typography variant="h5">
                {'Bể bơi riêng tư, thức dậy mỗi sáng trong khu rừng rộng 900m2… '}
                {'ngày chủ nhật của bạn sẽ thật đặc biệt đó.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://material-ui.com/static/themes/onepirate/productValues3.svg"
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Ưu đãi độc quyền
              </Typography>
              <Typography variant="h5">
                {`Đăng kí ngay với AGODA SHIBA
                `}
                {`Để nhận ưu đãi ngay bây giờ.`}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);