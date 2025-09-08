import { gql } from '@apollo/client';


export const SIGNUP_MUTATION = gql`
  mutation SignUp($signUpDto: SignupDto!) {
    signUp(signUpDto: $signUpDto) {
      _id
      userName
      email
      mobile
      profilePicture
      role
    }
  }
`;


export const ADD_SLIDER = gql`
  mutation addSlider($input: UpdateSliderInput!) {
    addHomeSlider(input: $input) {
      id
      title
      subtitle
      image
    }
  }
`;

export const DELETE_SLIDER = gql`
mutation DeleteSlider($id: Float!) {
  deleteHomeSlider(id: $id)
}
`;

export const UPDATE_HOME_HERO = gql`
  mutation UpdateHomeHero($input: UpdateHomeHeroInput!) {
    updateHomeHero(input: $input) {
      title
      backgroundImage
      videoThumbnail
      videoUrl
    }
  }
`;


export const UPDATE_HOME_EXCELLENCE = gql`
  mutation UpdateHomeExcellence($input: UpdateHomeExcellenceInput!) {
    updateHomeExcellence(input: $input) {
      id
      title
      icon
      description
    }
  }
`;

export const DELETE_HOME_EXCELLENCE = gql`
  mutation deleteHomeExcellence($id: Int!) {
    deleteHomeExcellence(id: $id)
  }
`;

export const ADD_HOME_EXCELLENCE = gql`
  mutation addHomeExcellence($input: CreateHomeExcellenceInput!) {
    addHomeExcellence(input: $input) {
      id
      title
      description
      icon
    }
  }
`;


export const UPDATE_TITLE_IMAGE = gql`
  mutation updateTitleImage($newTitleImage: UpdateTitleImageInput!) {
    updateTitleImage(newTitleImage: $newTitleImage) {
      titleImage {
        alt
        title
        url
      }
    }
  }
`;


export const UPDATE_KEEP_IN_TOUCH = gql`
  mutation updateKeepInTouch($newKeepInTouch: UpdateKeepInTouchInput!) {
    updateKeepInTouch(newKeepInTouch: $newKeepInTouch) {
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


export const UPDATE_CAREER_HEADER = gql`
  mutation updateCareerHeader($input: CareerHeaderInput!) {
    updateCareerHeader(input: $input) {
      title
      subtitle
      logo
    }
  }
`;

export const UPDATE_CAREER_SECOND = gql`
  mutation updateCareerSecond($input: CareerSecondInput!) {
    updateCareerSecond(input: $input) {
      title
      para1
      logo
      para2
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation createDepartment($input: DepartmentInput!) {
    createDepartment(input: $input) {
      id
      title
      logo
    }
  }
`;


export const DELETE_DEPARTMENT = gql`
  mutation deleteDepartment($id: Int!) {
    deleteDepartment(id: $id)
  }
`;

export const CREATE_FOOTER_MUTATION = gql`
  mutation CreateSiteSettings($input: CreateSiteSettingInput!) {
    createSiteSettings(input: $input) {
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

export const UPDATE_FOOTER_MUTATION = gql`
  mutation UpdateSiteSettings($id: ID!, $input: UpdateSiteSettingInput!) {
    updateSiteSettings(id: $id, input: $input) {
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


// export const CREATE_JOB_LISTING = gql`
//   mutation CreateJobListing($createJobListingInput: CreateJobListingInput!) {
//     createJobListing(createJobListingInput: $createJobListingInput) {
//       id
//       title
//       location
//       status
//       jobResponsibilities
//       educationalRequirements
//       experienceRequirements
//       additionalRequirements
//       jobPreferences
//       benefits
//       applyBefore
//       createdAt
//       updatedAt
//     }
//   }
// `;


















// =============================================     Nexora        ============================================================

export const CREATE_BLOG_POST = gql`
  mutation CreateBlogPost($createBlogPostInput: CreateBlogPostInput!) {
    createBlogPost(createBlogPostInput: $createBlogPostInput) {
      id
      title
      description
      imageUrl
      category
      publicationDate
      readMoreLink
      author
      authorAvatar
      createdAt
      updatedAt
    }
  }
`;


export const UPDATE_CLIENT_STATS = gql`
  mutation UpdateClientStats($input: UpdateClientStatsInput!) {
    updateClientStats(input: $input) {
      id
      completedProjects
      employees
      yearsOnMarket
      clients
    }
  }
`;


export const DELETE_BLOG_POST = gql`
  mutation DeleteBlogPost($id: String!) {
    deleteBlogPost(id: $id) {
      id
      title
      description
      imageUrl
      category
      publicationDate
      readMoreLink
    }
  }
`;



export const UPDATE_BLOG_POST = gql`
  mutation UpdateBlogPost($id: String!, $updateBlogPostInput: UpdateBlogPostInput!) {
    updateBlogPost(id: $id, updateBlogPostInput: $updateBlogPostInput) {
      id
      title
      description
      imageUrl
      category
      publicationDate
      readMoreLink
    }
  }
`;



export const CREATE_TECH_ITEM = gql`
  mutation CreateTechItem($input: CreateTechItemInput!) {
    createTechItem(input: $input) {
      id
      name
      icon
    }
  }
`;


export const UPDATE_TECH_ITEM = gql`
  mutation UpdateTechItem($id: ID!, $input: UpdateTechItemInput!) {
    updateTechItem(id: $id, input: $input) {
      id
      name
      icon
    }
  }
`;


export const DELETE_TECH_ITEM = gql`
  mutation DeleteTechItem($id: ID!) {
    deleteTechItem(id: $id)
  }
`;


export const CREATE_CASE_STUDY = gql`
  mutation CreateCaseStudy($input: CreateCaseStudyInput!) {
    createCaseStudy(input: $input) {
      id
      title
      category
      subCategory
      icon
      description
    }
  }
`;

// Mutation to update an existing case study
export const UPDATE_CASE_STUDY = gql`
  mutation UpdateCaseStudy($id: ID!, $input: UpdateCaseStudyInput!) {
    updateCaseStudy(id: $id, input: $input) {
      id
      title
      category
      subCategory
      icon
      description
    }
  }
`;


export const DELETE_CASE_STUDY = gql`
  mutation DeleteCaseStudy($id: ID!) {
    deleteCaseStudy(id: $id)
  }
`;

export const CREATE_CLIENT_VALUE = gql`
  mutation CreateClientValue($input: CreateClientDataInput!) {
    createClientValue(input: $input) {
      id
      type
      title
      description
      src
      alt
      isOptional
    }
  }
`;



export const UPDATE_CLIENT_VALUE = gql`
  mutation UpdateClientValue($id: ID!, $input: UpdateClientDataInput!) {
    updateClientValue(id: $id, input: $input) {
      id
      type
      title
      description
      src
      alt
      isOptional
    }
  }
`;


export const DELETE_CLIENT_VALUE = gql`
  mutation DeleteClientValue($id: ID!) {
    deleteClientValue(id: $id)
  }
`;


export const CREATE_JOB_LISTING = gql`
  mutation createJobListing($createJobListingInput: CreateJobListingInput!) {
    createJobListing(createJobListingInput: $createJobListingInput) {
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

// Update Job Listing Mutation
export const UPDATE_JOB_LISTING = gql`
  mutation updateJobListing($id: String!, $updateJobListingInput: UpdateJobListingInput!) {
    updateJobListing(id: $id, updateJobListingInput: $updateJobListingInput) {
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



export const DELETE_JOB_LISTING = gql`
  mutation DeleteJobListing($id: String!) {
    deleteJobListing(id: $id)
  }
`;

export const DELETE_RESUME = gql`
  mutation DeleteResume($id: String!) {
    removeResume(id: $id)
  }
`;


export const CREATE_FQA = gql`
  mutation CreateFqa($input: CreateFqaInput!) {
    createFqa(input: $input) {
      id
      question
      answer
    }
  }
`;


export const UPDATE_FQA = gql`
  mutation UpdateFqa($id: String!, $question: String!, $answer: String!) {
    updateFqa(id: $id, question: $question, answer: $answer) {
      id
      question
      answer
    }
  }
`;

export const DELETE_FQA = gql`
  mutation DeleteFqa($id: String!) {
    deleteFqa(id: $id) {
      id
      question
      answer
    }
  }
`;


export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
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


export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
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

export const DELETE_PROJECT = gql`
 mutation DeleteProject($id: ID!) {
  deleteProject(id: $id)
}
`;


export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
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

// Mutation to update an existing employee
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
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



export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      name
      role
      email
    }
  }
`;

export const CREATE_CHAIRMAN = gql`
mutation CreateChairman($createChairmanInput: CreateChairmanInput!) {
  createChairman(createChairmanInput: $createChairmanInput) {
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

export const UPDATE_CHAIRMAN = gql`
  mutation UpdateChairman($id: String!, $updateChairmanInput: UpdateChairmanInput!) {
    updateChairman(id: $id, updateChairmanInput: $updateChairmanInput) {
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

export const CREATE_MANAGING_DIRECTOR = gql`
mutation CreateManagingDirector($createManagingDirectorInput: CreateManagingDirectorInput!) {
  createManagingDirector(createManagingDirectorInput: $createManagingDirectorInput) {
    id
    name
    designation
    bio
    achievements
    image
  }
}
`;

export const UPDATE_MANAGING_DIRECTOR = gql`
mutation UpdateManagingDirector($id: String!, $updateManagingDirectorInput: UpdateManagingDirectorInput!) {
  updateManagingDirector(id: $id, updateManagingDirectorInput: $updateManagingDirectorInput) {
    id
    name
    designation
    bio
    achievements
    image
  }
}
`;


export const CREATE_STAKEHOLDER = gql`
mutation CreateStakeholder($createStakeholderInput: CreateStakeholderInput!) {
  createStakeholder(createStakeholderInput: $createStakeholderInput) {
    id
    name
    position
    bio
    image
    notableWorks
  }
}
`;

export const UPDATE_STAKEHOLDER = gql`
mutation UpdateStakeholder($id: String!, $updateStakeholderInput: UpdateStakeholderInput!) {
  updateStakeholder(id: $id, updateStakeholderInput: $updateStakeholderInput) {
    id
    name
    position
    bio
    image
    notableWorks
  }
}
`;

export const DELETE_STAKEHOLDER = gql`
mutation DELETE_STAKEHOLDER($id: String!) {
  deleteStakeholder(id: $id)
}
`;
export const CREATE_EXPERT_TEAM = gql`
  mutation CreateExpertTeam($createExpertTeamInput: CreateExpertTeamInput!) {
    createExpertTeam(createExpertTeamInput: $createExpertTeamInput) {
      id
      name
      role
      bio
      image
    }
  }
`;

export const UPDATE_EXPERT_TEAM = gql`
  mutation UpdateExpertTeam($id: String!, $updateExpertTeamInput: UpdateExpertTeamInput!) {
    updateExpertTeam(id: $id, updateExpertTeamInput: $updateExpertTeamInput) {
      id
      name
      role
      bio
      image
    }
  }
`;


export const DELETE_EXPERT_TEAM = gql`
  mutation DeleteExpertTeam($id: ID!) {
    deleteExpertTeam(id: $id)
  }
`;


export const CREATE_COMPANY = gql`
  mutation CreateCompany($createCompanyInput: CreateCompanyInput!) {
    createCompany(createCompanyInput: $createCompanyInput) {
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

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: String!, $updateCompanyInput: UpdateCompanyInput!) {
    updateCompany(id: $id, updateCompanyInput: $updateCompanyInput) {
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

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: String!) {
    deleteCompany(id: $id) {
      id
    }
  }
`;