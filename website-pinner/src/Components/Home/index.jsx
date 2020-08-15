import React from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from './styles';
import {Typography, Box, Divider, Backdrop, CircularProgress} from "@material-ui/core";
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login'
import {useDispatch} from "react-redux";
import * as actionTypes from "../../Store/actionTypes"
import Axios from "axios";


const Home = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const openLoading = () => {
        setOpen(true)
    }


    const responseGoogle = async (response) => {
        openLoading()
        const data = response.profileObj
        const res = await Axios.post("http://localhost:8080/login", data)
        console.log("login request res", res)
        if (res.status) {
            console.log("in google callback")
            dispatch({type: actionTypes.AUTH_SUCESS})
            dispatch({type: actionTypes.LOGIN_USER, payload: data})
            handleClose()
            props.history.push("app")
        }else{
            alert("something went wrong..try again later while we fix this")
        }

    }

    const responseFacebook = async (response) => {
        const res = await Axios.post("http://localhost:8080/login", response)
        if (res.status) {
            console.log("in facebook callback", response)
            dispatch({type: actionTypes.AUTH_SUCESS})
            dispatch({type: actionTypes.LOGIN_USER, payload: response})
            handleClose()
            props.history.push("app")
        }else{
            alert("something went wrong..try again later while we fix this")
        }
    }

    return (
        <div className={classes.root}>
            <Grid container alignItems="center">
                <Grid item sm={7}>
                    <Box className={classes.rightContentWrapper}>

                        <Typography align="center" variant={"h2"}>Welcome to <span
                            className={classes.webpager}> WEBPAGER!</span></Typography>

                        <Divider variant="middle" className={classes.divider}/>
                        <div className={classes.btnClass}>
                        <GoogleLogin
                            className={classes.LoginButton}
                            clientId="513756828470-4dndgt7608ql784k15n3b5htme6domeg.apps.googleusercontent.com"
                            buttonText="LOGIN WITH GOOGLE"
                            onSuccess={responseGoogle}
                            onFailure={openLoading}
                            isSignedIn={true}           //will call on success callback on load
                            cookiePolicy={'single_host_origin'}
                        />
                        <FacebookLogin
                            appId="1485709034963671"
                            fields="name,email,picture"
                            icon="fa-facebook"
                            onClick={openLoading}
                            callback={responseFacebook}
                        />
                        </div>
                    </Box>
                    <Box display="flex" p={3} mt={3} justifyContent="center">
                        {open ? <CircularProgress/> : null}
                    </Box>
                </Grid>

                <Grid item sm={5}>
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