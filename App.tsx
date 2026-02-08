import { ArrowUpRight, Code2, Database, Github, Linkedin, Mail, Menu, Server, X } from 'lucide-react';
import React, { useState } from 'react';
import { NeoBadge, NeoButton, NeoCard } from './components/NeoComponents';
// import { TerminalChat } from './components/TerminalChat'; // TODO: Desenvolver J-BOT customizado
import { GITHUB_LINKS, HERO_TEXT, PROJECTS, SKILLS, SUB_HERO_TEXT } from './constants';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

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
    <div className="min-h-screen bg-[#f0f0f0] text-black overflow-x-hidden selection:bg-neo-pink selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b-4 border-black z-40 px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="font-black text-xl md:text-2xl tracking-tighter flex items-center gap-2">
           <div className="w-8 h-8 bg-neo-black text-white flex items-center justify-center border-2 border-neo-green shadow-neo-sm">
             {`{}`}
           </div>
           NASCIMENTO.DEV
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-mono font-bold text-sm">
          {['ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:underline decoration-4 decoration-neo-pink underline-offset-4"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden border-2 border-black p-1 shadow-neo-sm active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-neo-yellow z-30 flex flex-col items-center justify-center gap-8 font-black text-4xl">
          {['ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-white hover:bg-black px-4 transform rotate-[-2deg] hover:rotate-2 transition-all border-4 border-transparent hover:border-white"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="about" className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="flex-1 space-y-6 w-full">
          <div className="inline-block bg-neo-pink border-2 border-black px-3 py-1 font-mono font-bold text-xs md:text-sm shadow-neo-sm transform -rotate-1">
            v0.0.3 RELEASE
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight md:leading-none uppercase break-words drop-shadow-[2px_2px_0_rgba(0,0,0,1)] md:drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            {HERO_TEXT}
          </h1>
          <p className="font-mono text-sm sm:text-base md:text-lg lg:text-xl bg-white border-2 border-black p-3 md:p-4 shadow-neo max-w-2xl">
            {SUB_HERO_TEXT}
          </p>
          <div className="flex gap-2 md:gap-4 pt-4 flex-wrap">
            <NeoButton onClick={() => scrollToSection('projects')}>O que já fiz?</NeoButton>
            <NeoButton variant="secondary" onClick={() => scrollToSection('contact')}>Me Contate</NeoButton>
          </div>
        </div>
        
        {/* Abstract Graphic */}
        <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
           <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-neo-blue border-4 border-black z-10 flex items-center justify-center shadow-neo-lg">
                 <Server size={60} className="sm:w-24 sm:h-24 md:w-32 md:h-32" strokeWidth={1.5} />
              </div>
              <div className="absolute inset-0 bg-neo-yellow border-4 border-black z-0 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4"></div>
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white border-4 border-black p-2 z-20 shadow-neo font-mono font-bold text-xs md:text-sm animate-bounce">
                System.out.println("Opa, bão?!");
              </div>
           </div>
        </div>
      </section>

      <div className="border-t-4 border-black bg-neo-black text-white overflow-hidden py-3 font-mono text-lg font-bold">
        <div className="whitespace-nowrap animate-marquee">
          JAVA • SPRING BOOT • MICROSERVICES • KOTLIN • ANGULAR • FIREBASE • NODEJS • DESIGN PATTERN • TAILWINDCSS • SQLITE • C# • RUBY • ON RAILS • JETPACK COMPOSE • POSTGRESQL • AWS • ASP.NET • DJANGO • DOCKER • GIT • MAVEN • GRADLE • INTELLIJ IDEA • JIRA • POSTMAN • WSL • ANDROID STUDIO • FIGMA • ARCH LINUX
        </div>
      </div>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-end gap-4 mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase">O QUE SEI</h2>
            <div className="h-4 flex-1 bg-black mb-4 hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skillGroup) => (
            <NeoCard key={skillGroup.category} className="h-full" color="bg-white">
              <div className="border-b-4 border-black pb-2 mb-4 flex items-center justify-between">
                <h3 className="font-black text-xl">{skillGroup.category}</h3>
                {skillGroup.category === 'CORE' && <Code2 size={20} />}
                {skillGroup.category === 'INFRA' && <Server size={20} />}
                {skillGroup.category === 'FRAMEWORKS' && <Code2 size={20} />}
                {skillGroup.category === 'TOOLS' && <Database size={20} />}
              </div>
              <ul className="space-y-2 font-mono">
                {skillGroup.items.map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </NeoCard>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-neo-blue border-y-4 border-black">
        <div className="px-4 md:px-12 max-w-7xl mx-auto">
          <div className="bg-white border-3 border-black p-2 inline-block shadow-neo mb-8 transform -rotate-1">
            <h2 className="text-xl sm:text-2xl md:text-7xl font-black uppercase">Deployed_Modules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <a key={project.id} href={GITHUB_LINKS[project.id]} target="_blank" rel="noopener noreferrer" className="no-underline">
                <NeoCard color={project.color} className="relative group cursor-pointer h-full hover:shadow-neo-lg transition-shadow">
                  <div className="absolute top-4 right-4 bg-white border-2 border-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={24} />
                  </div>
                  <h3 className="text-1xl sm:text-1xl md:text-3xl font-black mb-3 pr-8">{project.title}</h3>
                  <p className="font-mono text-sm md:text-base mb-6 border-l-4 border-black pl-3 bg-white/50 py-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map(tech => (
                      <NeoBadge key={tech} label={tech} color="bg-white" />
                    ))}
                  </div>
                </NeoCard>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-12 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 uppercase">Execute_Contact</h2>
        <div className="bg-white border-4 border-black p-8 shadow-neo-lg text-left">
           <form className="space-y-6" onSubmit={handleSubmit}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="flex justify-center gap-6 mt-12">
           <a href="https://github.com/FlavioNascimento99" target="_blank" rel="noopener noreferrer" className="bg-black text-white p-4 border-4 border-transparent hover:border-neo-pink hover:bg-white hover:text-black transition-all shadow-neo hover:shadow-none">
              <Github size={32} />
           </a>
           <a href="https://www.linkedin.com/in/0xnascimento/" target="_blank" rel="noopener noreferrer" className="bg-neo-blue text-black p-4 border-4 border-black hover:translate-y-[-5px] transition-all shadow-neo">
              <Linkedin size={32} />
           </a>
           <a href="mailto:contato.nascimento.dev@gmail.com" className="bg-neo-green text-black p-4 border-4 border-black hover:translate-y-[-5px] transition-all shadow-neo">
              <Mail size={32} />
           </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 text-center font-mono border-t-4 border-neo-pink">
        <p>© {new Date().getFullYear()} NASCIMENTO.DEV // NO BUGS(I hope), ONLY FEATURES(supposedly)</p>
        <p className="text-xs text-gray-500 mt-2">BUILT WITH REACT + TAILWIND</p>
      </footer>

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
      `}</style>
    </div>
  );
}

export default App;
