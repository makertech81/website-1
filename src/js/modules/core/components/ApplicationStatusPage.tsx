import * as React from "react";
import AdmittedPage from "./AdmittedPage";
import PendingPage from "./PendingPage";
import { connect } from "react-redux";
import { ReduxState } from "../../../reducers";

interface Props {
  isAdmitted: boolean;
}

const ApplicationStatusPage: React.FunctionComponent<Props> = ({
  isAdmitted
}) => {
  if (isAdmitted) {
    return <AdmittedPage />;
  }
  return <PendingPage />;
};

const mapStateToProps = (state: ReduxState) => ({
  isAdmitted: state.core.isAdmitted
});

export default connect(mapStateToProps)(ApplicationStatusPage);
