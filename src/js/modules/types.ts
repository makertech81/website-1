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
  square: boolean;
}

export const ASSET_DIR = "img/sponsorship-logos";

export const sponsorsInfo: Array<SponsorFields> = [
  {
    name: "Google",
    src:  "/Google/google.png",
    url: "https://google.com",
    square: false  
  },
  {
    name: "Gandi",
    src:  "/Gandi/gandi.svg",
    url: "https://www.gandi.net/en",
    square: false  
  },
  {
    name: "BNY Mellon",
    src:  "/BNY Mellon/bny-mellon.svg",
    url: "https://www.bnymellon.com/",
    square: false  
  },
  {
    name: "Contrary Capital",
    src:  "/Contrary Capital/contrary.png",
    url: "https://contrarycap.com/",
    square: false  
  },
  {
    name: "Soylent",
    src:  "/Soylent/Soylent-White.svg",
    url: "https://soylent.com",
    square: false  
  },
  {
    name: "Facebook",
    src:  "/Facebook/Facebook-06-2015-White.svg",
    url: "https://facebook.com",
    square: false  
  },
  {
    name: "Major League Hacking",
    src:  "/MLH/mlh.png",
    url: "https://mlh.io/",
    square: false  
  },
  {
    name: "Insomnia Cookies",
    src:  "/Insomnia/insomnia.png",
    url: "https://insomniacookies.com/",
    square: true  
  },
  {
    name: "KIND Snacks",
    src:  "/Kind/kind.png",
    url: "https://www.kindsnacks.com/",
    square: false  
  },
  {
    name: "New York Life",
    src:  "/New York Life/nyl.png",
    url: "https://www.newyorklife.com/",
    square: true  
  },
  {
    name: "JP Morgan Chase & Co",
    src:  "/JPMC/jpmc.png",
    url: "https://www.jpmorganchase.com/",
    square: false  
  },
  {
    name: "Dell",
    src:  "/Dell/dell.png",
    url: "https://www.dell.com",
    square: true  
  },
  {
    name: "VentureOut NYC",
    src:  "/VentureOut NYC/venture.png",
    url: "https://www.ventureoutny.com",
    square: false  
  },
  {
    name: "NYU Tandon School of Engineering",
    src:  "/NYU/tandon.png",
    url: "https://www.engineering.nyu.edu/",
    square: false  
  },
  {
    name: "New York University",
    src:  "/NYU/nyu.png",
    url: "https://www.nyu.edu",
    square: false  
  },
  {
    name: "Avitae",
    src:  "/Avitae/avitae.png",
    url: "https://www.goavitae.com",
    square: false  
  },
  {
    name: "Barnana",
    src:  "/Barnana/barnana.png",
    url: "https://www.barnana.com",
    square: false  
  },
  {
    name: "Siggis",
    src:  "/Siggis/siggis.png",
    url: "https://www.siggis.com",
    square: false  
  },
  {
    name: "Thats It",
    src:  "/Thats It/thats-it.png",
    url: "https://www.thatsitfruit.com",
    square: false  
  },
  {
    name: "Hasura",
    src:  "/Hasura/hasura.png",
    url: "https://www.hasura.io",
    square: true
  }
];