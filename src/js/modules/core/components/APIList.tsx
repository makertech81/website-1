import * as React from "react";
import injectSheet from "react-jss/lib/injectSheet";
import { Styles } from "react-jss";
import { JssRules } from "../../types";

interface APIListStyles<T> extends Styles {
  APIList: T;
}

interface Props {
  classes: APIListStyles<string>
}
const styles: APIListStyles<JssRules> = {
  APIList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    maxWidth: "500px"
  }
};

const APIList: React.SFC<Props> = ({ classes }) => {
    return (
      <div className={classes.APIList}>
        <h2> APIs </h2>
        <div>
          <p>
            NYU offers several APIs. Take a look at
            them below:
          </p>
          <ul>
            <li>Class Roster/Albert</li>
            <li>Bus Locations</li>
            <li>Course Catalog</li>
            <li>Public Safety</li>
            <li>Engage</li>
            <li>
              Third-party APIs: Data.gov, NYC Public Data, GitHub API
            </li>
            <li>Events</li>
            <li>Faculty Bibliography</li>
            <li>Library Share Space</li>
            <li>Academic Calendar</li>
          </ul>
        </div>
      </div>
    );
}

export default injectSheet(styles)(APIList);
