import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { JssRules } from "../../types";


const styles = (theme: Theme): SponsorStyles<JssRules> => ({
  SponsorshipSection: {
    backgroundColor: theme.backgroundColor,
    margin: "0 8% 5% 11%"
  },
  header: {
    fontSize: "2em"
  },
  paragraph: {
    fontSize: "1.4rem",
    paddingLeft: "20px",
    margin: "4% 4% 4% 4%"
  },
  header: {
    paddingLeft: "20px"
  },
  previousSponsors: {
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "left",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "50px",
    paddingRight: "20px"
  },
  logos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  logoImage: {
    display: "flex",
    maxWidth: "500px",
    margin: "4% 4% 4% 4%"
  },
  link: {
    color: "yellow",
    "&:hover": {
      color: "white"
    }
  }
});

const Sponsor: React.SFC<Props> = ({ src }) => {
  return (
    <div className={classes.logoImage}>
      <img
          className={classes.logoImage}
          src={src}
        />
    </div>
  )
};

export injectSheet(styles)(Sponsor);