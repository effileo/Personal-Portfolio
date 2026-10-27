export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  monogram: string;
  start: string;
  end: string;
  status: string;
  location: string;
}

export interface CertificateItem {
  id: string;
  featured: boolean;
  title: string;
  issuer: string;
  platform: string;
  type: string;
  date: string;
  instructor?: string;
  hours?: string;
  accent: string;
  image: string;
  credentialUrl?: string;
  tasks?: string[];
  tech?: string[];
}

export const educationList: EducationItem[] = [
  {
    id: "aau",
    degree: "B.Sc. Software Engineering",
    school: "Addis Ababa University",
    monogram: "AAU",
    start: "2024",
    end: "",
    status: "In progress",
    location: "Addis Ababa, Ethiopia",
  },
];

export const certificatesList: CertificateItem[] = [
  {
    id: "commbank-forage",
    featured: true,
    title: "Software Engineering Job Simulation",
    issuer: "Commonwealth Bank",
    platform: "Forage",
    type: "Job simulation",
    date: "March 10, 2026",
    accent: "#FFCC00",
    image: "/certificates/commbank-job-simulation.webp",
    tasks: [
      "Modify an Existing .NET Backend",
      "Modify an Existing React/Redux Frontend",
      "Modify the Client's Requests",
      "Cover Your Code!",
      "Create a Pull Request",
    ],
    tech: [".NET", "React", "Redux"],
  },
  {
    id: "udemy-python-html",
    featured: false,
    title: "HTML 5 With Quizzes And Python 3 Complete Course",
    issuer: "Udemy",
    platform: "Udemy",
    type: "Online course",
    date: "Feb. 26, 2026",
    instructor: "Horizon Tech",
    hours: "7 total hours",
    accent: "#A435F0",
    image: "/certificates/udemy-2.jpg",
    credentialUrl:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-0d84835c-fb34-487b-b608-473b51dbf929.jpg",
  },
  {
    id: "udemy-html-css",
    featured: false,
    title: "HTML & CSS: The Complete Web Development Guide",
    issuer: "Udemy",
    platform: "Udemy",
    type: "Online course",
    date: "Feb. 26, 2026",
    instructor: "Muhammad Riaz Uddin",
    hours: "4 total hours",
    accent: "#A435F0",
    image: "/certificates/udemy-1.jpg",
    credentialUrl:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-444fd5ff-b504-41f6-8c14-62dc563c4931.jpg",
  },
];
