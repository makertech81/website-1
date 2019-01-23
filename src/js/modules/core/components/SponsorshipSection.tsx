import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";
import Sponsor from "./Sponsor";
import { ASSET_DIR, sponsorsInfo } from "../../constants";

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  SponsorshipSection: {
    backgroundColor: theme.secondBackground,
    fontSize: "1.4rem",
    padding: "5%"
  },
  header: {
    margin: "0 8%",
    maxWidth: "750px"
  },
  sponsorRow: {
    display: "grid",
    grid: "repeat(4, auto) / repeat(4, auto)",
    placeContent: "center",
    columnGap: "2rem",
    justifyContent: "space-evenly",
    margin: "0 6%"
  },
  link: {
    textDecoration: "underline",
    color: "rgb(247, 193, 93)",
    "&:hover": {
      color: theme.backgroundColor
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    sponsorRow: {
      flexWrap: "wrap"
    }
  }
});

const SponsorshipSection: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.SponsorshipSection}>
      <header className={classes.header}>
        <h2>SPONSORS</h2>
        <p>
          HackNYU is made possible thanks to the support of our gracious
          sponsors! We are proud to have sponsors represented from a wide
          variety of industries, sizes, and specializations.
        </p>
        <p>
          Interested in sponsoring HackNYU 2019? Contact us at{" "}
          <a className={classes.link} href="mailto:sponsorship.hack@nyu.edu">
            {" "}
            sponsorship.hack@nyu.edu{" "}
          </a>
          , and please find our sponsorship opportunities{" "}
          <a className={classes.link} href="pdf/hacknyu-sponsor-deck-2019.pdf">
            {" "}
            here!{" "}
          </a>
        </p>
      </header>
      <div className={classes.sponsorRow}>
        {sponsorsInfo.map(sponsor => (
          <Sponsor
            key={sponsor.id}
            name={sponsor.name}
            link={sponsor.url}
            source={ASSET_DIR + sponsor.src}
          />
        ))}
      </div>
    </div>
  );
};

export default injectSheet(styles)(SponsorshipSection);
