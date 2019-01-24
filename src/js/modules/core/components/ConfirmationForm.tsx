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

const requiredFields = {
  nyuCodeOfConduct: "NYU Code of Conduct",
  nyuPrivacyPolicy: "NYU Privacy Policy",
  nyuMediaRights: "NYU Media Waiver",
  location: "Participation Location"
};

const styles = {
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
  link: {
    textDecoration: "underline"
  },
  submit: {
    width: "fit-content",
    padding: "13px",
    fontSize: "1.3rem",
    border: "none",
    maxWidth: "250px"
  }
};

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
    <Form
      onSubmit={submitConfirmation}
      validate={validateForm}
      render={({ handleSubmit, pristine, invalid }) => (
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <div className={classes.inputs}>
              <label>
                <div>
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
                Please upload your latest resume as a PDF, so we can share it
                with our awesome sponsors who are interested in hiring you!
                <UploadResumeButton uid={user.uid} />
              </div>
              <div className={classes.inputs}>
                <Checkbox name="nyuMediaRights">
                  By checking this box, I hereby acknowledge that I have read
                  and agree to comply with HackNYU's Media Release Policy which
                  can be found which can be found{" "}
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
