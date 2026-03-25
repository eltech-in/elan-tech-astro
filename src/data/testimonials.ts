export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  industry: string;
  isFeatured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Our patient inquiry form submissions went up 200% after eLan redesigned our hospital website. The new site is clean, professional, and ranks on page one for local searches. Patients frequently tell us they found us on Google — something that never happened before. The team was thorough, responsive, and genuinely understood what a healthcare audience needs.",
    author: 'Dr. Priya Nair',
    role: 'Managing Director',
    company: 'Aasthaa Hospital',
    rating: 5,
    industry: 'Healthcare',
    isFeatured: true,
  },
  {
    id: 2,
    quote:
      "eLan Technology built our B2B portal from scratch and delivered it ahead of schedule. The custom MERN stack solution they developed handles our international dealer network with ease — multi-currency, real-time quotes, and a beautiful front-end. We've been generating qualified leads from the US, Canada, and Australia consistently since launch.",
    author: 'Bob Henderson',
    role: 'President',
    company: 'Ribolator USA',
    rating: 5,
    industry: 'International Manufacturing',
    isFeatured: true,
  },
  {
    id: 3,
    quote:
      "We've been working with eLan for over five years now, and they've become an integral part of our technology strategy. Every platform they've built for CSRI-BSB has been delivered on time, on budget, and has exceeded expectations. Their team proactively suggests improvements and genuinely cares about the long-term success of our organization.",
    author: 'Wayne Thiessen',
    role: 'Executive Director',
    company: 'CSRI-BSB',
    rating: 5,
    industry: 'International Research',
    isFeatured: true,
  },
  {
    id: 4,
    quote:
      "The corporate portal eLan built for us has transformed how our 500+ employees access HR information and company announcements. What used to take our HR team hours of manual work is now fully automated. The user interface is intuitive, the system is rock-solid, and the training was excellent. I would strongly recommend eLan for enterprise projects.",
    author: 'Rohit Sharma',
    role: 'Director of Operations',
    company: 'CIPL India',
    rating: 5,
    industry: 'Corporate',
    isFeatured: false,
  },
  {
    id: 5,
    quote:
      "Our architecture studio website needed to be as impressive as our projects. eLan delivered exactly that — a full-screen, immersive portfolio site that has genuinely impressed our clients and helped us win new commissions. Inquiries through the website have tripled since the redesign, and several clients mentioned the website specifically when hiring us.",
    author: 'Siddharth Trivedi',
    role: 'Principal Architect',
    company: 'Trimit Architects',
    rating: 5,
    industry: 'Architecture',
    isFeatured: false,
  },
  {
    id: 6,
    quote:
      "Transitioning D'FYNE Magazine to a digital subscription model was a significant undertaking, and eLan made it seamless. The WordPress and WooCommerce platform they built handles subscriptions, single-issue purchases, and editorial content publishing beautifully. We crossed 1,200 digital subscribers within 6 months — far ahead of our targets.",
    author: 'Natasha Johal',
    role: 'Publisher & Editor-in-Chief',
    company: "D'FYNE Magazine",
    rating: 5,
    industry: 'Media & Publishing',
    isFeatured: false,
  },
  {
    id: 7,
    quote:
      "eLan built our school ERP system and it has genuinely changed how we operate. Attendance tracking, fee management, timetables, and parent communication — everything is now digital and automated. Our fee collection default rate dropped dramatically, and parents appreciate the real-time updates about their children. The team was patient, thorough, and professional throughout.",
    author: 'Sunita Mehrotra',
    role: 'Principal',
    company: 'BrightMinds International School',
    rating: 5,
    industry: 'Education',
    isFeatured: false,
  },
  {
    id: 8,
    quote:
      "As a small NGO, we were skeptical about affording a quality website. eLan worked within our budget and delivered something that genuinely represents our mission. The integrated donation system using Razorpay has been life-changing for our fundraising. In our first year, we raised over ₹8.5 lakh through the website alone. Three corporate CSR partners also reached out after finding us online.",
    author: 'Kavita Deshmukh',
    role: 'Founder',
    company: 'Pragati Foundation',
    rating: 5,
    industry: 'NGO / Non-Profit',
    isFeatured: false,
  },
];
