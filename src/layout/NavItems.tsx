import {
  FaBriefcase as BriefcaseIcon,
  FaEnvelopeOpenText as MessageSquareIcon,
  FaCog as SettingsIcon,
  FaHome as HomeIcon,
  FaInfoCircle as InfoIcon,
  FaProjectDiagram as ProjectIcon,
  FaAward as AwardIcon,
  FaLandmark as LandownerIcon,
  FaBlog,
  FaUsers,
  FaFileAlt,
  FaTools,
  FaBookOpen,
  FaUserTie,
} from "react-icons/fa";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { NavItem } from "../interface/types";
import { MdSpaceDashboard } from "react-icons/md";

export const navItems: NavItem[] = [
  {
    icon: <MdSpaceDashboard />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <FaTools />,
    name: "Site Settings",
    path: "cms/home/site-settings",
  },
  {
    icon: <FaUsers />,
    name: "Client Stats",
    path: "/cms/home/client-stats",
  },
  {
    icon: <FaUsers />,
    name: "About",
    subItems: [
      { name: "Chairman", path: "/cms/home/chairmen" },
      { name: "Managing Director", path: "/cms/home/managing-director" },
      { name: "Stakeholders", path: "/cms/home/stakeholders" },
      { name: "Expert Team", path: "/cms/home/expert-team" },
    ],
  },
  {
    icon: <FaBlog />,
    name: "Companies",
    path: "/cms/home/companies",
  },
  {
    icon: <FaBlog />,
    name: "Blogs",
    path: "/cms/home/blogs",
  },
  {
    icon: <SettingsIcon />,
    name: "Technology Stack",
    path: "/cms/home/tech-stack",
  },
  {
    icon: <FaBookOpen />,
    name: "Case Studies",
    path: "/cms/home/case-studies",
  },
  {
    icon: <FaUserTie />,
    name: "Clients Value",
    path: "/cms/home/clients-value",
  },
  {
    icon: <ProjectIcon />,
    name: "Projects",
    path: "/cms/home/projects",
  },
  {
    icon: <FaTools />,
    name: "Service",
    path: "/cms/home/service",
  },
  {
    icon: <BriefcaseIcon />,
    name: "Our Team",
    path: "/cms/home/team",
  },
  {
    icon: <MessageSquareIcon />,
    name: "FAQ",
    path: "/cms/home/faq",
  },
  {
    icon: <BriefcaseIcon />,
    name: "Job Openings",
    path: "/cms/home/jobs",
  },
  {
    icon: <FaFileAlt />,
    name: "Job Applicatoins",
    path: "/cms/home/jobs/applications",
  },
  {
    icon: <BiSolidMessageRoundedDots />,
    name: "Messages",
    path: "/cms/home/messages",
  },
  {
    icon: <AwardIcon />,
    name: "Perks & Benefits",
    path: "/cms/home/perks-benefits",
  },
];



export const cmsNavItems: NavItem[] = [
  {
    icon: <HomeIcon />,
    name: "Home",
    subItems: [
      { name: "Hero Slider", path: "/cms/home/hero-slider" },
      { name: "Project Video", path: "/cms/home/project-video" },
      { name: "Legacy Excellence", path: "/cms/home/legacy-excellence" },
    ]
  },
  {
    icon: <InfoIcon />,
    name: "About Us",
    subItems: [
      { name: "Corporate Info", path: "/cms/about/corporate-info" },
      { name: "Our Leaders", path: "/cms/about/our-leaders" },
      { name: "Awards & Accolades", path: "/cms/about/awards" },
    ]
  },
  {
    icon: <ProjectIcon />,
    name: "Projects",
    subItems: [
      { name: "Project Lists", path: "/cms/projects-list" },
      { name: "Add Project", path: "/cms/projects/add" },
    ]
  },
  { icon: <LandownerIcon />, name: "Landowner", path: "/cms/landowner" },
  { icon: <AwardIcon />, name: "Career", path: "/cms/career" },
  {
    icon: <FaBlog />,
    name: "Media Center",
    subItems: [
      { name: "Media Center Hero", path: "/media-hero" },
      { name: "Media Center List", path: "/media-center-list", pro: false },
    ],
  },
  {
    icon: <MessageSquareIcon />,
    name: "Contact",
    path: "/cms/contact",
  },
  {
    icon: <MessageSquareIcon />,
    name: "Customer Enquiry",
    path: "/cms/customer-enquery-banner",
  },

  {
    icon: <SettingsIcon />, name: "Site Settings", subItems: [
      { name: "Header/Footer", path: "/settings/header-footer", pro: false },
    ]
  },
];
