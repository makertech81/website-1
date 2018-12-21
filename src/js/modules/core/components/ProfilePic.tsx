import * as React from "react";
import { Styles } from "react-jss";
import { JssRules, Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import HoverOverlay from "./HoverOverlay";

interface ProfilePicStyles<T> extends Styles {
  fileInput: T;
  ProfilePic: T;
  roundImg: T;
}
interface Props {
  classes: ProfilePicStyles<string>;
}

interface State {
  isHovering: boolean;
}

const styles = (theme: Theme): ProfilePicStyles<JssRules> => ({
  fileInput: {
    display: "none"
  },
  ProfilePic: {
    paddingBottom: "220px",
    position: "relative"
  },
  roundImg: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    marginBottom: "20px",
    position: "absolute",
    top: "0",
    right: "-105px",
    transition: "filter 0.3s"
  }
});

class ProfilePic extends React.Component<Props, State> {
  fileUploader: React.Ref;

  constructor(props) {
    super(props);
    this.fileUploader = React.createRef();
    this.state = {
      isHovering: false
    };
  }

  handleClick = () => {
    this.fileUploader.current.click();
  };

  handleUpload = () => {
    console.log("UPLOADING");
    console.log(this.fileUploader.current.files);
  };

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    let { classes, photoURL } = this.props;
    const { isHovering } = this.state;

    return (
      <div
        className={classes.ProfilePic}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          onClick={this.handleClick}
          src={photoURL}
          style={{ filter: isHovering ? "brightness(75%)" : "none" }}
          className={classes.roundImg}
        />
        <input
          className={classes.fileInput}
          onChange={this.handleUpload}
          type="file"
          ref={this.fileUploader}
        />
        <HoverOverlay isHovering={isHovering} onClick={this.handleClick} />
      </div>
    );
  }
}

export default injectSheet(styles)(ProfilePic);
