import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {AppBar, Button, InputBase} from "@material-ui/core";
import React from "react";
import useStyles from "./styles.jsx";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import {useSelector} from "react-redux";

const Header = (props) => {
    const classes = useStyles()
    const title = useSelector(state => state.ui.selected)

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
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                    />
                </div>
                <IconButton color="inherit">
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
export default Header