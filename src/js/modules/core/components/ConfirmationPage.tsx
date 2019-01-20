import * as React from "react";
import { JssRules, ReduxState, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { submitRSVP } from "../coreActions";
import { Form, Field, FormSpy } from "react-final-form";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { User } from "firebase";
import Button from "./Button";
import UploadResumeButton from "./UploadResumeButton";
import Underline from "./Underline";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import { getIncompleteFields } from "../../utils";
import SubmittedPage from "./SubmittedPage";

interface Props {
  classes: ConfirmationPageStyles<string>;
  isSubmitting: boolean;
  user: User;
  userData: FormData;
  confirmTimestamp: string;
  // resumeTimestamp: string;
  submitRSVP: (values: FormData, incompleteFields: string[]) => any;
}

interface ConfirmationPageStyles<T> extends Styles {
  Page: T;
  welcomeMessage: T;
  notice: T;
  statement: T;
  header: T;
  form: T;
  inputs: T;
  resumeUpload: T;
  submit: T;
  checkbox: T;
  radio: T;
  formItem: T;
  link: T;
}

interface FormData {
  location: string;
  nyuCodeOfConduct: boolean;
  nyuPrivacyPolicy: boolean;
  nyuMediaRights: boolean;
}

const requiredFields = {
  nyuCodeOfConduct: "NYU Code of Conduct",
  nyuPrivacyPolicy: "NYU Privacy Policy",
  nyuMediaRights: "NYU Media Waiver",
  location: "Participation Location"
};

const styles = (theme: Theme): ConfirmationPageStyles<JssRules> => ({
  Page: {
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
    maxWidth: "600px",
    lineHeight: theme.bodyLineHeight,
    fontSize: theme.bodyFontSize,
    marginBottom: "2rem"
  },
  welcomeMessage: {
    maxWidth: theme.containerMaxWidth
  },
  notice: {
    maxWidth: theme.containerMaxWidth
  },
  statement: {
    marginBottom: theme.bodyFontSize
  },
  header: {
    padding: "10px",
    fontSize: theme.titleFontSize
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "40px"
  },
  inputs: {
    display: "flex",
    flexDirection: "column"
  },
  resumeUpload: {
    maxWidth: "500px",
    padding: "20px"
  },
  submit: {
    width: "fit-content",
    padding: "13px",
    fontSize: "1.3rem",
    border: "none",
    maxWidth: "250px"
  },
  checkbox: {
    width: "20px",
    height: "20px"
  },
  radio: {
    width: "20px",
    height: "20px"
  },
  formItem: {
    maxWidth: theme.formElementMaxWidth
  },
  link: {
    textDecoration: "underline"
  }
});

const ConfirmationPage: React.FunctionComponent<Props> = ({
  classes,
  isSubmitting,
  user,
  userData,
  submitRSVP,
  confirmTimestamp
}) => {
  const handleSubmit = values => {
    submitRSVP(values);
  };

  const validateForm = (values: FormData): Array<object> => {
    if (values["location"] !== "cannot-attend") {
      const incomplete = getIncompleteFields(values, requiredFields);
      return incomplete;
    } else {
      return [];
    }
  };

  const locationToReadable = (location: string): string => {
    return location.split('-').map((word) => word.toUpperCase()).join(' ');
  };

  // if (confirmTimestamp) {
    // return <SubmittedPage />;
  // } else {
  return (
    <div>
      {confirmTimestamp &&
        <div className={classes.Page}>
          <h1> Thanks for responding! </h1>
          <Underline />
          { userData.location !== 'cannot-attend' &&
            <div>
              <p> You are confirmed for: {locationToReadable(userData.location)} </p>
              <p> See you at the event! If you can no longer attend the event, please update your response below. </p>
            </div>
          }
          { userData.location === 'cannot-attend' && <p> Your status: {locationToReadable(userData.location)} </p>}
        </div>
      }

      <div className={classes.Page}>
        <h1 className={classes.header}>Welcome! RSVP to HackNYU.</h1>
        <Underline/>
        <p className={classes.welcomeMessage}>
          Before you are confirmed for the event, there are a few things for you
          to read and submit. <strong>If this form is not submitted, you will not be
          eligible to attend HackNYU.</strong> Please read the following carefully:
        </p>
        <ul className={classes.notice}>
          <li className={classes.statement}>
            At this time, participation at either the Abu Dhabi or Shanghai
            location is <strong>only</strong> available for NYU students who are
            currently enrolled at those campuses.
          </li>

          <li className={classes.statement}>
            Any student who is or has been enrolled within the last 12 months at a
            high school or university can participate at the event at our Brooklyn, NY
            location.
          </li>
          <li className={classes.statement}>
            If you are under 18 years of age at the time of the event, you must
            have your parent(s) or legal guardian(s) print and sign the Minors
            Release Form, which you can access{" "}
            <a className={classes.link} href="/pdf/minors-waiver.pdf" target="_blank">
              here.
            </a>
            {" "} Please be sure to bring a physical copy of this waiver with you when
            you arrive at HackNYU, otherwise we will not be able to let you
            participate!
          </li>
          <li className={classes.statement}>
            Finally, HackNYU aims to be a safe and welcoming space for participants. All participants 
            (hackers, volunteers, mentors, organizers, etc) must abide by the {" "}
            <a className={classes.link} href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
            MLH Code of Conduct.
            </a>
          </li>
        </ul>
        <h2>Confirm your attendance for HackNYU 2019.</h2>

        <Form
          onSubmit={handleSubmit}
          validate={validateForm}
          initialValues={userData}
          render={({ handleSubmit, pristine, invalid }) => (
            <div className={classes.form}>
              <form onSubmit={handleSubmit}>
                <div className={classes.inputs}>
                  <label className={classes.label}>
                    <div className={classes.formItem}>
                      Please select the location where you will be
                      participating:
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

                  <div className={classes.resumeUpload}>
                    Please upload your latest resume as a PDF, so we can share
                    it with our awesome sponsors who are interested in hiring
                    you!
                    <UploadResumeButton uid={user.uid} />
                  </div>

                  <Checkbox name="nyuMediaRights">
                      By checking this box, I hereby acknowledge that I have
                      read and agree to comply with HackNYU's Media Release
                      Policy which can be found which can be found {" "}
                      <a className={classes.link} href="/pdf/nyu-photorights.pdf" target="_blank">
                        here.
                      </a>
                      {" "} (NYU and HackNYU can take your photo/video for use in
                      promotional media).
                  </Checkbox>

                  <Checkbox name="nyuCodeOfConduct">
                    By checking this box, I hereby acknowledge that I have
                    read and agree to comply with New York University’s Code
                    of Conduct, which can be found {" "}
                    <a className={classes.link} href="https://www.nyu.edu/students/student-information-and-resources/student-community-standards/university-student-conduct-policies.html">
                     here. 
                    </a>
                  </Checkbox>

                  <Checkbox name="nyuPrivacyPolicy">
                    By checking this box, I hereby acknowledge that I have
                    read and agree to comply with New York University’s Data
                    Privacy Policy, which can be found {" "}
                    <a className={classes.link} href="/pdf/nyu-dataprivacy.pdf" target="_blank"> here. </a>
                  </Checkbox>

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
    </div>
    );
  // }
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  // so currently, all the user data is loaded here
  userData: state.core.applyForm.formData,
  confirmTimestamp: state.core.applyForm.formData.confirmTimestamp,
  isSubmitting: state.core.confirmForm.isSubmitting
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ submitRSVP }, dispatch);

export default compose(
  injectSheet(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ConfirmationPage);
