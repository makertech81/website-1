import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons/faReact";
import { Theme } from "../../types";
import { faAws } from "@fortawesome/free-brands-svg-icons/faAws";
import APIList from "./APIList";

interface AboutPageStyles<T> extends Styles {
  AboutPage: T;
  content: T;
  icons: T;
  icon: T;
  text: T;
}

interface Props {
  classes: AboutPageStyles<string>;
}

const styles = (theme: Theme): AboutPageStyles => ({
  AboutPage: {
    fontSize: "1.4rem",
    backgroundColor: theme.formBackground,
    color: theme.fontColor,
    width: "80vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: "500px",
    padding: "5%"
  },
  icons: {
    display: "flex",
    maxWidth: "500px",
    width: "100vw",
    justifyContent: "flex-start"
  },
  icon: {
    padding: "5px"
  },
  text: {
    fontSize: "1.4rem"
  }
});

const AboutPage: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.AboutPage}>
      <div className={classes.content}>
        <h1> About Us </h1>
        <p className={classes.text}>
          HackNYU has been entirely student run from the beginning. We rely on
          the generosity of volunteers and sponsors to host HackNYU every year.
          If you are interested in sponsoring HackNYU, please contact us at
          support.hack@nyu.edu and check out{" "}
          <a href="sponsor-deck.pdf"> our sponsor deck </a>
        </p>

        <h2> Tech Details </h2>
        <div className={classes.icons}>
          <FontAwesomeIcon className={classes.icon} size="lg" icon={faReact} />
          <FontAwesomeIcon className={classes.icon} size="lg" icon={faAws} />
        </div>
        <p className={classes.text}>
          This site is written in React with TypeScript, Firebase, JSS and
          Redux. It is hosted on AWS. Feel free to check out our (wonderful)
          code <a href="https://github.com/hacknyu/hacknyu-2019">on GitHub</a>.
          If you have any complaints/bugs/compliments, please email nick at
          nicholasyang.com.
        </p>
        <APIList />
      </div>
    </div>
  );
};

export default injectSheet(styles)(AboutPage);
