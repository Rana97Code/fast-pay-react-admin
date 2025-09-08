import { RouteObject } from "react-router-dom";
import UnderDevelopment from "../common/UnderDevelopment";
import AppLayout from "../layout/AppLayout";
import HeaderFooter from "../pages/site-settings/HeaderFooter";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "../utils/ProtectedRoute";
import Clients from "../pages/Clients";
import Blog from "../pages/Blog";
import AddBlog from "../pages/AddBlog";
import TechnologyStack from "../pages/TechnologyStack";
import OurTeam from "../pages/OurTeam";
import AddMember from "../components/cms/ourTeam/AddMember";
import Faq from "../pages/Faq";
import Job from "../pages/Job";
import AddJob from "../components/cms/jobs/AddJob";
import Benifits from "../pages/Benifits";
import JobApplicationsList from "../components/cms/jobs/JobApplicationsList";
import Projects from "../pages/Projects";
import AddProject from "../components/cms/projects/AddProject";
import Home from "../pages/Home";
import Message from "../pages/Message";
import Service from "../pages/Service";
import AddService from "../components/cms/service/AddService";
import CaseStudies from "../pages/CaseStudies";
import AddCaseStudy from "../components/cms/case-studies/AddCaseStudy";
import ClientValue from "../pages/ClientValue";
import AddClientValue from "../components/cms/client/AddClientValue";
import ChairmanSettings from "../pages/ChairmanSettings";
import ManagingDirectorSettings from "../pages/ManagingDirectorSettings";
import StakeholdersAdmin from "../pages/StakeholdersAdmin";
import AddStakeHolder from "../pages/AddStakeHolder";
import ExpertTeamAdmin from "../pages/ExpertTeamAdmin";
import AddEditExpertTeam from "../pages/AddEditExpertTeam";
import Companies from "../pages/Companies";
import AddCompanies from "../pages/AddCompanies";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, path: "/", element: <Home /> },
          { path: "cms/home/site-settings", element: <HeaderFooter /> },
          { path: "cms/home/client-stats", element: <Clients /> },
          { path: "cms/home/chairmen", element: <ChairmanSettings /> },
          { path: "cms/home/managing-director", element: <ManagingDirectorSettings /> },
          { path: "cms/home/stakeholders", element: <StakeholdersAdmin /> },
          { path: "cms/home/stakeholders/add-stakeholder", element: <AddStakeHolder /> },
          { path: "cms/home/stakeholders/add-stakeholder/:id", element: <AddStakeHolder /> },
          { path: "cms/home/expert-team", element: <ExpertTeamAdmin /> },
          { path: "cms/home/expert-team/add-edit", element: <AddEditExpertTeam /> },
          { path: "cms/home/expert-team/add-edit/:id", element: <AddEditExpertTeam /> },
          { path: "cms/home/companies", element: <Companies /> },
          { path: "cms/home/companies/add", element: <AddCompanies /> },
          { path: "cms/home/companies/add/:id", element: <AddCompanies /> },
          { path: "cms/home/blogs", element: <Blog /> },
          { path: "cms/home/blogs/add-blog", element: <AddBlog /> },
          { path: "cms/home/blogs/add-blog/:id", element: <AddBlog /> },
          { path: "cms/home/tech-stack", element: <TechnologyStack /> },
          { path: "cms/home/service", element: <Service /> },
          { path: "cms/home/service-add-service", element: <AddService /> },
          { path: "cms/home/case-studies", element: <CaseStudies /> },
          { path: "cms/home/case-studies/add", element: <AddCaseStudy /> },
          { path: "cms/home/case-studies/add/:id", element: <AddCaseStudy /> },
          { path: "cms/home/clients-value", element: <ClientValue /> },
          { path: "cms/home/add-client-value", element: <AddClientValue /> },
          { path: "cms/home/projects", element: <Projects /> },
          { path: "cms/home/projects/add-project", element: <AddProject /> },
          { path: "cms/home/projects/add-project/:id", element: <AddProject /> },
          { path: "cms/home/team", element: <OurTeam /> },
          { path: "cms/team/add-member", element: <AddMember /> },
          { path: "cms/team/add-member/:id", element: <AddMember /> },
          { path: "cms/home/faq", element: <Faq /> },
          { path: "cms/home/insights-blogs", element: <UnderDevelopment /> },
          { path: "cms/home/jobs", element: <Job /> },
          { path: "/cms/home/jobs/add-job", element: <AddJob /> },
          {
            path: "/cms/home/jobs/applications",
            element: <JobApplicationsList />,
          },
          { path: "/cms/home/jobs/add-job/:id", element: <AddJob /> },
          {
            path: "/cms/home/jobs/applications",
            element: <JobApplicationsList />,
          },
          { path: "cms/home/perks-benefits", element: <Benifits /> },
          { path: "cms/home/messages", element: <Message /> },
          { path: "cms/settings", element: <UnderDevelopment /> },

          // Existing routes (optional to keep or remove)
          { path: "customer-inquiries", element: <UnderDevelopment /> },
          { path: "contact-submissions", element: <UnderDevelopment /> },
          { path: "customer-enquery-banner", element: <UnderDevelopment /> },
          { path: "customer-information", element: <UnderDevelopment /> },
          { path: "customer-info-land-owner", element: <UnderDevelopment /> },
          { path: "projects", element: <UnderDevelopment /> },
          { path: "settings/header-footer", element: <UnderDevelopment /> },
          {
            path: "cms/customer-enquery-banner",
            element: <UnderDevelopment />,
          },
          { path: "settings/seo", element: <UnderDevelopment /> },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
