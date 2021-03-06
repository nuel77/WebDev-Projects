import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Microlink from '@microlink/react'
import {Grid, CardHeader} from '@material-ui/core';
import {useSelector, useDispatch} from "react-redux";
import * as actionTypes from "../../Store/actionTypes"
import Axios from "axios";

const useStyles = makeStyles({
    root: {
        width: 380,
    },
    media: {
        height: 100,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();
    const userEmail = useSelector((state) => state.loggedUser.email)
    const dispatch = useDispatch()

    const handleCopyClick = () => {
        navigator.clipboard.writeText(props.url)
        props.snackBarOpen()
    }

    return (
        <Grid item>
            <Card className={classes.root}>
                <CardHeader
                    title={props.title}
                    subheader={props.desc}
                />
                <CardActionArea>
                    <CardContent>
                        <Microlink url={props.url}/>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleCopyClick}>
                        Copy
                    </Button>
                    <Button size="small" color="secondary" onClick={() => {
                        props.deleteClick({email: userEmail, id: props.id})
                    }}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
