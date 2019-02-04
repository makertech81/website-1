import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme, theme } from "../../../ThemeInjector";
import { ApplyFormData } from "../../../types";
import { User } from "firebase";
import { ReduxState } from "../../../../reducers";
import { connect } from "react-redux";
import { compose } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { db } from "../../../../firebase";
import Info from "./Info";

type PathParams = {
  uid: string 
}

interface DirectProps extends WithStyles<typeof styles> {}
type Props = DirectProps & RouteComponentProps<PathParams>;

interface State {
  userData: ApplyFormData | null;
  isAdmitted: boolean;
  _isMounted: boolean;
}

const styles = (theme: Theme) => ({
  UserCheckInPage: {
    borderRadius: theme.pageBorderRadius,
    backgroundColor: theme.secondBackground,
    maxWidth: theme.containerLargeWidth,
    padding: "25px",
    color: theme.secondFont,
    fontSize: "1.3rem"
  },
  title: {
    marginBottom: "1em"
  }
});

async function fetchUserData(uid: string): Promise<{ userData: ApplyFormData, isAdmitted: boolean }> {
  
  let isAdmitted: boolean = false;
  let userData = await db.collection("users").doc(uid).get().then((doc: any) => doc.data()) as ApplyFormData;
  isAdmitted = await db.collection("users").doc(uid).get().then((doc: any) => doc.exists);

  console.log(userData);
  
  return { userData, isAdmitted };
}

class UserCheckInPage extends React.Component<Props> {
  state: State = {
    userData: null,
    isAdmitted: false,
    _isMounted: false
  };  
  uid: string = '';

  constructor(props: Props) {
    super(props);
    this.uid = props.match.params.uid;
  }

  loadData(uid: string) {
    this.setState({ _isMounted: true });
    
    fetchUserData(this.props.match.params.uid).then(({ userData, isAdmitted }) => {
      if (this.state._isMounted) {
        this.setState({ userData, isAdmitted });
      }
    });
  }

  componentDidMount() {
    this.loadData(this.uid);
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  render() {
    const { classes } = this.props;
    const { userData, isAdmitted } = this.state;

    return (
      <div className={classes.UserCheckInPage}>
        <h1 className={classes.title}> UID: {this.uid} </h1>
        {userData ? 
          <div>
            <h2>Indentification</h2>
            <Info label="First name" value={userData.firstName} />
            <Info label="Last name" value={userData.lastName} />
            <Info label="Birthday" value={userData.birthDate} />
            <p><em>Under 18: Birthday before Feb 15th, 2001</em></p>
            <h2>School</h2>
            <Info label="Grad year" value={userData.gradYear} />
            <Info label="School" value={userData.school} />
            <h2>Emergency contact</h2>
            <Info label="Emergency contact name" value={userData.emergencyContactName} />
            <Info label="Emergency contact relation" value={userData.emergencyContactRelation} />
            <Info label="Emergency contact number" value={userData.emergencyContactNumber} />
            <h2>Event</h2>
            {/*<Info label="Location" value={userData.confirmData.location} />*/}
            <Info label="Is accepted" value={isAdmitted ? "Yes" : "No"} />
            <Info label="Shirt size" value={userData.tshirtSize} />
          </div>
        :
          <div>
            Loading...
          </div>
        }
        
      </div>
    );
  }
};

export default injectSheet(styles)(UserCheckInPage);

