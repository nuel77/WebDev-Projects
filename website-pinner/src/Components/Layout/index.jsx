import React, {useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "./styles";
import MediaCard from "../Card";
import {Grid, Fab, TextField, Typography} from "@material-ui/core";
import SideBar from "../SideBar";
import Header from "../Header";
import SendIcon from '@material-ui/icons/Send';
import {useSelector, useDispatch} from 'react-redux'
import * as actionTypes from "../../Store/actionTypes"
import Axios from "axios";
import Modal from "./Dialog"
import SnackBar from "./SnackBar"

const Layout = (props) => {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [title, setTitle] = React.useState("")
    const [url, setUrl] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const [modalOpen, setModalOpen] = React.useState(false);
    const [toDelete, setToDelete] = React.useState({})
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const selectedCategory = useSelector(state => state.ui.selected)
    const loggedUser = useSelector(state => state.loggedUser)
    const urlList = useSelector(state => state.userData.urlDataList)

    const urlDataListForCategory = urlList.filter((elem) => {
        return elem.category === selectedCategory || selectedCategory === "HOME"
    })

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const snackbarHandleOpen = () => {
        setSnackbarOpen(true);
    };

    const snackbarHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };
    const handleModalOpen = (data) => {
        setModalOpen(true);
        setToDelete(data)
    };
    const handleModalClose = () => {
        setModalOpen(false);

    };
    const handleModalCloseAndDelete = () => {
        Axios.post("http://localhost:8080/deleteLink", {email: toDelete.email, id: toDelete.id})
            .then(resp => {
                if (resp.status) {
                    dispatch({type: actionTypes.DELETE, payload: {id: props.id}})
                    setModalOpen(false)
                }
            })
    }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleUrlChange = (el) => {
        setUrl(el.target.value)
    }
    const handleTitleChange = (el) => {
        setTitle(el.target.value)
    }
    const handleDescChange = (el) => {
        setDesc(el.target.value)
    }
    const setDefault = () => {
        setDesc("")
        setTitle("")
        setUrl("")
    }
    const handleAddData = () => {
        let urlData = {
            title: title,
            url: url,
            description: desc,
            category: selectedCategory,
        }
        if (urlData.url) {
            Axios.post("http://localhost:8080/updateData", {email: loggedUser.email, urlData: urlData})
                .then((resp) => {
                    console.log("updateData response", resp)
                    if (resp.status) dispatch({type: actionTypes.ADD, payload: urlData})
                    setDefault()
                })
        }

    }
    const classes = useStyles();

    useEffect(() => {
        console.log("logged in?", isLoggedIn)
        if (isLoggedIn) {
            Axios.post("http://localhost:8080/getUser", {email: loggedUser.email})
                .then((resp) => {
                    let userData = resp.data[0].userData
                    dispatch({type: actionTypes.INITIALIZE_URL_LIST, payload: userData})
                })
        } else {
            props.history.push("/")
        }
    }, [isLoggedIn,modalOpen])

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
                <Modal
                    handleModalClose={handleModalClose}
                    handleModalCloseAndDelete={handleModalCloseAndDelete}
                    handleModalOpen={handleModalOpen}
                    open={modalOpen}
                />
                <SnackBar
                    snackbarOpen={snackbarOpen}
                    snackbarHandleClose={snackbarHandleClose}
                />
                <div>
                    <Typography variant={"h6"} color="textSecondary">Welcome back, {loggedUser.name}</Typography>
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={6} md={2}>
                            <TextField value={title} onChange={handleTitleChange} size="small" label="Title" fullWidth/>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField value={url} onChange={handleUrlChange} size="small" label="URL" fullWidth/>
                        </Grid>
                        <Grid item xs={10} md={3}>
                            <TextField value={desc} onChange={handleDescChange} size="small" label="Description"
                                       fullWidth/>
                        </Grid>
                        <Grid xs={2} md={1} item>
                            <Fab color="secondary" size="medium" onClick={handleAddData}>
                                <SendIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                </div>

                <Grid container spacing={2}>
                    {
                        urlDataListForCategory.reverse().map((elem, idx) => {
                            return (
                                <MediaCard
                                    key={elem._id + idx}
                                    id={elem._id}
                                    url={elem.url}
                                    title={elem.title}
                                    desc={elem.description}
                                    deleteClick={handleModalOpen}
                                    snackBarOpen={snackbarHandleOpen}
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
