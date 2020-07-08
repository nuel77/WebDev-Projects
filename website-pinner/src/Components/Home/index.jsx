import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import {CssBaseline, Typography, Button, Paper, Divider} from "@material-ui/core";
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        backgroundImage: `url("https://assets.website-files.com/5bfd1275cc56e15ce750b18e/5c289afb9a157511e8893a43_19.%20Can%20Can.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

    },
    gridRow: {
        height: "100%",
        color: "white",
        marginTop:"10%",
        marginBottom:"2%"
    },
    LoginButton: {
        width: "16rem",
        height: "3.5rem",
        fontWeight: "normal",
        justifyContent: "center",
        margin: "10px"
    },
    divider:{
      height:"4px",
      backgroundColor:"white",
        borderRadius:"50px"
    },
    backgroundDiv:{

        borderRadius:"16px"
    }
}))
const Home = (props) => {
    const classes = useStyles()

    const responseGoogle = (response) => {
        console.log(response);
        props.history.push("app")
    }

    const responseFacebook = (response) => {
        console.log(response);
        props.history.push("app")
    }

    return (
        <div className={classes.root}>
            <Grid container alignContent="center">
                <Grid container justify="center" className={classes.gridRow}>
                    <Grid item sm={5}>
                        <div className={classes.backgroundDiv}>
                        <Typography align="center" variant={"h2"}>Welcome to <span style={{color:"#3F51B5"}}> Webpager!</span></Typography>
                            <Divider variant="middle" className={classes.divider}/>
                            <Typography variant={"h5"}>
                            <ul>
                                <li>Are you tired of managing your cluttered bookmarks?</li>
                                <li>Wish you could store all of them somewhere easy to
                                    access?
                                </li>
                                <li>
                                    Introducing Webpager! your one stop solution for storing and
                                    organizing all your important
                                    links in one place. Login to check it out
                                </li>
                            </ul>
                        </Typography>

                        </div>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <GoogleLogin
                        className={classes.LoginButton}
                        clientId="513756828470-4dndgt7608ql784k15n3b5htme6domeg.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        // isSignedIn={true}           //will call on success callback on load
                        cookiePolicy={'single_host_origin'}
                    />
                    <FacebookLogin
                        appId="1485709034963671"
                        // autoLoad={true}
                        fields="name,email,picture"
                        icon="fa-facebook"
                        callback={responseFacebook}
                        render={renderProps => (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<FacebookIcon/>}
                                className={classes.LoginButton}>
                                LOGIN WITH FACEBOOK
                            </Button>
                        )}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default Home