import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme, theme } from "../../ThemeInjector";
import { User } from "firebase";
import { ReduxState } from "../../../reducers";
import { connect } from "react-redux";
import { compose } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { db } from "../../../firebase";

type PathParams = {
  uid: string 
}

interface Props extends WithStyles<typeof styles> {
  user: User;
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
  },
  infoLine: {
    display: "block"
  }
});

async function fetchUserData(uid: string): Promise<{ userData: any, isAdmitted: boolean }> {
  let userData = {};
  let isAdmitted: boolean = false;

  userData = await db.collection("users").doc(uid).get().then((doc: any) => doc.data());
  isAdmitted = await db.collection("users").doc(uid).get().then((doc: any) => doc.exists);
  
  return { userData, isAdmitted };
}

// This is in a terrible state but please forgive me!
class UserCheckInPage extends React.Component<Props & RouteComponentProps<PathParams>> {
  state: { userData: any, isAdmitted: boolean } = {
    userData: { firstName: '', lastName: '' },
    isAdmitted: false
  };
  _asyncRequest = null;

  constructor(props) {
    super(props);
  } 

  componentWillMount() {
    this._asyncRequest = fetchUserData(this.props.match.params.uid).then(({ userData, isAdmitted }) => {
      this._asyncRequest = null;
      this.setState({ userData, isAdmitted });
    });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    const { classes, match } = this.props;
    const { userData, isAdmitted } = this.state;

    return (
      <div className={classes.UserCheckInPage}>
        <h1 className={classes.title}> UID: {match.params.uid} </h1>
        <div>
          <span className={classes.infoLine}> First name: {userData.firstName} </span>
          <span className={classes.infoLine}> Last name: {userData.lastName} </span>
        </div>
        
      </div>
    );
  }
};

export default injectSheet(styles)(UserCheckInPage);

