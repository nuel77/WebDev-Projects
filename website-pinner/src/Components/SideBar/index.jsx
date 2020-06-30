import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import React, {useState} from "react";
import useStyles from "./styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Typography, TextField, ListItemText, ListItemIcon, Box} from "@material-ui/core";
import {Fab, IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from '@material-ui/icons/Home';
import {useDispatch} from 'react-redux'
import * as actionTypes from "../../Store/actionTypes"

const SideBar = (props) => {
    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([])
    const dispatch = useDispatch()

    const handleAddCategory = () => {
        let addInput = document.getElementById("categoryInput")
        if (addInput.value) {
            let newCategoryList = [...categoryList, addInput.value]
            setCategoryList(newCategoryList)
            addInput.value = ""
        }
    }
    const handleCategoryClick = (event) => {
        let categoryClicked = event.target.innerText
        dispatch({type: actionTypes.SELECTED_CATEGORY, payload: categoryClicked})
    }
    const homeCategorySelect = () => {
        dispatch({type: actionTypes.SELECTED_CATEGORY, payload: "HOME"})
    }
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                <ListItem>
                    <TextField label="NEW CATEGORY" id="categoryInput"/>
                    <Fab size="small" color="secondary" onClick={handleAddCategory}>
                        <AddIcon/>
                    </Fab>
                </ListItem>
                {/*-------------*/}
                <ListItem button>
                    <Box display="flex" justifyContent="center" alignItems="center" px={4} py={2}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary="HOME" onClick={homeCategorySelect}/>
                    </Box>
                </ListItem>
                <Divider/>
                {categoryList.map((text) => (

                    <ListItem button key={text} onClick={handleCategoryClick}>
                        <ListItemText primary={text.toUpperCase()}/>
                        <IconButton aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>

                ))}
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}
export default SideBar