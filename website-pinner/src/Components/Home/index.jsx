import React from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import {CssBaseline, Typography, Button, Box, Divider} from "@material-ui/core";
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookIcon from '@material-ui/icons/Facebook';
const axios= require('axios')

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",

    },
    gridRow: {
        height: "100%",
        color: "white",
        marginTop: "10%",
        marginBottom: "2%"
    },
    LoginButton: {
        width: "16rem",
        height: "3.5rem",
        fontWeight: "normal",
        justifyContent: "center",
        margin: "10px",
    },
    divider: {
        height: "4px",
        backgroundColor: "white",
        borderRadius: "50px"
    },
    backgroundDiv: {
        backgroundImage: `url("https://assets.website-files.com/5bfd1275cc56e15ce750b18e/5c289afb9a157501b4893a89_55.%20My%20Pink.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height:"100vh",
        color:"#263238"
    },
    rightContentWrapper: {
        textAlign: "center"
    },
    leftContentWrapper: {
        alignItems:"center",
       color:"white"
    },
    webpager:{
       color: "#9575cd"
    }

}))
const Home = (props) => {
    const classes = useStyles()

    const responseGoogle = async (response) => {
        const data= response.profileObj
        const res= await axios.post("http://localhost:8080/login",data)
        // props.history.push("app")
    }

    const responseFacebook = async (response) => {
        console.log(response);
        const res= await axios.post("http://localhost:8080/login",response)
        // props.history.push("app")
    }

    return (
        <div className={classes.root}>
            <Grid container alignItems="center">
                <Grid item sm={7} >
                    <Box className={classes.rightContentWrapper}>

                        <Typography align="center" variant={"h2"}>Welcome to <span
                          className={classes.webpager}> WEBPAGER!</span></Typography>

                        <Divider variant="middle" className={classes.divider}/>

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

                    </Box>
                </Grid>

                <Grid item sm={5} >
                        <Grid container className={classes.backgroundDiv} alignItems="center">
                            <Typography variant={"h6"}>
                                <ul>
                                    <li>Are you tired of managing your cluttered bookmarks?</li>
                                    <li>Wish you could store all of them somewhere easy to
                                        access?
                                    </li>
                                    <br/>
                                    <li>
                                        Introducing Webpager! <br/>
                                        Your one stop solution for storing and
                                        organizing all your important
                                        links in one place.
                                    </li>
                                    <li>
                                        Just login to check it out
                                    </li>
                                </ul>
                            </Typography>
                        </Grid>
                </Grid>


            </Grid>
        </div>
    )
}
export default Home