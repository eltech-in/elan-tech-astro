export type TestimonialSource = 'Direct client feedback' | 'LinkedIn recommendation' | 'Google review';

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
  industry: string;
  source: TestimonialSource;
  datePublished?: string;
  isFeatured: boolean;
}

/**
 * Names are intentionally abbreviated for client privacy.
 * LinkedIn wording is taken from recommendations supplied by the profile owner.
 * Google wording is taken from the public eLan Technology Business Profile.
 */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Our patient inquiry form submissions went up 200% after eLan redesigned our hospital website. The new site is clean, professional, and ranks on page one for local searches. The team was thorough, responsive, and genuinely understood what a healthcare audience needs.',
    author: 'Dr. Pawan A.',
    role: 'Managing Director',
    company: 'Aastha Hospital',
    industry: 'Healthcare',
    source: 'Direct client feedback',
    isFeatured: true,
  },
  {
    id: 2,
    quote:
      'Nishant designed our website for us. When I told him what I was looking for, he came up with our current design and it looked better than I had hoped. We still use him and I would recommend him to others.',
    author: 'Bob G.',
    role: 'CEO',
    company: 'Rib-O-Lator',
    industry: 'International Manufacturing',
    source: 'LinkedIn recommendation',
    datePublished: '2011-08-19',
    isFeatured: true,
  },
  {
    id: 3,
    quote:
      'I have worked with Nishant on several projects spanning about two years. He is quick, responsive, solution-oriented, dedicated and trustworthy, and produces great results. I will use him again and continue recommending him to colleagues.',
    author: 'Wayne D.',
    role: 'Founder & President',
    company: 'CSRI-BSB',
    industry: 'International Research',
    source: 'LinkedIn recommendation',
    datePublished: '2012-11-14',
    isFeatured: true,
  },
  {
    id: 4,
    quote:
      'Understanding the requirement is the first challenge in quality work, and Nishant does this very well. He knows his subject, delivers with care, and remains helpful across requirements both small and large. I recommend him for his expertise, timely delivery, loyalty and passion for his customers.',
    author: 'Rohit C.',
    role: 'Director',
    company: 'CIPL',
    industry: 'Industrial Manufacturing',
    source: 'LinkedIn recommendation',
    datePublished: '2011-08-19',
    isFeatured: false,
  },
  {
    id: 5,
    quote:
      'Mr. Nishant Barde is an exceptional digital marketing and web development consultant, skilled in building high-performing websites that support business growth. His strategic approach, attention to detail and commitment to client success make him a valuable asset.',
    author: 'Priti D.',
    role: 'Corporate English Trainer',
    company: 'Business Communication',
    industry: 'Professional Services',
    source: 'LinkedIn recommendation',
    datePublished: '2025-02-14',
    isFeatured: false,
  },
  {
    id: 6,
    quote:
      'Nishant brought my photography website to life with creativity and precision. He understood my needs and turned them into a visually strong, functional website. He was responsive and collaborative throughout, and I would recommend him without hesitation.',
    author: 'Alessanddra N.',
    role: 'Expert Portrait Photographer',
    company: 'Photography & Mentoring',
    industry: 'Photography',
    source: 'LinkedIn recommendation',
    datePublished: '2024-07-24',
    isFeatured: false,
  },
  {
    id: 7,
    quote:
      'Nishant has worked on several of our projects over the past couple of years. He is extremely customer-focused, takes pride in his work and is an excellent communicator. We look forward to continuing to use his services.',
    author: 'Eva J.',
    role: 'Business Leader',
    company: 'VIP Innovations',
    industry: 'Consulting',
    source: 'LinkedIn recommendation',
    datePublished: '2011-08-19',
    isFeatured: false,
  },
  {
    id: 8,
    quote:
      'Nishant was recommended by a friend when I needed to update my website. He did a great job and went the extra mile when needed. I would not hesitate to use his services again.',
    author: 'Andrew G.',
    role: 'Family Nurse Practitioner',
    company: 'Connecticut Back Center',
    industry: 'Healthcare',
    source: 'LinkedIn recommendation',
    datePublished: '2011-08-18',
    isFeatured: false,
  },
  {
    id: 9,
    quote:
      'Nishant has been a wonderful IT service provider for our company. We completed multiple projects and it was always a pleasure working with him. He is flexible and accommodating, and discovering him and his company has been a great asset.',
    author: 'Jacob L.',
    role: 'Business Client',
    company: 'WTS',
    industry: 'Business Services',
    source: 'LinkedIn recommendation',
    datePublished: '2009-10-27',
    isFeatured: false,
  },
  {
    id: 10,
    quote:
      'eLan Technology has been handling our digital marketing, and the results speak for themselves. We have seen a significant jump in organic traffic and improved local SEO visibility in Central India. The team is data-driven and keeps us informed with transparent reports.',
    author: 'Parag D.',
    role: 'Digital Marketing Client',
    company: 'Central India',
    rating: 5,
    industry: 'Digital Marketing',
    source: 'Google review',
    isFeatured: false,
  },
  {
    id: 11,
    quote:
      'I highly recommend eLan Technology to anyone looking for complete website solutions. They understand business needs and deliver websites that are modern, user-friendly and performance-focused. Every detail was handled professionally from design to development.',
    author: 'Sunanda M.',
    role: 'Website Client',
    company: 'Nagpur',
    rating: 5,
    industry: 'Local Business',
    source: 'Google review',
    isFeatured: false,
  },
  {
    id: 12,
    quote:
      'Fast and secure ecommerce website delivered along with digital marketing solutions.',
    author: 'Vicky C.',
    role: 'eCommerce Client',
    company: 'Nagpur',
    rating: 5,
    industry: 'eCommerce',
    source: 'Google review',
    isFeatured: false,
  },
  {
    id: 13,
    quote:
      'The team is professional, responsive and knowledgeable. They provided excellent service and a smooth, hassle-free experience. Their commitment to quality and customer satisfaction is really appreciated.',
    author: 'Dr. Chaitanya B.',
    role: 'Healthcare Professional',
    company: 'Nagpur',
    rating: 5,
    industry: 'Healthcare',
    source: 'Google review',
    isFeatured: false,
  },
  {
    id: 14,
    quote:
      'We were very pleased with the concise and detailed work. We look forward to doing business with Nishant again.',
    author: 'Tobie P.',
    role: 'Marketing Coordinator',
    company: 'Inner Healing Music',
    industry: 'Music & Wellness',
    source: 'LinkedIn recommendation',
    datePublished: '2013-04-17',
    isFeatured: false,
  },
  {
    id: 15,
    quote:
      'Nishant has been my webmaster for 17 years at very competitive pricing. He has always been responsive and timely in all his work with me here in Canada. I have no hesitations at all in recommending his services.',
    author: 'Eric Hatashita',
    role: 'Medical Director',
    company: 'Regal Health Services, Toronto, Ontario, Canada',
    industry: 'Healthcare',
    source: 'Direct client feedback',
    isFeatured: false,
  },
];
