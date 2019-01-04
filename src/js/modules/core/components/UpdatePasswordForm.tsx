import * as React from "react";
import { Field, Form } from "react-final-form";
import Input from "./Input";
import Button from "./Button";
import { bindActionCreators, compose } from "redux";
import { updatePassword } from "../coreActions";
import { connect } from "react-redux";
import injectSheet from "react-jss/lib/injectSheet";
import { ReduxState } from "../../types";

interface Props {
  classes: UpdatePasswordFormStyles<string>;
  updatePassword: (password: string) => any;
}

interface UpdatePasswordFormStyles<T> {
  UpdatePasswordForm: T;
}

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

const styles: UpdatePasswordFormStyles<object> = {
  UpdatePasswordForm: {
    display: "flex",
    flexDirection: "column",
    padding: "40px"
  }
};

const UpdatePasswordForm: React.SFC<Props> = ({
  classes,
  updatePassword,
  isSubmitting
}) => {
  const handleSubmit = (values: FormValues) => {
    updatePassword(values.password);
  };

  return (
    <Form
      className={classes.UpdatePasswordForm}
      onSubmit={handleSubmit}
      validate={({ password, passwordConfirmation }) => {
        let errors: { password?: string, passwordConfirmation?: string } = {};
        if (password && password.length < 8) {
          errors.password = "Password must be at least 8 characters";
        }
        if (password !== passwordConfirmation) {
          errors.passwordConfirmation = "Password and password confirmation must be the same."
        }
        return errors;
      }}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Field name="password">
            {({ input, meta }) => (
              <Input
                input={input}
                meta={meta}
                label="Password"
                type="password"
                placeholder="********"
              />
            )}
          </Field>
          <Field name="passwordConfirmation">
            {({ input, meta }) => (
              <Input
                input={input}
                meta={meta}
                label="Confirm"
                type="password"
                placeholder="********"
              />
            )}
          </Field>
          <Button type="submit" disabled={invalid || isSubmitting}>
            UPDATE
          </Button>
        </form>
      )}
    />
  );
};

const mapStateToProps = (state: ReduxState) => ({
  isSubmitting: state.core.updatePasswordForm.isSubmitting
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updatePassword }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectSheet(styles)(UpdatePasswordForm));
