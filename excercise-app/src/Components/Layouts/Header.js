import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

export default (props) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Excercises
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
