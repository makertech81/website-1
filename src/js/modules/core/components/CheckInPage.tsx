import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "./Underline";
import { Theme } from "../../ThemeInjector";
import { User } from "firebase";
import * as QRCode from "qrcode.react";
import { ReduxState } from "../../../reducers";
import { connect } from "react-redux";
import { compose } from "redux";

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  CheckInPage: {
    borderRadius: theme.pageBorderRadius,
    backgroundColor: theme.secondBackground,
    maxWidth: theme.containerLargeWidth,
    padding: "25px",
    color: theme.secondFont,
    fontSize: "1.3rem"
  },
  QRCode: {
    // hack due to hardcoded sizes
    width: "100% !important",
    height: "100% !important",
    maxWidth: "512px",
    maxHeight: "512px"
  }
});

const CheckInPage: React.SFC<Props> = ({ user, classes }) => {
  return (
    <div className={classes.CheckInPage}>
      <QRCode value={user.uid} size={512} className={classes.QRCode}/>
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
)(CheckInPage);

