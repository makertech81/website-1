import * as React from "react";
import injectSheet from "react-jss";
import { Theme } from "../../ThemeInjector";


interface Props {
  classes: any;
  className: any;
  sponsorName: any;
  sponsorsInfo: any;
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

const Sponsor: React.SFC<Props> = ({ classes, className, sponsorName, sponsorsInfo }) => {
  return (
    <a href={sponsorsInfo[sponsorName].url} className={classes.Sponsor}>
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