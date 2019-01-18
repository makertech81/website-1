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
    width: "100%"
  },
  logoContainer: {
    flex: 1,
    margin: "25px"
  }
});

const Sponsor: React.SFC<Props> = ({ classes, src }) => {
  return (
    <div className={classes.logoContainer}>
      <img
          className={classes.logoImage}
          src={src}
        />
    </div>
  )
};

export default injectSheet(styles)(Sponsor);