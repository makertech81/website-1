import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme, theme } from "../../ThemeInjector";
import { User } from "firebase";
import { ReduxState } from "../../../reducers";
import { connect } from "react-redux";
import { compose } from "redux";
import { RouteComponentProps } from "react-router-dom";

type PathParams = {
  uid: string 
}

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  UserCheckInPage: {
    borderRadius: theme.pageBorderRadius,
    backgroundColor: theme.secondBackground,
    maxWidth: theme.containerLargeWidth,
    padding: "25px",
    color: theme.secondFont,
    fontSize: "1.3rem"
  },
  title: {
    marginBottom: "1em"
  }
});

const UserCheckInPage: React.SFC<Props & RouteComponentProps<PathParams>> = ({ classes, match }) => {
  console.log(match);
  return (
    <div className={classes.UserCheckInPage}>
      <h1 className={classes.title}> UID: {match.params.uid} </h1>
    </div>
  );
};

export default injectSheet(styles)(UserCheckInPage);

