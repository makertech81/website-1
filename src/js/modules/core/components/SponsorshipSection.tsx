import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";

import Sponsor from "./Sponsor";

interface Props {
  classes: any;
}

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

const SponsorshipSection: React.FunctionComponent<Props> = ({ classes }) => {
  const ASSET_DIR = "img/sponsorship-logos";
  const sponsorsInfo = {
    Google: {
      src: ASSET_DIR + "/Google/google.png",
      url: "https://google.com"
    },
    Gandi: {
      src: ASSET_DIR + "/Gandi/gandi.svg",
      url: "https://www.gandi.net/en"
    },
    "BNY Mellon": {
      src: ASSET_DIR + "/BNY Mellon/bny-mellon.svg",
      url: "https://www.bnymellon.com/"
    },
    Kensho: {
      src: ASSET_DIR + "/Kensho/kenshologo-white.svg",
      url: "https://www.kensho.com/"
    },
    "Contrary Capital": {
      src: ASSET_DIR + "/Contrary Capital/contrary.png",
      url: "https://contrarycap.com/"
    },
    Soylent: {
      src: ASSET_DIR + "/Soylent/Soylent-White.svg",
      url: "https://soylent.com"
    },
    Facebook: {
      src: ASSET_DIR + "/Facebook/Facebook-06-2015-White.svg",
      url: "https://facebook.com"
    },
    "7 Chord": {
      src: ASSET_DIR + "/7 Chord/7Chord-White-2.png",
      url: "https://www.7-chord.com/"
    },
    "Major League Hacking": {
      src: ASSET_DIR + "/MLH/mlh.png",
      url: "https://mlh.io/"
    },
    "Insomnia Cookies": {
      src: ASSET_DIR + "/Insomnia/insomnia.png",
      url: "https://insomniacookies.com/"
    },
    "KIND Snacks": {
      src: ASSET_DIR + "/Kind/kind.png",
      url: "https://www.kindsnacks.com/"
    },
    "New York Life": {
      src: ASSET_DIR + "/New York Life/nyl.png",
      url: "https://www.newyorklife.com/"
    },
    "JP Morgan Chase": {
      src: ASSET_DIR + "/JPMC/jpmc.png",
      url: "https://www.jpmorganchase.com/"
    },
    Dell: {
      src: ASSET_DIR + "/Dell/dell.png",
      url: "https://www.dell.com"
    },
    "VentureOut NYC": {
      src: ASSET_DIR + "/VentureOut NYC/venture.png",
      url: "https://www.ventureoutny.com"
    },
    "NYU Tandon": {
      src: ASSET_DIR + "/NYU/tandon.png",
      url: "https://www.engineering.nyu.edu"
    },
    NYU: {
      src: ASSET_DIR + "/NYU/nyu.png",
      url: "https://www.nyu.edu"
    },
    Avitae: {
      src: ASSET_DIR + "/Avitae/avitae.png",
      url: "https://www.goavitae.com"
    },
    Barnana: {
      src: ASSET_DIR + "/Barnana/barnana.png",
      url: "https://www.barnana.com"
    },
    Siggis: {
      src: ASSET_DIR + "/Siggis/siggis.png",
      url: "https://www.siggis.com"
    },
    "Thats It": {
      src: ASSET_DIR + "/Thats It/thats-it.png",
      url: "https://www.thatsitfruit.com"
    },
    Hasura: {
      src: ASSET_DIR + "/Hasura/hasura.png",
      url: "https://www.hasura.io"
    }
  };

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
        <Sponsor sponsorName="Google" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="BNY Mellon" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="Gandi" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="VentureOut NYC" sponsorsInfo={sponsorsInfo} />
      </div>
      <div className={classes.sponsorRow}>
        <Sponsor sponsorName="Contrary Capital" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="Facebook" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="NYU" sponsorsInfo={sponsorsInfo} />
        <Sponsor sponsorName="NYU Tandon" sponsorsInfo={sponsorsInfo} />
      </div>
      <div className={classes.sponsorRow}>
        <Sponsor
          sponsorName="Major League Hacking"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
        <Sponsor
          sponsorName="JP Morgan Chase"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
        <Sponsor
          sponsorName="Hasura"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
        <Sponsor
          sponsorName="New York Life"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
      </div>
      <div className={classes.sponsorRow}>
        <Sponsor
          sponsorName="Dell"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
        <Sponsor sponsorName="Insomnia Cookies" sponsorsInfo={sponsorsInfo} />
        <Sponsor
          sponsorName="Avitae"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
        <Sponsor
          sponsorName="Barnana"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
      </div>
      <div className={classes.sponsorRow}>
        <Sponsor
          sponsorName="Siggis"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
        <Sponsor
          sponsorName="Thats It"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
        <Sponsor sponsorName="Soylent" sponsorsInfo={sponsorsInfo} />
        <Sponsor
          sponsorName="KIND Snacks"
          sponsorsInfo={sponsorsInfo}
          className={classes.squareLogo}
        />
      </div>
    </div>
  );
};

export default injectSheet(styles)(SponsorshipSection);
