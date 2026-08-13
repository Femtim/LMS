export type Category =
  | "All Categories"
  | "Design"
  | "Development"
  | "Business"
  | "Marketing";
export type Level = "All" | "Beginner" | "Intermediate" | "Advanced";
export type Page = "listing" | "detail";

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  students: string;
  reviews: string;
}

export interface Lesson {
  title: string;
  duration: string;
  free?: boolean;
}

export interface Module {
  title: string;
  lessons?: Lesson[];
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Course {
  id: number;
  title: string;
  category: Exclude<Category, "All Categories">;
  level: Exclude<Level, "All">;
  rating: number;
  reviews: string;
  price: number;
  originalPrice?: number;
  badge?: "BEST SELLER" | "NEW";
  image: string;
  heroImage?: string;
  description?: string;
  students?: string;
  duration?: string;
  instructor?: Instructor;
  modules?: Module[];
  studentReviews?: Review[];
  includes?: string[];
}

export const COURSES: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2024",
    category: "Development",
    level: "Beginner",
    rating: 4.9,
    reviews: "12.4k",
    price: 89.99,
    originalPrice: 199.99,
    badge: "BEST SELLER",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    description:
      "A comprehensive bootcamp covering everything from HTML/CSS basics to full-stack JavaScript. Build real projects and launch your dev career.",
    students: "21,340",
    duration: "24 Weeks",
    includes: [
      "60 hours of HD video content",
      "30+ real-world projects",
      "Access to private Discord community",
      "Certificate of Completion",
      "Weekly live Q&A sessions",
    ],
    instructor: {
      name: "James Carter",
      title: "Senior Full-Stack Engineer & Educator",
      avatar: "https://i.pravatar.cc/120?img=11",
      students: "21k+ Students",
      reviews: "9,200 Reviews",
      bio: "With 12 years of industry experience at companies like Shopify and Vercel, James has helped over 20,000 students launch careers in web development.",
    },
    modules: [
      {
        title: "Module 1: HTML & CSS Fundamentals",
        lessons: [
          { title: "Box Model & Layout", duration: "18:00", free: true },
          { title: "Flexbox Deep Dive", duration: "24:00" },
        ],
      },
      { title: "Module 2: JavaScript Essentials" },
      { title: "Module 3: React & Node.js" },
    ],
    studentReviews: [
      {
        name: "Priya Mehta",
        rating: 5,
        text: '"This bootcamp landed me my first dev job in 6 months. The project-based approach makes everything click."',
        avatar: "https://i.pravatar.cc/48?img=5",
      },
      {
        name: "Luca Rossi",
        rating: 5,
        text: '"Best investment I\'ve made. The curriculum is dense but James explains everything with clarity."',
        avatar: "https://i.pravatar.cc/48?img=33",
      },
    ],
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass with Figma",
    category: "Design",
    level: "Intermediate",
    rating: 4.8,
    reviews: "8.2k",
    price: 499,
    originalPrice: 899,
    image:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&q=80",
    description:
      "A comprehensive 12-week program to transform your design skills. Learn visual hierarchy, typography, color theory, and modern prototyping.",
    students: "15,420",
    duration: "12 Weeks",
    includes: [
      "48 hours of HD video content",
      "24+ design projects & exercises",
      "Access to private Discord community",
      "Certificate of Completion",
      "Weekly live Q&A sessions",
    ],
    instructor: {
      name: "Alex Rivers",
      title: "Senior Product Designer & Art Director",
      avatar: "https://i.pravatar.cc/120?img=12",
      students: "100k+ Students",
      reviews: "4,800 Reviews",
      bio: "With over 15 years in the design industry, Alex has worked with Airbnb, Stripe, and Google. He specializes in scalable design systems and intuitive user interfaces.",
    },
    modules: [
      {
        title: "Module 1: Introduction to Visual Language",
        lessons: [
          {
            title: "Understanding Visual Perception",
            duration: "15:00",
            free: true,
          },
          { title: "Grids, Columns and Layouts", duration: "22:00" },
        ],
      },
      { title: "Module 2: Typography & Color Science" },
      { title: "Module 3: Components & Design Systems" },
    ],
    studentReviews: [
      {
        name: "Sarah Jenkins",
        rating: 5,
        text: '"This course completely changed my approach to UI design. The modules on layout and hierarchy were eye-opening."',
        avatar: "https://i.pravatar.cc/48?img=9",
      },
      {
        name: "David Chen",
        rating: 4,
        text: '"The project-based learning is the best part. I finally have a portfolio I\'m proud of."',
        avatar: "https://i.pravatar.cc/48?img=15",
      },
    ],
  },
  {
    id: 3,
    title: "Financial Analysis for Business Growth",
    category: "Business",
    level: "Advanced",
    rating: 4.7,
    reviews: "3.5k",
    price: 99.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    description:
      "Master financial modeling, valuation techniques, and data-driven decision making used by finance professionals at top-tier firms.",
    students: "8,910",
    duration: "10 Weeks",
    includes: [
      "35 hours of HD video content",
      "Excel & Python templates",
      "Real case studies",
      "Certificate of Completion",
      "Live office hours",
    ],
    instructor: {
      name: "Diana Park",
      title: "CFA & Former Goldman Sachs Analyst",
      avatar: "https://i.pravatar.cc/120?img=47",
      students: "8k+ Students",
      reviews: "2,100 Reviews",
      bio: "Diana spent 10 years on Wall Street before transitioning to education. She makes complex financial concepts approachable for everyone.",
    },
    modules: [
      {
        title: "Module 1: Financial Statement Analysis",
        lessons: [
          { title: "Reading Balance Sheets", duration: "20:00", free: true },
          { title: "Cash Flow Deep Dive", duration: "28:00" },
        ],
      },
      { title: "Module 2: Valuation Models" },
      { title: "Module 3: Risk & Portfolio Theory" },
    ],
    studentReviews: [
      {
        name: "Marcus Wu",
        rating: 5,
        text: '"Diana breaks down complex topics better than my MBA professors. Highly recommend."',
        avatar: "https://i.pravatar.cc/48?img=20",
      },
      {
        name: "Fatima Al-Rashid",
        rating: 4,
        text: '"The Excel templates alone are worth the price. Immediately applicable at work."',
        avatar: "https://i.pravatar.cc/48?img=21",
      },
    ],
  },
  {
    id: 4,
    title: "Digital Marketing Strategy 2024",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.6,
    reviews: "5.1k",
    price: 59.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    description:
      "Learn to build and execute full-funnel marketing campaigns using SEO, paid ads, social media, and email automation.",
    students: "12,880",
    duration: "8 Weeks",
    includes: [
      "28 hours of content",
      "Campaign templates",
      "Ad copy frameworks",
      "Certificate of Completion",
      "Weekly strategy calls",
    ],
    instructor: {
      name: "Sofia Morales",
      title: "Growth Marketing Lead @ Scale",
      avatar: "https://i.pravatar.cc/120?img=44",
      students: "12k+ Students",
      reviews: "3,500 Reviews",
      bio: "Sofia has managed $10M+ in ad spend across DTC brands and SaaS companies. She teaches the exact playbooks that drove 10x growth.",
    },
    modules: [
      {
        title: "Module 1: SEO & Content Strategy",
        lessons: [
          { title: "Keyword Research Mastery", duration: "17:00", free: true },
          { title: "On-Page Optimization", duration: "21:00" },
        ],
      },
      { title: "Module 2: Paid Ads (Meta & Google)" },
      { title: "Module 3: Email & Retention" },
    ],
    studentReviews: [
      {
        name: "Oliver Brown",
        rating: 5,
        text: "\"Sofia's paid ads module alone 3x'd my ROAS. Incredibly practical.\"",
        avatar: "https://i.pravatar.cc/48?img=60",
      },
      {
        name: "Nina Kowalski",
        rating: 4,
        text: '"Clear, no-fluff content. The templates save hours every week."',
        avatar: "https://i.pravatar.cc/48?img=61",
      },
    ],
  },
  {
    id: 5,
    title: "Advanced Python for Data Science",
    category: "Development",
    level: "Advanced",
    rating: 4.9,
    reviews: "2.9k",
    price: 129.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    description:
      "Go deep into NumPy, Pandas, Scikit-learn, and neural networks. Build production-ready data pipelines and ML models from scratch.",
    students: "7,640",
    duration: "16 Weeks",
    includes: [
      "55 hours of content",
      "Jupyter notebook templates",
      "Kaggle competition walkthroughs",
      "Certificate of Completion",
      "Mentorship sessions",
    ],
    instructor: {
      name: "Dr. Yuki Tanaka",
      title: "ML Engineer & PhD in Computer Science",
      avatar: "https://i.pravatar.cc/120?img=48",
      students: "7k+ Students",
      reviews: "1,800 Reviews",
      bio: "Yuki has published research in top AI conferences and built ML systems used by millions. She makes advanced concepts accessible without dumbing them down.",
    },
    modules: [
      {
        title: "Module 1: NumPy & Pandas Mastery",
        lessons: [
          { title: "Vectorized Operations", duration: "23:00", free: true },
          { title: "Data Wrangling Pipelines", duration: "31:00" },
        ],
      },
      { title: "Module 2: Machine Learning with Scikit-learn" },
      { title: "Module 3: Deep Learning & Neural Networks" },
    ],
    studentReviews: [
      {
        name: "Arjun Sharma",
        rating: 5,
        text: '"The deep learning module is world-class. Yuki\'s explanations finally made it click."',
        avatar: "https://i.pravatar.cc/48?img=67",
      },
      {
        name: "Emma Johansson",
        rating: 5,
        text: '"Dense, rigorous, and worth every penny. This is the real deal."',
        avatar: "https://i.pravatar.cc/48?img=25",
      },
    ],
  },
  {
    id: 6,
    title: "Agile Project Management Certification",
    category: "Business",
    level: "Intermediate",
    rating: 4.5,
    reviews: "1.8k",
    price: 84.99,
    originalPrice: 169.99,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    description:
      "Get certified in Agile, Scrum, and Kanban. Manage teams and deliver projects on time with frameworks used by top engineering orgs.",
    students: "5,230",
    duration: "6 Weeks",
    includes: [
      "20 hours of content",
      "Agile templates & sprint tools",
      "Certification exam prep",
      "Certificate of Completion",
      "Peer project reviews",
    ],
    instructor: {
      name: "Tom Bradley",
      title: "Certified Scrum Master & PMP",
      avatar: "https://i.pravatar.cc/120?img=13",
      students: "5k+ Students",
      reviews: "1,200 Reviews",
      bio: "Tom has led Agile transformations at Fortune 500 companies including Microsoft and Salesforce.",
    },
    modules: [
      {
        title: "Module 1: Agile Foundations",
        lessons: [
          {
            title: "The Agile Manifesto Explained",
            duration: "14:00",
            free: true,
          },
          { title: "Scrum Roles & Ceremonies", duration: "19:00" },
        ],
      },
      { title: "Module 2: Sprint Planning & Execution" },
      { title: "Module 3: Kanban & Scaled Agile" },
    ],
    studentReviews: [
      {
        name: "Hannah Lee",
        rating: 5,
        text: '"Passed my PSM I on the first try after this course. Incredibly well-structured."',
        avatar: "https://i.pravatar.cc/48?img=23",
      },
      {
        name: "Carlos Vega",
        rating: 4,
        text: '"Tom\'s real-world stories make the theory come alive."',
        avatar: "https://i.pravatar.cc/48?img=70",
      },
    ],
  },
  {
    id: 7,
    title: "Graphic Design Principles & Practice",
    category: "Design",
    level: "Beginner",
    rating: 4.8,
    reviews: "4.4k",
    price: 64.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    description:
      "Learn the timeless fundamentals of graphic design — composition, typography, branding and print — using Adobe Illustrator and Photoshop.",
    students: "11,750",
    duration: "10 Weeks",
    includes: [
      "38 hours of content",
      "Adobe CC project files",
      "Brand identity templates",
      "Certificate of Completion",
      "Design critique sessions",
    ],
    instructor: {
      name: "Mia Fontaine",
      title: "Creative Director & Brand Consultant",
      avatar: "https://i.pravatar.cc/120?img=49",
      students: "11k+ Students",
      reviews: "3,100 Reviews",
      bio: "Mia has designed brand identities for Nike, Spotify, and dozens of startups. She teaches design as both craft and strategy.",
    },
    modules: [
      {
        title: "Module 1: Composition & Visual Balance",
        lessons: [
          { title: "Rule of Thirds & the Grid", duration: "16:00", free: true },
          { title: "Negative Space Mastery", duration: "20:00" },
        ],
      },
      { title: "Module 2: Typography as Design" },
      { title: "Module 3: Brand Identity Systems" },
    ],
    studentReviews: [
      {
        name: "Zoe Williams",
        rating: 5,
        text: "\"Mia's eye for composition is unmatched. This course gave me a design vocabulary I didn't have before.\"",
        avatar: "https://i.pravatar.cc/48?img=32",
      },
      {
        name: "Ben Okafor",
        rating: 5,
        text: '"I redesigned our entire company brand after completing this. Worth every cent."',
        avatar: "https://i.pravatar.cc/48?img=59",
      },
    ],
  },
  {
    id: 8,
    title: "Modern React & Next.js Professional",
    category: "Development",
    level: "Advanced",
    rating: 5.0,
    reviews: "520",
    price: 109.99,
    originalPrice: 219.99,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    description:
      "Master React 18, Next.js 14, Server Components, and modern state management. Build production apps with the stack used by top startups.",
    students: "3,100",
    duration: "14 Weeks",
    includes: [
      "45 hours of content",
      "Starter project repos",
      "App Router deep dives",
      "Certificate of Completion",
      "Code review sessions",
    ],
    instructor: {
      name: "Ryan Kim",
      title: "Staff Engineer & React Core Contributor",
      avatar: "https://i.pravatar.cc/120?img=14",
      students: "3k+ Students",
      reviews: "520 Reviews",
      bio: "Ryan has contributed to the React ecosystem and built apps at scale for companies like Linear and Vercel. He teaches the patterns that actually matter in production.",
    },
    modules: [
      {
        title: "Module 1: React 18 & Concurrent Features",
        lessons: [
          { title: "useTransition & Suspense", duration: "26:00", free: true },
          { title: "Server vs. Client Components", duration: "33:00" },
        ],
      },
      { title: "Module 2: Next.js App Router" },
      { title: "Module 3: State, Auth & Deployment" },
    ],
    studentReviews: [
      {
        name: "Kai Nakamura",
        rating: 5,
        text: '"Ryan explains Server Components better than any resource I\'ve found online."',
        avatar: "https://i.pravatar.cc/48?img=68",
      },
      {
        name: "Isabel Cruz",
        rating: 5,
        text: '"The production patterns in Module 3 are worth the price alone."',
        avatar: "https://i.pravatar.cc/48?img=29",
      },
    ],
  },
  {
    id: 9,
    title: "Graphic Design Principles & Practice",
    category: "Design",
    level: "Beginner",
    rating: 4.8,
    reviews: "4.4k",
    price: 64.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    description:
      "Learn the timeless fundamentals of graphic design using Adobe Illustrator and Photoshop.",
    students: "11,750",
    duration: "10 Weeks",
    includes: [
      "38 hours of content",
      "Adobe CC project files",
      "Brand identity templates",
      "Certificate of Completion",
      "Design critique sessions",
    ],
    instructor: {
      name: "Mia Fontaine",
      title: "Creative Director & Brand Consultant",
      avatar: "https://i.pravatar.cc/120?img=49",
      students: "11k+ Students",
      reviews: "3,100 Reviews",
      bio: "Mia has designed brand identities for Nike, Spotify, and dozens of startups.",
    },
    modules: [
      {
        title: "Module 1: Composition & Visual Balance",
        lessons: [
          { title: "Rule of Thirds & the Grid", duration: "16:00", free: true },
          { title: "Negative Space Mastery", duration: "20:00" },
        ],
      },
      { title: "Module 2: Typography as Design" },
      { title: "Module 3: Brand Identity Systems" },
    ],
    studentReviews: [
      {
        name: "Zoe Williams",
        rating: 5,
        text: '"Mia\'s eye for composition is unmatched."',
        avatar: "https://i.pravatar.cc/48?img=32",
      },
      {
        name: "Ben Okafor",
        rating: 5,
        text: '"I redesigned our entire company brand after completing this."',
        avatar: "https://i.pravatar.cc/48?img=59",
      },
    ],
  },
];

export const CATEGORIES: Category[] = [
  "All Categories",
  "Design",
  "Development",
  "Business",
];
export const LEVELS: Level[] = ["All", "Beginner", "Intermediate", "Advanced"];
