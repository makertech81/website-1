import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "./Underline";
import { Theme, theme } from "../../ThemeInjector";
import { User } from "firebase";
import * as QRCode from "qrcode.react";
import { ReduxState } from "../../../reducers";
import { connect } from "react-redux";
import { compose } from "redux";

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  CheckInCodePage: {
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
  QRCode: {
    // hack due to hardcoded sizes
    width: "100% !important",
    height: "100% !important",
    maxWidth: "512px",
    maxHeight: "512px",
    display: "block",
    margin: "0 auto",
    border: `${theme.backgroundColor} 10px solid`,
    // because of border
    boxSizing: "border-box"
  }
});

const CheckInCodePage: React.SFC<Props> = ({ user, classes }) => {
  const checkInUrl = `${window.location.protocol}//${window.location.host}/user-check-in/${user.uid}`;

  return (
    <div className={classes.CheckInCodePage}>
      <h1 className={classes.title}> Show this QR code at check-in: <Underline /></h1>
      
      <QRCode value={checkInUrl} size={512} className={classes.QRCode} bgColor={theme.backgroundColor} fgColor={theme.secondBackground}/>
      <p>
        UID: {user.uid}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(CheckInCodePage);

