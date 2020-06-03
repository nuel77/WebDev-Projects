import React from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";

const Mystyles = {
  Paper: {
    padding: 20,
    marginTop: 20,
    marginBottom: 10,
    height: 500,
    overflowY: "auto",
  },
};

export default (props) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <div>
            <Paper style={Mystyles.Paper}>
              {props.excercises.map(([muscle, excercises]) => {
                return (
                  <Typography
                    variant="h5"
                    style={{ textTransform: "capitalize" }}
                  >
                    {muscle}
                    <List component="ul">
                      {excercises.map((excercise) => {
                        return (
                          <ListItem button>
                            <ListItemText primary={excercise.id} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Typography>
                );
              })}
            </Paper>
          </div>
        </Grid>
        <Grid item xs>
          <div>
            <Paper style={Mystyles.Paper}>
              <Typography variant="h3">Welcome</Typography>
              <Typography variant="body1">
                Please seclect and excercise on the list from left
              </Typography>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
