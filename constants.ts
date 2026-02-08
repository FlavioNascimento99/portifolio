import { Project, Skill } from './types';

export const HERO_TEXT = "DESENVOLVEDOR DE SOFTWARE FULLSTACK.";
export const SUB_HERO_TEXT = "DESENVOLVEDOR JAVA // SPRING BOOT // POSTGRESQL // WEB DEVELOPMENT // DESIGN DE SOFTWARE";

export const PROJECTS: Project[] = [
  {
    id:           1,
    title:        "VERITAS",
    description:  "Aplicação de criaçao e acompanhamento de Processos internos no contexto universitário, atribuição de tarefas à outros usuários, deferimento, anexo de documentos em PDF e acompanhamento do progresso.",
    techStack:    [
                    "Java 21",
                    "Spring Boot",
                    "Spring Data JPA",
                    "Spring Security",
                    "Tailwind CSS",
                    "Thymeleaf", 
                    "PostgreSQL", 
                  ],
    color:        "bg-neo-blue"
  },
  {
    id:           2,
    title:        "Czar Managment",
    description:  "Aplicação de criação e gerenciamento de serviços, pensado para um cenário de desenvolvimento de software, criando grupos, etapas, tarefas, atribuição de tarefas à outros usuários, anexo de documentos em PDF e acompanhamento do progresso.",
    techStack:    [
                    "Ruby",
                    "On Rails",
                    "SQLite3",
                    "Bootstrap",
                    "WSL",
                    "Docker",
                  ],
    color:        "bg-neo-pink"
  },
  {
    id:           3,
    title:        "ST Diagnósticos",
    description:  "Este projeto simula o sistema de gestão de exames da empresa fictícia ST Diagnósticos, utilizando padrões de projeto para garantir modularidade, extensibilidade e manutenibilidade.",
    techStack:    [
                    "Java 17",
                    "Design Patterns",
                    "Clean Code",
                  ],
    color:        "bg-neo-green"
  },
  {
    id:           4,
    title:        "Shoepee",
    description:  "Loja de calçados online com sistema de recomendação personalizado. Implementada sistemas básicos apenas a fim de demonstrar o funcionamento de um sistema mobile com persistência, registro e login além de relacionamento entre entidades.",
    techStack:    [
                    "Kotlin",
                    "Firebase",
                    "Jetpack Compose",
                    "Android Studio",
                    "Android 12",
                    "Material Design",
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
