import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { Component } from "react";
import { delay, getRandomInteger } from "../../utils";
import SubwayStop from "./SubwayStop";
import { STOPS_COUNT } from "../../constants";

interface SubwayLineProps {
  color: string;
  lineStep: number;
  stopOffsets: number[];
  lineOffset: number;
  currentStop: number;
  classes: { [s: string]: string };
}

const styles: Styles = {
  SubwayLine: {
    height: "15px",
    // @ts-ignore
    width: props => `${props.lineStep * (100 / STOPS_COUNT) + props.lineOffset}vw`,
    transition: "width 1s",
    margin: "10px 0px 10px 0px",
    borderRadius: "10%",
    // @ts-ignore
    backgroundColor: props => props.color
  }
};

const SubwayLine: React.SFC<SubwayLineProps> = ({
  classes,
  currentStop,
  stopOffsets
}) => {
  let subwayStops = [];
  // Wow I think this is my first traditional for loop in JS in ages
  for (let i = 0; i < STOPS_COUNT; i++) {
    subwayStops.push(
      <SubwayStop
        key={i}
        stopIndex={i}
        currentStop={currentStop}
        offset={stopOffsets[i]}
      />
    );
  }
  return <div className={classes.SubwayLine}>{subwayStops}</div>;
};

const StyledSubwayLine = injectSheet(styles)(SubwayLine);

interface State {
  lineStep: number;
  currentStop: number;
  stopOffsets: number[];
  lineOffset: number;
}

interface Props {
  delay: number;
  color: string;
}

class SubwayLineWrapper extends Component<Props, State> {
  isMounted: boolean;

  constructor(props: Props) {
    super(props);
    let stopOffsets = [];
    for (let i = 0; i < STOPS_COUNT; i++) {
      stopOffsets.push(getRandomInteger(5) + 3);
    }
    this.isMounted = true;
    this.state = {
      lineStep: 0,
      currentStop: 0,
      lineOffset: getRandomInteger(5) + 3,
      stopOffsets
    };
  }

  componentDidMount() {
    delay(this.props.delay).then(() => this.animate());
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  async animate() {
    while (this.isMounted) {
      while (this.state.lineStep < STOPS_COUNT) {
        await delay(500 + getRandomInteger(1000));
        this.setState({ lineStep: this.state.lineStep + 1 });
        await delay(750);
        this.setState({ currentStop: this.state.currentStop + 1 });
      }
      await delay(1000);
      while (this.state.lineStep > 0) {
        await delay(750);
        this.setState({ currentStop: this.state.currentStop - 1 });
        await delay(500 + getRandomInteger(1000));
        this.setState({ lineStep: this.state.lineStep - 1 });
      }
    }
  }

  render() {
    const { color } = this.props;
    const { lineStep, stopOffsets, lineOffset, currentStop } = this.state;
    return (
      <StyledSubwayLine
        lineOffset={lineOffset}
        color={color}
        stopOffsets={stopOffsets}
        lineStep={lineStep}
        currentStop={currentStop}
      />
    );
  }
}
export default SubwayLineWrapper;
