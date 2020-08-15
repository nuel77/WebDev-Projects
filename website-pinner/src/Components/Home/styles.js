import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 10000,
        color: '#fff',
    },
    gridRow: {
        height: "100%",
        color: "white",
        marginTop: "10%",
        marginBottom: "2%"
    },
    LoginButton: {
        width: "16rem",
        height: "3.6rem",
        fontWeight: "normal",
        justifyContent: "center",
        margin: "10px",
    },
    divider: {
        height: "4px",
        backgroundColor: "white",
        borderRadius: "50px"
    },
    backgroundDiv: {
        backgroundImage: `url("https://assets.website-files.com/5bfd1275cc56e15ce750b18e/5c289afb9a157501b4893a89_55.%20My%20Pink.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height:"100vh",
        color:"#263238"
    },
    rightContentWrapper: {
        textAlign: "center"
    },
    leftContentWrapper: {
        alignItems:"center",
        color:"white"
    },
    webpager:{
        color: "#9575cd"
    },
    btnClass:{
        height:"30px",
    }

}))