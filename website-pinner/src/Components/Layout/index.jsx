import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "./styles";
import MediaCard from "../Card";
import {Grid, Fab, TextField, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SideBar from "../SideBar";
import Header from "../Header";
import SendIcon from '@material-ui/icons/Send';
import {useSelector, useDispatch} from 'react-redux'
import * as actionTypes from "../../Store/actionTypes"

const Layout = (props) => {
    const {window} = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const urlList = useSelector(state => state.urlDataList)
    const dispatch = useDispatch()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleAddData = () => {
        let urlData = {}
        urlData.title = document.getElementById("titleField").value
        urlData.url = document.getElementById("urlField").value
        urlData.desc = document.getElementById('descField').value
        dispatch({type: actionTypes.ADD, payload: urlData})
    }


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Header
                handleDrawerToggle={handleDrawerToggle}
            />
            <SideBar
                window={window}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <main className={classes.content}>
                <Toolbar/>
                <div>
                    <Grid container justify="center">
                        <Grid item style={{marginRight: 8}}>
                            <TextField id="titleField" size="small" label="Title"/>
                        </Grid>
                        <Grid item style={{marginRight: 8}}>
                            <TextField id="urlField" size="small" label="URL"/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="descField" size="small" label="Description" fullWidth/>
                        </Grid>
                        <Grid item>
                            <Fab color="secondary" className={classes.fab}>
                                <SendIcon
                                    onClick={handleAddData}
                                />
                            </Fab>
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={2}>
                    {
                        urlList.map((elem, idx) => {
                            return (
                                <MediaCard
                                    key={elem.url+idx}
                                    url={elem.url}
                                    title={elem.title}
                                    desc={elem.desc}
                                />
                            )
                        })
                    }
                </Grid>

            </main>
        </div>
    );
};

export default Layout;
