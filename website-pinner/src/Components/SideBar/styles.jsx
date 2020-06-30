import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: drawerWidth,
        background:" ",
    },

}));
export default useStyles