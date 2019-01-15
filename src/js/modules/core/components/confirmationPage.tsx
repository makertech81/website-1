import * as React from "react";
import { JssRules, ReduxState, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
//import { submitConfirmation } from "../coreActions";
import { Form, Field, FormSpy } from "react-final-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { User } from "firebase";
import Button from "./Button";
import UploadResumeButton from "./UploadResumeButton";
import Radio from "./Radio";
import { getIncompleteFields } from "../../utils";
import SubmittedPage from "./SubmittedPage";

interface Props {
  classes: ConfirmationPageStyles<string>;
  user: User;
  push: (route: string) => any;
  formData: FormData;
  confirmTimestamp: string;
  resumeTimestamp: string;
  // submitConfirmation: (values: FormData, incompleteFields: string[]) => any;
}

interface ConfirmationPageStyles<T> extends Styles {
  ConfirmationPage: T;
  header: T;
  form: T;
  inputs: T;
  submit: T;
  checkbox: T;
  radio: T;
  resumeUpload: T;
  nyuPolicy: T;
  termsAndConditions: T;
  [`@media(max-width: ${theme.mediumBreakpoint})`]: T;
}

interface FormData {
  location: string;
  nyuCodeOfConduct: boolean;
  nyuPrivacyPolicy: boolean;
}

const requiredFields = {
  nyuCodeOfConduct: "NYU Code of Conduct",
  nyuPrivacyPolicy: "NYU Privacy Policy",
  nyuMediaRights: "NYU Media Waiver",
  location: "Participation Location"
};

const styles = (theme: Theme): ConfirmationPageStyles<JssRules> => ({
  ConfirmationPage: {
    display: "flex",
    width: "100%",
    maxWidth: theme.containerMaxWidth,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    borderRadius: "0.5em",
    paddingTop: "3em",
    paddingBottom: "2em"
  },
  header: {
    padding: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "1.2em",
    fontSize: "1.0em",
    padding: "40px 0 40px 0"
  },
  inputs: {
    display: "flex",
    lineHeight: "2rem",
    flexDirection: "column"
  },
  resumeUpload: {
    maxWidth: "500px",
    padding: "20px",
    lineHeight: "1.8rem"
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
  nyuPolicy: {
    maxWidth: "500px",
    lineHeight: "1.8rem"
  },
  termsAndConditions: {
    padding: "15px"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    ConfirmationPage: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    ConfirmationPage: {
      width: theme.containerMediumWidth
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    ConfirmationPage: {
      width: theme.containerMobileWidth
    }
  }
});

class ConfirmationPage extends React.Component<Props> {
  handleSubmit = values => {
    //this.props.submitConfirmation(values, []);
  };

  validateForm = (values: FormData): object => {
    const incomplete = getIncompleteFields(values, requiredFields);
    let errors = {};
    incomplete.map(({ field }) => {
      errors[field] = `Field cannot be empty`;
    });
    return errors;
  };

  render() {
    let {
      classes,
      isConfirming,
      user,
      formData,
      confirmTimestamp,
      resumeTimestamp
    } = this.props;
    if (confirmTimestamp) {
      return <SubmittedPage />;
    } else {
      return (
        <div className={classes.ConfirmationPage}>
          <h1 className={classes.header}>
            CONGRATULATIONS! YOU'VE BEEN ACCEPTED!
          </h1>
          Before you accept your offer, there are a few things we need to share
          with you. Please read the following carefully.
          <ul>
            <li>
              At this time, participation at either the Abu Dhabi or Shanghai
              location is <strong>only</strong> available for NYU students who
              are currently enrolled at those campuses.
            </li>

            <li>
              Any student who is or has been enrolled in the last 12 months at a
              high school or university can participate at our Brooklyn, NY
              location.
            </li>
            <li>
              If you are under 18 years of age at the time of the event, you
              must have your parent(s) or legal guardian(s) print and sign the
              Minors Release Form, which you can access{" "}
              <a href="/pdf/minors-waiver.pdf" target="_blank">
                here.
              </a>{" "}
              Please be sure to bring a physical copy of this waiver to you when
              you arrive to HackNYU, otherwise we will not be able to let you
              participate!
            </li>
          </ul>
          <label className={classes.termsAndConditions}>
            <div className={classes.nyuPolicy}>
              Please select the location where you will be participating.
            </div>
            <Radio name="location" value="abu-dhabi">
              Abu Dhabi
            </Radio>
            <Radio name="location" value="new-york">
              New York
            </Radio>
            <Radio name="location" value="shanghai">
              Shanghai
            </Radio>
          </label>
          <Form
            onSubmit={this.handleSubmit}
            validate={this.validateForm}
            initialValues={formData}
            render={({ handleSubmit, pristine, invalid }) => (
              <div className={classes.form}>
                <form onSubmit={handleSubmit}>
                  <div className={classes.inputs}>
                    <label className={classes.termsAndConditions}>
                      <div className={classes.nyuPolicy}>
                        By checking this box, I agree to the{" "}
                        <a href="/pdf/nyu-photorights.pdf">
                          HackNYU Media Waiver.
                        </a>{" "}
                        (NYU and HackNYU can take your photo/video for use in
                        promotional media).
                      </div>
                      <Field
                        className={classes.checkbox}
                        name="nyuMediaRights"
                        component="input"
                        type="checkbox"
                      />
                    </label>
                    <label className={classes.termsAndConditions}>
                      <div className={classes.nyuPolicy}>
                        By checking this box, I hereby acknowledge that I have
                        read and agree to comply with New York University’s Code
                        of Conduct, which can be found{" "}
                        <a href="https://www.nyu.edu/students/student-information-and-resources/student-community-standards/university-student-conduct-policies.html">
                          here
                        </a>
                      </div>
                      <Field
                        className={classes.checkbox}
                        name="nyuCodeOfConduct"
                        component="input"
                        type="checkbox"
                      />
                    </label>
                    <label className={classes.termsAndConditions}>
                      <div className={classes.nyuPolicy}>
                        By checking this box, I hereby acknowledge that I have
                        read and agree to comply with New York University’s Data
                        Privacy Policy, which can be found{" "}
                        <a href="/pdf/nyu-dataprivacy.pdf" target="_blank">
                          here
                        </a>
                      </div>
                      <Field
                        className={classes.checkbox}
                        name="nyuPrivacyPolicy"
                        component="input"
                        type="checkbox"
                      />
                    </label>
                    <div className={classes.resumeUpload}>
                      Please upload your latest resume as a PDF, so we can share
                      it with our awesome sponsors who are interested in hiring
                      you!
                      <UploadResumeButton uid={user.uid} />
                    </div>
                    <FormSpy
                      render={({ form }) => {
                        const fields = form.getState().values;
                        const incompleteFields = getIncompleteFields(
                          fields,
                          requiredFields
                        );
                        const isFormSubmitted = !(
                          !confirmTimestamp &&
                          incompleteFields.length === 0 &&
                          !resumeTimestamp
                        );

                        return (
                          <Button
                            className={classes.submit}
                            type="submit"
                            disabled={
                              pristine || isConfirming || isFormSubmitted
                            }
                          >
                            SUBMIT
                          </Button>
                        );
                      }}
                    />
                  </div>
                </form>
              </div>
            )}
          />
        </div>
      );
    }
  }
}
const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
  //formData: state.core.confirmForm.formData,
  //confirmTimestamp: state.core.confirmForm.confirmTimestamp,
  //isConfirming: state.core.confirmForm.isConfirming
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(ConfirmationPage);
