import { Avatar, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { React, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import UserSservice from '../../Service/UserSservice';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(10, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    large: {
        width: theme.spacing(40),
        height: theme.spacing(60),
    },

}));
const Profile = ({ user ,setUser}) => {
    const classes = useStyles();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [img, setImg] = useState({selectedFile:null});
    const [check,setCheck] =useState(false);
    const { phone } = useParams();
    const history = useHistory();
    useEffect(()=>{
        UserSservice.getuserById(phone)
        .then((resp)=>{
            setUser(resp.data);
        })
        .catch(err=>{
            console.log(err);
        })

        return ()=>{
            setCheck(false);
        }

    },[check])
    const onHandleChang =(e)=>{
        setImg({selectedFile: e.target.files[0]});
        
    }
    // console.log(user.username);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password!==confirmPassword){
            window.alert('Password not match!');
            return;
        }
        if(password.length<6){
            window.alert('password at least 6 character');
            return;
        }
        let users= {
            username: username, 
            email: user.email,
             passwords: password
       
         }
         console.log(users);
        UserSservice.updateUser(users,phone)
        .then((resp)=>{
           
            window.alert('user updated!')

        })
        .catch(err=>{
            window.alert(err.message);
        })
        if(img.selectedFile==null)
        { return; }
            const formData = new FormData();

            formData.append(
                "image",
              img.selectedFile,
              img.selectedFile.name
            );
            console.log(img);
            UserSservice.updateImage(phone,formData)
            .then((resp)=>{
                window.alert('upload image done!')
                setCheck(true);
                setConfirmPassword('');
                setPassword('');
                
            }
                
            )
            .catch(err=>{
                console.log(err);
             window.alert(err.message);
            })
        

       
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={4} md={4} component={Paper} elevation={9} square >
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Hi {phone}
                    </Typography>
                    {user.img ? <Avatar alt="img profile" src={`http://localhost:8080//${user.img}`} className={classes.large} /> :
                        <Avatar alt="img profile"  className={classes.large} />}

                    <input accept="image/*" className={classes.input} onChange={(e) => { onHandleChang(e) }} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        Chọn Ảnh
        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>

            </Grid>
            <Grid item xs={12} sm={8} md={8} component={Paper} elevation={15} square>
                <div className={classes.paper}>

                    <Typography component="h1" variant="h4">
                        Your Profile
            </Typography>
                    <form onSubmit={(e) => handleSubmit(e)} className={classes.form}  encType="multipart/form-data"   >

                        <TextField
                            variant="outlined"
                            margrin='normal'
                            fullWidth
                            defaultValue={user.email}
                            label="Email"
                            id="email"
                            disabled
                        />
                        <TextField

                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => setUsername(e.target.value)}
                            id="email"
                            defaultValue={user.username}
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="password"
                            label="Confirm Password"
                            type="password"
                            id="ConfirmPassword"

                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Save Profile
              </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

export default Profile
