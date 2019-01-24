import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "./Underline";
import AttendanceConfirmation from "./AttendanceConfirmation";
import { Theme } from "../../ThemeInjector";
import ConfirmationForm from "./ConfirmationForm";
import { connect } from "react-redux";
import { ReduxState } from "../../../reducers";

interface Props extends WithStyles<typeof styles> {
  confirmTimestamp: string
}

const styles = (theme: Theme) => ({
  ConfirmationPage: {
    display: "flex",
    maxWidth: theme.containerMaxWidth,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    borderRadius: "0.5em",
    padding: "5vw",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    lineHeight: theme.bodyLineHeight,
    fontSize: theme.bodyFontSize
  },
  statement: {
    marginBottom: theme.bodyFontSize
  },
  header: {
    padding: "10px"
  },
  link: {
    textDecoration: "underline"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    ConfirmationPage: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    ConfirmationPage: {
      width: theme.containerMediumWidth
    },
    inputs: {
      alignItems: "center"
    },
    header: {
      maxWidth: "7.5em"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    ConfirmationPage: {
      width: theme.containerSmallWidth
    }
  },
  [`@media(max-width: ${theme.mobileBreakpoint})`]: {
    ConfirmationPage: {
      width: theme.containerMobileWidth
    }
  }
});

const ConfirmationPage: React.FunctionComponent<Props> = ({
  classes,
  confirmTimestamp,
}) => {
  return (
    <div className={classes.ConfirmationPage}>
      {confirmTimestamp && <AttendanceConfirmation />}
      <h1 className={classes.header}>Welcome! RSVP to HackNYU.</h1>
      <Underline />
      <p>
        Before you are confirmed for the event, there are a few things for you
        to read and submit.{" "}
        <strong>
          If this form is not submitted, you will not be eligible to attend
          HackNYU.
        </strong>
        Please read the following carefully:
      </p>
      <ul>
        <li className={classes.statement}>
          At this time, participation at either the Abu Dhabi or Shanghai
          location is <strong>only</strong> available for NYU students who are
          currently enrolled at those campuses.
        </li>

        <li className={classes.statement}>
          Any student who is or has been enrolled within the last 12 months at a
          high school or university can participate at the event at our
          Brooklyn, NY location.
        </li>
        <li className={classes.statement}>
          If you are under 18 years of age at the time of the event, you must
          have your parent(s) or legal guardian(s) print and sign the Minors
          Release Form, which you can access{" "}
          <a
            className={classes.link}
            href="/pdf/minors-waiver.pdf"
            target="_blank"
          >
            here.
          </a>{" "}
          Please be sure to bring a physical copy of this waiver with you when
          you arrive at HackNYU, otherwise we will not be able to let you
          participate!
        </li>
        <li className={classes.statement}>
          Finally, HackNYU aims to be a safe and welcoming space for
          participants. All participants (hackers, volunteers, mentors,
          organizers, etc) must abide by the{" "}
          <a
            className={classes.link}
            href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
          >
            MLH Code of Conduct.
          </a>
        </li>
      </ul>
      <h2 className={classes.header}>
        Confirm your attendance for HackNYU 2019.
      </h2>
      <ConfirmationForm />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  confirmTimestamp: state.core.confirmForm.confirmTimestamp
});

export default injectSheet(styles)(connect(mapStateToProps)(ConfirmationPage));
