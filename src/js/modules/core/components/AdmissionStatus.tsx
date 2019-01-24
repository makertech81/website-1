import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";
import Underline from "./Underline";

type Props = WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
  AdmissionStatus: {
    display: "flex",
    width: "90vw",
    maxWidth: theme.containerMaxWidth,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    borderRadius: "0.5em",
    padding: "5%",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    lineHeight: theme.bodyLineHeight,
    fontSize: theme.bodyFontSize,
    marginBottom: "2rem"
  },
  header: {
    padding: "10px"
  },
  statusMessage: {
    width: "90vw",
    maxWidth: theme.containerMaxWidth
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    AdmissionStatus: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    AdmissionStatus: {
      width: theme.containerMediumWidth
    },
    header: {
      maxWidth: "7.5em"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    AdmissionStatus: {
      width: theme.containerMobileWidth
    },
    header: {
      maxWidth: "7.5em"
    }
  }
});

const AdmissionStatus: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.AdmissionStatus}>
      <h1 className={classes.header}>APPLICATION STATUS: PENDING</h1>
      <Underline />
      <p className={classes.statusMessage}>
        Hello! If you are seeing this page, then that means your application
        status is still pending. Don't worry, we'll update you on the same soon!
      </p>
      <p className={classes.statusMessage}>
        "Patience is not simply the abiltiy to wait - it's how we behave while
        we're waiting" - Joyce Meyer
      </p>
    </div>
  );
};

export default injectSheet(styles)(AdmissionStatus);
