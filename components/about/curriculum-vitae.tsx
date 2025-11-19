'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/lib/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Ruler, Award } from 'lucide-react';

const murals = [
  {
    year: 2023,
    title: 'Magic Nature',
    dimensions: '55 ft x 20 ft',
    medium: 'Acrylic paint on concrete',
    location: 'Montessori Academy in Tamarac, FL, USA'
  },
  {
    year: 2023,
    title: 'Future Landscape',
    dimensions: '90 ft x 40 ft',
    medium: 'Acrylic paint on concrete',
    location: 'Boys & Girls Club of Delray Beach, FL, USA'
  },
  {
    year: 2022,
    title: 'Ndebele Art',
    dimensions: '112 ft x 8 ft',
    medium: 'Acrylic paint on concrete',
    location: 'The Mandelstam Art and Ballet Academy in Coral Gables, Miami, FL, USA'
  },
  {
    year: 2022,
    title: 'Future Landscape',
    dimensions: '60 ft x 20 ft',
    medium: 'Acrylic paint on concrete',
    location: 'Max M. Fisher Boys & Girls Club of Riviera Beach, FL, USA'
  },
  {
    year: 2022,
    title: 'Boys & Girls Club Art Room',
    dimensions: '22 ft x 16 ft',
    medium: 'Acrylic paint on concrete',
    location: 'Max M. Fisher Boys & Girls Club of Riviera Beach, FL, USA'
  },
  {
    year: 2022,
    title: 'Rooms for Nature',
    dimensions: '2 Walls of 22 ft x 16 ft each',
    medium: 'Acrylic on concrete',
    location: 'Office Depot Day of Service at Boys & Girls Club of Boca Raton, FL, USA'
  },
  {
    year: 2021,
    title: 'Neon Games',
    dimensions: '2 Walls of 10 ft x 12 ft each',
    medium: 'Spray and Acrylic paint on concrete',
    location: 'Private residence in Miami Gardens, FL, USA'
  },
  {
    year: 2021,
    title: 'Seed of Life Mandala',
    dimensions: '2 Walls of 15 ft x 40 ft each',
    medium: 'Spray and Acrylic paint on concrete',
    location: 'Thrive Yoga Studio in Miami, Coral Gables, FL, USA'
  },
  {
    year: 2020,
    title: 'Style',
    dimensions: '6 ft x 9 ft',
    medium: 'Spray paint on concrete',
    location: 'Wellington Mall in Wellington, FL, USA'
  },
  {
    year: 2020,
    title: 'Highest Colors',
    dimensions: '12 Story Building',
    medium: 'Acrylic paint on concrete',
    location: 'Street Facade Mural Downtown Miami, FL, USA'
  },
  {
    year: 2019,
    title: 'Burst Your Bubble',
    dimensions: '10 ft x 20 ft',
    medium: 'Street Mural spray paint on concrete',
    location: 'Art Basel festival in Wynwood Art District, Miami, FL, USA'
  },
  {
    year: 2018,
    title: 'Blue Wind',
    dimensions: '15 ft x 17 ft',
    medium: 'Street Mural spray paint on concrete',
    location: 'Bushwick Collective in Montreal, Quebec, Canada'
  },
  {
    year: 2018,
    title: 'Bloom',
    dimensions: '10 ft x 16 ft',
    medium: 'Spray paint on concrete',
    location: 'Meeting of the Styles (M.O.S.) for Art Basel International Street Art Festival in Wynwood Art District, Miami, FL, USA'
  },
  {
    year: 2018,
    title: 'I Am My Dreams',
    dimensions: '5 Story Building',
    medium: 'Spray paint on concrete',
    location: 'Aranda de Duero, Burgos, Spain',
    award: 'First Place Award Winning Mural promoting gender equality and women\'s empowerment'
  },
  {
    year: 2018,
    title: 'Nahia\'s Music',
    dimensions: '6 ft x 9 ft',
    medium: 'Spray paint and Latex on concrete',
    location: 'Commercial building entrance, created live during "Sonorama Music Festival" in Aranda de Duero, Burgos, Spain'
  },
  {
    year: 2018,
    title: 'The Italian Girl',
    dimensions: '13 ft x 16 ft',
    medium: 'Spray paint on concrete',
    location: 'Commercial space in Barrio Italia, Santiago, Chile'
  },
  {
    year: 2018,
    title: 'Protective Gecko',
    dimensions: '6 ft x 11 ft',
    medium: 'Spray paint on concrete',
    location: 'Private residence in La Florida, Santiago, Chile'
  },
  {
    year: 2018,
    title: 'Levita con Luz',
    dimensions: '8 ft x 19 ft',
    medium: 'Spray paint on clay wall',
    location: '"Punto de Luz" in Pisco, Elqui Valley, Chile'
  },
  {
    year: 2018,
    title: 'Diaguita Neon',
    dimensions: '6 ft x 9 ft',
    medium: 'Spray paint',
    location: 'Facade for private residence in Pisco, Elqui Valley, Chile'
  },
  {
    year: 2017,
    title: 'The Doll of the Neighborhood',
    dimensions: '26 ft x 22 ft',
    medium: 'Spray paint on concrete',
    location: '"Basel House Art Gallery" for Bushwick Collective for Art Basel International Street Art Festival in Wynwood Art District, Miami, FL, USA'
  },
  {
    year: 2017,
    title: 'Levitating',
    dimensions: '10 ft x 13 ft',
    medium: 'Spray paint on concrete',
    location: 'Art Basel week in Wynwood Art District, Miami, FL, USA'
  },
  {
    year: 2017,
    title: 'Meditate with B-Boys',
    dimensions: '22 ft x 26 ft',
    medium: 'Spray paint on concrete',
    location: 'Meeting of the Styles (M.O.S.) for Art Basel International Street Art Festival in Wynwood Art District, Miami, FL, USA'
  },
  {
    year: 2017,
    title: 'Mapu-French Girl',
    dimensions: '26 ft x 16 ft',
    medium: 'Spray paint on concrete',
    location: '"Epicerie Art Cafe" in Wynwood Art District, Miami, FL, USA'
  },
  {
    year: 2016,
    title: 'The Lost Flower',
    dimensions: '26 ft x 32 ft',
    medium: 'Spray paint on concrete',
    location: '"Bushwick Collective" & "Mana Art Gallery" for Art Basel International Street Art Festival in Wynwood Art District, Miami, FL, USA'
  },
  {
    year: 2016,
    title: 'Rest in the Seed',
    dimensions: '7 ft x 32 ft',
    medium: 'Acrylic on concrete',
    location: '"All to Wall Woman" in Bird Road Art District, Coral Gables, FL, USA'
  },
  {
    year: 2015,
    title: 'Shamans on Concrete',
    dimensions: '7 ft x 7 ft',
    medium: 'Acrylic on concrete',
    location: '"The Good Wall" in Little Havana, Miami, FL, USA'
  },
  {
    year: 2002,
    title: 'Mandala Clay',
    dimensions: '10 ft x 16 ft',
    medium: 'Colored pigments on clay',
    location: 'Private residence in Monte Grande, Elqui Valley, Chile'
  },
  {
    year: 1993,
    title: 'Rhythmic Moon',
    dimensions: '16 ft x 13 ft',
    medium: 'Latex on concrete ceiling',
    location: '"La Casa en el Aire" in Barrio Bellavista, Santiago, Chile'
  }
];

const soloExhibitions = [
  { year: 2013, title: 'Volition', details: '8 Encaustic Paintings on Wood', location: 'Azake Art Gallery, Downtown Miami, FL, USA' },
  { year: 2012, title: 'Native Body Art', details: '5 Oils on Canvas and 20 Photo exhibition', location: 'Green Monkey Studio, Coral Gables, Miami, FL, USA' },
  { year: 2010, title: 'Native Body', details: '7 Oils on Canvas and 7 Photo Exhibition and Live Body Painting event for Art Basel', location: 'The Standard Hotel, Miami Beach, FL, USA' },
  { year: 2009, title: 'Lotus', details: '15 Oils on canvas', location: 'Yoga Grove Studio, Coconut Grove, Miami, FL, USA' },
  { year: 2008, title: 'Lotus', details: '12 Oils on canvas', location: 'I Love Yoga Studio, Miami, FL, USA' },
  { year: 2006, title: 'Blues & Yellows', details: '8 Oils on canvas', location: 'Cornerstone Art Gallery, Wynwood Art District, Miami, FL, USA' },
  { year: 2005, title: 'Art Yoga II', details: '10 Oils on canvas', location: 'Yoga Grove Studio, Coconut Grove, Miami, FL, USA' },
  { year: 2005, title: 'Art Yoga I', details: '8 Oils on canvas', location: 'Energy Studio, South Beach, Miami, FL, USA' },
  { year: 2004, title: 'Masks and Faces', details: '6 Oils on canvas', location: 'Energy Studio, South Beach, Miami, FL, USA' },
  { year: 2000, title: 'Zen', details: '15 oils on canvas', location: 'Zen Art Gallery, Elqui Valley, Chile' },
  { year: 2000, title: 'Undulating Valley', details: '9 Oils on canvas', location: 'Datiles Hotel, Elqui Valley, Chile' },
  { year: 1994, title: 'Parallels Worlds II', details: '10 Oils on canvas, painted live during Chilean pianist Roberto Bravo performance', location: 'Palacio Cousiño Macul (Causiño Palace) Santiago, Chile' },
  { year: 1994, title: 'Parallel Worlds I', details: '20 Oils on canvas', location: 'Italian Restaurant, Barrio Bellavista, Chile' }
];

const groupExhibitions = [
  { year: 2019, title: 'La Reina Art Show', details: '3 acrylics on canvas', location: 'Santiago, Chile' },
  { year: 2019, title: 'Conapran Private Group Exhibition', details: '4 acrylics on canvas', location: 'Providencia Art Gallery, Santiago, Chile' },
  { year: 2018, title: 'Teavana event Art Basel', details: '5 Acrylic on canvas', location: 'The Sacred Space, Wynwood Art District, Miami, FL, USA' },
  { year: 2018, title: 'Caleidoscopio', details: '1 Acrylic on Canvas, with 20 Chilean artists', location: 'Las Condes, Design District, Santiago, Chile' },
  { year: 2015, title: 'Women Art', details: '2 Acrylics on canvas, with 5 Miami artists', location: 'Diana Contreras (DiDi) Art Studio in Little Havana, Miami, FL, USA' },
  { year: 2015, title: 'Canto al Agua', details: 'Public Art Installation via Projected Light, Acrylic on canvas enlarged and projected over a 30 ft diameter surface water of The Mapocho River', location: 'Museo Arte de Luz, Mapocho River, Santiago, Chile' },
  { year: 2014, title: 'Creations 23', details: '3 Acrylics on canvas, with 6 Miami artists', location: 'Area 23 Studio, Wynwood Art District, Miami, FL, USA' },
  { year: 2013, title: 'The 3 Graces', details: '2 Encaustic paintings on wood, with 5 International artists', location: 'Espitia Art Gallery, Wynwood Art District, Miami, FL, USA' },
  { year: 2012, title: 'Longings', details: 'Art Basel Festival 1 Acrylic on canvas, with 4 Miami artists', location: 'Butter Art Gallery, Wynwood Art District, Miami, FL, USA' },
  { year: 2010, title: 'Visionary', details: '3 Oils on canvas with 15 Visionary artists including Alex Gray, Martina Hoffman, Roberto Venosa and Amanda Sage', location: 'Moksha Art Collective Gallery, Little Haiti, Miami, FL, USA' },
  { year: 2009, title: '11:11 Collective', details: '3 Oils on canvas, with 7 artists', location: 'Campus Unity, in St. Petersburg, FL, USA' },
  { year: 2009, title: 'Femmes', details: 'Art Basel Festival 5 Oils on canvas, with 20 artists', location: 'Mimo Art Gallery, Miami, FL, USA' },
  { year: 2008, title: 'Among Colors', details: '10 Oils on canvas with 100 International artists', location: 'Coconut Grove Art Festival, Miami, FL, USA' },
  { year: 2007, title: 'Visionary Art Collective', details: '2 Oils on canvas, with 25 artists including Alex Gray and Martina Hoffman', location: 'Moksha Arts Collective, Little Haiti, Miami, FL, USA' },
  { year: 2007, title: 'Vision of the 21st Century', details: '3 Oils on canvas, with 5 Miami Artists for the 5th Miami City Hall Art Event', location: 'The Green Room, Miami Beach Art Center, Downtown Miami, FL, USA' },
  { year: 2007, title: 'Miami Art Benefit', details: 'Art Basel Festival 2 Oils on canvas, with 20 International artists', location: 'The Yard Art Gallery, Miami, FL, USA' },
  { year: 2006, title: 'Culture Evolution', details: '1 Acrylic on canvas, with 10 artists including Alex Gray and Martina Hoffman', location: 'Moksha Arts Collective, Little Haiti, Miami, FL, USA' },
  { year: 2005, title: 'Renew Energy', details: '8 Oils on Canvas for international Gifford Art Stroll Art Festival', location: 'Coconut Grove, Miami, FL USA' },
  { year: 2005, title: 'Going Into', details: 'Festival Art Basel 3 Oils on canvas and mural on interior wall of with 5 Miami artists', location: 'Cornerstone art gallery Wynwood Art District, Miami, FL, USA' },
  { year: 2003, title: 'The Trip', details: '6 Oils on wood, with 30 South American artists', location: 'International Art Fair, Sucre, BOLIVIA' },
  { year: 2000, title: 'Art for All', details: 'Selected artist, Art Grant at National Contest "Fondart"', location: 'La Serena, Vicuña and Pisco Elqui, Chile' },
  { year: 1997, title: 'First Impulse', details: '7 Oils on canvas with 25 artists at the Art Festival', location: 'City Hall, Barnechea, Santiago, Chile' }
];

export default function CurriculumVitae() {
  const { language } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-secondary/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-[hsl(var(--art-teal))]/10 to-[hsl(var(--art-coral))]/10 rounded-full text-sm font-semibold text-primary">
              {language === 'es' ? 'Trayectoria Artística' : 'Artistic Journey'}
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
          >
            {language === 'es' ? 'Curriculum Vitae' : 'Curriculum Vitae'}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          >
            {language === 'es' 
              ? 'Tres décadas de arte transformador en paredes de todo el mundo'
              : 'Three decades of transformative art on walls around the world'
            }
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs defaultValue="murals" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50 backdrop-blur-sm p-1 rounded-xl">
              <TabsTrigger 
                value="murals" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--art-teal))] data-[state=active]:to-[hsl(var(--art-coral))] data-[state=active]:text-white rounded-lg"
              >
                <span className="text-sm md:text-base font-semibold">
                  {language === 'es' ? 'Murales' : 'Murals'}
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="solo" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--art-teal))] data-[state=active]:to-[hsl(var(--art-coral))] data-[state=active]:text-white rounded-lg"
              >
                <span className="text-sm md:text-base font-semibold">
                  {language === 'es' ? 'Exhibiciones Solo' : 'Solo Exhibitions'}
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="group" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--art-teal))] data-[state=active]:to-[hsl(var(--art-coral))] data-[state=active]:text-white rounded-lg"
              >
                <span className="text-sm md:text-base font-semibold">
                  {language === 'es' ? 'Exhibiciones Grupales' : 'Group Exhibitions'}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="murals" className="mt-0">
              <div className="grid gap-4">
                {murals.map((mural, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-art hover:shadow-art-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center shadow-lg">
                              <span className="text-2xl font-bold text-white">{mural.year}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                                {mural.title}
                              </h3>
                              {mural.award && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-2">
                                  <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                                    {mural.award}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                              <div className="flex items-start gap-2">
                                <Ruler className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-foreground/70">
                                    {language === 'es' ? 'Dimensiones' : 'Dimensions'}
                                  </p>
                                  <p className="text-sm">{mural.dimensions}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-foreground/70">
                                    {language === 'es' ? 'Ubicación' : 'Location'}
                                  </p>
                                  <p className="text-sm">{mural.location}</p>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm italic text-muted-foreground">{mural.medium}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="solo" className="mt-0">
              <div className="grid gap-4">
                {soloExhibitions.map((exhibition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-art hover:shadow-art-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center shadow-lg">
                              <span className="text-2xl font-bold text-white">{exhibition.year}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors">
                              {exhibition.title}
                            </h3>
                            <p className="text-muted-foreground">{exhibition.details}</p>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                              <p className="text-sm">{exhibition.location}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="group" className="mt-0">
              <div className="grid gap-4">
                {groupExhibitions.map((exhibition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-art hover:shadow-art-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center shadow-lg">
                              <span className="text-2xl font-bold text-white">{exhibition.year}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors">
                              {exhibition.title}
                            </h3>
                            <p className="text-muted-foreground">{exhibition.details}</p>
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                              <p className="text-sm">{exhibition.location}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
