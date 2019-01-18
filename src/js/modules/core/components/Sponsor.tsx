import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { JssRules } from "../../types";


interface SponsorStyles<T> extends Styles {
  logoImage: T;
  logoContainer: T;
}

interface Props {
  classes: SponsorStyles<JssRules>;
}

const styles = (theme: Theme): SponsorStyles<JssRules> => ({
  logoImage: {
    display: "block",
    width: "100%"
  },
  logoContainer: {
    margin: "2.5%",
    display: "block",
    maxWidth: "20%",
    flex: "1",
    transitionDuration: "200ms",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    logoContainer: {
      flex: "1 0 30%",
      maxWidth: "50%",
      margin: "5%"
    }
  }
});

const Sponsor: React.SFC<Props> = ({ classes, className, sponsorName, sponsorsInfo }) => {
  return (
    <a href={sponsorsInfo[sponsorName].url} className={classes.logoContainer}>
      <img
        alt={sponsorName}
        title={sponsorName}
        className={`${classes.logoImage} ${className}`}
        src={sponsorsInfo[sponsorName].src}
      />
    </a>
  )
};

export default injectSheet(styles)(Sponsor);