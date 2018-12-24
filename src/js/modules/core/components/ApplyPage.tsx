import * as React from "react";
import { ReduxState, Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import { push } from "connected-react-router";
import { Form, Field } from "react-final-form";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import Autocomplete from "react-autocomplete";
import { User } from "firebase";
import { schools } from "./schools";
import { db } from "../../../firebase";
import SchoolInput from "./SchoolInput";
import Condition from "./Condition";

interface Props {
  classes: { [s: string]: string };
  user: User;
  push: (route: string) => any;
}

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  school: string;
  gender: string;
}

interface ApplyPageState {
  formData: FormData | null;
  isSubmitting: boolean;
  isLoading: boolean;
}

const styles = (theme: Theme): object => ({
  ApplyPage: {
    display: "flex",
    width: "80%",
    maxWidth: "1050px",
    flexDirection: "column",
    padding: "20px",
    alignItems: "center",
    backgroundColor: theme.formBackground
  },
  header: {
    padding: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    lineHeight: "1.3em",
    fontSize: "1.5em"
  },
  inputs: {
    display: "flex",
    lineHeight: "3em",
    flexDirection: "column"
  },
  input: {
    fontFamily: theme.fontFamily,
    marginLeft: "5px",
    padding: theme.inputPadding,
    minHeight: "36px",
    fontSize: "1em",
    position: "relative",
    width: "400px"
  },
  submit: {
    width: "150px",
    padding: "5px",
    backgroundColor: theme.highlightColor,
    fontSize: "1em",
    border: "none",
    color: theme.secondFont,
    "&:disabled": {
      backgroundColor: theme.highlightColorHover
    }
  },
  loadingText: {
    fontSize: "1.3em"
  },
  save: {
    width: "100px",
    padding: "5px",
    backgroundColor: theme.submitButton,
    fontSize: "1em",
    border: "none",
    color: theme.secondFont
  },
  autocompleteItem: {
    padding: theme.inputPadding
  }
});

class ApplyPage extends React.Component<Props, ApplyPageState> {
  unmounted: boolean;

  constructor(props: Props) {
    super(props);
    this.unmounted = false;
    this.state = {
      isLoading: false,
      isSubmitting: false,
      formData: undefined
    };
  }

  componentDidMount() {
    this.setFormState();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.user !== prevProps.user) {
      this.setFormState();
    }
  }

  async setFormState() {
    const { user } = this.props;

    if ("uid" in user) {
      this.setState({ isLoading: true });

      const formData = await this.loadValues(user);

      if (!this.unmounted) {
        this.setState({ isLoading: false, formData: formData });
      }
    }
  }

  async loadValues(user: User): Promise<FormData> {
    const snapshot = await db
      .collection("users")
      .doc(user.uid)
      .get();
    const formData = snapshot.data() as FormData;
    return formData;
  }

  // https://reactjs.org/docs/react-component.html#shouldcomponentupdate
  // We should make this cleaner?
  shouldComponentUpdate(nextProps: Props, nextState: object): boolean {
    if (!nextProps.user) {
      nextProps.push("/login");
    }
    return true;
  }

  handleSubmit = values => {
    const { user } = this.props;
    this.setState({ isSubmitting: true });
    db.collection("users")
      .doc(user.uid)
      .set(values)
      .then(() => this.setState({ isSubmitting: false }))
      .catch(err => console.error(err));
  };

  render() {
    let { classes } = this.props;
    let { isLoading, isSubmitting } = this.state;

    return (
      <div className={classes.ApplyPage}>
        <h1 className={classes.header}> Apply </h1>
        {isLoading ? (
          <div className={classes.loadingText}> Loading form... </div>
        ) : (
          <Form
            onSubmit={this.handleSubmit}
            initialValues={this.state.formData}
            render={({ handleSubmit, pristine, invalid }) => (
              <div className={classes.form}>
                <form onSubmit={handleSubmit}>
                  <div className={classes.inputs}>
                    <label>
                      First Name:
                      <Field
                        className={classes.input}
                        name="firstName"
                        component="input"
                        placeholder="Rose"
                      />
                    </label>
                    <label>
                      Last Name:
                      <Field
                        className={classes.input}
                        name="lastName"
                        component="input"
                        placeholder="Kolodny"
                      />
                    </label>
                    <label>
                      Date of Birth:
                      <Field
                        className={classes.input}
                        id="date"
                        name="birthDate"
                        label="Date Of Birth"
                        type="date"
                        component="input"
                      />
                    </label>
                    <label>
                      Gender:
                      <Field
                        className={classes.input}
                        name="gender"
                        component="select"
                      >
                        <option value="male"> Male </option>
                        <option value="female"> Female </option>
                        <option value="non-binary"> Non-binary </option>
                        <option value="prefer-not"> Prefer not to say </option>
                        <option value="other"> Other </option>
                      </Field>
                    </label>
                    <label>
                      What race/ethnicity do you most closely identify with?
                      <Field
                        className={classes.input}
                        name="ethnicity"
                        component="select"
                      >
                        <option value="american-indian-alaskan-native"> American Indian or Alaskan Native </option>
                        <option value="asian"> Asian / Pacific Islander </option>
                        <option value="african-american"> Black or African American </option>
                        <option value="hispanic-latinx"> Hispanic or Latinx </option>
                        <option value="multiple"> Multiple ethnicities </option>
                        <option value="prefer-not"> Prefer not to say </option>
                      </Field>
                    </label>
                    <Condition when="ethnicity" is="multiple">
                    <label>
                      Please Specify:
                      <Field
                        className={classes.input}
                        name="multiEthnic"
                        component="input"
                      />
                    </label>
                    </Condition>
                    <label>
                      Phone Number:
                      <Field
                        className={classes.input}
                        name="phoneNumber"
                        label="Phone Number"
                        component="input"
                        type="tel"
                        placeholder="1-800-867-5309"
                      />
                    </label>
                    <label>
                      School:
                      <Field
                        name="school"
                        component={SchoolInput}
                        schools={schools}
                        classes={classes}
                      />
                    </label>
                    <Condition when="school" is="New York University">
                    <label>
                      NYU School:
                      <Field
                      className={classes.input}
                      name="nyuSchool"
                      component="select"
                      >
                        <option value="tandon"> Tandon School of Engineering </option>
                        <option value="cas"> College of Arts and Science </option>
                        <option value="gsas"> Graduate School of Arts and Science </option>
                        <option value="stern"> Leonard M. Stern School of Business </option>
                        <option value="nursing"> Rory Meyers College of Nursing </option>
                        <option value="steinhardt"> Steinhardt School of Culture, Education, and Human Development  </option>
                        <option value="tisch"> Tisch School of the Arts  </option>
                        <option value="dentistry"> College of Dentistry  </option>
                        <option value="sps"> School of Professional Studies  </option>
                        <option value="silver"> Silver School of Social Work  </option>
                        <option value="ls"> Liberal Studies  </option>
                        <option value="gallatin"> Gallatin School of Individualized Study  </option>
                        <option value="global-health"> College of Global Public Health  </option>
                        <option value="abu-dhabi"> Abu Dhabi  </option>
                        <option value="shanghai"> Shanghai  </option>
                        <option value="other"> Other (please specify): </option>
                      </Field>
                    </label>
                    </Condition>
                    <Condition when="nyuSchool" is="other">
                    <label>
                    <Field
                      className={classes.input}
                      name="nyuSchoolOther"
                      component="input"
                      />
                    </label>
                    </Condition>
                    <label>
                      Current Level of Study:
                      <Field
                      className={classes.input}
                      name="Level"
                      component="select"
                      >
                        <option value="high-school">High School </option>
                        <option value="freshman"> Firstyear (Freshman) </option>
                        <option value="sophomore"> Sophomore </option>
                        <option value="junior"> Junior </option>
                        <option value="senior"> Senior </option>
                        <option value="graduate"> Graduate Student (Masters or Doctorate) </option>
                        <option value="professional"> Professional </option>
                      </Field>
                    </label>
                    <label>
                      {/* TODO: Possibly make Major field an auto complete field similar to school name */}
                      Major:
                    <Field
                      className={classes.input}
                      name="Major"
                      component="input"
                      />
                    </label>
                    <label>
                      Anticipated graduation year:
                    <Field
                      className={classes.input}
                      name="gradyear"
                      component="input"
                      />
                    </label>
                    <label>
                      Is this your first time at HackNYU?
                      <Field
                      className={classes.input}
                      name="visited"
                      component="select"
                      >
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </Field>
                    </label>
                    <Condition when="visited" is="no">
                      <label>
                      How many times have you participated at HackNYU so far?
                      <Field
                      className={classes.input}
                      name="participations"
                      component="select"
                      >
                        <option value="two"> 2 </option>
                        <option value="three"> 3 </option>
                        <option value="four-plus"> 4 or more </option>
                      </Field>
                      </label>
                      </Condition>
                    <label>
                      Which track are you most interested in?
                      <Field
                      className={classes.input}
                      name="Interests"
                      component="select"
                      >
                        <option value="assistive-tech"> Assistive Tech </option>
                        <option value="ed-tech"> Educational Technology </option>
                        <option value="fin-tech"> Financial Technology </option>
                        <option value="healthcare"> Healthcare </option>
                        <option value="sustain-social-impact"> Sustainabiltiy and Social Impact </option>
                      </Field>
                    </label>
                    <label>
                      Select your t-shirt size:
                      <Field
                      className={classes.input}
                      name="Shirt"
                      component="select"
                      >
                        <option value="x-small"> XS </option>
                        <option value="small"> S </option>
                        <option value="medium"> M </option>
                        <option value="large"> L </option>
                        <option value="x-large"> XL </option>
                        <option value="xx-large"> XXL </option>
                      </Field>
                    </label>
                    <label>
                      Resume:
                      <Field
                      className={classes.input}
                      name="Resume Upload"
                      component="input"
                      />
                    </label>
                    <label>
                      Any dietary restrictions?
                      <Field
                      className={classes.input}
                      name="DietaryRestrictions"
                      placeholder="My restrictions are"
                      component="input"
                      />
                    </label>
                    <label>
                      I have read and agree to the <a href="https://mlh.io/code-of-conduct">MLH Code of Conduct</a>
                      <Field
                      className={classes.input}
                      name="MLHCoC"
                      component="input"
                      type="checkbox"
                      />
                    </label>
                    <label>
                      I authorize HackNYU to share my application/registration information for event administration, pre- and post-event infomrational emails,
                      and occasional messages about hackathons in-line with the MLH Privacy Policy. I further agree to the Contest Terms and Conditions and the
                      MLH Privacy Policy.
                      <Field
                      className={classes.input}
                      name="MLHPrivacyPolicy"
                      component="input"
                      type="checkbox"
                      />
                    </label>
                    <button
                      className={classes.submit}
                      type="submit"
                      disabled={pristine || invalid || isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ push }, dispatch);

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ApplyPage);
