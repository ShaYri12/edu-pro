// Centralized course data for reuse across the app
// Update this file to add/modify courses in one place.

import { ImageSourcePropType } from 'react-native';

export interface Review {
  id: string;
  user: string;
  avatar?: ImageSourcePropType; // local require or remote
  rating: number;
  text: string;
  likes: number;
  timeAgo: string; // e.g. '2 Weeks Ago'
}

export interface Instructor {
  name: string;
  title: string; // e.g. 'Graphic Design'
  avatar?: ImageSourcePropType;
  verified?: boolean;
}

export interface Mentor {
  id: number;
  name: string;
  category: string;
  avatar?: ImageSourcePropType;
  verified?: boolean;
  bio?: string;
  totalCourses: number;
  totalStudents: number;
  totalRatings: number;
  averageRating: number;
  company?: string;
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
  image?: ImageSourcePropType; // thumbnail/cover image
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
    image: require('../assets/images/graphic-design.jpg'),
    description:
      'Graphic Design is now a popular profession that combines creativity with technical skills to communicate ideas visually. This field has evolved significantly with digital transformation and offers numerous career opportunities.\n\nIn this comprehensive course, you will learn core design principles, typography, color theory, and composition through hands-on projects designed to build a strong portfolio. We cover everything from basic design fundamentals to advanced techniques used by industry professionals. You will explore various design software including Adobe Creative Suite, Figma, and other industry-standard tools.\n\nYou will master industry-standard software tools, understand client requirements, and develop your unique design style. The course includes practical exercises in logo design, branding, web design, print media, and digital marketing materials. By the end of this course, you will have created multiple portfolio pieces and gained the confidence to work as a professional graphic designer.\n\nWhether you are a complete beginner or looking to enhance your existing skills, this course provides structured learning with practical assignments and real-world projects. We also cover freelancing tips, client communication, pricing strategies, and building a successful design business.\n\nThe course is designed with flexibility in mind, allowing you to learn at your own pace while providing comprehensive support through our community forums and direct instructor feedback. You will also receive lifetime access to course updates and new content as the design industry evolves.\n\nUpon completion, you will receive a certificate of completion and have access to our job placement assistance program, connecting you with potential employers and freelance opportunities in the graphic design industry.',
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
      avatar: require('../assets/images/avatar-1.jpg'),
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
      {
        id: 'r-1-3',
        user: 'James Rodriguez',
        rating: 4.8,
        text:
          'Outstanding course! The instructor explains complex concepts in a very understandable way. The projects helped me build a solid portfolio.',
        likes: 892,
        timeAgo: '1 Week Ago',
      },
      {
        id: 'r-1-4',
        user: 'Sarah Chen',
        rating: 4.3,
        text:
          'Really enjoyed the hands-on approach. The feedback on assignments was detailed and helpful for improvement.',
        likes: 445,
        timeAgo: '3 Days Ago',
      },
      {
        id: 'r-1-5',
        user: 'Michael Johnson',
        rating: 4.7,
        text:
          'Perfect for beginners! Started with zero knowledge and now I feel confident creating professional designs. Highly recommend!',
        likes: 623,
        timeAgo: '5 Days Ago',
      },
      {
        id: 'r-1-6',
        user: 'Emily Davis',
        rating: 4.2,
        text:
          'Good course overall. The typography section was particularly well done. Would love to see more advanced color theory content.',
        likes: 234,
        timeAgo: '1 Month Ago',
      },
      {
        id: 'r-1-7',
        user: 'David Wilson',
        rating: 4.6,
        text:
          'Excellent value for money. The course covers everything you need to get started in graphic design. The community support is also great.',
        likes: 567,
        timeAgo: '2 Months Ago',
      },
      {
        id: 'r-1-8',
        user: 'Lisa Anderson',
        rating: 4.4,
        text:
          'Very comprehensive course. I appreciate the real-world examples and case studies. The instructor is knowledgeable and engaging.',
        likes: 389,
        timeAgo: '3 Weeks Ago',
      },
      {
        id: 'r-1-9',
        user: 'Robert Taylor',
        rating: 4.9,
        text:
          'This course exceeded my expectations! The step-by-step approach made learning enjoyable. Already landed my first freelance project!',
        likes: 756,
        timeAgo: '4 Days Ago',
      },
      {
        id: 'r-1-10',
        user: 'Jennifer Brown',
        rating: 4.1,
        text:
          'Solid foundation course. The assignments are challenging but doable. Great for building confidence in design skills.',
        likes: 298,
        timeAgo: '6 Days Ago',
      },
      {
        id: 'r-1-11',
        user: 'Alex Thompson',
        rating: 4.8,
        text:
          'Amazing course! The instructor breaks down complex design concepts into easy-to-understand lessons. The portfolio projects were incredibly valuable.',
        likes: 672,
        timeAgo: '1 Day Ago',
      },
      {
        id: 'r-1-12',
        user: 'Maria Garcia',
        rating: 4.4,
        text:
          'Great learning experience. The course structure is well organized and the feedback system is excellent. Learned so much about color theory and typography.',
        likes: 423,
        timeAgo: '2 Days Ago',
      },
      {
        id: 'r-1-13',
        user: 'Kevin Lee',
        rating: 4.6,
        text:
          'Highly recommend this course! The practical exercises really helped me understand design principles. Already using these skills in my current job.',
        likes: 534,
        timeAgo: '1 Week Ago',
      },
      {
        id: 'r-1-14',
        user: 'Rachel Martinez',
        rating: 4.3,
        text:
          'Excellent course content and presentation. The instructor is very knowledgeable and provides clear explanations. The community support is also fantastic.',
        likes: 367,
        timeAgo: '4 Days Ago',
      },
      {
        id: 'r-1-15',
        user: 'Daniel Kim',
        rating: 4.7,
        text:
          'This course transformed my design skills completely. From a complete beginner to creating professional-level designs. The step-by-step approach is perfect.',
        likes: 689,
        timeAgo: '3 Days Ago',
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
    image: require('../assets/images/graphic-design.jpg'),
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
      avatar: require('../assets/images/avatar-2.jpg'),
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
    image: require('../assets/images/3d-design.jpg'),
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
      avatar: require('../assets/images/avatar-3.jpeg'),
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
    image: require('../assets/images/web-development.jpg'),
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
      avatar: require('../assets/images/avatar-2.jpg'),
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
    image: require('../assets/images/graphic-design.jpg'),
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
      avatar: require('../assets/images/avatar-5.jpg'),
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
    image: require('../assets/images/3d-design.jpg'),
    description:
      'Hands-on introduction to 3D. Build and render your first 3D scenes with guided lessons and exercises.',
    instructor: {
      name: 'Chris Nolan',
      title: '3D Generalist',
      avatar: require('../assets/images/avatar-1.jpg'),
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

export function getTopCourses(limit: number = 10): Course[] {
  return [...courses]
    .sort((a, b) => b.students - a.students || b.rating - a.rating)
    .slice(0, limit);
}

export function searchCourses(query: string): Course[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return courses.filter(
    (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
  );
}

// Enhanced mentors with detailed information
export const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Mary Jones',
    category: 'Graphic Designer',
    company: 'Google',
    avatar: require('../assets/images/avatar-1.jpg'),
    verified: true,
    bio: 'But how much, or rather, can it now do as much as it did then? Nor am I unaware that there is utility in history, not only pleasure.',
    totalCourses: 26,
    totalStudents: 15800,
    totalRatings: 8750,
    averageRating: 4.2,
  },
  {
    id: 2,
    name: 'Robert jr',
    category: 'Graphic Design',
    avatar: require('../assets/images/avatar-1.jpg'),
    verified: true,
    bio: 'Experienced graphic designer with over 10 years in the industry. Passionate about teaching design fundamentals and helping students build strong portfolios.',
    totalCourses: 12,
    totalStudents: 7830,
    totalRatings: 4200,
    averageRating: 4.2,
  },
  {
    id: 3,
    name: 'Elena Brooks',
    category: 'Art Director',
    avatar: require('../assets/images/avatar-2.jpg'),
    verified: true,
    bio: 'Creative director specializing in advertisement design and brand strategy. Former creative lead at top advertising agencies.',
    totalCourses: 8,
    totalStudents: 12680,
    totalRatings: 6340,
    averageRating: 3.9,
  },
  {
    id: 4,
    name: 'Chris Nolan',
    category: '3D Generalist',
    avatar: require('../assets/images/avatar-3.jpeg'),
    verified: true,
    bio: '3D artist and technical director with expertise in modeling, animation, and rendering. Worked on major film and game projects.',
    totalCourses: 15,
    totalStudents: 4010,
    totalRatings: 2890,
    averageRating: 4.3,
  },
  {
    id: 5,
    name: 'Alex Kim',
    category: 'Frontend Engineer',
    avatar: require('../assets/images/avatar-2.jpg'),
    verified: true,
    bio: 'Full-stack developer with focus on modern web technologies. Passionate about clean code and user experience design.',
    totalCourses: 18,
    totalStudents: 9450,
    totalRatings: 5670,
    averageRating: 4.6,
  },
  {
    id: 6,
    name: 'Dana Scott',
    category: 'Marketing Strategist',
    avatar: require('../assets/images/avatar-5.jpg'),
    verified: false,
    bio: 'Digital marketing expert with proven track record in campaign strategy and analytics. Helps businesses grow through data-driven marketing.',
    totalCourses: 10,
    totalStudents: 4020,
    totalRatings: 2010,
    averageRating: 4.1,
  },
];

export function getMentorById(id: number | string): Mentor | undefined {
  const num = typeof id === 'string' ? parseInt(id, 10) : id;
  return mentors.find((m) => m.id === num);
}

export function getCoursesByMentorId(mentorId: number): Course[] {
  return courses.filter((course) => {
    const mentor = mentors.find(m => m.id === mentorId);
    return mentor && course.instructor.name === mentor.name;
  });
}

export function getTopMentors(limit: number = 9): Mentor[] {
  // Sort mentors by total students across their courses (fallback to course students via id match)
  const byId = new Map(courses.map((c) => [c.id, c.students]));
  return [...mentors]
    .sort((a, b) => (byId.get(b.id) || 0) - (byId.get(a.id) || 0))
    .slice(0, limit);
}

export function searchMentors(query: string): Mentor[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return mentors.filter(
    (m) => m.name.toLowerCase().includes(q) || (m.category || '').toLowerCase().includes(q)
  );
}
