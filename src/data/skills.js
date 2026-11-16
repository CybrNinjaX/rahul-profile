import { Box, Brain, Cloud, Code2, Database, Layers, Workflow, Wrench } from 'lucide-react'



export const modelingTools = [
  ['Bambu Lab A1', 'FDM printing for final prototypes and physical models.'],
  ['Blender', 'Sculpting, retopology, UV work, and mesh cleanup before slicing.'],
  ['Large Gaussian Model (LGM)', 'Image-to-3D generation with Gaussian splats converted to editable meshes.'],
  ['PyMeshLab', 'Scripted mesh repair, decimation, and format conversion.'],
  ['CSM', 'AI-assisted 3D asset generation from text and image prompts.'],
  ['Tripo3D', 'Rapid text-to-3D and image-to-3D concept generation.'],
  ['Meshy.ai', 'Texturing and refinement before print preparation.'],
]

export const skillGroups = [
  {
    title: 'Programming languages',
    icon: Code2,
    description: 'Languages for web, backend, and scripting.',
    skills: ['Java', 'Python', 'C', 'C++', 'TypeScript', 'JavaScript', 'Dart', 'HTML5'],
  },
  {
    title: 'Frameworks & libraries',
    icon: Layers,
    description: 'Frameworks for interfaces, mobile, and APIs.',
    skills: ['Spring Boot', 'Next.js', 'Tailwind CSS', 'Flutter', 'React Native', 'Django', 'Flask', 'FastAPI'],
  },
  {
    title: 'AI & machine learning',
    icon: Brain,
    description: 'Libraries and platforms for model work.',
    skills: ['Hugging Face Transformers', 'Scikit-learn', 'TorchAudio', 'Google Colab', 'Kaggle'],
  },
  {
    title: 'Databases',
    icon: Database,
    description: 'Relational and document data stores.',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Cloud & backend services',
    icon: Cloud,
    description: 'Cloud platforms and managed services.',
    skills: ['Amazon Web Services', 'Firebase', 'Supabase', 'Docker'],
  },
  {
    title: 'Automation & testing',
    icon: Workflow,
    description: 'Workflow automation and quality checks.',
    skills: ['n8n', 'Selenium', 'Jira'],
  },
  {
    title: '3D modeling & printing',
    icon: Box,
    description: 'From generated meshes to print-ready models.',
    skills: ['Blender', 'Bambu Lab A1', 'Large Gaussian Model (LGM)', 'PyMeshLab', 'CSM', 'Tripo3D', 'Meshy.ai'],
    workflow: modelingTools,
  },
  {
    title: 'Tools & development environment',
    icon: Wrench,
    description: 'Everyday tools for building and shipping.',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Android Studio', 'Postman', 'Linux'],
  },
]

export const skillLogoPaths = {
  Java: 'java/java-original.svg',
  Python: 'python/python-original.svg',
  C: 'c/c-original.svg',
  'C++': 'cplusplus/cplusplus-original.svg',
  TypeScript: 'typescript/typescript-original.svg',
  JavaScript: 'javascript/javascript-original.svg',
  Dart: 'dart/dart-original.svg',
  HTML5: 'html5/html5-original.svg',
  'Spring Boot': 'spring/spring-original.svg',
  'Next.js': 'nextjs/nextjs-original.svg',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
  Flutter: 'flutter/flutter-original.svg',
  'React Native': 'react/react-original.svg',
  Django: 'django/django-plain.svg',
  Flask: 'flask/flask-original.svg',
  FastAPI: 'fastapi/fastapi-original.svg',
  'Scikit-learn': 'scikitlearn/scikitlearn-original.svg',
  TorchAudio: 'pytorch/pytorch-original.svg',
  'Google Colab': 'googlecolab/googlecolab-original.svg',
  Kaggle: 'kaggle/kaggle-original.svg',
  MongoDB: 'mongodb/mongodb-original.svg',
  MySQL: 'mysql/mysql-original.svg',
  PostgreSQL: 'postgresql/postgresql-original.svg',
  'Amazon Web Services': 'amazonwebservices/amazonwebservices-original.svg',
  Firebase: 'firebase/firebase-original.svg',
  Supabase: 'supabase/supabase-original.svg',
  Docker: 'docker/docker-original.svg',
  Selenium: 'selenium/selenium-original.svg',
  Jira: 'jira/jira-original.svg',
  Blender: 'blender/blender-original.svg',
  Git: 'git/git-original.svg',
  GitHub: 'github/github-original.svg',
  'Visual Studio Code': 'vscode/vscode-original.svg',
  'Android Studio': 'androidstudio/androidstudio-original.svg',
  Postman: 'postman/postman-original.svg',
  Linux: 'linux/linux-original.svg',
}