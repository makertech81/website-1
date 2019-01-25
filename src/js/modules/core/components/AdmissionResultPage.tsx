import * as React from "react";
import AcceptedPage from "./AcceptedPage";
import PendingPage from "./PendingPage";
import { connect } from "react-redux";

import { CoreState } from "../coreReducer";

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

const mapStateToProps = (state: CoreState) => ({
  isAccepted: state.isAccepted
});

export default connect(mapStateToProps)(AdmissionResultPage);
