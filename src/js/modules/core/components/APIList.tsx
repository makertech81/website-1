import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";

const styles = {
  APIList: {
    display: "flex",
    width: "100px",
    justifyContent: "space-around",
    maxWidth: "500px"
  }
};
interface Props extends WithStyles<typeof styles> {}

const APIList: React.SFC<Props> = () => {
  return (
    <div>
      <h1> API List </h1>
      <div>
        <p>
          HackNYU has several APIs available from NYU. You can take a look at
          them below:
        </p>
        <ul>
          <li>Class Roster/Albert</li>
          <li>Bus Locations</li>
          <li>Course Catalog</li>
          <li>Public Safety</li>
          <li>Engage</li>
          <li>Third-party APIs: Data.gov, NYC Public Data, GitHub REST API</li>
          <li>Events</li>
          <li>Faculty Bibliography</li>
          <li>Library Share Space</li>
          <li>Academic Calendar</li>
        </ul>
      </div>
    </div>
  );
};

export default injectSheet(styles)(APIList);
