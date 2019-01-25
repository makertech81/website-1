import * as React from "react";
import AcceptedPage from "./AcceptedPage";
import PendingPage from "./PendingPage";
import { connect } from "react-redux";

import { ReduxState } from "../../../reducers";

interface Props {
  isAccepted: boolean;
}

const AdmissionResultPage: React.FunctionComponent<Props> = ({
  isAccepted
}) => {
  if (isAccepted) {
    return <AcceptedPage />;
  }
  return <PendingPage />;
};

const mapStateToProps = (state: ReduxState) => ({
  isAccepted: state.core.isAccepted
});

export default connect(mapStateToProps)(AdmissionResultPage);
