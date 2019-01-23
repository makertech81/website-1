import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";


interface Props extends WithStyles<typeof styles> {
  sponsorName: string;
  isSquareLogo: boolean;
  sponsorLink: string;
  sponsorSource: string;
}

const styles = (theme: Theme) => ({
  Sponsor: {
    height: "20vh",
    width: "20%",
    margin: "2.5%",
    float: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: "200ms",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  logoImage: {
    display: "block",
    width: "100%"
  },
  squareLogo: {
    width: "auto",
    height: "100%",
    maxHeight: "15vh"
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    Sponsor: {
      width: "40%",
      margin: "5%"
    }
  }
});

const Sponsor: React.SFC<Props> = ({ classes, isSquareLogo, sponsorName, sponsorLink, sponsorSource }) => {
  return (
    <a href={sponsorLink} className={classes.Sponsor}>
      <img
        alt={sponsorName}
        title={sponsorName}
        className={`${classes.logoImage} ${isSquareLogo ? classes.squareLogo : "" }`}
        src={sponsorSource}
      />
    </a>
  )
};

export default injectSheet(styles)(Sponsor);