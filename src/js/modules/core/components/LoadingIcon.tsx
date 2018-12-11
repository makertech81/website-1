import * as React from "react";
import injectSheet from "react-jss/lib/injectSheet";

const styles: object = {
  LoadingIcon: {
    display: "inline-block",
    width: (props: Props) => props.width,
    height: (props: Props) => props.height,
    "&:after": {
      content: '""',
      width: (props: Props) => props.width,
      height: (props: Props) => props.height,
      display: "block",
      margin: "1px",
      borderRadius: "50%",
      border: "5px solid #000",
      borderColor: "#000 transparent #000 transparent",
      animation: "lds-dual-ring 1.2s linear infinite"
    }
  },
  "@keyframes lds-dual-ring": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  }
};

interface Props {
  width: number | string;
  height: number | string;
  classes: { [s: string]: string };
}

const LoadingIcon: React.SFC<Props> = ({ classes }) => {
  return <div className={classes.LoadingIcon} />;
};

export default injectSheet(styles)(LoadingIcon);
