export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AboutHeroInput = {
  backgroundImage: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AboutHeroType = {
  __typename?: 'AboutHeroType';
  backgroundImage: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export type AwardImageInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  src: Scalars['String']['input'];
};

export type AwardImageType = {
  __typename?: 'AwardImageType';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  src: Scalars['String']['output'];
};

export type AwardInfoInput = {
  backgroundImage: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AwardInfoType = {
  __typename?: 'AwardInfoType';
  backgroundImage: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type BlogSectionType = {
  __typename?: 'BlogSectionType';
  image: Scalars['String']['output'];
  texts?: Maybe<Array<Scalars['String']['output']>>;
};

export type BlogType = {
  __typename?: 'BlogType';
  category: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sections: Array<BlogSectionType>;
  shortDescription: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CsrImageInput = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  src: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CsrImageType = {
  __typename?: 'CSRImageType';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  src: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type CareerHeaderInput = {
  logo: Scalars['String']['input'];
  subtitle: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CareerHeaderType = {
  __typename?: 'CareerHeaderType';
  logo: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CareerPageType = {
  __typename?: 'CareerPageType';
  careerHeader: CareerHeaderType;
  careerSecond: CareerSecondType;
  departments: Array<DepartmentType>;
};

export type CareerSecondInput = {
  logo: Scalars['String']['input'];
  para1: Scalars['String']['input'];
  para2: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CareerSecondType = {
  __typename?: 'CareerSecondType';
  logo: Scalars['String']['output'];
  para1: Scalars['String']['output'];
  para2: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** The type of property (Residential or Commercial) */
export enum Category {
  Commercial = 'COMMERCIAL',
  Residential = 'RESIDENTIAL'
}

export type CompanyInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  logo: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  website: Scalars['String']['input'];
};

export type CompanyType = {
  __typename?: 'CompanyType';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  website: Scalars['String']['output'];
};

export type ConnectType = {
  __typename?: 'ConnectType';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type ContactJsonType = {
  __typename?: 'ContactJsonType';
  keepInTouch: KeepInTouch;
  titleImage: TitleImage;
};

export type ContactType = {
  __typename?: 'ContactType';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  reasonForContacting: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CoordinatesType = {
  __typename?: 'CoordinatesType';
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type CreateConnectInput = {
  email: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateContactInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  reasonForContacting?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateCustomerInquiryDto = {
  address: Scalars['String']['input'];
  category: Category;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  location: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  size: Scalars['Float']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateEssenceItemInput = {
  icon: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateJobListingInput = {
  additionalRequirements: Array<Scalars['String']['input']>;
  applyBefore: Scalars['String']['input'];
  benefits: Array<Scalars['String']['input']>;
  createdAt: Scalars['DateTime']['input'];
  educationalRequirements: Array<Scalars['String']['input']>;
  experienceRequirements: Array<Scalars['String']['input']>;
  jobPreferences: Array<Scalars['String']['input']>;
  jobResponsibilities: Array<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt: Scalars['DateTime']['input'];
};

export type CreateJointVentureInput = {
  address: Scalars['String']['input'];
  benefits?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facing?: InputMaybe<Facing>;
  frontRoadWidth?: InputMaybe<Scalars['String']['input']>;
  landCategory?: InputMaybe<LandCategory>;
  landSize?: InputMaybe<Scalars['String']['input']>;
  landownerName: Scalars['String']['input'];
  locality: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};

export type CreateResumeInput = {
  address: Scalars['String']['input'];
  coverLetter?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  position: Scalars['String']['input'];
  resumeFile?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTestimonialInput = {
  authorName: Scalars['String']['input'];
  authorPosition: Scalars['String']['input'];
  quote: Scalars['String']['input'];
  thumbnailUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
  videoUrl: Scalars['String']['input'];
};

export type CustomerInqueryJsonType = {
  __typename?: 'CustomerInqueryJsonType';
  heroTitle: Scalars['String']['output'];
};

export type CustomerInquiryType = {
  __typename?: 'CustomerInquiryType';
  address: Scalars['String']['output'];
  category: Category;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DepartmentInput = {
  logo: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type DepartmentType = {
  __typename?: 'DepartmentType';
  id: Scalars['Int']['output'];
  logo: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type DetailItemType = {
  __typename?: 'DetailItemType';
  iconKey: Scalars['String']['output'];
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type EssenceItemType = {
  __typename?: 'EssenceItemType';
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type EventType = {
  __typename?: 'EventType';
  category: Scalars['String']['output'];
  date: Scalars['String']['output'];
  description: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ExcellenceItemInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type ExcellenceItemType = {
  __typename?: 'ExcellenceItemType';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export enum Facing {
  East = 'EAST',
  North = 'NORTH',
  South = 'SOUTH',
  West = 'WEST'
}

export type FounderInput = {
  description: Array<Scalars['String']['input']>;
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type FounderType = {
  __typename?: 'FounderType';
  description: Array<Scalars['String']['output']>;
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type HomeExcellenceType = {
  __typename?: 'HomeExcellenceType';
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type HomeHeroType = {
  __typename?: 'HomeHeroType';
  backgroundImage: Scalars['String']['output'];
  title: Scalars['String']['output'];
  videoThumbnail: Scalars['String']['output'];
  videoUrl: Scalars['String']['output'];
};

export type HomeSliderType = {
  __typename?: 'HomeSliderType';
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type JobListingType = {
  __typename?: 'JobListingType';
  additionalRequirements: Array<Scalars['String']['output']>;
  applyBefore: Scalars['String']['output'];
  benefits: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  educationalRequirements: Array<Scalars['String']['output']>;
  experienceRequirements: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jobPreferences: Array<Scalars['String']['output']>;
  jobResponsibilities: Array<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type JointVentureType = {
  __typename?: 'JointVentureType';
  address: Scalars['String']['output'];
  benefits?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  facing?: Maybe<Facing>;
  frontRoadWidth?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  landCategory?: Maybe<LandCategory>;
  landSize?: Maybe<Scalars['String']['output']>;
  landownerName: Scalars['String']['output'];
  locality: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
};

export type KeepInTouch = {
  __typename?: 'KeepInTouch';
  address1: Scalars['String']['output'];
  address2: Scalars['String']['output'];
  email: Scalars['String']['output'];
  generalEnquiry: Scalars['String']['output'];
  heading: Scalars['String']['output'];
  internationalCaller: Scalars['String']['output'];
  jointVentureDevelopment: Scalars['String']['output'];
  mapLocation: Scalars['String']['output'];
  salesEnquiry: Scalars['String']['output'];
  whatsapp: Scalars['String']['output'];
};

export enum LandCategory {
  Freehold = 'FREEHOLD',
  Leasehold = 'LEASEHOLD'
}

export type LandownerHeaderInput = {
  backgroundImage: Scalars['String']['input'];
  subtitle: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type LandownerHeaderType = {
  __typename?: 'LandownerHeaderType';
  backgroundImage: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type LeaderHeroInput = {
  backgroundImage: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type LeaderHeroType = {
  __typename?: 'LeaderHeroType';
  backgroundImage: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type LeaderPageType = {
  __typename?: 'LeaderPageType';
  founderSection: FounderType;
  leaderHero: LeaderHeroType;
  leaderOfTeam: Array<TeamMemberType>;
  managementTeam: Array<TeamMemberType>;
  recognitions: Array<RecognitionType>;
};

export type LegacySectionInput = {
  image: Scalars['String']['input'];
  paragraphs: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type LegacySectionType = {
  __typename?: 'LegacySectionType';
  image: Scalars['String']['output'];
  paragraphs: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type LoginResponseType = {
  __typename?: 'LoginResponseType';
  token: Scalars['String']['output'];
  user: UserType;
};

export type MediaCenterDynamicType = {
  __typename?: 'MediaCenterDynamicType';
  content: Array<Scalars['String']['output']>;
  date: Scalars['String']['output'];
  imageUrls: Array<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type MediaHeaderType = {
  __typename?: 'MediaHeaderType';
  backgroundImage: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type MediaInfoType = {
  __typename?: 'MediaInfoType';
  category: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imgSrc: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type MediaUnifiedType = {
  __typename?: 'MediaUnifiedType';
  blogs: Array<BlogType>;
  events: Array<EventType>;
  news: Array<NewsType>;
};

export type MilestoneItemInput = {
  label: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type MilestoneItemType = {
  __typename?: 'MilestoneItemType';
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type MilestoneSectionInput = {
  items: Array<MilestoneItemInput>;
  title: Scalars['String']['input'];
};

export type MilestoneSectionType = {
  __typename?: 'MilestoneSectionType';
  items: Array<MilestoneItemType>;
  title: Scalars['String']['output'];
};

export type MissionSectionInput = {
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MissionSectionType = {
  __typename?: 'MissionSectionType';
  description: Scalars['String']['output'];
  image: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContact: ContactType;
  createCustomerInquiry: CustomerInquiryType;
  createDepartment: DepartmentType;
  createEssenceItem: EssenceItemType;
  createJobListing: JobListingType;
  createTestimonial: TestimonialType;
  deleteConnect: Scalars['Boolean']['output'];
  deleteCustomerInquiry: Scalars['String']['output'];
  deleteDepartment: Scalars['Boolean']['output'];
  deleteEssenceItem: Scalars['Boolean']['output'];
  deleteJobListing: Scalars['String']['output'];
  deleteJointVenture: Scalars['Boolean']['output'];
  deleteResume: Scalars['String']['output'];
  deleteTestimonial: Scalars['Boolean']['output'];
  deleteUser: UserType;
  login: LoginResponseType;
  signUp: UserType;
  submitConnect: ConnectType;
  submitJointVenture: JointVentureType;
  submitResume: ResumeType;
  updateAboutHero: AboutHeroType;
  updateAwardImages: Array<AwardImageType>;
  updateAwardInfo: AwardInfoType;
  updateCareerHeader: CareerHeaderType;
  updateCareerSecond: CareerSecondType;
  updateCompanies: Array<CompanyType>;
  updateConnect: ConnectType;
  updateCsrImages: Array<CsrImageType>;
  updateCustomerInquiry: CustomerInquiryType;
  updateDepartment: DepartmentType;
  updateEssenceItem: EssenceItemType;
  updateExcellenceItems: Array<ExcellenceItemType>;
  updateFounderSection: FounderType;
  updateHomeHero: HomeHeroType;
  updateHomeSliderById: HomeSliderType;
  updateJobListing: JobListingType;
  updateKeepInTouch: ContactJsonType;
  updateLandownerHeader: LandownerHeaderType;
  updateLeaderHero: LeaderHeroType;
  updateLeaderOfTeam: Array<TeamMemberType>;
  updateLegacySection: LegacySectionType;
  updateManagementTeam: Array<TeamMemberType>;
  updateMediaHeader: MediaHeaderType;
  updateMilestoneSection: MilestoneSectionType;
  updateMissionSection: MissionSectionType;
  updateRecognitions: Array<RecognitionType>;
  updateResume: ResumeType;
  updateTitleImage: ContactJsonType;
  updateUser: UserType;
  updateVisionSection: VisionSectionType;
};


export type MutationCreateContactArgs = {
  createContactInput: CreateContactInput;
};


export type MutationCreateCustomerInquiryArgs = {
  createCustomerInquiryDto: CreateCustomerInquiryDto;
};


export type MutationCreateDepartmentArgs = {
  input: DepartmentInput;
};


export type MutationCreateEssenceItemArgs = {
  input: CreateEssenceItemInput;
};


export type MutationCreateJobListingArgs = {
  createJobListingInput: CreateJobListingInput;
};


export type MutationCreateTestimonialArgs = {
  input: CreateTestimonialInput;
};


export type MutationDeleteConnectArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCustomerInquiryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDepartmentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEssenceItemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteJobListingArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteJointVentureArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteResumeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTestimonialArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  signUpDto: SignupDto;
};


export type MutationSubmitConnectArgs = {
  input: CreateConnectInput;
};


export type MutationSubmitJointVentureArgs = {
  input: CreateJointVentureInput;
};


export type MutationSubmitResumeArgs = {
  createResumeInput: CreateResumeInput;
};


export type MutationUpdateAboutHeroArgs = {
  input: AboutHeroInput;
};


export type MutationUpdateAwardImagesArgs = {
  input: Array<AwardImageInput>;
};


export type MutationUpdateAwardInfoArgs = {
  input: AwardInfoInput;
};


export type MutationUpdateCareerHeaderArgs = {
  input: CareerHeaderInput;
};


export type MutationUpdateCareerSecondArgs = {
  input: CareerSecondInput;
};


export type MutationUpdateCompaniesArgs = {
  input: Array<CompanyInput>;
};


export type MutationUpdateConnectArgs = {
  input: UpdateConnectInput;
};


export type MutationUpdateCsrImagesArgs = {
  input: Array<CsrImageInput>;
};


export type MutationUpdateCustomerInquiryArgs = {
  id: Scalars['String']['input'];
  updateCustomerInquiryDto: UpdateCustomerInquiryDto;
};


export type MutationUpdateDepartmentArgs = {
  input: UpdateDepartmentInput;
};


export type MutationUpdateEssenceItemArgs = {
  input: UpdateEssenceItemInput;
};


export type MutationUpdateExcellenceItemsArgs = {
  input: Array<ExcellenceItemInput>;
};


export type MutationUpdateFounderSectionArgs = {
  input: FounderInput;
};


export type MutationUpdateHomeHeroArgs = {
  input: UpdateHomeHeroInput;
};


export type MutationUpdateHomeSliderByIdArgs = {
  input: UpdateSliderInput;
};


export type MutationUpdateJobListingArgs = {
  id: Scalars['String']['input'];
  updateJobListingInput: UpdateJobListingInput;
};


export type MutationUpdateKeepInTouchArgs = {
  newKeepInTouch: UpdateKeepInTouchInput;
};


export type MutationUpdateLandownerHeaderArgs = {
  input: LandownerHeaderInput;
};


export type MutationUpdateLeaderHeroArgs = {
  input: LeaderHeroInput;
};


export type MutationUpdateLeaderOfTeamArgs = {
  input: Array<TeamMemberInput>;
};


export type MutationUpdateLegacySectionArgs = {
  input: LegacySectionInput;
};


export type MutationUpdateManagementTeamArgs = {
  input: Array<TeamMemberInput>;
};


export type MutationUpdateMediaHeaderArgs = {
  input: UpdateMediaHeaderInput;
};


export type MutationUpdateMilestoneSectionArgs = {
  input: MilestoneSectionInput;
};


export type MutationUpdateMissionSectionArgs = {
  input: MissionSectionInput;
};


export type MutationUpdateRecognitionsArgs = {
  input: Array<RecognitionInput>;
};


export type MutationUpdateResumeArgs = {
  id: Scalars['String']['input'];
  updateResumeInput: UpdateResumeInput;
};


export type MutationUpdateTitleImageArgs = {
  newTitleImage: UpdateTitleImageInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserDto: UpdateUserDto;
};


export type MutationUpdateVisionSectionArgs = {
  input: VisionSectionInput;
};

export type NewsType = {
  __typename?: 'NewsType';
  category: Scalars['String']['output'];
  date: Scalars['String']['output'];
  description: Array<Scalars['String']['output']>;
  gallery?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  thumbnail: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProjectFilterInput = {
  location?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectType = {
  __typename?: 'ProjectType';
  amenities: Array<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  detailItems: Array<DetailItemType>;
  features: Array<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  image: Scalars['String']['output'];
  images: Array<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  locationCoordinates: CoordinatesType;
  name: Scalars['String']['output'];
  relatedProjects: Array<RelatedProjectType>;
  size: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  filterProjects: Array<ProjectType>;
  findUserByEmail?: Maybe<UserType>;
  getAboutHero: AboutHeroType;
  getAboutPage: Scalars['String']['output'];
  getAllContacts: Array<ContactType>;
  getAllCustomerInquiries: Array<CustomerInquiryType>;
  getAllJobListing: Array<JobListingType>;
  getAllJointVentures: Array<JointVentureType>;
  getAllMedia: MediaUnifiedType;
  getAllMediaCenterData: Array<MediaInfoType>;
  getAllMediaCenterDynamicJson: Array<MediaCenterDynamicType>;
  getAllProjects: Array<ProjectType>;
  getAllTestimonials: Array<TestimonialType>;
  getAllUsers: Array<UserType>;
  getAwardImages: Array<AwardImageType>;
  getAwardInfo: AwardInfoType;
  getCareerHeader: CareerHeaderType;
  getCareerPage: CareerPageType;
  getCareerSecond: CareerSecondType;
  getCompanies: Array<CompanyType>;
  getConnects: Array<ConnectType>;
  getContactPageData: ContactJsonType;
  getCsrImages: Array<CsrImageType>;
  getCustomerInquiryById: CustomerInquiryType;
  getCustomerTitle: CustomerInqueryJsonType;
  getDepartments: Array<DepartmentType>;
  getEssenceItems: Array<EssenceItemType>;
  getExcellenceItems: Array<ExcellenceItemType>;
  getFounderInfo: FounderType;
  getHomeExcellence: Array<Maybe<HomeExcellenceType>>;
  getHomeHero: HomeHeroType;
  getHomeSlider: Array<HomeSliderType>;
  getLandownerHeader: LandownerHeaderType;
  getLeaderHero: LeaderHeroType;
  getLeaderPage: LeaderPageType;
  getLeaderTeam: Array<TeamMemberType>;
  getLegacySection: LegacySectionType;
  getManagementTeam: Array<TeamMemberType>;
  getMediaHeader: MediaHeaderType;
  getMilestoneSection: MilestoneSectionType;
  getMissionSection: MissionSectionType;
  getProjectById?: Maybe<ProjectType>;
  getProjectPage: ProjectType;
  getRecognitions: Array<RecognitionType>;
  getResumes: Array<ResumeType>;
  getSingleConnect: ConnectType;
  getSingleJobListing: JobListingType;
  getSingleJointVenture: JointVentureType;
  getSingleResume: ResumeType;
  getSingleUserById: UserType;
  getTestimonial: TestimonialType;
  getVisionSection: VisionSectionType;
  hello: Scalars['String']['output'];
};


export type QueryFilterProjectsArgs = {
  filter?: InputMaybe<ProjectFilterInput>;
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetCustomerInquiryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetSingleConnectArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSingleJobListingArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSingleJointVentureArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSingleResumeArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSingleUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTestimonialArgs = {
  id: Scalars['String']['input'];
};

export type RecognitionInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  src: Scalars['String']['input'];
};

export type RecognitionType = {
  __typename?: 'RecognitionType';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  src: Scalars['String']['output'];
};

export type RelatedProjectType = {
  __typename?: 'RelatedProjectType';
  description: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ResumeType = {
  __typename?: 'ResumeType';
  address: Scalars['String']['output'];
  coverLetter?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  position: Scalars['String']['output'];
  resumeFile?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignupDto = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type TeamMemberInput = {
  id: Scalars['ID']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type TeamMemberType = {
  __typename?: 'TeamMemberType';
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TestimonialType = {
  __typename?: 'TestimonialType';
  authorName: Scalars['String']['output'];
  authorPosition: Scalars['String']['output'];
  id: Scalars['String']['output'];
  quote: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  videoUrl: Scalars['String']['output'];
};

export type TitleImage = {
  __typename?: 'TitleImage';
  alt: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UpdateConnectInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInquiryDto = {
  address?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Category>;
  email?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateDepartmentInput = {
  id: Scalars['Int']['input'];
  logo: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateEssenceItemInput = {
  icon: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type UpdateHomeHeroInput = {
  backgroundImage: Scalars['String']['input'];
  title: Scalars['String']['input'];
  videoThumbnail: Scalars['String']['input'];
  videoUrl: Scalars['String']['input'];
};

export type UpdateJobListingInput = {
  additionalRequirements?: InputMaybe<Array<Scalars['String']['input']>>;
  applyBefore?: InputMaybe<Scalars['String']['input']>;
  benefits?: InputMaybe<Array<Scalars['String']['input']>>;
  educationalRequirements?: InputMaybe<Array<Scalars['String']['input']>>;
  experienceRequirements?: InputMaybe<Array<Scalars['String']['input']>>;
  jobPreferences?: InputMaybe<Array<Scalars['String']['input']>>;
  jobResponsibilities?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateKeepInTouchInput = {
  address1: Scalars['String']['input'];
  address2: Scalars['String']['input'];
  email: Scalars['String']['input'];
  generalEnquiry: Scalars['String']['input'];
  heading: Scalars['String']['input'];
  internationalCaller: Scalars['String']['input'];
  jointVentureDevelopment: Scalars['String']['input'];
  mapLocation: Scalars['String']['input'];
  salesEnquiry: Scalars['String']['input'];
  whatsapp: Scalars['String']['input'];
};

export type UpdateMediaHeaderInput = {
  backgroundImage: Scalars['String']['input'];
  subtitle: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateResumeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  coverLetter?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  resumeFile?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSliderInput = {
  id: Scalars['Float']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTitleImageInput = {
  alt: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type UpdateUserDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UserType = {
  __typename?: 'UserType';
  accountStatus: AccountStatus;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
};

export type VisionSectionInput = {
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type VisionSectionType = {
  __typename?: 'VisionSectionType';
  description: Scalars['String']['output'];
  image: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


