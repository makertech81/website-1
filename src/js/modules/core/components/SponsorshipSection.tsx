import * as React from "react";
import { ReactNode } from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { JssRules } from "../../types";

import Sponsor from "./Sponsor";

interface SponsorshipSectionStyles<T> extends Styles {
  header: T;
  SponsorshipSection: T;
  paragraph: T;
  previousSponsors: T;
  link: T;
  logos: T;
  logoImage: T;
}

interface Props {
  classes: SponsorshipSectionStyles<JssRules>;
}

const styles = (theme: Theme): SponsorshipSectionStyles<JssRules> => ({
  SponsorshipSection: {
    backgroundColor: theme.backgroundColor,
    fontSize: "1.4rem",
    padding: "5%"
  },
  header: {
    margin: "0 8%",
    maxWidth: "750px"
  },
  previousSponsors: {
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "left",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  sponsorRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "0 6%"
  },
  link: {
    textDecoration: "underline",
    color: "rgb(247, 193, 93)",
    "&:hover": {
      color: "white"
    }
  },
  // forces logo to be smaller
  squareLogo: {
    boxSizing: "border-box",
    padding: "20px"
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    sponsorRow: {
      flexWrap: "wrap"
    }
  }
});

const SponsorshipSection: React.SFC<Props> = ({ classes }) => {
  const ASSET_DIR = "img/sponsorship-logos";
  const sponsorsInfo = {
    "Google": {
      "src": ASSET_DIR + "/Google/Google-White.png",
      "url": "https://google.com"
    },
    "Gandi": {
      "src": ASSET_DIR + "/Gandi/Gandi-logo-white.svg",
      "url": "https://www.gandi.net/en",
    },
    "BNY Mellon": {
      "src": ASSET_DIR + "/BNY Mellon/bnym_rgb_wht.svg",
      "url": "https://www.bnymellon.com/"
    },
    "Kensho": {
      "src": ASSET_DIR + "/Kensho/kenshologo-white.svg",
      "url": "https://www.kensho.com/"
    },
    "Contrary Capital":{
      "src": ASSET_DIR + "/Contrary Capital/contrary-light.png",
      "url": "https://contrarycap.com/"
    },
    "Soylent":{
      "src": ASSET_DIR + "/Soylent/Soylent-White.svg",
      "url": "https://soylent.com"
    },
    "Facebook":{
      "src": ASSET_DIR + "/Facebook/Facebook-06-2015-White.svg",
      "url": "https://facebook.com"
    },
    "7 Chord":{
      "src": ASSET_DIR + "/7 Chord/7Chord-White-2.png",
      "url": "https://www.7-chord.com/"
    },
    "Major League Hacking":{
      "src": ASSET_DIR + "/MLH/mlh-logo-white.svg",
      "url": "https://mlh.io/"
    },
    "Insomnia Cookies":{
      "src": ASSET_DIR + "/Insomnia/InsomniaCookies-White2.png",
      "url": "https://insomniacookies.com/"
    },
    "KIND Snacks":{
      "src": ASSET_DIR + "/Kind/KIND-White-3.png",
      "url": "https://www.kindsnacks.com/"
    },
    "New York Life":{
      "src": ASSET_DIR + "/New York Life/NYLLogo_white.png",
      "url": "https://www.newyorklife.com/"
    },
    "JP Morgan Chase":{
      "src": ASSET_DIR + "/JPMC/JPMC-White.png",
      "url": "https://www.jpmorganchase.com/"
    }
  };

  return (
    <div className={classes.SponsorshipSection}>
      <header className={classes.header}>
      <h2>Sponsors</h2>
        <p>
          HackNYU is made possible thanks to the support of our gracious sponsors! We are proud to have
          sponsors represented from a wide variety of industries, sizes, and specializations.
        </p>
        <p>Interested in sponsoring HackNYU 2019? Contact us at <a className={classes.link} href="mailto:sponsorship.hack@nyu.edu"> sponsorship.hack@nyu.edu </a>, and
          please find our sponsorship opportunities <a className={classes.link} href="pdf/hacknyu-sponsor-deck-2019.pdf"> here! </a>
        </p>
      </header>

      <div className={classes.sponsorRow}>
        <Sponsor sponsorName="Google" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="BNY Mellon" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="Gandi" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="Kensho" sponsorsInfo={sponsorsInfo} />
      </div>
      <div className={classes.sponsorRow}>
        <Sponsor sponsorName="Contrary Capital" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="Soylent" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="Facebook" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="7 Chord" sponsorsInfo={sponsorsInfo} />
      </div>
      <div className={classes.sponsorRow}>
        <Sponsor sponsorName="Major League Hacking" sponsorsInfo={sponsorsInfo} className={classes.squareLogo} />
        <Sponsor sponsorName="Insomnia Cookies" sponsorsInfo={sponsorsInfo} className={classes.squareLogo} />
        <Sponsor sponsorName="KIND Snacks" sponsorsInfo={sponsorsInfo} className={classes.squareLogo} />
        <Sponsor sponsorName="New York Life" sponsorsInfo={sponsorsInfo} className={classes.squareLogo} />
      </div>
      <div className={classes.sponsorRow}>
        <Sponsor sponsorName="JP Morgan Chase" sponsorsInfo={sponsorsInfo} />
      </div>
    </div>
  );
};

export default injectSheet(styles)(SponsorshipSection);
