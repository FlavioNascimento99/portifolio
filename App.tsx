import { ArrowUpRight, ChevronDown, Code2, Database, Github, Layers, Linkedin, Mail, Moon, Terminal, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { NeoBadge, NeoButton, NeoCard, ProjectModal, ScrollReveal, SpotifyWidget, Hero } from './components';
import { TextAnimate } from './components/ui/TextAnimate';
import { Highlighter } from './components/ui/Highlighter';
import { HighlightedText } from './components/ui/HighlightedText';
import { useRandomPhoto } from './hooks';
import { Project } from './types';
// import { TerminalChat } from './components/sections'; // TODO: Desenvolver J-BOT customizado
import { ABOUT_TEXT, GITHUB_LINKS, NAV_LINKS, PROJECTS, SKILLS, EXPERIENCES } from './constants';

const EXP_HIGHLIGHTS: Record<number, { words: { word: string; action?: "highlight" | "underline"; color?: string }[] }> = {
  1: {
    words: [
      { word: "arquitetura hexagonal", action: "highlight", color: "#ffd1dc" },
      { word: "blue-green deploy", action: "underline", color: "#87CEFA" },
      { word: "workers", action: "highlight", color: "#FF9800" },
      { word: "gateways", action: "highlight", color: "#FF9800" },
      { word: "integrações com IA", action: "underline", color: "#87CEFA" },
      { word: "Docker", action: "highlight", color: "#ffd1dc" },
      { word: "Kubernetes", action: "highlight", color: "#87CEFA" },
      { word: "Git Flow", action: "underline", color: "#FF9800" },
    ],
  },
  2: {
    words: [
      { word: "identidade visual", action: "highlight", color: "#ffd1dc" },
      { word: "microsserviços", action: "underline", color: "#87CEFA" },
      { word: "design patterns", action: "highlight", color: "#FF9800" },
      { word: "UI e UX", action: "underline", color: "#ffd1dc" },
    ],
  },
  3: {
    words: [
      { word: "Java", action: "highlight", color: "#ffd1dc" },
      { word: "Spring Boot", action: "highlight", color: "#87CEFA" },
      { word: "Docker", action: "highlight", color: "#FF9800" },
      { word: "Kubernetes", action: "highlight", color: "#ffd1dc" },
      { word: "API REST", action: "underline", color: "#87CEFA" },
      { word: "Spring Security", action: "underline", color: "#FF9800" },
    ],
  },
};

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedExperiences, setExpandedExperiences] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});
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

  const toggleExperience = (id: number) => {
    setExpandedExperiences(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Preenche esse campo antes de executar.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido — confere o formato.';
    }
    if (!formData.message.trim()) {
      errors.message = 'A mensagem não pode vir vazia.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

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
      <nav className="fixed top-0 left-0 w-full bg-neo-black border-b-4 border-neo-yellow z-40 shadow-neo-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 md:py-4 flex items-center justify-between gap-4">
          <div className="font-black text-sm md:text-xl lg:text-2xl tracking-tighter flex items-center gap-1 md:gap-2 text-[var(--text)]">
             <div className="w-6 h-6 md:w-8 md:h-8 bg-neo-yellow text-black flex items-center justify-center border-2 border-black shadow-neo-sm text-xs md:text-base">
               {`{}`}
             </div>
             <span className="hidden sm:inline">NASCIMENTO.DEV</span>
             <span className="sm:hidden">N.DEV</span>
          </div>

          <div className="hidden md:flex items-center gap-1 lg:gap-2 font-mono text-xs lg:text-sm font-bold text-[var(--text)]">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="min-h-11 flex items-center px-2 lg:px-3 hover:bg-neo-yellow hover:text-black transition-colors"
              >
                ./{link.label}
              </a>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="min-h-11 flex items-center justify-center gap-1 md:gap-2 bg-white text-black border-2 border-black px-3 shadow-neo-sm font-mono font-bold text-[0.6rem] md:text-xs uppercase"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 pb-2 font-mono text-[0.65rem] font-bold text-[var(--text)] scrollbar-hide">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-11 flex items-center px-3 whitespace-nowrap hover:bg-neo-yellow hover:text-black transition-colors"
            >
              ./{link.label}
            </a>
          ))}
        </div>
      </nav>

      <Hero photoUrl={randomPhotoUrl} />

      <div className="border-y-4 border-black bg-neo-yellow text-black overflow-hidden py-2 md:py-3 font-mono text-xs md:text-sm lg:text-base font-bold">
        <div className="whitespace-nowrap animate-marquee">
          <span className="inline-block">JAVA • SPRING BOOT • MICROSERVICES • KOTLIN • ANGULAR • FIREBASE • NODEJS • DESIGN PATTERN • TAILWINDCSS • SQLITE • C# • RUBY • ON RAILS • JETPACK COMPOSE • POSTGRESQL • AWS • ASP.NET • DJANGO • DOCKER • GIT • MAVEN • GRADLE • INTELLIJ IDEA • JIRA • POSTMAN • WSL • ANDROID STUDIO • FIGMA • ARCH LINUX</span><span className="inline-block"> JAVA • SPRING BOOT • MICROSERVICES • KOTLIN • ANGULAR • FIREBASE • NODEJS • DESIGN PATTERN • TAILWINDCSS • SQLITE • C# • RUBY • ON RAILS • JETPACK COMPOSE • POSTGRESQL • AWS • ASP.NET • DJANGO • DOCKER • GIT • MAVEN • GRADLE • INTELLIJ IDEA • JIRA • POSTMAN • WSL • ANDROID STUDIO • FIGMA • ARCH LINUX</span>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 px-4 md:px-12 max-w-4xl mx-auto scroll-mt-24 md:scroll-mt-20">
        <ScrollReveal direction="up" className="flex items-end gap-3 md:gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black uppercase bg-white text-black border-4 border-black px-3 py-2 inline-block shadow-neo transform rotate-1">Quem_Sou_Eu</h2>
          <div className="h-4 flex-1 bg-[var(--on-surface)] mb-4 hidden md:block"></div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <NeoCard color="bg-[var(--surface)]" hoverEffect={false} className="space-y-4 md:space-y-6">
            <p className="font-mono text-xs md:text-sm lg:text-base leading-relaxed">
              Entrei em Sistemas para Internet no Instituto Federal em 2019 sem saber muito bem onde ia parar — mas o primeiro contato profissional, ainda cedo, veio através de HTML/CSS, e foi o suficiente pra virar{" "}
              <Highlighter action="highlight" color="#ffd1dc" isView>paixão</Highlighter>.
              Desde então sempre puxei mais pro front-end, pelo gosto de{" "}
              <Highlighter action="underline" color="#87CEFA" isView>transformar interface em experiência de verdade</Highlighter>,
              e ainda na graduação comecei a pegar freelas pra pequenos e médios negócios, aprendendo a tocar um projeto sozinho,{" "}
              <Highlighter action="underline" color="#FF9800" isView>do briefing até o deploy</Highlighter>.
            </p>
            <p className="font-mono text-xs md:text-sm lg:text-base leading-relaxed">
              Com o tempo, essa curiosidade foi puxando pro resto da stack. Hoje penso em{" "}
              <Highlighter action="highlight" color="#87CEFA" isView>software de ponta a ponta</Highlighter>:
              gosto de entender o cenário e desenhar a{" "}
              <Highlighter action="underline" color="#FF9800" isView>arquitetura antes de sair codando</Highlighter>,
              e é isso que guia meu trabalho — seja reconstruindo a identidade visual de sistemas internos, refatorando monólitos antigos rumo a{" "}
              <Highlighter action="highlight" color="#ffd1dc" isView>microsserviços</Highlighter>,
              ou desenhando workers, gateways e{" "}
              <Highlighter action="underline" color="#87CEFA" isView>integrações com IA</Highlighter>{" "}
              que sustentam operações inteiras por trás dos panos.
            </p>
            <p className="font-mono text-xs md:text-sm lg:text-base leading-relaxed">
              No fim, o que não mudou desde 2019 foi o gosto por{" "}
              <Highlighter action="highlight" color="#FF9800" isView>pegar um problema real e ir até o fim dele</Highlighter> —
              do primeiro esboço em HTML até{" "}
              <Highlighter action="underline" color="#ffd1dc" isView>um sistema em produção</Highlighter>,
              sozinho ou em time.
            </p>
          </NeoCard>
        </ScrollReveal>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-28 px-4 md:px-12 max-w-7xl mx-auto scroll-mt-24 md:scroll-mt-20">
        <ScrollReveal direction="up" className="flex items-end gap-3 md:gap-4 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black uppercase bg-neo-yellow text-black border-4 border-black px-3 py-2 inline-block shadow-neo transform -rotate-1">Core_Skills</h2>
            <div className="h-4 flex-1 bg-[var(--on-surface)] mb-4 hidden md:block"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SKILLS.map((skillGroup, index) => (
            <ScrollReveal key={skillGroup.category} direction="up" delay={index * 100} className="h-full">
              <NeoCard className="h-full" color="bg-[var(--surface)]">
                <div className="border-b-4 border-black pb-2 mb-3 md:mb-4 flex items-center justify-between">
                  <h3 className="font-black text-sm md:text-lg lg:text-xl">{skillGroup.category}</h3>
                  {skillGroup.category === 'Com o que escrevo...' && <Code2 size={20} />}
                  {skillGroup.category === 'O que acelera meus projetos...' && <Layers size={20} />}
                  {skillGroup.category === 'Como guardo meus dados...' && <Database size={20} />}
                  {skillGroup.category === 'Ferramentas que domino...' && <Terminal size={20} />}
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
      <section id="experience" className="py-24 md:py-40 bg-[var(--band)] border-y-4 border-neo-pink scroll-mt-24 md:scroll-mt-20">
        <div className="px-4 md:px-12 max-w-5xl mx-auto">
          <ScrollReveal direction="up" className="flex items-end gap-3 md:gap-4 mb-8 md:mb-12">
            <h2 className="bg-neo-pink text-black border-4 border-black p-2 inline-block shadow-neo transform rotate-1 text-base sm:text-xl md:text-4xl lg:text-6xl font-black uppercase">Work_Experience</h2>
            <div className="h-4 flex-1 bg-[var(--on-surface)] mb-4 hidden md:block"></div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="border-4 border-black shadow-neo-lg bg-[var(--surface)]">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 border-b-4 border-black bg-black px-3 md:px-4 py-2 md:py-3">
                <span className="w-3 h-3 rounded-full bg-neo-pink border border-white/40"></span>
                <span className="w-3 h-3 rounded-full bg-neo-yellow border border-white/40"></span>
                <span className="w-3 h-3 rounded-full bg-neo-green border border-white/40"></span>
                <span className="ml-2 font-mono text-[0.65rem] md:text-xs text-white/70">~/work_history.log</span>
              </div>

              <div className="divide-y-4 divide-black">
                {EXPERIENCES.map(exp => {
                  const isOpen = expandedExperiences.has(exp.id);
                  return (
                    <div key={exp.id} className="p-4 md:p-6">
                      <button
                        onClick={() => toggleExperience(exp.id)}
                        className="w-full text-left"
                        aria-expanded={isOpen}
                      >
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono">
                          <span className="text-neo-pink font-black">$</span>
                          <span className="font-black text-sm md:text-lg uppercase">{exp.role}</span>
                          <span className="text-[var(--muted)] text-xs md:text-sm">@ {exp.company}</span>
                          <span className="ml-auto flex items-center gap-2">
                            <span className="hidden sm:inline bg-neo-yellow text-black border-2 border-black px-2 py-0.5 font-bold text-[0.65rem] md:text-xs shadow-neo-sm">
                              {exp.period}
                            </span>
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </span>
                        </div>
                        <p className="mt-2 font-mono text-xs md:text-sm text-[var(--muted)]">
                          <HighlightedText text={exp.summary} words={EXP_HIGHLIGHTS[exp.id]?.words ?? []} />
                        </p>
                      </button>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {exp.techStack.slice(0, 4).map(tech => (
                          <NeoBadge key={tech} label={tech} color="bg-neo-blue" />
                        ))}
                        {!isOpen && exp.techStack.length > 4 && (
                          <span className="font-mono text-xs text-[var(--muted)]">+{exp.techStack.length - 4}</span>
                        )}
                      </div>

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t-4 border-black">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="flex-shrink-0 flex flex-row md:flex-col items-center gap-3 md:gap-2">
                              {exp.logo ? (
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--surface)] border-4 border-black shadow-neo-sm flex items-center justify-center overflow-hidden p-1">
                                  <img src={exp.logo} alt={`${exp.company} logo`} loading="lazy" className="w-full h-full object-contain" />
                                </div>
                              ) : (
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-neo-black border-4 border-black shadow-neo-sm flex items-center justify-center text-white font-black">
                                  {`{}`}
                                </div>
                              )}
                              <span className="bg-neo-green text-black border-2 border-black px-2 py-1 font-mono text-[0.6rem] md:text-xs font-bold shadow-neo-sm">
                                {exp.type}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-[0.65rem] md:text-xs text-[var(--muted)] mb-3">
                                {exp.location} · {exp.duration}
                              </p>

                              <p className="font-mono text-xs md:text-sm leading-relaxed border-l-4 border-black pl-3 bg-[var(--surface-2)] py-2 mb-3">
                                <HighlightedText text={exp.description} words={EXP_HIGHLIGHTS[exp.id]?.words ?? []} />
                              </p>

                              <ul className="space-y-2 mb-3">
                                {exp.highlights.map(item => (
                                  <li key={item} className="flex items-start gap-2 font-mono text-xs md:text-sm">
                                    <span className="w-2 h-2 bg-[var(--on-surface)] mt-1.5 flex-shrink-0"></span>
                                    <HighlightedText text={item} words={EXP_HIGHLIGHTS[exp.id]?.words ?? []} />
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
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-40 bg-[var(--band)] border-y-4 border-neo-blue scroll-mt-24 md:scroll-mt-20">
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="flex items-end gap-3 md:gap-4 mb-8 md:mb-12">
            <h2 className="bg-neo-blue text-black border-4 border-black p-2 inline-block shadow-neo transform -rotate-1 text-base sm:text-xl md:text-4xl lg:text-6xl xl:text-7xl font-black uppercase">Deployed_Modules</h2>
            <div className="h-4 flex-1 bg-[var(--on-surface)] mb-4 hidden md:block"></div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {PROJECTS.map((project, index) => (
              <ScrollReveal key={project.id} direction="up" delay={(index % 2) * 100} className="h-full">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="no-underline text-left w-full h-full"
                >
                  <NeoCard color={project.color} className="relative group cursor-pointer h-full hover:shadow-neo-lg transition-shadow">
                    <div className="absolute top-4 right-4 bg-white text-black border-2 border-black p-1 rounded-full opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={24} />
                    </div>
                    {project.access && (
                      <span className="inline-block bg-black text-white px-2 py-0.5 mb-2 font-mono text-[0.6rem] md:text-xs font-bold uppercase">
                        codigo fechado
                      </span>
                    )}
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-black text-black mb-3 pr-8">{project.title}</h3>
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
      <section id="contact" className="py-24 md:py-40 border-y-4 border-neo-green scroll-mt-24 md:scroll-mt-20">
        <div className="px-4 md:px-12 max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="flex items-end gap-3 md:gap-4 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black uppercase bg-neo-green text-black border-4 border-black px-3 py-2 inline-block shadow-neo transform rotate-1">Execute_Contact</h2>
            <div className="h-4 flex-1 bg-[var(--on-surface)] mb-4 hidden md:block"></div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 items-stretch">
            {/* Form */}
            <ScrollReveal direction="left">
              <div className="bg-white text-black border-4 border-black p-4 md:p-8 shadow-neo-lg text-left h-full">
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <label className="font-mono font-bold">VAR_NAME</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 border-4 border-black p-3 font-mono focus:bg-neo-yellow focus:outline-none transition-colors"
                          placeholder="Nome do remetente"
                        />
                        {fieldErrors.name && (
                          <p className="bg-neo-pink text-black border-2 border-black px-2 py-1 font-mono text-xs font-bold inline-block">{fieldErrors.name}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="font-mono font-bold">VAR_EMAIL</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 border-4 border-black p-3 font-mono focus:bg-neo-yellow focus:outline-none transition-colors"
                          placeholder="email@exemplo.com"
                        />
                        {fieldErrors.email && (
                          <p className="bg-neo-pink text-black border-2 border-black px-2 py-1 font-mono text-xs font-bold inline-block">{fieldErrors.email}</p>
                        )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono font-bold">VAR_MESSAGE</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 border-4 border-black p-3 font-mono focus:bg-neo-yellow focus:outline-none transition-colors"
                      placeholder="System.out.print(mensagem)..."
                    ></textarea>
                    {fieldErrors.message && (
                      <p className="bg-neo-pink text-black border-2 border-black px-2 py-1 font-mono text-xs font-bold inline-block">{fieldErrors.message}</p>
                    )}
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
            </ScrollReveal>

            {/* Terminal status panel */}
            <ScrollReveal direction="right" delay={100}>
              <div className="bg-black text-white border-4 border-black shadow-neo-lg p-4 md:p-8 font-mono text-xs md:text-sm h-full flex flex-col justify-between">
                <div className="space-y-5 md:space-y-6">
                  <div>
                    <p className="text-neo-green">$ whoami</p>
                    <p className="text-lg md:text-2xl font-black uppercase mt-1">Flávio Nascimento</p>
                    <p className="text-gray-400">Desenvolvedor de Software Fullstack</p>
                  </div>
                  <div>
                    <p className="text-neo-green">$ cat status.txt</p>
                    <p className="mt-1 leading-relaxed">
                      <Highlighter action="highlight" color="#ffd1dc" isView>Aberto a novas oportunidades</Highlighter>. Sem enrolação: <Highlighter action="underline" color="#87CEFA" isView>respondo rápido e entrego o que combinei</Highlighter><span className="terminal-cursor">_</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-neo-green">$ ls ./channels</p>
                    <div className="flex flex-col gap-2 mt-2">
                      <a href="https://github.com/FlavioNascimento99" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neo-yellow transition-colors">
                        <Github size={16} /> github.com/FlavioNascimento99
                      </a>
                      <a href="https://www.linkedin.com/in/0xnascimento/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neo-yellow transition-colors">
                        <Linkedin size={16} /> linkedin.com/in/0xnascimento
                      </a>
                      <a href="mailto:contato.nascimento.dev@gmail.com" className="flex items-center gap-2 hover:text-neo-yellow transition-colors">
                        <Mail size={16} /> contato.nascimento.dev@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-[0.65rem] mt-6">process exited with code 0</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 text-center font-mono border-t-4 border-neo-pink">
        <p className="text-sm md:text-base font-bold">© {new Date().getFullYear()} NASCIMENTO.DEV</p>
        <p className="text-base md:text-xl font-black uppercase mt-2">
          <span className="text-neo-yellow">NO BUGS</span> (i hope), <span className="text-neo-yellow">ONLY FEATURES</span> (supposedly)
        </p>
        <p className="text-[0.65rem] text-gray-500 mt-3">BUILT WITH REACT + TAILWIND</p>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Chat Component */}
      {/* <TerminalChat /> TODO: Ativar quando customizar o J-BOT */}
      
      {/* Spotify Widget */}
      <SpotifyWidget />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        @keyframes terminal-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .terminal-cursor {
          display: inline-block;
          animation: terminal-blink 1s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .terminal-cursor {
            animation: none;
            opacity: 1;
          }
          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .animate-marquee,
          .animate-bounce {
            animation: none !important;
          }
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
        .text-neo-yellow { color: var(--yellow); }
        .text-neo-blue { color: var(--cyan); }
        .text-neo-pink { color: var(--pink); }
        .text-neo-green { color: var(--green); }
        .hover\:text-neo-yellow:hover { color: var(--yellow); }
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
