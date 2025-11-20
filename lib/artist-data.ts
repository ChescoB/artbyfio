
import { ArtistInfo } from './types';

export const artistInfo: ArtistInfo = {
  name: "Fiorella Podestá",
  tagline: {
    en: "Transforming walls into immersive art experiences",
    es: "Transformando paredes en experiencias artísticas inmersivas"
  },
  bio: {
    en: `Fiorella Podestá, known as "Fio," is an internationally acclaimed visual and mural artist with over 30 years of creative practice. Born in Chile's mystical Elqui Valley, Fio's artistic journey has taken her across continents, from the vibrant streets of Miami to the cultural landscapes of Spain and beyond.

    Her signature large-scale murals transform ordinary spaces into extraordinary experiences, blending bold colors, intricate details, and profound storytelling. Fio's work has graced walls in the USA, Canada, Spain, Chile, Brazil, Argentina, and Australia, earning recognition at prestigious venues including Art Basel Miami.

    With a unique aesthetic that celebrates nature, culture, and human connection, Fio collaborates closely with clients to bring their visions to life. Her commitment to artistic excellence and streamlined process has made her the go-to choice for commercial, residential, and public art commissions worldwide.`,
    es: `Fiorella Podestá, conocida como "Fio", es una artista visual y muralista de renombre internacional con más de 30 años de práctica creativa. Nacida en el místico Valle del Elqui de Chile, el viaje artístico de Fio la ha llevado a través de continentes, desde las vibrantes calles de Miami hasta los paisajes culturales de España y más allá.

    Sus murales emblemáticos de gran escala transforman espacios ordinarios en experiencias extraordinarias, combinando colores audaces, detalles intrincados y narrativas profundas. El trabajo de Fio ha adornado paredes en Estados Unidos, Canadá, España, Chile, Brasil, Argentina y Australia, ganando reconocimiento en lugares prestigiosos como Art Basel Miami.

    Con una estética única que celebra la naturaleza, la cultura y la conexión humana, Fio colabora estrechamente con los clientes para dar vida a sus visiones. Su compromiso con la excelencia artística y el proceso simplificado la ha convertido en la opción preferida para comisiones de arte comercial, residencial y público en todo el mundo.`
  },
  email: "ArtbyFio@gmail.com",
  socialLinks: {
    instagram: "https://www.instagram.com/artbyfio",
    facebook: "https://www.facebook.com/artbyfio",
    twitter: "https://twitter.com/artbyfio",
    youtube: "https://www.youtube.com/channel/UC-dI-kIIxV9qnFgWnKKD2eA",
    tumblr: "http://artbyfio.tumblr.com"
  },
  location: "Florida / International",
  yearsExperience: 30,
  specialties: [
    "Large-scale murals",
    "Commercial installations", 
    "Residential art",
    "Public art projects",
    "Custom canvas works",
    "Art consultation"
  ]
};

export const navigationItems = [
  {
    title: "Home",
    titleEs: "Inicio",
    href: "/"
  },
  {
    title: "Portfolio",
    titleEs: "Portafolio", 
    href: "/portfolio"
  },
  {
    title: "Native Body Art",
    titleEs: "Arte Corporal Nativo",
    href: "/native-body-art"
  },
  {
    title: "About",
    titleEs: "Acerca",
    href: "/about"
  },
  {
    title: "Services",
    titleEs: "Servicios",
    href: "/services"
  },
  // Shop page removed
  {
    title: "Contact",
    titleEs: "Contacto",
    href: "/contact"
  }
];

export const projectCategories = [
  { value: 'All', label: 'All Projects', labelEs: 'Todos los Proyectos' },
  { value: 'Commercial', label: 'Commercial', labelEs: 'Comercial' },
  { value: 'Residential', label: 'Residential', labelEs: 'Residencial' },
  { value: 'Public Art', label: 'Public Art', labelEs: 'Arte Público' }
];

export const servicesOffered = [
  {
    title: "Large-Scale Murals",
    titleEs: "Murales de Gran Escala",
    description: "Transform your space with custom-designed murals that tell your story and captivate your audience.",
    descriptionEs: "Transforma tu espacio con murales diseñados a medida que cuentan tu historia y cautivan a tu audiencia.",
    features: ["Site consultation", "Custom design", "Professional execution", "Maintenance guidance"],
    featuresEs: ["Consulta del sitio", "Diseño personalizado", "Ejecución profesional", "Orientación de mantenimiento"]
  },
  {
    title: "Custom Canvas Works",
    titleEs: "Obras en Lienzo Personalizadas", 
    description: "Original paintings created specifically for your space, style, and vision.",
    descriptionEs: "Pinturas originales creadas específicamente para tu espacio, estilo y visión.",
    features: ["Multiple sizes available", "Various mediums", "Framing options", "Worldwide shipping"],
    featuresEs: ["Múltiples tamaños disponibles", "Varios medios", "Opciones de enmarcado", "Envío mundial"]
  },
  {
    title: "Art Consultation",
    titleEs: "Consultoría Artística",
    description: "Expert guidance on art placement, color schemes, and artistic vision for your project.",
    descriptionEs: "Orientación experta en colocación de arte, esquemas de color y visión artística para tu proyecto.",
    features: ["Space assessment", "Design concepts", "Color consultation", "Project planning"],
    featuresEs: ["Evaluación del espacio", "Conceptos de diseño", "Consulta de color", "Planificación del proyecto"]
  }
];
