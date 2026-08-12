export const company = {
  name: "Moon Group",
  legalName: "Moon Bangladesh Limited",
  tagline: "Building Tomorrow's Bangladesh",
  heroTitle: "Crafting Landmarks That Define Excellence",
  heroSubtitle:
    "Moon Group of Industries Ltd — a trusted name in construction, real estate development, and infrastructure across Bangladesh.",
  chairman: "Al-haj Mizanur Rahman",
  founded: "1990s",
  category: "Construction & Real Estate Development",
  description:
    "Moon Group (Bangladesh) stands as one of the nation's respected business groups, delivering high-quality construction, residential developments, and commercial projects. Under the visionary leadership of Al-haj Mizanur Rahman, we combine engineering precision with architectural excellence to create spaces that inspire generations.",
  legacy:
    "With decades of experience in Bangladesh's building sector, Moon Group has earned the trust of homeowners, investors, and partners through on-time delivery, superior construction quality, and customer-centric service. We don't just build structures — we build communities and lasting relationships.",
  contact: {
    phone: "+880 2 0000 0000",
    email: "info@moonbangladesh.com",
    address: "Dhaka, Bangladesh",
    hotline: "16604",
  },
  values: [
    "High Quality Construction",
    "Design Excellence",
    "On-Time Delivery",
    "Customer-Centricity",
    "Integrity & Trust",
  ],
};

export const stats = [
  { label: "Years of Excellence", value: 25, suffix: "+" },
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Happy Families", value: 5000, suffix: "+" },
  { label: "Sq. Ft. Delivered", value: 2, suffix: "M+" },
];

export type ProjectStatus = "Ongoing" | "Completed" | "Coming Soon";

export interface Project {
  id: string;
  name: string;
  location: string;
  image: string;
  size: string;
  beds: string;
  baths: string;
  land: string;
  status: ProjectStatus;
  type: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "moon-heights",
    name: "Moon Heights",
    location: "Gulshan, Dhaka",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    size: "2200 - 3500 sft",
    beds: "3-4",
    baths: "3-4",
    land: "8 Katha",
    status: "Ongoing",
    type: "Luxury",
    featured: true,
  },
  {
    id: "moon-residence",
    name: "Moon Residence",
    location: "Banani, Dhaka",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    size: "1800 - 2400 sft",
    beds: "3",
    baths: "3",
    land: "5 Katha",
    status: "Ongoing",
    type: "Featured",
    featured: true,
  },
  {
    id: "moon-tower",
    name: "Moon Tower",
    location: "Uttara, Dhaka",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    size: "1500 - 2000 sft",
    beds: "3",
    baths: "3",
    land: "10 Katha",
    status: "Completed",
    type: "Commercial",
    featured: true,
  },
  {
    id: "moon-garden",
    name: "Moon Garden Homes",
    location: "Bashundhara R/A, Dhaka",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    size: "2100+ sft",
    beds: "4",
    baths: "4",
    land: "5 Katha",
    status: "Ongoing",
    type: "Luxury",
    featured: true,
  },
  {
    id: "moon-plaza",
    name: "Moon Plaza",
    location: "Mirpur, Dhaka",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    size: "1200 - 1800 sft",
    beds: "3",
    baths: "3",
    land: "35 Katha",
    status: "Coming Soon",
    type: "Classic",
    featured: true,
  },
  {
    id: "moon-skyline",
    name: "Moon Skyline",
    location: "Purbachal, Dhaka",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    size: "2500 - 4000 sft",
    beds: "4",
    baths: "4",
    land: "6 Katha",
    status: "Coming Soon",
    type: "Luxury",
    featured: true,
  },
];

export const services = [
  {
    title: "Residential Development",
    description:
      "Premium apartments and gated communities designed for modern living with world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    title: "Commercial Construction",
    description:
      "Office towers, retail spaces, and mixed-use developments built to the highest standards.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    title: "Infrastructure Projects",
    description:
      "Roads, bridges, and civil engineering works that connect communities and drive progress.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    title: "Interior & Design",
    description:
      "End-to-end interior design solutions that transform spaces into personalized sanctuaries.",
    image:
      "https://images.unsplash.com/photo-1618221197210-dd6b41faaea6?w=600&q=80",
  },
];

export const testimonials = [
  {
    name: "Karim Ahmed",
    role: "Homeowner, Moon Heights",
    quote:
      "Moon Group delivered exactly what they promised — quality construction, timely handover, and exceptional after-sales support.",
  },
  {
    name: "Fatima Rahman",
    role: "Investor",
    quote:
      "Their attention to detail and transparent communication made our investment decision easy. Truly a professional team.",
  },
  {
    name: "Rashid Khan",
    role: "Business Partner",
    quote:
      "Working with Moon Group on our commercial project was seamless. They understand both engineering and aesthetics.",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
