import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

export default (props) => {
  return (
    <div>
      <Paper>
        <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
          <Tab label="All" />
          {props.muscles.map((muscle) => {
            return <Tab label={muscle} />;
          })}
        </Tabs>
      </Paper>
    </div>
  );
};
