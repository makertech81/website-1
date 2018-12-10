import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { STOPS_COUNT } from "../../constants";

const styles: Styles = {
  SubwayStop: {
    backgroundColor: "white",
    position: "absolute",
    borderRadius: "50%",
    transition: "transform 1s",
    width: "25px",
    height: "25px",
    border: "0.5px solid #d9d9d9",
    //@ts-ignore
    left: props =>
      `${(props.stopIndex + 1) * (100 / STOPS_COUNT) - props.offset}vw`,
    //@ts-ignore
    transform: props =>
      props.stopIndex < props.currentStop ? "scale(1, 1) translateY(-6px)" : "scale(0, 0) translateY(-6px)"
  }
};

interface Props {
  classes: { [s: string]: string };
  currentStop: number;
  stopIndex: number;
  offset: number;
}

const SubwayStop: React.SFC<Props> = ({ classes }) => {
  return <div className={classes.SubwayStop} />;
};

export default injectSheet(styles)(SubwayStop);
