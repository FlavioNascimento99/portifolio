import { Project, Skill } from './types';

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
    title:        "ST Diagnósticos",
    subtitle:     "Sistema de Gestão de Exames Médicos",
    description:  "Este projeto simula o sistema de gestão de exames da empresa fictícia ST Diagnósticos, utilizando padrões de projeto para garantir modularidade, extensibilidade e manutenibilidade.",
    fullDescription: "ST Diagnósticos é um projeto acadêmico que implementa um sistema completo de gestão de exames médicos, demonstrando aplicação prática de padrões de design (Factory, Singleton, Strategy, etc). Desenvolvido em Java 17, o projeto segue princípios de Clean Code e arquitetura limpa. O sistema permite registrar pacientes, agendar exames, processar resultados e gerar relatórios, tudo com código altamente testável e bem estruturado. Este projeto serve como referência para boas práticas de engenharia de software.",
    techStack:    [
                    "Java 17",
                    "Design Patterns",
                    "Clean Code",
                    "JUnit",
                    "Maven",
                  ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1576091160550-112173f7f477?w=500',
        alt: 'ST Diagnósticos System'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1631217314830-c5b03d70f5b0?w=500',
        alt: 'ST Diagnósticos Reports'
      }
    ],
    color:        "bg-neo-green"
  },
  {
    id:           4,
    title:        "Shoepee",
    subtitle:     "Loja de Calçados Mobile com IA",
    description:  "Loja de calçados online com sistema de recomendação personalizado. Implementada sistemas básicos apenas a fim de demonstrar o funcionamento de um sistema mobile com persistência, registro e login além de relacionamento entre entidades.",
    fullDescription: "Shoepee é uma aplicação mobile desenvolvida em Kotlin utilizando Jetpack Compose para criar uma interface moderna e declarativa. O app implementa um sistema completo de e-commerce com autenticação de usuários, catálogo de produtos, carrinho de compras e sistema de recomendação personalizado baseado em histórico de compras. Firebase é utilizado para autenticação, persistência de dados em tempo real e analytics. O design segue Material Design 3, garantindo uma experiência visual consistente em dispositivos Android 12+.",
    techStack:    [
                    "Kotlin",
                    "Firebase",
                    "Jetpack Compose",
                    "Android Studio",
                    "Android 12",
                    "Material Design",
                    "MVVM",
                  ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=500',
        alt: 'Shoepee Mobile App'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        alt: 'Shoepee Products'
      }
    ],
    color: "bg-neo-yellow"
  }
];

export const GITHUB_LINKS: Record<number, string> = {
  1: "https://github.com/FlavioNascimento99/veritas_application",
  2: "https://github.com/FlavioNascimento99/czar_management",
  3: "https://github.com/sheilallee/st-diagnosticos",
  4: "https://github.com/FlavioNascimento99/Kotlin_shoepee_app",
};

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
