import * as React from "react";
import Button from "./Button";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { bindActionCreators, compose, Dispatch } from "redux";
import { connect } from "react-redux";
import { uploadResume } from "../coreActions"

interface UploadButtonStyles<T> extends Styles {
  UploadResumeButton: T;
  hiddenInput: T;
  label: T;
  uploadedTime: T;
}

interface Props {
  classes: UploadButtonStyles<string>;
  uploadResume: (uid: string, file: File) => any;
  resumeTimestamp: string;
  uid: string;
}
const styles: UploadButtonStyles<object> = {
  UploadResumeButton: {
    display: "flex",
    flexDirection: "row",
    fontSize: "1.3rem",
    padding: "15px",
    alignItems: "center",
  },
  label: {
    width: "175px",
    padding: "5px"
  },
  hiddenInput: {
    display: "none"
  },
  uploadedTime: {
    paddingLeft: "10px"
  }
};

class UploadResumeButton extends React.Component<Props> {
  fileUploader: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.fileUploader = React.createRef();
  }

  handleClick = (event: Event) => {
    event.preventDefault();
    this.fileUploader.current.click();
  };

  handleUpload = () => {
    const { uid, uploadResume } = this.props;
    const file = this.fileUploader.current.files[0];
    uploadResume(uid, file)
  }

  render() {
    let { classes, resumeTimestamp } = this.props;

    return <div className={classes.UploadResumeButton}>
      <div className={classes.label}>
      (Optional) Resume:
      </div>
      <input
        key={0}
        type="file"
        className={classes.hiddenInput}
        ref={this.fileUploader}
        onChange={this.handleUpload}
      />
      <Button key={1} type="button" onClick={this.handleClick}>Upload</Button>
      {resumeTimestamp  && <div className={classes.uploadedTime}> Uploaded at {resumeTimestamp} </div> }
    </div>
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ uploadResume }, dispatch)

export default compose(injectSheet(styles), connect(undefined, mapDispatchToProps))(UploadResumeButton);
