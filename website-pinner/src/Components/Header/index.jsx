import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import useStyles from "./styles.jsx";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {useSelector} from "react-redux";

const Header=(props)=>{
    const classes= useStyles()
    const title=useSelector(state=>state.ui.selected)

    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Website Pinner!
                </Typography>
                <Typography variant="subtitle1" id="categoryTitle" className={classes.title} >
                    {title}
                </Typography>
                <IconButton edge="end" color="inherit">
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
export default Header