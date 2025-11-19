
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting to seed database...');

  // Create admin users
  const hashedPasswordTest = await bcrypt.hash('johndoe123', 10);
  const hashedPasswordAdmin = await bcrypt.hash('AdminFio2024!', 10);

  // Test account (required for testing)
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'Test Admin',
      password: hashedPasswordTest,
      role: 'admin'
    }
  });
  console.log('✅ Created test admin user');

  // Admin account for the website owner
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@artbyfio.com' },
    update: {},
    create: {
      email: 'admin@artbyfio.com',
      name: 'Fiorella Podestá',
      password: hashedPasswordAdmin,
      role: 'admin'
    }
  });
  console.log('✅ Created admin user: admin@artbyfio.com');

  // Create initial content sections
  const contentSections = [
    {
      key: 'hero_title',
      title: 'Homepage Hero Title',
      content: 'Transforming Spaces Through Bold, Vibrant Murals',
      contentEs: 'Transformando Espacios con Murales Vibrantes y Audaces',
      type: 'text',
      page: 'home',
      order: 1
    },
    {
      key: 'hero_subtitle',
      title: 'Homepage Hero Subtitle',
      content: 'International mural artist bringing color, culture, and inspiration to walls worldwide. From commercial spaces to residential dreams - let\'s create something extraordinary together.',
      contentEs: 'Artista muralista internacional que trae color, cultura e inspiración a paredes de todo el mundo. Desde espacios comerciales hasta sueños residenciales: creemos algo extraordinario juntos.',
      type: 'textarea',
      page: 'home',
      order: 2
    },
    {
      key: 'about_intro',
      title: 'About Page Introduction',
      content: 'Born in the stunning Elqui Valley of Chile, Fiorella Podestá has spent over 30 years bringing her unique artistic vision to life on walls around the world.',
      contentEs: 'Nacida en el impresionante Valle del Elqui de Chile, Fiorella Podestá ha pasado más de 30 años dando vida a su visión artística única en paredes de todo el mundo.',
      type: 'textarea',
      page: 'about',
      order: 1
    }
  ];

  for (const section of contentSections) {
    const created = await prisma.contentSection.upsert({
      where: { key: section.key },
      update: section,
      create: section
    });
    console.log(`✅ Created content section: ${created.title}`);
  }

  // Create mural projects based on Fio's actual work from artbyfio.com
  const muralProjects = [
    {
      title: 'Bushwick Collective',
      titleEs: 'Colectivo Bushwick',
      description: 'Iconic street art piece in Brooklyn\'s world-renowned outdoor gallery featuring bold colors and dynamic composition.',
      descriptionEs: 'Pieza de arte callejero icónica en la galería al aire libre de fama mundial de Brooklyn con colores audaces y composición dinámica.',
      location: 'Brooklyn, NYC',
      year: 2023,
      width: 35,
      height: 20,
      medium: 'Acrylic on brick',
      client: 'Bushwick Collective',
      category: 'Public Art',
      imageUrl: '/images/portfolio_01_cdn_shop_files.jpg',
      featured: true
    },
    {
      title: 'Meeting of Styles',
      titleEs: 'Meeting of Styles',
      description: 'Dynamic festival piece celebrating urban culture with vibrant colors and contemporary street art elements.',
      descriptionEs: 'Pieza dinámica del festival celebrando la cultura urbana con colores vibrantes y elementos de arte callejero contemporáneo.',
      location: 'Miami, FL',
      year: 2022,
      width: 45,
      height: 18,
      medium: 'Spray paint and acrylic',
      client: 'Meeting of Styles Miami',
      category: 'Public Art',
      imageUrl: '/images/portfolio_02_cdn_shop_files.jpg',
      featured: true
    },
    {
      title: 'Golden Buddha',
      titleEs: 'Buda Dorado',
      description: 'Serene spiritual artwork featuring intricate details and warm golden tones that bring peace and tranquility to the space.',
      descriptionEs: 'Obra espiritual serena con detalles intrincados y tonos dorados cálidos que traen paz y tranquilidad al espacio.',
      location: 'Miami, FL',
      year: 2023,
      width: 28,
      height: 15,
      medium: 'Acrylic on wall',
      client: 'Private Client',
      category: 'Residential',
      imageUrl: '/images/portfolio_03_cdn_shop_files.jpg',
      featured: false
    },
    {
      title: 'Tangerine Buddha',
      titleEs: 'Buda Tangerina',
      description: 'Vibrant spiritual piece with bold orange hues and intricate mandala patterns creating a meditative focal point.',
      descriptionEs: 'Pieza espiritual vibrante con tonos naranja audaces y patrones de mandala intrincados creando un punto focal meditativo.',
      location: 'Fort Lauderdale, FL',
      year: 2023,
      width: 30,
      height: 16,
      medium: 'Acrylic on wall',
      client: 'Yoga Studio',
      category: 'Commercial',
      imageUrl: '/images/portfolio_04_cdn_shop_files.jpg',
      featured: false
    },
    {
      title: 'MAPU',
      titleEs: 'MAPU',
      description: 'Contemporary abstract mural celebrating indigenous roots with geometric patterns and earth-inspired color palette.',
      descriptionEs: 'Mural abstracto contemporáneo celebrando raíces indígenas con patrones geométricos y paleta de colores inspirada en la tierra.',
      location: 'Miami, FL',
      year: 2022,
      width: 40,
      height: 20,
      medium: 'Acrylic on concrete',
      client: 'Cultural Center',
      category: 'Public Art',
      imageUrl: '/images/portfolio_05_cdn_shop_files.jpg',
      featured: true
    },
    {
      title: 'Soy Mis Sueños',
      titleEs: 'Soy Mis Sueños',
      description: 'Powerful declaration mural featuring bold lettering and dreamlike imagery celebrating personal aspirations and identity.',
      descriptionEs: 'Mural de declaración poderosa con letras audaces e imágenes oníricas celebrando aspiraciones personales e identidad.',
      location: 'Miami, FL',
      year: 2022,
      width: 35,
      height: 18,
      medium: 'Acrylic and spray paint',
      client: 'Community Arts',
      category: 'Public Art',
      imageUrl: '/images/portfolio_06_cdn_shop_files.jpg',
      featured: false
    },
    {
      title: 'Abstract Flow',
      titleEs: 'Flujo Abstracto',
      description: 'Dynamic abstract composition with flowing lines and vibrant color transitions creating movement and energy.',
      descriptionEs: 'Composición abstracta dinámica con líneas fluidas y transiciones de colores vibrantes creando movimiento y energía.',
      location: 'Coral Gables, FL',
      year: 2021,
      width: 32,
      height: 14,
      medium: 'Acrylic on wall',
      client: 'Private Residence',
      category: 'Residential',
      imageUrl: '/images/portfolio_07_cdn_shop_files.jpg',
      featured: false
    },
    {
      title: 'Urban Energy',
      titleEs: 'Energía Urbana',
      description: 'Bold street art piece with graffiti elements and dynamic color splashes representing urban vitality and culture.',
      descriptionEs: 'Pieza audaz de arte callejero con elementos de graffiti y salpicaduras de colores dinámicas representando vitalidad y cultura urbana.',
      location: 'Miami, FL',
      year: 2021,
      width: 38,
      height: 16,
      medium: 'Mixed media on wall',
      client: 'Arts District',
      category: 'Public Art',
      imageUrl: '/images/portfolio_08_cdn_shop_files.jpg',
      featured: false
    },
    {
      title: 'Floral Harmony',
      titleEs: 'Armonía Floral',
      description: 'Beautiful botanical mural with oversized flowers and organic forms creating a peaceful and uplifting environment.',
      descriptionEs: 'Hermoso mural botánico con flores de gran tamaño y formas orgánicas creando un ambiente pacífico y edificante.',
      location: 'Fort Lauderdale, FL',
      year: 2020,
      width: 25,
      height: 12,
      medium: 'Acrylic on wall',
      client: 'Wellness Center',
      category: 'Commercial',
      imageUrl: '/images/portfolio_09_cdn_shop_files.jpg',
      featured: false
    }
  ];

  // Create mural projects
  for (const project of muralProjects) {
    const created = await prisma.muralProject.create({
      data: project
    });
    console.log(`✅ Created mural project: ${created.title}`);
  }

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Maria Rodriguez',
      company: 'Montessori Academy',
      location: 'Tamarac, FL',
      content: 'Fio transformed our school into a magical learning environment. The children are mesmerized by the nature mural and it has become an integral part of their daily inspiration.',
      contentEs: 'Fio transformó nuestra escuela en un ambiente mágico de aprendizaje. Los niños están fascinados por el mural de naturaleza y se ha convertido en parte integral de su inspiración diaria.',
      rating: 5,
      featured: true,
      approved: true
    },
    {
      name: 'Dr. James Wilson',
      company: 'Boys & Girls Club',
      location: 'Delray Beach, FL',
      content: 'Working with Fiorella was an incredible experience. Her "Future Landscape" mural has brought new energy to our facility and the kids absolutely love it. Professional and visionary.',
      contentEs: 'Trabajar con Fiorella fue una experiencia increíble. Su mural "Future Landscape" ha traído nueva energía a nuestras instalaciones y a los niños les encanta. Profesional y visionaria.',
      rating: 5,
      featured: true,
      approved: true
    },
    {
      name: 'Isabella Santos',
      company: 'Ballet Academy Miami',
      location: 'Miami, FL',
      content: 'The Ndebele art mural is absolutely stunning. Fio captured the cultural essence perfectly while creating something that inspires our students every day. Truly exceptional work.',
      contentEs: 'El mural de arte Ndebele es absolutamente impresionante. Fio capturó la esencia cultural perfectamente mientras creaba algo que inspira a nuestros estudiantes todos los días. Trabajo verdaderamente excepcional.',
      rating: 5,
      featured: true,
      approved: true
    }
  ];

  for (const testimonial of testimonials) {
    const created = await prisma.testimonial.create({
      data: testimonial
    });
    console.log(`✅ Created testimonial from: ${created.name}`);
  }

  // Create sample exhibitions
  const exhibitions = [
    {
      title: 'Art Basel Miami',
      type: 'Group',
      year: 2023,
      location: 'Miami Beach, FL',
      venue: 'Miami Beach Convention Center',
      description: 'Featured artist at the prestigious Art Basel Miami art fair',
      featured: true
    },
    {
      title: 'I Am My Dreams',
      type: 'Solo',
      year: 2018,
      location: 'Madrid, Spain',
      venue: 'Galería Arte Contemporáneo',
      description: 'Award-winning solo exhibition in Spain',
      featured: true
    },
    {
      title: 'Collective Visions',
      type: 'Group',
      year: 2021,
      location: 'Santiago, Chile',
      venue: 'Museo de Arte Moderno',
      description: 'Group exhibition featuring contemporary Latin American artists',
      featured: false
    }
  ];

  for (const exhibition of exhibitions) {
    const created = await prisma.exhibition.create({
      data: exhibition
    });
    console.log(`✅ Created exhibition: ${created.title}`);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
