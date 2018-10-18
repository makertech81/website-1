import * as React from "react";
import { connect } from "react-redux";
import injectSheet, { Styles } from "react-jss";
import { Link } from "react-router-dom";
// @ts-ignore
import { login, logout } from "../coreActions";
import Avatar from "./Avatar";
import { User } from "firebase";
import LoginButton from "./LoginButton";

const styles: Styles = {
  Header: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  masthead: {
    width: "80%",
    paddingLeft: "50px"
  },
  headerText: {
    fontSize: "3em"
  },
  userInfo: {
    width: "!00%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "20px"
  },
  error: {
    color: "red"
  }
};

interface Props {
  classes: { [s: string]: string };
  user: User;
  error: string;
  logout: () => any;
  login: () => any;
}

const Header: React.SFC<Props> = ({ classes, user, logout, login }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.masthead}>
        <Link to="/">
          <h1 className={classes.headerText}> HackNYU </h1>
        </Link>
      </div>
      <div className={classes.userInfo}>
        {user ? (
          <div>
            <Avatar user={user} logout={logout}/>
          </div>
        ) : (
          <LoginButton login={login} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.core.user,
  error: state.core.error
});

const mapDispatchToProps = (dispatch: any) => ({
  login: () => {
    dispatch(login());
  },
  logout: () => {
    dispatch(logout());
  }
});

export default injectSheet(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
