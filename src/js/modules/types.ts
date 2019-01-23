export interface ApplyFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  // race / ethnicity
  isAmericanNative: boolean;
  isAsianPacificIslander: boolean;
  isBlackAfricanAmerican: boolean;
  isHispanic: boolean;
  isWhiteCaucasian: boolean;
  isOther: boolean;
  phoneNumber: string;
  school: string;
  nyuSchool?: string;
  nyuSchoolOther?: string;
  yearOfStudy: string;
  major: string;
  gradYear: string;
  isFirstTime: string;
  timesParticipated: string;
  track: string;
  tshirtSize: string;

  isVeggie: boolean;
  isVegan: boolean;
  isKosher: boolean;
  isHalal: boolean;
  isGlutenFree: boolean;

  otherDietaryRestrictions: string;
  allergies: string;
  codeOfConduct: boolean;
  privacyPolicy: boolean;
  resumeTimestamp: string; // timestamp

  emergencyContactNumber: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
}

export interface Form {
  isSubmitting: boolean;
}

export interface IncompleteField {
  field: string;
  name: string;
}

export interface SponsorFields {
  name: string;
  src: string;
  url: string;
}

export const ASSET_DIR = "img/sponsorship-logos";

export const sponsorsInfo = {
  Google: {
    name: "Google",
    src:  "/Google/google.png",
    url: "https://google.com"
  },
  Gandi: {
    name: "Gandi",
    src:  "/Gandi/gandi.svg",
    url: "https://www.gandi.net/en"
  },
  "BNY Mellon": {
    name: "BNY Mellon",
    src:  "/BNY Mellon/bny-mellon.svg",
    url: "https://www.bnymellon.com/"
  },
  "Contrary Capital": {
    name: "Contrary Capital",
    src:  "/Contrary Capital/contrary.png",
    url: "https://contrarycap.com/"
  },
  Soylent: {
    name: "Soylent",
    src:  "/Soylent/Soylent-White.svg",
    url: "https://soylent.com"
  },
  Facebook: {
    name: "Facebook",
    src:  "/Facebook/Facebook-06-2015-White.svg",
    url: "https://facebook.com"
  },
  "Major League Hacking": {
    name: "Major League Hacking",
    src:  "/MLH/mlh.png",
    url: "https://mlh.io/"
  },
  "Insomnia Cookies": {
    name: "Insomnia Cookies",
    src:  "/Insomnia/insomnia.png",
    url: "https://insomniacookies.com/"
  },
  "KIND Snacks": {
    name: "KIND Snacks",
    src:  "/Kind/kind.png",
    url: "https://www.kindsnacks.com/"
  },
  "New York Life": {
    name: "New York Life",
    src:  "/New York Life/nyl.png",
    url: "https://www.newyorklife.com/"
  },
  "JP Morgan Chase": {
    name: "JP Morgan Chase & Co",
    src:  "/JPMC/jpmc.png",
    url: "https://www.jpmorganchase.com/"
  },
  Dell: {
    name: "Dell",
    src:  "/Dell/dell.png",
    url: "https://www.dell.com"
  },
  "VentureOut NYC": {
    name: "VentureOut NYC",
    src:  "/VentureOut NYC/venture.png",
    url: "https://www.ventureoutny.com"
  },
  "NYU Tandon": {
    name: "NYU Tandon School of Engineering",
    src:  "/NYU/tandon.png",
    url: "https://www.engineering.nyu.edu/"
  },
  NYU: {
    name: "New York University",
    src:  "/NYU/nyu.png",
    url: "https://www.nyu.edu"
  },
  Avitae: {
    name: "Avitae",
    src:  "/Avitae/avitae.png",
    url: "https://www.goavitae.com"
  },
  Barnana: {
    name: "Barnana",
    src:  "/Barnana/barnana.png",
    url: "https://www.barnana.com"
  },
  Siggis: {
    name: "Siggis",
    src:  "/Siggis/siggis.png",
    url: "https://www.siggis.com"
  },
  "Thats It": {
    name: "Thats It",
    src:  "/Thats It/thats-it.png",
    url: "https://www.thatsitfruit.com"
  },
  Hasura: {
    name: "Hasura",
    src:  "/Hasura/hasura.png",
    url: "https://www.hasura.io"
  }
};