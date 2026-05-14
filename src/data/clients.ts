export interface Client {
  name: string;
  industry: string;
  logo?: string; // optional path
  featured: boolean;
}

export const clients: Client[] = [
  // Portfolio clients
  {
    name: 'Ribolator USA',
    industry: 'International Manufacturing',
    logo: '/clients/ribolator.svg',
    featured: true,
  },
  {
    name: 'CIPL India',
    industry: 'Corporate',
    logo: '/clients/cipl.svg',
    featured: true,
  },
  {
    name: 'CSRI-BSB',
    industry: 'International Research',
    logo: '/clients/csri.svg',
    featured: true,
  },
  {
    name: 'Trimit Architects',
    industry: 'Architecture',
    logo: '/clients/trimit.svg',
    featured: true,
  },
  {
    name: 'Aasthaa Hospital',
    industry: 'Healthcare',
    logo: '/clients/aasthaa.svg',
    featured: true,
  },
  {
    name: "D'FYNE Magazine",
    industry: 'Media & Publishing',
    logo: '/clients/dfyne.svg',
    featured: true,
  },
  {
    name: 'Guru Nanak College',
    industry: 'Education',
    logo: '/clients/gnc.svg',
    featured: false,
  },
  {
    name: 'GeoStudio',
    industry: 'Technology',
    logo: '/clients/geostudio.svg',
    featured: true,
  },
  // Additional clients
  {
    name: 'Pragati Foundation',
    industry: 'NGO / Non-Profit',
    logo: '/clients/pragati.svg',
    featured: true,
  },
  {
    name: 'BrightMinds International School',
    industry: 'Education',
    featured: false,
  },
  {
    name: 'Serenity Resort & Spa',
    industry: 'Hospitality',
    featured: false,
  },
  {
    name: 'StayEasy Hotels',
    industry: 'Hospitality',
    featured: false,
  },
  {
    name: 'Aarna Wedding Studio',
    industry: 'Events & Photography',
    featured: false,
  },
  {
    name: 'Vidarbha Steel Industries',
    industry: 'Manufacturing',
    featured: false,
  },
  {
    name: 'Omkar Constructions',
    industry: 'Real Estate',
    featured: false,
  },
  {
    name: 'Central India Diagnostics',
    industry: 'Healthcare',
    featured: false,
  },
  {
    name: 'Raipur Agro Exports',
    industry: 'Agriculture / Export',
    featured: false,
  },
  {
    name: 'Nagpur Smart City Initiative',
    industry: 'Government / Public Sector',
    featured: false,
  },
  {
    name: 'Apex Pharma Distributors',
    industry: 'Pharmaceuticals',
    featured: false,
  },
  {
    name: 'GreenLeaf Organic Foods',
    industry: 'Food & Beverage',
    featured: false,
  },
];
