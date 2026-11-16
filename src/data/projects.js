import murugerImage from '../assets/images/muruger.jpeg'

export const projects = [
  {
    title: 'Construction Materials E-Commerce Platform',
    category: 'E-commerce',
    image: '/images/trade-cover.svg',
    description: 'A digital ordering platform designed to make construction material orders easier.',
    links: [{ label: 'GitHub', href: 'https://github.com/CybrNinjaX/Trade_mate.git' }],
  },
  {
    title: 'Automated Loan Processing System',
    category: 'Fintech · Automation',
    image: '/images/loan-cover.svg',
    description: 'A loan processing system that automates credit checks.',
    previewUrl: 'https://loan-web-mu.vercel.app/login',
    links: [
      { label: 'GitHub', href: 'https://github.com/techthisai-ai/loan-web' },
      { label: 'Live app', href: 'https://loan-web-mu.vercel.app/login' },
    ],
  },
  {
    title: 'DigiGold Trading Application',
    category: 'Fintech · Savings',
    image: '/images/gold-cover.svg',
    description: 'A digital gold trading app built around fractional gold savings.',
    links: [{ label: 'GitHub', href: 'https://github.com/CybrNinjaX/digigold-app' }],
  },
  {
    title: 'Ashtabal Brooms Website',
    category: 'Product Showcase',
    image: '/images/brooms-cover.svg',
    description: 'A product showcase website for Ashtabal Brooms.',
    previewUrl: 'https://brooms.astraval.com/',
    links: [{ label: 'Visit website', href: 'https://brooms.astraval.com/' }],
  },
  {
    title: 'Murugan 3D Model',
    category: '3D Modeling · STL',
    image: murugerImage,
    imageAlt: 'Colorful 3D artwork of Lord Murugan with a peacock',
    description: 'A detailed 3D artwork of Lord Murugan with his vel and peacock.',
    links: [{ label: 'Purchase model', href: 'https://villpo.astraval.com/' }],
    download: { label: 'Download STL', href: '/models/muruger.stl', fileName: 'muruger.stl' },
  },
]