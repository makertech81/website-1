import * as React from "react";
import { Styles } from "react-jss";
import { JssRules, Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";

interface ErrorPageStyles<T> extends Styles {
  ErrorPage: T;
  message: T;
}

interface Props {
  classes: ErrorPageStyles<string>;
}

const styles = (theme: Theme): ErrorPageStyles<JssRules> => ({
  ErrorPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5%",
    fontSize: "1.3em",
    fontFamily: theme.fontFamily,
    width: "80vw"
  },
  message: {
    maxWidth: "600px"
  }
})

const ErrorPage: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.ErrorPage}>
      <div className={classes.message}>
      We're having trouble fetching your data due to <del>
        train traffic{" "}
      </del>
      network problems. Sorry!
      </div>
      <a href="/"> Click here to try again </a>
    </div>
  );
};

export default injectSheet(styles)(ErrorPage);