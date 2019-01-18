import * as React from "react";
import { JssRules, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { ReactNode } from "react";

interface ButtonStyles<T> extends Styles {
  button: T;
}

const styles = (theme: Theme): ButtonStyles<JssRules> => ({
  button: {
    //@ts-ignore
    width: (props: Props) => props.width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.submitButton,
    color: theme.fontColor,
    fontWeight: "350",
    margin: "5px",
    padding: "12px 25px",
    border: "none",
    fontSize: "0.9em",
    transition: "background-color 0.4s, transform 200ms",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.submitButtonHover,
      transform: "scale(1.1)"
    },
    '&:disabled': {
      backgroundColor: theme.submitButtonDeactivated
    }
  }
});

interface Props {
  classes: ButtonStyles<string>;
  children: ReactNode;
  type?: string;
  width?: string;
  onClick: () => any;
  className: string;
}

const Button: React.SFC<Props & React.HTMLAttributes> = props => {
  const { classes, children, className } = props;
  return (
    <div className={className}>
    <button {...props} className={`${classes.button} ${props.className}`}>
      {children}
    </button>
    </div>
  );
};

//@ts-ignore
export default injectSheet(styles)(Button);
