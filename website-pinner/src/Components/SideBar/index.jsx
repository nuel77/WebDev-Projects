import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import React, {useState} from "react";
import useStyles from "./styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Typography,TextField,} from "@material-ui/core";
import {Fab,IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const SideBar = (props) => {
    const classes = useStyles();
    const [addInput,setAddInput]=useState("")
    const [categoryList,setCategoryList]=useState(["GENERAL"])
    const handleAddCategory=()=>{
        let newCategoryList=[...categoryList,addInput]
        setCategoryList(newCategoryList)
        setAddInput("")
    }
    const handleChange=(event)=>{
        let input=event.target.value
        setAddInput(input)
    }
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem >
                    <TextField label="ADD NEW" onChange={handleChange} />
                    <Fab size="small" color="secondary" aria-label="add">
                        <AddIcon
                        onClick={handleAddCategory}
                        />
                    </Fab>
                </ListItem>
                {categoryList.map((text) => (
                    <ListItem button key={text}>
                        <Typography variant="subtitle1" style={{flexGrow:1}}>
                            {text.toUpperCase()}
                        </Typography>
                        <IconButton  aria-label="delete">
                            <DeleteIcon />
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