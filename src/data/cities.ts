export interface City {
  name: string;
  slug: string; // URL slug
  state: string;
  hasLandingPage: boolean; // true if /web-design-company-{slug} page exists
  isFeatured: boolean;
}

export const cities: City[] = [
  {
    name: 'Nagpur',
    slug: 'nagpur',
    state: 'Maharashtra',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'Raipur',
    slug: 'raipur',
    state: 'Chhattisgarh',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    hasLandingPage: false,
    isFeatured: true,
  },
  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    hasLandingPage: false,
    isFeatured: true,
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    state: 'Karnataka',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'Indore',
    slug: 'indore',
    state: 'Madhya Pradesh',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'Bhopal',
    slug: 'bhopal',
    state: 'Madhya Pradesh',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    hasLandingPage: false,
    isFeatured: false,
  },
];
