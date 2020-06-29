import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        background:"linear-gradient(to right, #da4453, #89216b)",
        [theme.breakpoints.up('sm')]: {
            zIndex: theme.zIndex.drawer + 1,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: {
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: drawerWidth,
        background:" ",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
export default useStyles