import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {AppBar, InputBase} from "@material-ui/core";
import React from "react";
import useStyles from "./styles.jsx";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import {useSelector, useDispatch} from "react-redux";
import {useGoogleLogout} from 'react-google-login'
import * as actionTypes from "../../Store/actionTypes"


const Header = (props) => {
    const classes = useStyles()
    const title = useSelector(state => state.ui.selected)
    const dispatch = useDispatch()

    const {signOut, loaded} = useGoogleLogout({
        jsSrc: "https://apis.google.com/js/api.js",
        onFailure: () => {
            console.log("Failed to logout")
        },
        clientId: "513756828470-4dndgt7608ql784k15n3b5htme6domeg.apps.googleusercontent.com",
        cookiePolicy: 'single_host_origin',
        onLogoutSuccess: () => {
            console.log("logout success")
            dispatch({type: actionTypes.LOGOUT})
        }
    })
    const handleChange=(el)=>{
        console.log(el.target.value)
    }
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap>
                    Website Pinner!
                </Typography>
                <Typography variant="subtitle1" id="categoryTitle" className={classes.title}>
                    {title}
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        onChange={handleChange}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                    />
                </div>
                <IconButton color="inherit" onClick={signOut}>
                    <ExitToAppIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
export default Header