interface CertBadge {
  label: string;
  shortLabel: string;
  svg: string;
}

export const certBadgeMap: Record<string, CertBadge> = {
  ansi_z359_1: {
    label: "ANSI Z359.1 Certified",
    shortLabel: "ANSI Z359.1",
    svg: "cert1.svg"
  },
  osha: {
    label: "OSHA Compliant", 
    shortLabel: "OSHA",
    svg: "cert2.svg"
  },
  ce: {
    label: "CE Certified",
    shortLabel: "CE",
    svg: "cert3.svg"
  },
  csa: {
    label: "CSA Z259 Certified",
    shortLabel: "CSA Z259",
    svg: "cert4.svg"
  },
  made_in_usa: {
    label: "Made in USA",
    shortLabel: "Made in USA",
    svg: "cert5.svg"
  }
};
