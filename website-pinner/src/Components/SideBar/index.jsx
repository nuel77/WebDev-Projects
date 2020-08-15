import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import React, {useEffect, useState} from "react";
import useStyles from "./styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { TextField, ListItemText, ListItemIcon, Box} from "@material-ui/core";
import {Fab, IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from '@material-ui/icons/Home';
import {useDispatch, useSelector} from 'react-redux'
import * as actionTypes from "../../Store/actionTypes"

const SideBar = (props) => {
    const classes = useStyles();
    const [addInput, setAddInput] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const dispatch = useDispatch()
    const urlList = useSelector(state => state.userData.urlDataList)
    const loggedUser = useSelector(state => state.loggedUser)
    const selectedCat = useSelector(state => state.ui.selected)

    useEffect(() => {
        if(urlList.length>0){
            console.log("urlList",urlList)
            let categories = urlList.reduce((accumulator, elem) => {
                if (!accumulator.includes(elem.category) && elem.category!=="HOME") {
                    accumulator.push(elem.category)
                }
                return accumulator
            }, [])
            setCategoryList(categories)
            console.log("categories", urlList)
        }
    }, [urlList,loggedUser])

    const handleAddCategoryClick = () => {
        if (addInput) {
            let newCategoryList = [...categoryList, addInput]
            setCategoryList(newCategoryList)
            setAddInput("")
        }
    }
    const handleCategoryClick = (event) => {
        let categoryClicked = event.target.innerText
        dispatch({type: actionTypes.SELECTED_CATEGORY, payload: categoryClicked})
    }
    const homeCategorySelect = () => {
        dispatch({type: actionTypes.SELECTED_CATEGORY, payload: "HOME"})
    }
    const isSelected=(text)=>{
       return text.toUpperCase()===selectedCat?classes.selectedItem:null
    }
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                <ListItem>
                    <TextField label="NEW CATEGORY" value={addInput} onChange={e => {
                        setAddInput(e.target.value)
                    }}/>
                    <Fab size="small" color="secondary" onClick={handleAddCategoryClick}>
                        <AddIcon/>
                    </Fab>
                </ListItem>
                {/*-------------*/}
                <ListItem button onClick={homeCategorySelect} className={isSelected("HOME")}>
                    <Box display="flex" justifyContent="center" alignItems="center" px={4} py={2}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary="HOME"/>
                    </Box>
                </ListItem>
                <Divider/>
                {categoryList ? categoryList.map((text) => (

                    <ListItem button key={text} onClick={handleCategoryClick} className={isSelected(text)}>
                        <ListItemText primary={text.toUpperCase()}/>
                        {/*<IconButton aria-label="delete">*/}
                        {/*    <DeleteIcon/>*/}
                        {/*</IconButton>*/}
                    </ListItem>

                )) : null}
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