
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSkill, setCurrentSkill] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  const skills = [
    'Express Backend Mentor', 'Full Stack Web Developer', 'HTML & CSS Expert',
    'Tailwind CSS Specialist', 'JavaScript Developer', 'Node.js Backend',
    'React.js Frontend', 'Redux State Management', 'Next.js Framework',
    'Data Modeling', 'Prisma ORM', 'MongoDB Database', 'TypeScript',
    'Git & GitHub', 'Socket.io Real-time', 'Payment Gateways'
  ];

  const projects = [
    {
      title: 'E-commerce Platform',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'MongoDB'],
      description: 'Full-stack e-commerce with payment integration',
      link: 'https://unnagents.vercel.app/'
      
    },
    {
      title: 'Mini Calculator',
      tech: ['Vanilla Js', 'CSS', 'HTML'],
      description: 'My first ever project as a Js Developer',
      link: 'https://markc1-code.github.io/minicalc/'
    },
    {
      title: 'Business App',
      tech: ['Nextjs', 'Tailwind', 'Typescript'],
      description: 'First ever project as a Next.js Developer',
      link: 'https://nwandospecialist.vercel.app/'
    }
  ];
  useEffect(() => {
    if (typeof window !== "undefined") {
      const temp = [...Array(50)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setPositions(temp);
    }
  }, []);


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
   
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(skillInterval);
    };
  }, [skills.length]);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isMenuOpen ? 2 : 1})`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MC</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Developer
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group px-4 py-2 rounded-lg transition-all duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {<span className="relative disabled:text-gray-50 z-10 text-white group-hover:text-cyan-400 transition-colors">
                    {item}
                  </span>}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-10 h-10 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 relative">
                  <motion.span
                    className="absolute h-0.5 w-6 bg-white transform transition-all duration-300"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 0 : -8
                    }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-6 bg-white transform transition-all duration-300"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1
                    }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-6 bg-white transform transition-all duration-300"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? 0 : 8
                    }}
                  />
                </div>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {['About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-400/10 to-purple-400/10 border border-white/10 text-white hover:bg-white/10 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault(); // prevent the default anchor jump
                      const id = item.toLowerCase();
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {positions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              initial={{ x: pos.x, y: pos.y }}
              animate={{ y: [null, -100, window.innerHeight + 100] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-spin" style={{ animation: 'spin 20s linear infinite' }} />
              <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
                <span className="text-4xl p-4 font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  MARK
                </span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Full Stack Developer
            </span>
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl mb-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSkill}
                className="text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {skills[currentSkill]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg font-semibold text-white relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            
            <a href="/Mark.pdf" download>
              <motion.button
                className="px-8 py-4 border-2 border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.button>
            </a>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Technical Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                className="group relative p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">
                      {skill.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{skill}</h3>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.random() * 30 + 70}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative z-10">
                  <div className="w-full h-48 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-4xl opacity-50">🚀</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm border border-cyan-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      className="w-full py-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg font-semibold text-white opacity-80 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      ref={index === 0 ? btnRef : null} // optional: only apply ref to the first button
                    >
                      View Project
                    </motion.button>
                  </a>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let&apos;s Build Something Amazing
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to bring your ideas to life with cutting-edge technology
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:markchizoba5093@gmail.com"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg font-semibold text-white relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">📧 Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/mark-chukwuzoba-3a63981b6/"
              className="px-8 py-4 border-2 border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              💻 Linkedin
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
