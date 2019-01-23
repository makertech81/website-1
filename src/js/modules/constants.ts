export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const STOPS_COUNT = 5;

export const ALERT_TIME_INTERVALS = {
  ANIMATION_BUFFER: 100,
  DISPLAY_TIME: 4000,
  ANIMATION_TIME: 2000
};

export const UNRESTRICTED_ROUTES = new Set([
  "/",
  "/about",
  "/login",
  "/register"
]);

export const ASSET_DIR = "img/sponsorship-logos";


export const sponsorsInfo = [
  {
    id: 0,
    name: "Google",
    src: "/Google/google.png",
    url: "https://google.com"
  },
  {
    id: 1,
    name: "Gandi",
    src: "/Gandi/gandi.svg",
    url: "https://www.gandi.net/en"
  },
  {
    id: 2,
    name: "BNY Mellon",
    src: "/BNY Mellon/bny-mellon.svg",
    url: "https://www.bnymellon.com/"
  },
  {
    id: 3,
    name: "Contrary Capital",
    src: "/Contrary Capital/contrary.png",
    url: "https://contrarycap.com/"
  },
  {
    id: 4,
    name: "Soylent",
    src: "/Soylent/Soylent-White.svg",
    url: "https://soylent.com"
  },
  {
    id: 5,
    name: "Facebook",
    src: "/Facebook/Facebook-06-2015-White.svg",
    url: "https://facebook.com"
  },
  {
    id: 6,
    name: "Major League Hacking",
    src: "/MLH/mlh.png",
    url: "https://mlh.io/"
  },
  {
    id: 7,
    name: "Insomnia Cookies",
    src: "/Insomnia/insomnia.png",
    url: "https://insomniacookies.com/"
  },
  {
    id: 8,
    name: "KIND Snacks",
    src: "/Kind/kind.png",
    url: "https://www.kindsnacks.com/"
  },
  {
    id: 9,
    name: "New York Life",
    src: "/New York Life/nyl.png",
    url: "https://www.newyorklife.com/"
  },
  {
    id: 10,
    name: "JP Morgan Chase & Co",
    src: "/JPMC/jpmc.png",
    url: "https://www.jpmorganchase.com/"
  },
  {
    id: 11,
    name: "Dell",
    src: "/Dell/dell.png",
    url: "https://www.dell.com"
  },
  {
    id: 12,
    name: "VentureOut NYC",
    src: "/VentureOut NYC/venture.png",
    url: "https://www.ventureoutny.com"
  },
  {
    id: 13,
    name: "NYU Tandon School of Engineering",
    src: "/NYU/tandon.png",
    url: "https://www.engineering.nyu.edu/"
  },
  {
    id: 14,
    name: "New York University",
    src: "/NYU/nyu.png",
    url: "https://www.nyu.edu"
  },
  {
    id: 15,
    name: "Avitae",
    src: "/Avitae/avitae.png",
    url: "https://www.goavitae.com"
  },
  {
    id: 16,
    name: "Barnana",
    src: "/Barnana/barnana.png",
    url: "https://www.barnana.com"
  },
  {
    id: 17,
    name: "Siggis",
    src: "/Siggis/siggis.png",
    url: "https://www.siggis.com"
  },
  {
    id: 18,
    name: "Thats It",
    src: "/Thats It/thats-it.png",
    url: "https://www.thatsitfruit.com"
  },
  {
    id: 19,
    name: "Hasura",
    src: "/Hasura/hasura.png",
    url: "https://www.hasura.io"
  }
];
