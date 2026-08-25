export const navigation = [
  { label: 'Home',       href: '#home',       icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { label: 'About',      href: '#about',      icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { label: 'Experience', href: '#experience', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
  { label: 'Skills',     href: '#skills',     icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { label: 'Projects',   href: '#projects',   icon: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
  { label: 'Education',  href: '#education',  icon: 'M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5' },
  { label: 'Contact',    href: '#contact',    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6' },
]

export const projects = [
  { number: '01', title: 'EmpTrackAI', category: 'Full Stack · Employee Tracking', description: 'A multi-organization employee activity tracking system with a React admin dashboard, secure JWT authentication, role-based access, employee management, and flexible activity logs.', visual: 'attendance', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85', tech: ['React', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT'], github: 'https://github.com/codeofrealm/EmpMan' },
  { number: '02', title: 'TradeMate', category: 'Flutter · E-Commerce Management', description: 'A full-featured e-commerce app with customer ordering, cart and delivery tracking, plus an admin dashboard for products, customers, orders, low-stock alerts, and revenue analytics.', visual: 'store', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85', tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Material 3'], github: 'https://github.com/codeofrealm/Trade_mate' },
  { number: '03', title: 'NovaChat', category: 'Flutter · Real-Time Chat', description: 'A real-time mobile chat application with secure sign-in and live conversations, built with Flutter and Firebase for a fast, polished messaging experience.', visual: 'tasks', image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1200&q=85', tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Real-Time Streams'], github: 'https://github.com/codeofrealm/NovaChat-app' },
  { number: '04', title: 'DigiGold', category: 'Flutter · Digital Investments', description: 'A digital gold and silver investment app for buying, selling, managing holdings, placing shop orders, and tracking live portfolio values, with a full admin operations panel.', visual: 'mobile', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=85', tech: ['Flutter', 'Dart', 'Cloud Firestore', 'Firebase Storage', 'GoRouter'], github: 'https://github.com/codeofrealm/digigold-app' },
  { number: '05', title: 'User Management REST API', category: 'Java · Spring Boot', description: 'A clean Spring Boot REST API for user management with in-memory CRUD operations, search and utility endpoints, meaningful HTTP responses, and complete automated tests.', visual: 'weather', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85', tech: ['Java', 'Spring Boot', 'REST API', 'JUnit 5', 'Mockito'], github: 'https://github.com/codeofrealm/user-management-api-testcase' },
  { number: '06', title: 'Smart AI — Chat & Voice Assistant', category: 'Flutter · AI Assistant', description: 'An AI assistant that combines text chat and voice interaction with speech recognition, text-to-speech replies, Firebase chat history, and a polished glassmorphism interface.', visual: 'analytics', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85', tech: ['Flutter', 'Dart', 'Gemini / GPT', 'Firebase Auth', 'Cloud Firestore'], github: 'https://github.com/codeofrealm/smart_ai_chat_voice_assistant' },
  { number: '07', title: 'Background Remover', category: 'Web App · Image Processing', description: 'A dark-themed web app that uploads, previews, and removes image backgrounds in one click, with instant downloads and a smooth animated interface.', visual: 'library', image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=85', tech: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask'], github: 'https://github.com/codeofrealm/image-bg-removal-tool' },
  { number: '08', title: 'Mentor–Mentees', category: 'Java Application', description: 'A Java application focused on organizing mentor–mentee relationships and supporting practical learning workflows.', visual: 'ai', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85', tech: ['Java'], github: 'https://github.com/codeofrealm/mentor_mentees' },
]

export const skills = [
  'UI / UX Design',
  'Web Development',
  'Brand Identity',
  'React',
  'Design Systems',
  'Creative Strategy',
]

export const process = [
  { number: '01', title: 'Discover', description: 'Find the angle that makes the work matter.' },
  { number: '02', title: 'Design', description: 'Shape a visual language built to connect.' },
  { number: '03', title: 'Deliver', description: 'Launch with care and keep improving.' },
]
