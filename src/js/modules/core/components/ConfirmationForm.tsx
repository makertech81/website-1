import * as React from "react";
import { Form } from "react-final-form";
import Button from "./Button";
import UploadResumeButton from "./UploadResumeButton";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import { ConfirmationFormData } from "../../types";
import { getIncompleteFields } from "../../utils";
import injectSheet, { WithStyles } from "react-jss";
import { User } from "firebase";
import { ReduxState } from "../../../reducers";
import { connect } from "react-redux";
import Underline from "./Underline";
import { bindActionCreators } from "redux";
import { submitConfirmation } from "../coreActions";
import { Theme } from "../../ThemeInjector";

const requiredFields = {
  nyuCodeOfConduct: "NYU Code of Conduct",
  nyuPrivacyPolicy: "NYU Privacy Policy",
  nyuMediaRights: "NYU Media Waiver",
  location: "Participation Location"
};

const styles = (theme: Theme) => ({
  ConfirmationForm: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "750px",
  },
  header: {
    padding: "20px"
  },
  label: {
    padding: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "1.2em",
    fontSize: "1.2rem",
    padding: "0 0 40px 0"
  },
  inputs: {
    display: "flex",
    lineHeight: "1.8rem",
    flexDirection: "column"
  },
  alert: {
    color: "red"
  },
  link: {
    textDecoration: "underline"
  },
  submit: {
    width: "fit-content",
    padding: "13px",
    fontSize: "1.3rem",
    border: "none",
    maxWidth: "250px"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    ConfirmationForm: {
      alignItems: "center"
    }
  }
});

interface Props extends WithStyles<typeof styles> {
  isSubmitting: boolean;
  submitConfirmation: (values: ConfirmationFormData) => any;
  user: User;
}

const ConfirmationForm: React.FunctionComponent<Props> = ({
  classes,
  submitConfirmation,
  user,
  isSubmitting
}) => {
  const validateForm = (values: ConfirmationFormData): Array<object> => {
    if (values.location !== "cannot-attend") {
      return getIncompleteFields(values, requiredFields);
    } else {
      return [];
    }
  };
  return (
    <div className={classes.ConfirmationForm}>
      <h2 className={classes.header}>Confirm your attendance for HackNYU 2019.</h2>
      <Form
        onSubmit={submitConfirmation}
        validate={validateForm}
        render={({ handleSubmit, pristine, invalid }) => (
          <div className={classes.form}>
            <form onSubmit={handleSubmit}>
              <div className={classes.inputs}>
                <label>
                  <div className={classes.label}>
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
                <div>
                  <UploadResumeButton
                    uid={user.uid}
                    label="Please upload your resume as a PDF, so we can share it
                with our awesome (hiring!) sponsors"
                  />
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

                {invalid && (
                  <p className={classes.alert}>
                    Please complete the fields above to confirm your attendance.
                  </p>
                )}
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
  isSubmitting: state.core.confirmForm.isSubmitting
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ submitConfirmation }, dispatch);

export default injectSheet(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfirmationForm)
);
