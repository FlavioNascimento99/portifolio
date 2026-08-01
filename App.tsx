import { ArrowUpRight, Code2, Database, Github, Linkedin, Mail, Moon, Server, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { NeoBadge, NeoButton, NeoCard, ProjectModal, ScrollReveal, FloatingIcons } from './components';
import { useRandomPhoto } from './hooks';
import { Project } from './types';
// import { TerminalChat } from './components/sections'; // TODO: Desenvolver J-BOT customizado
import { GITHUB_LINKS, HERO_TEXT, PROJECTS, SKILLS, SUB_HERO_TEXT, EXPERIENCES } from './constants';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    return saved === 'dark' ? 'dark' : 'light';
  });
  const randomPhotoUrl = useRandomPhoto();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    try {
      const response = await fetch('https://formspree.io/f/xreabzqe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFeedback({ type: 'success', message: 'Mensagem enviada com sucesso!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFeedback({ type: 'error', message: 'Erro ao enviar. Tente novamente.' });
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'Erro na conexão. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden selection:bg-neo-pink selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-neo-black border-b-4 border-neo-yellow z-40 py-3 md:py-4 flex justify-center items-center shadow-neo-sm">
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-2 bg-white text-black border-2 border-black px-2 md:px-3 py-1 shadow-neo-sm font-mono font-bold text-[0.6rem] md:text-xs uppercase"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span className="hidden sm:inline">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
        <div className="font-black text-sm md:text-xl lg:text-2xl tracking-tighter flex items-center gap-1 md:gap-2 text-[var(--text)]">
           <div className="w-6 h-6 md:w-8 md:h-8 bg-neo-yellow text-black flex items-center justify-center border-2 border-black shadow-neo-sm text-xs md:text-base">
             {`{}`}
           </div>
           <span className="hidden sm:inline">NASCIMENTO.DEV</span>
           <span className="sm:hidden">NAÇ.DEV</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative overflow-hidden pt-20 pb-8 md:pt-32 md:pb-20 min-h-[85vh] flex items-center">
        <FloatingIcons />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-6 md:gap-12 items-center">
        <ScrollReveal direction="left" className="flex-1 space-y-6 w-full">
          <div className="inline-block bg-neo-pink text-black border-2 border-black px-3 py-1 font-mono font-bold text-xs md:text-sm shadow-neo-sm transform -rotate-1">
            v0.0.3 RELEASE
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight md:leading-none uppercase break-words text-[var(--text)] drop-shadow-[2px_2px_0_var(--pink)] md:drop-shadow-[4px_4px_0_var(--pink)]">
            {HERO_TEXT}
          </h1>
          <p className="font-mono text-sm sm:text-base md:text-lg lg:text-xl bg-white text-black border-2 border-black p-3 md:p-4 shadow-neo max-w-2xl">
            {SUB_HERO_TEXT}
          </p>
        </ScrollReveal>
        
        {/* Photo Section */}
        <ScrollReveal direction="right" delay={150} className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
           <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80">
              <div className="absolute inset-0 border-4 border-black z-10 overflow-hidden shadow-neo-lg">
                 {randomPhotoUrl && (
                   <img 
                     src={randomPhotoUrl} 
                     alt="Foto pessoal aleatória" 
                     className="w-full h-full object-cover"
                   />
                 )}
              </div>
              <div className="absolute inset-0 bg-neo-yellow border-4 border-black z-0 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4"></div>
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white text-black border-4 border-black p-2 z-20 shadow-neo font-mono font-bold text-xs md:text-sm animate-bounce">
                System.out.println("Opa, bão?!");
              </div>
            </div>
        </ScrollReveal>
        </div>
      </section>

      <div className="border-y-4 border-black bg-neo-yellow text-black overflow-hidden py-2 md:py-3 font-mono text-xs md:text-sm lg:text-base font-bold">
        <div className="whitespace-nowrap animate-marquee">
          <span className="inline-block">JAVA • SPRING BOOT • MICROSERVICES • KOTLIN • ANGULAR • FIREBASE • NODEJS • DESIGN PATTERN • TAILWINDCSS • SQLITE • C# • RUBY • ON RAILS • JETPACK COMPOSE • POSTGRESQL • AWS • ASP.NET • DJANGO • DOCKER • GIT • MAVEN • GRADLE • INTELLIJ IDEA • JIRA • POSTMAN • WSL • ANDROID STUDIO • FIGMA • ARCH LINUX</span><span className="inline-block"> JAVA • SPRING BOOT • MICROSERVICES • KOTLIN • ANGULAR • FIREBASE • NODEJS • DESIGN PATTERN • TAILWINDCSS • SQLITE • C# • RUBY • ON RAILS • JETPACK COMPOSE • POSTGRESQL • AWS • ASP.NET • DJANGO • DOCKER • GIT • MAVEN • GRADLE • INTELLIJ IDEA • JIRA • POSTMAN • WSL • ANDROID STUDIO • FIGMA • ARCH LINUX</span>
        </div>
      </div>

      {/* Skills Section */}
      <section id="skills" className="py-12 md:py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal direction="up" className="flex items-end gap-3 md:gap-4 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black uppercase bg-neo-yellow text-black border-4 border-black px-3 py-2 inline-block shadow-neo transform -rotate-1">O QUE SEI</h2>
            <div className="h-4 flex-1 bg-[var(--on-surface)] mb-4 hidden md:block"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SKILLS.map((skillGroup, index) => (
            <ScrollReveal key={skillGroup.category} direction="up" delay={index * 100} className="h-full">
              <NeoCard className="h-full" color="bg-[var(--surface)]">
                <div className="border-b-4 border-black pb-2 mb-3 md:mb-4 flex items-center justify-between">
                  <h3 className="font-black text-sm md:text-lg lg:text-xl">{skillGroup.category}</h3>
                  {skillGroup.category === 'CORE' && <Code2 size={20} />}
                  {skillGroup.category === 'INFRA' && <Server size={20} />}
                  {skillGroup.category === 'FRAMEWORKS' && <Code2 size={20} />}
                  {skillGroup.category === 'TOOLS' && <Database size={20} />}
                </div>
                <ul className="space-y-1 md:space-y-2 font-mono text-xs md:text-sm">
                  {skillGroup.items.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--on-surface)]"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </NeoCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 md:py-20 bg-[var(--band)] border-y-4 border-neo-pink">
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="bg-neo-pink text-black border-4 border-black p-2 inline-block shadow-neo mb-6 md:mb-8 transform rotate-1">
            <h2 className="text-base sm:text-xl md:text-4xl lg:text-6xl font-black uppercase">Work_Experience</h2>
          </ScrollReveal>

          <div className="space-y-6 md:space-y-8">
            {EXPERIENCES.map((exp, index) => (
              <ScrollReveal key={exp.id} direction={index % 2 === 0 ? 'left' : 'right'} className="w-full">
                <NeoCard color="bg-[var(--surface)]" className="relative">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex flex-row md:flex-col items-center gap-3 md:gap-2">
                      {exp.logo ? (
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--surface)] border-4 border-black shadow-neo-sm flex items-center justify-center overflow-hidden p-1">
                          <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-neo-black border-4 border-black shadow-neo-sm flex items-center justify-center text-white font-black">
                          {`{}`}
                        </div>
                      )}
                      <span className="bg-neo-blue border-2 border-black px-2 py-1 font-mono text-[0.6rem] md:text-xs font-bold shadow-neo-sm">
                        {exp.type}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg md:text-2xl lg:text-3xl font-black uppercase">{exp.role}</h3>
                          <p className="font-mono font-bold text-xs md:text-sm">{exp.company}</p>
                          <p className="font-mono text-[0.65rem] md:text-xs text-[var(--muted)]">{exp.location}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="bg-neo-yellow border-2 border-black px-2 py-1 font-mono text-[0.6rem] md:text-xs font-bold shadow-neo-sm">
                            {exp.period}
                          </span>
                          <span className="bg-neo-green border-2 border-black px-2 py-1 font-mono text-[0.6rem] md:text-xs font-bold shadow-neo-sm">
                            {exp.duration}
                          </span>
                        </div>
                      </div>

                      <p className="font-mono text-xs md:text-sm leading-relaxed border-l-4 border-black pl-3 bg-[var(--surface-2)] py-2 mb-3">
                        {exp.description}
                      </p>

                      <ul className="space-y-2 mb-3">
                        {exp.highlights.map(item => (
                          <li key={item} className="flex items-start gap-2 font-mono text-xs md:text-sm">
                            <span className="w-2 h-2 bg-[var(--on-surface)] mt-1.5 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map(tech => (
                          <NeoBadge key={tech} label={tech} color="bg-neo-yellow" />
                        ))}
                      </div>
                    </div>
                  </div>
                </NeoCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 bg-[var(--band)] border-y-4 border-neo-blue">
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="bg-neo-blue text-black border-4 border-black p-2 inline-block shadow-neo mb-6 md:mb-8 transform -rotate-1">
            <h2 className="text-base sm:text-xl md:text-4xl lg:text-6xl xl:text-7xl font-black uppercase">Deployed_Modules</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {PROJECTS.map((project, index) => (
              <ScrollReveal key={project.id} direction="up" delay={(index % 2) * 100} className="h-full">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="no-underline text-left w-full h-full"
                >
                  <NeoCard color={project.color} className="relative group cursor-pointer h-full hover:shadow-neo-lg transition-shadow">
                    <div className="absolute top-4 right-4 bg-white border-2 border-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={24} />
                    </div>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 pr-8">{project.title}</h3>
                    <p className="font-mono text-xs md:text-sm lg:text-base mb-4 md:mb-6 border-l-4 border-black pl-3 bg-[var(--surface-2)] py-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.map(tech => (
                        <NeoBadge key={tech} label={tech} color="bg-white" />
                      ))}
                    </div>
                  </NeoCard>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 md:px-12 max-w-4xl mx-auto text-center">
        <ScrollReveal direction="up">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black uppercase bg-neo-green text-black border-4 border-black px-3 py-2 inline-block shadow-neo transform rotate-1 mb-6 md:mb-8">Execute_Contact</h2>
          <div className="bg-white text-black border-4 border-black p-4 md:p-8 shadow-neo-lg text-left">
           <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                    <label className="font-mono font-bold">VAR_NAME</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-100 border-4 border-black p-3 font-mono focus:bg-neo-yellow focus:outline-none transition-colors" 
                      placeholder="Nome do remetente" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="font-mono font-bold">VAR_EMAIL</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-100 border-4 border-black p-3 font-mono focus:bg-neo-yellow focus:outline-none transition-colors" 
                      placeholder="email@exemplo.com" 
                    />
                </div>
             </div>
             <div className="space-y-2">
                <label className="font-mono font-bold">VAR_MESSAGE</label>
                <textarea 
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-100 border-4 border-black p-3 font-mono focus:bg-neo-yellow focus:outline-none transition-colors" 
                  placeholder="System.out.print(mensagem)..."
                ></textarea>
             </div>
             {feedback && (
               <div className={`p-3 border-2 border-black font-mono text-sm ${
                 feedback.type === 'success' 
                   ? 'bg-neo-green text-black' 
                   : 'bg-neo-pink text-black'
               }`}>
                 {feedback.message}
               </div>
             )}
             <NeoButton 
               className="w-full text-xl" 
               variant="accent"
               disabled={isLoading}
             >
               {isLoading ? 'SENDING...' : 'SEND_PACKET'}
             </NeoButton>
           </form>
        </div>

        <div className="flex justify-center gap-3 md:gap-6 mt-8 md:mt-12">
           <a href="https://github.com/FlavioNascimento99" target="_blank" rel="noopener noreferrer" className="bg-black text-white p-2 md:p-4 border-4 border-transparent hover:border-neo-pink hover:bg-white hover:text-black transition-all shadow-neo hover:shadow-none">
              <Github size={24} className="md:w-8 md:h-8" />
           </a>
           <a href="https://www.linkedin.com/in/0xnascimento/" target="_blank" rel="noopener noreferrer" className="bg-neo-blue text-black p-2 md:p-4 border-4 border-black hover:translate-y-[-5px] transition-all shadow-neo">
              <Linkedin size={24} className="md:w-8 md:h-8" />
           </a>
            <a href="mailto:contato.nascimento.dev@gmail.com" className="bg-neo-green text-black p-2 md:p-4 border-4 border-black hover:translate-y-[-5px] transition-all shadow-neo">
               <Mail size={24} className="md:w-8 md:h-8" />
            </a>
         </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 text-center font-mono border-t-4 border-neo-pink">
        <p>© {new Date().getFullYear()} NASCIMENTO.DEV // NO BUGS(I hope), ONLY FEATURES(supposedly)</p>
        <p className="text-xs text-gray-500 mt-2">BUILT WITH REACT + TAILWIND</p>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Chat Component */}
      {/* <TerminalChat /> TODO: Ativar quando customizar o J-BOT */}
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          will-change: opacity, transform;
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translate(0, 0);
        }
        .reveal-from-up { transform: translateY(40px); }
        .reveal-from-down { transform: translateY(-40px); }
        .reveal-from-left { transform: translateX(-60px); }
        .reveal-from-right { transform: translateX(60px); }
        .reveal-from-up.is-visible,
        .reveal-from-down.is-visible,
        .reveal-from-left.is-visible,
        .reveal-from-right.is-visible {
          transform: translate(0, 0);
        }

        .bg-neo-yellow { background-color: var(--yellow); }
        .bg-neo-blue { background-color: var(--cyan); }
        .bg-neo-pink { background-color: var(--pink); }
        .bg-neo-green { background-color: var(--green); }
        .bg-neo-black { background-color: var(--surface); }
        .border-neo-yellow { border-color: var(--yellow); }
        .border-neo-blue { border-color: var(--cyan); }
        .border-neo-pink { border-color: var(--pink); }
        .border-neo-green { border-color: var(--green); }
        .border-black { border-color: var(--border); }
        .bg-black { background-color: var(--deep); }
        .bg-gray-100 { background-color: var(--input); }
        .text-gray-500, .text-gray-600 { color: var(--muted); }
        .shadow-neo { box-shadow: 5px 5px 0 0 var(--shadow); }
        .shadow-neo-sm { box-shadow: 3px 3px 0 0 var(--shadow); }
        .shadow-neo-lg { box-shadow: 8px 8px 0 0 var(--shadow); }
      `}</style>
    </div>
  );
}

export default App;
