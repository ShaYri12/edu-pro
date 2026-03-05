// Centralized course data for reuse across the app
// Update this file to add/modify courses in one place.

export interface Review {
  id: string;
  user: string;
  avatar?: string; // remote URL or local require path
  rating: number;
  text: string;
  likes: number;
  timeAgo: string; // e.g. '2 Weeks Ago'
}

export interface Instructor {
  name: string;
  title: string; // e.g. 'Graphic Design'
  avatar?: string;
  verified?: boolean;
}

export interface CourseFeature {
  label: string; // e.g. '25 Lessons'
}

export interface Course {
  id: number;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  price: number; // numeric base price, UI can format with '/-'
  students: number;
  image?: string; // thumbnail/cover image
  description: string; // about description
  curriculum?: string[]; // optional list of curriculum points
  instructor: Instructor;
  features: CourseFeature[]; // what's included
  reviewsList: Review[]; // user reviews
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'Graphic Design Advanced',
    category: 'Graphic Design',
    rating: 4.2,
    reviews: 499,
    price: 499,
    students: 7830,
    image: undefined,
    description:
      'Graphic Design is now a popular profession. Learn core design principles, typography, color theory, and composition with hands-on projects designed to build a strong portfolio.',
    curriculum: [
      'Intro to Design Principles',
      'Typography Basics',
      'Color Theory & Palettes',
      'Layout & Composition',
      'Branding Fundamentals',
      'Practical Projects & Portfolio',
    ],
    instructor: {
      name: 'Robert jr',
      title: 'Graphic Design',
      avatar: undefined,
      verified: true,
    },
    features: [
      { label: '25 Lessons' },
      { label: 'Access Mobile, Desktop & TV' },
      { label: 'Beginner Level' },
      { label: 'Audio Book' },
      { label: 'Lifetime Access' },
      { label: '100 Quizzes' },
      { label: 'Certificate of Completion' },
    ],
    reviewsList: [
      {
        id: 'r-1-1',
        user: 'Will',
        rating: 4.5,
        text:
          'This course has been very useful. Mentor was well spoken and the sessions were engaging.',
        likes: 578,
        timeAgo: '2 Weeks Ago',
      },
      {
        id: 'r-1-2',
        user: 'Martha E. Thompson',
        rating: 4.5,
        text:
          'Great structure and practical assignments. It had fun sessions as well.',
        likes: 578,
        timeAgo: '2 Weeks Ago',
      },
    ],
  },
  {
    id: 2,
    title: 'Advertisement Design',
    category: 'Graphic Design',
    rating: 3.9,
    reviews: 230,
    price: 800,
    students: 12680,
    image: undefined,
    description:
      'Master ad creatives for digital and print. Learn messaging, visual hierarchy, and conversion-focused layouts to build compelling advertisements.',
    curriculum: [
      'Ad Fundamentals',
      'Visual Hierarchy',
      'Copywriting Essentials',
      'Multi-Platform Ad Design',
      'Analytics & Iteration',
    ],
    instructor: {
      name: 'Elena Brooks',
      title: 'Art Director',
      avatar: undefined,
      verified: true,
    },
    features: [
      { label: '18 Lessons' },
      { label: 'Access Mobile, Desktop & TV' },
      { label: 'All Levels' },
      { label: 'Practice Projects' },
      { label: 'Lifetime Access' },
      { label: '30 Quizzes' },
      { label: 'Certificate of Completion' },
    ],
    reviewsList: [
      {
        id: 'r-2-1',
        user: 'Ava',
        rating: 4.0,
        text: 'Very informative and practical design insights for performance ads.',
        likes: 301,
        timeAgo: '1 Month Ago',
      },
    ],
  },
  {
    id: 3,
    title: '3D Modeling Basics',
    category: '3D Design',
    rating: 4.5,
    reviews: 145,
    price: 350,
    students: 2005,
    image: undefined,
    description:
      'Start your 3D design journey. Learn modeling tools, topology basics, and rendering workflows to create stunning 3D assets.',
    curriculum: [
      '3D Workspace Overview',
      'Primitive Modeling',
      'Topology & UV Basics',
      'Texturing & Materials',
      'Lighting & Rendering',
    ],
    instructor: {
      name: 'Chris Nolan',
      title: '3D Generalist',
      avatar: undefined,
      verified: true,
    },
    features: [
      { label: '22 Lessons' },
      { label: 'Project Files' },
      { label: 'Beginner Friendly' },
      { label: 'Lifetime Access' },
    ],
    reviewsList: [
      {
        id: 'r-3-1',
        user: 'Noah',
        rating: 4.5,
        text: 'Clear fundamentals and practical demos. Highly recommended for beginners.',
        likes: 98,
        timeAgo: '5 Days Ago',
      },
    ],
  },
  {
    id: 4,
    title: 'Web Developer',
    category: 'Web Development',
    rating: 4.6,
    reviews: 122,
    price: 200,
    students: 7830,
    image: undefined,
    description:
      'Become a modern web developer. Learn HTML, CSS, JavaScript, and frameworks to build responsive web apps and sites.',
    curriculum: [
      'Web Basics (HTML/CSS)',
      'JavaScript Essentials',
      'Responsive Design',
      'Intro to Frameworks',
      'Deployments',
    ],
    instructor: {
      name: 'Alex Kim',
      title: 'Frontend Engineer',
      avatar: undefined,
      verified: true,
    },
    features: [
      { label: '40 Lessons' },
      { label: 'Beginner to Intermediate' },
      { label: 'Lifetime Access' },
      { label: 'Code Exercises' },
      { label: 'Certificate of Completion' },
    ],
    reviewsList: [
      {
        id: 'r-4-1',
        user: 'Sophia',
        rating: 4.6,
        text: 'Solid primer with hands-on tasks. Great pacing and explanations.',
        likes: 412,
        timeAgo: '3 Weeks Ago',
      },
    ],
  },
  {
    id: 5,
    title: 'Digital Marketing Caree..',
    category: 'Graphic Design',
    rating: 4.1,
    reviews: 230,
    price: 400,
    students: 4020,
    image: undefined,
    description:
      'Grow your marketing skills. Understand audiences, messaging, targeting, and analytics for multi-channel campaigns.',
    curriculum: [
      'Market Research',
      'Campaign Strategy',
      'Creative Briefs',
      'Analytics 101',
    ],
    instructor: {
      name: 'Dana Scott',
      title: 'Marketing Strategist',
      avatar: undefined,
      verified: false,
    },
    features: [
      { label: '16 Lessons' },
      { label: 'All Devices' },
      { label: 'Lifetime Access' },
    ],
    reviewsList: [
      {
        id: 'r-5-1',
        user: 'Liam',
        rating: 4.1,
        text: 'Strong overview of campaign essentials. Useful templates included.',
        likes: 150,
        timeAgo: '1 Week Ago',
      },
    ],
  },
  {
    id: 6,
    title: '3D Modeling Basics',
    category: '3D Design',
    rating: 4.0,
    reviews: 145,
    price: 350,
    students: 2005,
    image: undefined,
    description:
      'Hands-on introduction to 3D. Build and render your first 3D scenes with guided lessons and exercises.',
    instructor: {
      name: 'Chris Nolan',
      title: '3D Generalist',
      avatar: undefined,
      verified: true,
    },
    features: [
      { label: '20 Lessons' },
      { label: 'Project Files' },
      { label: 'Beginner Friendly' },
    ],
    reviewsList: [],
  },
];

export function getCourseById(id: number | string): Course | undefined {
  const num = typeof id === 'string' ? parseInt(id, 10) : id;
  return courses.find((c) => c.id === num);
}

export function listCoursesByCategory(category?: string): Course[] {
  if (!category || category === 'All') return courses;
  return courses.filter((c) => c.category === category);
}
