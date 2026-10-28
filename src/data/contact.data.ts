export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface ContactData {
  email: string;
  location: string;
  timezone: string;
  availability: string;
  responseNote: string;
  socials: SocialLink[];
  topics: string[];
  intents: string[];
}

export const contactData: ContactData = {
  email: "fitaalemayehu12@gmail.com",
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  availability: "Freelance & Full-Time Roles",
  responseNote: "",
  socials: [
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/effileo",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/fita-alemayehu-bulbulo-90bb71374/",
    },
    {
      id: "upwork",
      label: "Upwork",
      url: "https://www.upwork.com/freelancers/~0178ef1a3f037ee2a7",
    },
  ],
  topics: [
    "Web app",
    "Mobile app",
    "Shopify store",
    "Backend & API",
    "UI/UX design",
    "Something else",
  ],
  intents: ["Freelance project", "Full-time role", "Just saying hi"],
};
