import { Experience, Project, Skill } from './types';

export const HERO_TEXT = "DESENVOLVEDOR DE SOFTWARE FULLSTACK.";
export const SUB_HERO_TEXT = "DESENVOLVEDOR JAVA // SPRING BOOT // POSTGRESQL // WEB DEVELOPMENT // DESIGN DE SOFTWARE";

export const PROJECTS: Project[] = [
  {
    id:           1,
    title:        "VERITAS",
    subtitle:     "Sistema de Gerenciamento de Processos Universitários",
    description:  "Aplicação de criaçao e acompanhamento de Processos internos no contexto universitário, atribuição de tarefas à outros usuários, deferimento, anexo de documentos em PDF e acompanhamento do progresso.",
    fullDescription: "VERITAS é uma aplicação robusta desenvolvida com Java 21 e Spring Boot, projetada para gerenciar fluxos de processos internos em ambientes universitários. O sistema permite criar, monitorar e acompanhar processos, atribuir tarefas para diferentes usuários, implementar workflows de deferimento, anexar documentos em PDF e acompanhar o progresso em tempo real. O frontend utiliza Tailwind CSS para uma interface moderna e responsiva, enquanto o Thymeleaf gerencia a renderização server-side. A persistência de dados é garantida por PostgreSQL.",
    techStack:    [
                    "Java 21",
                    "Spring Boot",
                    "Spring Data JPA",
                    "Spring Security",
                    "Tailwind CSS",
                    "Thymeleaf", 
                    "PostgreSQL", 
                  ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
        alt: 'VERITAS Dashboard'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
        alt: 'VERITAS Task Management'
      }
    ],
    color:        "bg-neo-blue"
  },
  {
    id:           2,
    title:        "Czar Managment",
    subtitle:     "Plataforma de Gerenciamento de Projetos Ágil",
    description:  "Aplicação de criação e gerenciamento de serviços, pensado para um cenário de desenvolvimento de software, criando grupos, etapas, tarefas, atribuição de tarefas à outros usuários, anexo de documentos em PDF e acompanhamento do progresso.",
    fullDescription: "Czar Management é uma plataforma completa de gerenciamento de projetos desenvolvida com Ruby on Rails. Permite que equipes criem grupos de trabalho, definam etapas de projeto, criem e gerenciem tarefas, atribuam responsabilidades aos membros da equipe, compartilhem documentos em PDF e acompanhem o progresso em tempo real. O sistema foi dockerizado para facilitar deployment e utiliza SQLite3 como banco de dados local. A interface é construída com Bootstrap, oferecendo uma experiência intuitiva e responsiva. Executado em ambiente WSL para máxima flexibilidade.",
    techStack:    [
                    "Ruby",
                    "On Rails",
                    "SQLite3",
                    "Bootstrap",
                    "WSL",
                    "Docker",
                  ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
        alt: 'Czar Management Interface'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551454014-5d694c36fb5b?w=500',
        alt: 'Czar Management Tasks'
      }
    ],
    color:        "bg-neo-pink"
  },
  {
    id:           3,
    title:        "Broadcast Application",
    subtitle:     "Plataforma Event-Driven de Tópicos e Posts com Pub/Sub em Tempo Real",
    description:  "Aplicação full-stack de publicação de tópicos e posts em tempo real. Conecta frontend React, backend Node.js e um middleware Pub/Sub distribuído em Go, com atualizações via WebSocket e latência inferior a 100ms.",
    fullDescription: "Broadcast Application é uma plataforma full-stack event-driven construída para publicação de tópicos e posts em tempo real. O frontend em React se conecta ao backend em Node.js/Express, que orquestra a persistência em PostgreSQL via Prisma. No coração da arquitetura está um middleware Pub/Sub distribuído escrito em Go (broker, publisher e subscriber), que entrega mensagens aos clientes via WebSocket com latência inferior a 100ms. O sistema foi projetado para escalar horizontalmente, contando com failover automático e arquitetura resiliente. Cada camada possui seu próprio container Docker, documentação de lifecycle e guias de conformidade de requisitos.",
    techStack:    [
                    "React",
                    "TypeScript",
                    "Node.js",
                    "Express",
                    "Go",
                    "WebSocket",
                    "Socket.IO",
                    "PostgreSQL",
                    "Prisma",
                    "Docker",
                  ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500',
        alt: 'Broadcast Application Architecture'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500',
        alt: 'Broadcast Application Real-time'
      }
    ],
    color:        "bg-neo-yellow"
  },
  {
    id:           4,
    title:        "Elettra Landing Page",
    subtitle:     "Landing Page ELETTRA Engenharia & Soluções",
    description:  "Landing page institucional desenvolvida para a ELETTRA Engenharia & Soluções (João Pessoa - PB). Apresenta serviços de engenharia elétrica, subestações, redes de distribuição, energia fotovoltaica, obras civis e segurança do trabalho.",
    fullDescription: "Elettra Landing Page é uma landing page institucional moderna, construída com React, TypeScript e Tailwind CSS. O projeto apresenta de forma elegante os serviços da empresa, incluindo engenharia elétrica (projetos residenciais e industriais, redes MT/BT, subestações), energia fotovoltaica, obras civis, testes e ensaios em equipamentos e segurança do trabalho. Utiliza Framer Motion para animações suaves, formulário de contato integrado com backend serverless para envio de e-mails e botão flutuante de WhatsApp. O deploy é feito na Vercel, com configuração de e-mails e testes documentados.",
    techStack:    [
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Vite",
                    "Framer Motion",
                  ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500',
        alt: 'Elettra Solar Energy'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500',
        alt: 'Elettra Photovoltaic'
      }
    ],
    color: "bg-neo-green"
  }
];

export const GITHUB_LINKS: Record<number, string> = {
  1: "https://github.com/FlavioNascimento99/veritas_application",
  2: "https://github.com/FlavioNascimento99/czar_management",
  3: "https://github.com/FlavioNascimento99/broadcast_application",
  4: "https://github.com/FlavioNascimento99/elettra-landing-page",
};

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Engenheiro de Software Júnior",
    company: "Trads Corretora",
    type: "Tempo integral",
    period: "mar de 2026 - o momento",
    duration: "6 meses",
    location: "João Pessoa, Paraíba, Brasil · No local",
    logo: "https://tradscorretora.com/wp-content/uploads/2025/12/logo-trads.png",
    description: "Trabalho como desenvolvedor de software com foco em pensar bem a solução antes de sair codando — entender o cenário, desenhar a arquitetura e só depois partir para a implementação. Isso evita retrabalho e deixa o sistema mais organizado e fácil de escalar. No dia a dia, atuo bastante em refatoração e manutenção de sistemas existentes, sempre buscando deixar o código um pouco melhor do que encontrei. Tenho boa vivência com arquitetura de microsserviços, usando Docker e Kubernetes para gerenciar ambientes distribuídos.",
    highlights: [
      "Desenvolvimento e manutenção de aplicações distribuídas em microsserviços, pensando sempre em escalabilidade e independência entre os serviços.",
      "Aplicação de padrões de arquitetura e design patterns em projetos de diferentes escopos, buscando baixo acoplamento, testabilidade e facilidade na integração com serviços externos.",
      "Implementação e configuração de pipelines de CI/CD, automatizando build, testes e deploy para entregar com mais velocidade e confiabilidade.",
      "Gerenciamento de repositórios no GitHub — organização de branches, code review e padronização de fluxo de trabalho seguindo Git Flow.",
    ],
    techStack: [
      "Microservices",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Git Flow",
      "Design Patterns",
      "Code Review",
      "Github Actions",
    ],
  },
  {
    id: 2,
    role: "Desenvolvedor de Software",
    company: "Hospital Napoleão Laureano",
    type: "Meio período",
    period: "jun de 2024 - fev de 2026",
    duration: "1 ano 9 meses",
    location: "João Pessoa, Paraíba, Brasil · No local",
    logo: "https://hlaureano.org.br/wp-content/uploads/2016/04/logo_hospital.png",
    description: "Planejo e construo soluções em software com uso de tecnologias como Django e Flask, juntamente com JavaScript e bibliotecas de estilização de interfaces web como Tailwind e Bootstrap, aplicando conceitos sólidos de UI e UX design e desenvolvendo soluções com uso de design patterns e estruturas de dados — trazendo resultados performáticos e uma notória melhora na experiência geral do usuário.",
    highlights: [
      "Implementei um novo padrão de interface nas principais aplicações de acesso administrativo do hospital.",
      "Trabalhei na refatoração de métodos complexos com múltiplas tarefas, modularizando-os e tornando-os mais manuteníveis.",
      "Desenvolvi e implementei funções em aplicações web de acesso interno do hospital, trazendo facilidade na consulta de dados sensíveis e dinamizando o trabalho dos mais variados setores.",
    ],
    techStack: [
      "Python",
      "Django",
      "Flask",
      "JavaScript",
      "Tailwind CSS",
      "Bootstrap",
      "UI/UX Design",
      "Design Patterns",
      "Data Structures",
    ],
  },
  {
    id: 3,
    role: "Desenvolvedor de Software Freelancer",
    company: "Freelancer",
    type: "Autônomo",
    period: "2022 - Atual",
    duration: "4 anos",
    location: "Remoto",
    description: "Atuo como desenvolvedor de software freelancer, acompanhando projetos do levantamento de requisitos à entrega final. Desenvolvo aplicações web completas com Java Spring Boot e PostgreSQL, realizando deploy em servidores VPS com Nginx e containerização via Docker e Kubernetes. Além do desenvolvimento, cuido diretamente da negociação de valores e prazos com clientes, garantindo entregas alinhadas às expectativas e suporte contínuo.",
    highlights: [
      "Desenvolvimento de aplicações web completas com Java e Spring Boot, do modelo de dados à API REST, incluindo autenticação e autorização com Spring Security.",
      "Containerização e orquestração de ambientes com Docker e Kubernetes, garantindo escalabilidade, replicação e alta disponibilidade.",
      "Configuração e manutenção de servidores VPS com Nginx, gerenciando deploy, certificados SSL, proxy reverso e backups.",
      "Integração com APIs de terceiros, webhooks e sistemas de pagamento, além de otimização de performance e consultas SQL.",
      "Negociação de valores, prazos e escopo diretamente com clientes, com comunicação técnica clara e suporte pós-entrega.",
    ],
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "Kubernetes",
      "Nginx",
      "VPS",
      "Node.js",
    ],
  },
];

export const SKILLS: Skill[] = [
  {
    category:   "Com o que escrevo...",
    items: ["Java 17/21", "Node", "Python", "Ruby", "Kotlin", "C#"]
  },
  {
    category:   "O que acelera meus projetos...",
    items: ["Spring Boot",  "On Rails", "ExpressJS", "Django", "ASP.NET", "Angular", "React", "Tailwind CSS" ]
  },
  {
    category:   "Como guardo meus dados...",
    items: ["PostgreSQL", "SQLite", "Firebase", "MySQL", ]
  },
  {
    category:   "Ferramentas que domino...",
    items: ["Maven", "Gradle", "Git", "NPM", "Postman", "Docker", "WSL", "Arch Linux"]
  }
];
