import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";


interface Props extends WithStyles<typeof styles> {
  name: string;
  link: string;
  source: string;
}

const styles = (theme: Theme) => ({
  Sponsor: {
    margin: "2.5%",
    display: "block",
    maxWidth: "20%",
    flex: "1",
    transitionDuration: "200ms",
    "&:hover": {
      transform: "scale(1.1)"
    },
  },
  logoImage: {
    display: "grid",
    justifyContent: "space-evenly",
    width: "100%",
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    Sponsor: {
      flex: "1 0 30%",
      maxWidth: "50%",
      margin: "5%"
    }
  }
});

const Sponsor: React.FunctionComponent<Props> = ({ classes, name, link, source }) => {
  return (
    <a href={link} className={classes.Sponsor}>
      <img
        alt={name}
        title={name}
        className={classes.logoImage}
        src={source}
      />
    </a>
  )
};

export default injectSheet(styles)(Sponsor);