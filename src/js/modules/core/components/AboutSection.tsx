import * as React from "react";
import injectSheet, { StyleCreator } from "react-jss/lib/injectSheet";
import { Theme } from "../../types";

interface Props {
  test?: string;
}

const styles: StyleCreator<string, Theme> = (theme) => ({
  AboutSection: {
    display: "flex",
    alignItems: "center",
    padding: "40px",
    flexDirection: "column",
    margin: "0 5% 0 5%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "25px",
    padding: "5% 0 5% 0",
    margin: "5%",
    width: "80vw",
    maxWidth: "750px",
    backgroundColor: theme.secondBackground,
    color: theme.secondFont,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "4px 7px 21px -2px rgba(0,0,0,0.75)"
  },
  underline: {
    border: "2px solid #6fb1f5",
    width: "2em"
  },
  intro: {
    fontSize: "1.4rem",
    maxWidth: "500px",
    width: "60vw",
    lineHeight: "1.1em"
  },
  title: {
    fontSize: "2em"
  }
});

const AboutSection = injectSheet(styles)<Theme>(({ classes }) => {
  return (
    <div className={classes.AboutSection}>
      <div className={classes.content}>
        <h1 className={classes.title}> ABOUT </h1>
        <hr className={classes.underline} />
        <p className={classes.intro}>
          HackNYU is NYU's annual hackathon. It takes place simultaneously in
          New York, Abu Dhabi and Shanghai over 48 hours. HackNYU is free, and
          made possible thanks to our wonderful sponsors and volunteers.
        </p>
      </div>
    </div>
  );
});

export default AboutSection;
