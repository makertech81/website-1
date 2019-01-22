import * as React from "react";
import injectSheet from "react-jss";
import Underline from "./Underline";
import { Theme, ConfirmationFormData, ReduxState } from "../../types";
import { User } from "firebase";
import { compose } from "redux";
import { locationToReadable } from "../../utils";
import { connect } from "react-redux";

interface Props {
  classes: any;
  user: User;
  userData: ConfirmationFormData;
}

const styles = (theme: Theme) => ({
  page: {
    display: "flex",
    width: "90%",
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
  }
});

const Attendance: React.SFC<Props> = ({
  classes,
  userData,
}) => {
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
    <div>
        <div className={classes.page}>
          <h1> Thanks for responding! </h1>
          <Underline />
          <p>
            {locationMessage} {locationToReadable(userData.location)} 😎 <br />{" "}
            {postMessage}
          </p>
        </div>
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
) (Attendance);
