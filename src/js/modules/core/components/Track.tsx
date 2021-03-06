import * as React from "react";
import { ReactNode, ReactNodeArray } from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {
  key: number;
  id: number;
  icons: ReactNodeArray;
  name: string;
  children: ReactNode;
}

const styles = (theme: Theme) => ({
  Track: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 0 20px 0"
  },
  subwayIcons: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  description: {
    fontSize: "1.5rem"
  },
  name: {
    padding: "0 25px 20px 25px",
    fontSize: "2rem"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    description: {
      padding: "0"
    }
  }
});

const Track: React.FunctionComponent<Props> = ({ id, classes, icons, children, name }) => {
  return (
    <div className={classes.Track}>
      <div className={classes.subwayIcons}>{icons}</div>
      <h3 className={classes.name}> {name} </h3>
      <div className={classes.description}>{children}</div>
    </div>
  );
};

export default injectSheet(styles)(Track);
