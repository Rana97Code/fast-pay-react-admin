import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
        email
        password
        mobile
        role
        profilePicture
      }
    }
  }
`;


export const ALL_CUSTOMER_INQUERY_QUERY = gql`
  query {
    getAllCustomerInquiries {
      id
      name
      address
      email
      phone
      category
      location
      size
      message
    }
  }
`;
export const ALL_CONTACT_SUBMISSIONS_QUERY = gql`
  query {
    getAllCustomerInquiries {
      id
      name
      address
      email
      phone
      category
      location
      size
      message
      createdAt
      updatedAt
    }
  }
`;

export const GET_LAND_TESTIMONIAL = gql`
  query GetAllTestimonials {
    getAllTestimonials {
      id
      title
      quote
      authorName
      authorPosition
      videoUrl
      thumbnailUrl
    }
  }
`;


export const GET_HOME_SLIDER = gql`
  query {
    getHomeSlider {
      id
      title
      subtitle
      image
    }
  }
`;

export const GET_HOME_HERO = gql`
  query GetHomeHero {
    getHomeHero {
      backgroundImage
      videoThumbnail
      videoUrl
    }
  }
`;

export const GET_HOME_EXCELLENCE = gql`
  query GetHomeExcellence {
    getHomeExcellence {
      id
      title
      icon
      description
    }
  }
`;

export const GET_CONTACT_PAGE_DATA = gql`
  query {
    getContactPageData {
      titleImage {
        alt
        title
        url
      }
      keepInTouch {
        heading
        address1
        address2
        email
        salesEnquiry
        jointVentureDevelopment
        generalEnquiry
        internationalCaller
        whatsapp
        mapLocation
      }
    }
  }
`;


export const GET_CAREER_HEADER = gql`
  query {
    getCareerPage {
      careerHeader {
        title
        subtitle
        logo
      }
    }
  }
`;


export const GET_CAREER_SECOND = gql`
  query {
    getCareerPage {
      careerSecond {
        title
        para1
      }
    }
  }
`;

export const GET_CAREER_PAGE = gql`
  query {
    getCareerPage {
      departments {
        id
        title
        logo
      }
    }
  }
`;


export const GET_SITE_SETTINGS_QUERY = gql`
  query GetSiteSettings {
    getSiteSettings {
      id
      phoneNumber
      address
      footerText
      footerSubText
      footerImage
      logo
      facebook
      instagram
      youtube
      linkedin
      createdAt
    }
  }
`;

export const GET_ALL_JOB_LISTTINGS = gql` {
  getAllJobListing {
    id
    title
    location
    status
    jobResponsibilities
    educationalRequirements
    experienceRequirements
    additionalRequirements
    jobPreferences
    benefits
    applyBefore
    createdAt
    updatedAt
  }
}
  `;


export const GET_RESUMES = gql`
  query GetResumes {
    getResumes {
      id
      name
      phone
      email
      position
      coverLetter
      resumeFile
    }
  }
`;


export const GET_ALL_FQAS = gql`
  query GetAllFqas {
    getAllFqas {
      id
      question
      answer
    }
  }
`;









//  =============================      Nexora Admin Query      ============================

export const GET_DASHBOARD_STATICTICS = gql`
 query {
  dashboardCounts {
    totalEmployees,
          totalProjects
          totalResumes
          totalJobsPublishedList
          totalBlogs
  }
}
`;


export const GET_CLIENT_STATS = gql`
  query {
    getClientStats {
      id
      completedProjects
      employees
      yearsOnMarket
      clients
    }
  }
`;


export const GET_ALL_BLOG_POSTS = gql`
  query GetAllBlogPosts {
    getAllBlogPosts {
      id
      title
      description
      imageUrl
      category
      publicationDate
      readMoreLink
      author
    }
  }
`;


export const GET_BLOG_POST_BY_ID = gql`
  query GetBlogPostById($id: String!) {
    getBlogPostById(id: $id) {
      id
      title
      description
      imageUrl
      category
      publicationDate
      readMoreLink
      author
      authorAvatar
    }
  }
`;


export const GET_ALL_TECH_ITEMS = gql`
  query {
    getAllTechItems {
      id
      name
      icon
    }
  }
`;


export const GET_TECH_ITEM = gql`
  query GetTechItem($id: ID!) {
    getTechItem(id: $id) {
      id
      name
      icon
    }
  }
`;


export const GET_CASE_STUDY = gql`
  query GetCaseStudy($id: ID!) {
    getCaseStudy(id: $id) {
      id
      title
      category
      subCategory
      icon
      description
    }
  }
`;

export const GET_ALL_CASE_STUDIES = gql`
  query {
    getAllCaseStudies {
      id
      title
      category
      subCategory
      icon
      description
    }
  }
`;


export const GET_CLIENT_VALUE = gql`
  query GetClientValue($id: ID!) {
    getClientValue(id: $id) {
      id
      headerTitle
      headerSubtitle
      title
      description
      image
    }
  }
`;


export const GET_ALL_CLIENT_VALUES = gql`
  query GetAllClientValues {
    getAllClientValues {
      id
      title
      description
      src
    }
  }
`;


export const GET_JOB_LISTING = gql`
  query getJobListing($id: String!) {
    getJobListing(id: $id) {
      id
      title
      location
      status
      jobResponsibilities
      educationalRequirements
      experienceRequirements
      additionalRequirements
      jobPreferences
      benefits
      applyBefore
      createdAt
      updatedAt
    }
  }
`;


export const GET_ALL_JOB_LISTINGS = gql`
  query getJobListings {
    getJobListings {
      id
      title
      location
      status
      jobResponsibilities
      educationalRequirements
      experienceRequirements
      additionalRequirements
      jobPreferences
      benefits
      applyBefore
      createdAt
      updatedAt
    }
  }
`;


// Query for getting a single project
export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      title
      description
      image
      techStack
      timeline
      status
      link
    }
  }
`;

// Query for getting all projects
export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      id
      title
      description
      image
      techStack
      timeline
      status
      link
    }
  }
`;


export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      name
      role
      bio
      imageUrl
      linkedin
      github
      twitter
      facebook
      email
      phone
      address
      joinDate
      status
      createdAt
    }
  }
`;


export const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      id
      name
      role
      bio
      imageUrl
      linkedin
      github
      twitter
      facebook
      email
      phone
      address
      joinDate
      status
      createdAt
    }
  }
`;


export const GET_CHAIRMAN = gql`
  query GetChairmen {
    getChairmen {
      id
      name
      designation
      qualifications
      bio
      profileImage
      qualificationImage
    }
  }
`;

export const GET_MANAGING_DIRECTOR = gql`
  query GetManagingDirector {
    getManagingDirector {
    id
    name
    designation
    bio
    achievements
    image
  }
}
`;

export const GET_ALL_STAKEHOLDERS = gql`
  query GetAllStakeholders {
    getAllStakeholders {
    id
    name
    position
    bio
    image
    notableWorks
  }
}
`;

export const GET_STAKEHOLDER_BY_ID = gql`
  query GetStakeholderById($id: String!) {
    getStakeholderById(id: $id) {
      id
      name
      position
      bio
      notableWorks
      image
    }
  }
`;

export const GET_ALL_EXPERT_TEAM = gql`
  query GetAllExpertTeam {
    getAllExpertTeams {
      id
      name
      role
      bio
      image
    }
  }
`;

export const GET_EXPERT_BY_ID = gql`
  query GetExpertById($id: String!) {
    getExpertTeamById(id: $id) {
      id
      name
      role
      bio
      image
    }
  }
`;

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    getAllCompanies {
      id
      title
      href
      logo
      description
      email
      phoneNumber
      address
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query GetCompanyById($id: String!) {
    getCompanyById(id: $id) {
      id
      title
      href
      logo
      description
      email
      phoneNumber
      address
    }
  }
`;