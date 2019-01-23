import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";


interface Props extends WithStyles<typeof styles> {
  sponsorName: string;
  className: string;
  sponsorLink: string;
  sponsorSource: string;
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
    }
  },
  logoImage: {
    display: "block",
    width: "100%"
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    Sponsor: {
      flex: "1 0 30%",
      maxWidth: "50%",
      margin: "5%"
    }
  }
});

const Sponsor: React.SFC<Props> = ({ classes, className, sponsorName, sponsorLink, sponsorSource }) => {
  return (
    <a href={sponsorLink} className={classes.Sponsor}>
      <img
        alt={sponsorName}
        title={sponsorName}
        className={`${classes.logoImage} ${className}`}
        src={sponsorSource}
      />
    </a>
  )
};

export default injectSheet(styles)(Sponsor);