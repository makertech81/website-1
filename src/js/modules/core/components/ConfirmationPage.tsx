import * as React from "react";
import { ConfirmationFormData, ApplyFormData } from "../../types";
import injectSheet, { WithStyles } from "react-jss";
import { submitConfirmation } from "../coreActions";
import { Form } from "react-final-form";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { User } from "firebase";
import Button from "./Button";
import UploadResumeButton from "./UploadResumeButton";
import Underline from "./Underline";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import { getIncompleteFields } from "../../utils";
import AttendanceConfirmation from "./AttendanceConfirmation";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {
  isSubmitting: boolean;
  user: User;
  // TODO: separate apply form and confirmation form data
  userData: ApplyFormData;
  submitConfirmation: (values: ConfirmationFormData) => any;
}

const requiredFields = {
  nyuCodeOfConduct: "NYU Code of Conduct",
  nyuPrivacyPolicy: "NYU Privacy Policy",
  nyuMediaRights: "NYU Media Waiver",
  location: "Participation Location"
};

const styles = (theme: Theme) => ({
  ConfirmationPage: {
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
    fontSize: theme.bodyFontSize
  },
  welcomeMessage: {
    width: "90vw",
    maxWidth: theme.containerMaxWidth
  },
  notice: {
    width: "90vw",
    maxWidth: theme.containerMaxWidth
  },
  statement: {
    marginBottom: theme.bodyFontSize,
    maxWidth: theme.containerMaxWidth
  },
  header: {
    padding: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    lineHeight: "1.2em",
    fontSize: "1.5em",
    padding: "40px 0 40px 0"
  },
  inputs: {
    display: "flex",
    lineHeight: "2rem",
    flexDirection: "column"
  },
  submit: {
    width: "fit-content",
    padding: "13px",
    fontSize: "1.3rem",
    border: "none",
    maxWidth: "250px"
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
      width: theme.containerMobileWidth
    },
    inputs: {
      alignItems: "center"
    },
    header: {
      maxWidth: "7.5em"
    }
  }
});

const ConfirmationPage: React.FunctionComponent<Props> = ({
  classes,
  isSubmitting,
  user,
  userData,
  submitConfirmation
}) => {
  const handleSubmit = (values: ConfirmationFormData) => {
    submitConfirmation(values, []);
  };

  const validateForm = (values: ConfirmationFormData): Array<object> => {
    if (values.location !== "cannot-attend") {
      return getIncompleteFields(values, requiredFields);
    } else {
      return [];
    }
  };

  return (
    <div className={classes.ConfirmationPage}>
      {userData.confirmTimestamp && <AttendanceConfirmation />}
      <h1 className={classes.header}>Welcome! RSVP to HackNYU.</h1>
      <Underline />
      <p className={classes.welcomeMessage}>
        Before you are confirmed for the event, there are a few things for you
        to read and submit.{" "}
        <strong>
          If this form is not submitted, you will not be eligible to attend
          HackNYU.
        </strong>{" "}
        Please read the following carefully:
      </p>
      <ul className={classes.notice}>
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

      <Form
        onSubmit={handleSubmit}
        validate={validateForm}
        initialValues={userData}
        render={({ handleSubmit, pristine, invalid }) => (
          <div className={classes.form}>
            <form onSubmit={handleSubmit}>
              <div className={classes.inputs}>
                <label>
                  <div className={classes.notice}>
                    Please select the location where you will be participating:
                  </div>
                  <Radio name="location" value="new-york">
                    New York
                  </Radio>
                  <Radio name="location" value="abu-dhabi">
                    Abu Dhabi
                  </Radio>
                  <Radio name="location" value="shanghai">
                    Shanghai
                  </Radio>
                  <Radio name="location" value="cannot-attend">
                    I won't be able to attend HackNYU 2019.
                  </Radio>
                </label>
                <Underline />
                <div className={classes.notice}>
                  Please upload your latest resume as a PDF, so we can share it
                  with our awesome sponsors who are interested in hiring you!
                  <UploadResumeButton uid={user.uid} />
                </div>
                <div className={classes.inputs}>
                  <Checkbox name="nyuMediaRights">
                    By checking this box, I hereby acknowledge that I have read
                    and agree to comply with HackNYU's Media Release Policy
                    which can be found which can be found{" "}
                    <a
                      className={classes.link}
                      href="/pdf/nyu-photorights.pdf"
                      target="_blank"
                    >
                      here.
                    </a>{" "}
                    (NYU and HackNYU can take your photo/video for use in
                    promotional media).
                  </Checkbox>

                  <Checkbox name="nyuCodeOfConduct">
                    By checking this box, I hereby acknowledge that I have read
                    and agree to comply with New York University’s Code of
                    Conduct, which can be found{" "}
                    <a
                      className={classes.link}
                      href="https://www.nyu.edu/students/student-information-and-resources/student-community-standards/university-student-conduct-policies.html"
                    >
                      here.
                    </a>
                  </Checkbox>

                  <Checkbox name="nyuPrivacyPolicy">
                    By checking this box, I hereby acknowledge that I have read
                    and agree to comply with New York University’s Data Privacy
                    Policy, which can be found{" "}
                    <a
                      className={classes.link}
                      href="/pdf/nyu-dataprivacy.pdf"
                      target="_blank"
                    >
                      {" "}
                      here.{" "}
                    </a>
                  </Checkbox>
                </div>
                <Button
                  className={classes.submit}
                  type="submit"
                  disabled={pristine || invalid || isSubmitting}
                >
                  SUBMIT
                </Button>

                {invalid && <p>Please complete the fields above to submit.</p>}
              </div>
            </form>
          </div>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  // so currently, all the user data is loaded here
  userData: state.core.applyForm.formData,
  isSubmitting: state.core.confirmForm.isSubmitting
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ submitConfirmation }, dispatch);

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfirmationPage);
