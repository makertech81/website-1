import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "./Underline";
import { ConfirmationFormData, ReduxState } from "../../types";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {
  user: User;
  userData: ConfirmationFormData;
}

const styles = (theme: Theme) => ({
  submittedContainer: {
    display: "flex",
    width: "90vw",
    maxWidth: theme.containerMaxWidth,
    flexDirection: "column" as "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    borderRadius: "0.5em",
    padding: "5vw",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    lineHeight: theme.bodyLineHeight,
    fontSize: theme.bodyFontSize,
    marginBottom: "2rem"
  },
  header: {
    padding: "10px"
  },
  locationMessage: {
    width: "90vw",
    lineHeight: "1.1em",
    maxWidth: theme.containerMaxWidth
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    submittedContainer: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    submittedContainer: {
      width: theme.containerMediumWidth
    },
    header: {
      maxWidth: "7em"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    submittedContainer: {
      width: theme.containerMobileWidth
    },
    header: {
      maxWidth: "7em"
    }
  }
});

const AttendanceConfirmation: React.FunctionComponent<Props> = ({
  classes,
  userData
}) => {
  const locationToReadable = (location: string): string => {
    return location
      .split("-")
      .map(word => word.toUpperCase())
      .join(" ");
  };

  let isAttending, locationMessage, postMessage;

  isAttending = userData.location !== "cannot-attend";
  if (isAttending) {
    locationMessage = "You are confirmed for: ";
    postMessage =
      "See you at the event! If you can no longer attend the event, please update your response below.";
  } else {
    locationMessage = "Your status: Can't Attend 😔";
    postMessage =
      "We're sorry to see you can't attend. Hope to see at our event next year!";
  }

  return (
    <div className={classes.submittedContainer}>
      <h1 className={classes.header}> Thanks for responding to us! </h1>
      <Underline />
      <p className={classes.locationMessage}>
        {locationMessage} {locationToReadable(userData.location)} 😎 <br />{" "}
        {postMessage}
      </p>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  userData: state.core.applyForm.formData
});
export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(AttendanceConfirmation);
