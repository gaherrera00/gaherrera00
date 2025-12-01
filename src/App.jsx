import { useEffect, useMemo, useState } from "react";

const heroPhrases = [
  "Desenvolvedor Full-Stack",
  "Criador de experiências web",
  "Apaixonado por UX e performance",
];

const skills = [
  { name: "JavaScript (ES6+)", level: 90 },
  { name: "React & Next.js", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "SQL & NoSQL", level: 78 },
  { name: "UX Research & UI", level: 76 },
  { name: "Git & Automação", level: 84 },
];

const projects = [
  {
    title: "Sistema Integrador Restaurante",
    description:
      "Aplicação PHP/MySQL com CRUD completo para gestão de dados de um restaurante, focada em organização e usabilidade.",
    stack: ["PHP", "MySQL"],
    code: "https://github.com/gaherrera00/sistema-integrador-restaurante",
    demo: "https://github.com/gaherrera00/sistema-integrador-restaurante",
    image: "/project-restaurante.png",
  },
  {
    title: "Lanche Mania API",
    description:
      "API de gerenciamento de pedidos e catálogo de lanches desenvolvida em Java com Spring Boot. Inclui CRUD completo, camada de serviço estruturada, tratamento de exceções e integração com banco de dados. Ideal para estudos de arquitetura back-end em Java.",
    stack: ["Java", "Spring Boot", "Spring Data JPA", "H2/MySQL"],
    code: "https://github.com/gaherrera00/lanche-mania-api",
    demo: "https://github.com/gaherrera00/lanche-mania-api",
    image: "/project-lanche-mania.svg",
  },
  {
    title: "G2 Barbearia",
    description:
      "Plataforma web para gerenciamento operacional de uma barbearia, com foco em serviços, agenda e experiência do cliente.",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    code: "https://github.com/gaherrera00/barbearia-g2-sistema",
    demo: "https://barbearia-g2-sistema.vercel.app/",
    image: "/project-barbearia.png",
  },
  {
    title: "Zelus Assistência Técnica",
    description:
      "Site responsivo em React e Tailwind para uma assistência técnica, com foco em clareza das informações e contato rápido.",
    stack: ["React", "Tailwind"],
    code: "https://github.com/gaherrera00/zelus-assistencia-tecnica",
    demo: "https://github.com/gaherrera00/zelus-assistencia-tecnica",
    image: "/project-zelus.png",
  },
  {
    title: "Doceria Jae",
    description:
      "Site acadêmico em React focado em prática de layout, responsividade e apresentação visual de produtos.",
    stack: ["React", "CSS", "JavaScript"],
    code: "https://github.com/gaherrera00/Doceria-Jae",
    demo: "https://site-facul-virid.vercel.app/",
    image: "/project-doceriajae.png",
  },
  {
    title: "Dulcis Veneris (Fork)",
    description:
      "Fork de um projeto artístico voltado a uma chocolateria, explorando animações e experiência visual criativa.",
    stack: ["JavaScript"],
    code: "https://github.com/gaherrera00/dulcis.veneris",
    demo: "https://github.com/gaherrera00/dulcis.veneris",
    image: "/project-dulcis.png",
  },
];

const socials = {
  github: "https://github.com/gaherrera00",
  linkedin: "https://www.linkedin.com/in/gabriel-herrera-demarchi-532844338/",
  email: "mailto:gabriel.h.demarchi@gmail.com",
};

// 🌑 Gradiente escuro original
const gradientBgDark =
  "bg-[radial-gradient(circle_at_10%_20%,rgba(124,93,255,0.16),transparent_25%),_radial-gradient(circle_at_90%_10%,rgba(34,211,238,0.18),transparent_30%),_linear-gradient(120deg,#0c1021,#0a0e1b,#0c1021)]";

// ☀️ Gradiente claro equivalente
const gradientBgLight =
  "bg-[radial-gradient(circle_at_20%_20%,rgba(124,93,255,0.08),transparent_25%),_radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.12),transparent_30%),_linear-gradient(120deg,#f7f9fc,#eef1f7,#f7f9fc)]";

/* ========= ICONES SVG MINIMALISTAS (stroke 2) ========= */

const IconBase = ({ children, className = "", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-5 w-5 ${className}`}
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const IconSun = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
  </IconBase>
);

const IconMoon = (props) => (
  <IconBase {...props}>
    <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
  </IconBase>
);

const IconGithub = (props) => (
  <IconBase {...props}>
    <path d="M9 19c-4 1-4-2-6-2" />
    <path d="M15 19v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 6.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 16.13V19" />
  </IconBase>
);

const IconLinkedIn = (props) => (
  <IconBase {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <line x1="8" y1="11" x2="8" y2="16" />
    <line x1="8" y1="8" x2="8" y2="8" />
    <path d="M12 16v-3a2 2 0 0 1 4 0v3" />
  </IconBase>
);

const IconMail = (props) => (
  <IconBase {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
    <polyline points="3 7 12 13 21 7" />
  </IconBase>
);

const IconLocation = (props) => (
  <IconBase {...props}>
    <path d="M12 21s-6-5.33-6-10a6 6 0 0 1 12 0c0 4.67-6 10-6 10Z" />
    <circle cx="12" cy="11" r="2.5" />
  </IconBase>
);

const IconLink = (props) => (
  <IconBase {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l1.42-1.42a4 4 0 0 0-5.66-5.66L12 7" />
    <path d="M14 11a5 5 0 0 0-7.54-.54L5.04 11.9a4 4 0 0 0 5.66 5.66L12 17" />
  </IconBase>
);

/* ========= HOOKS ========= */

function useTypingEffect(strings, speed = 120, pause = 1200) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    const current = strings[index % strings.length];
    const isDeleting = direction === "backward";

    const timeout = setTimeout(
      () => {
        const nextLength = text.length + (isDeleting ? -1 : 1);
        const nextText = current.slice(0, nextLength);
        setText(nextText);

        if (!isDeleting && nextText === current) {
          setTimeout(() => setDirection("backward"), pause);
        } else if (isDeleting && nextText === "") {
          setDirection("forward");
          setIndex((prev) => (prev + 1) % strings.length);
        }
      },
      isDeleting ? speed / 1.5 : speed
    );

    return () => clearTimeout(timeout);
  }, [text, direction, strings, index, speed, pause]);

  return text;
}

// 🌗 Tema: inicia sempre no dark e guarda no localStorage
function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

/* ========= APP ========= */

export default function App() {
  const [theme, setTheme] = useTheme();
  const isDark = theme === "dark";
  const typed = useTypingEffect(heroPhrases, 110, 1400);

  const experienceYears = useMemo(() => new Date().getFullYear() - 2023, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? gradientBgDark : gradientBgLight
      } text-slate-900 dark:text-slate-100`}
    >
      <div className="mx-auto max-w-6xl px-4 pb-16">
        {/* HEADER */}
        <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-black/30 border-b border-black/10 dark:border-white/10 rounded-b-xl">
          <div className="flex items-center justify-around py-4 ">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Portfólio
                </p>
                <p className="font-semibold">Gabriel Herrera Demarchi</p>
              </div>
            </div>

            <nav className="flex items-center gap-4 text-sm font-medium">
              {["home", "about", "projects", "contact"].map((id) => (
                <button
                  key={id}
                  className="rounded-full px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-black/10 dark:hover:bg-white/10 transition"
                  onClick={() => handleScroll(id)}
                >
                  {id === "home"
                    ? "Início"
                    : id === "about"
                    ? "Sobre"
                    : id === "projects"
                    ? "Projetos"
                    : "Contato"}
                </button>
              ))}

              <button
                aria-label="Alternar tema"
                className="rounded-full border border-black/20 dark:border-white/20 p-2 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <IconSun /> : <IconMoon />}
              </button>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="space-y-16">
          {/* HOME */}
          <section
            id="home"
            className="grid gap-10 pt-10 lg:grid-cols-2 lg:items-center"
          >
            <div className="space-y-6">
              <p className="uppercase tracking-[0.3em] text-secondary text-xs">
                Disponível para estágio
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Olá, sou{" "}
                <span className="text-secondary">Gabriel Herrera Demarchi</span>{" "}
                —<span className="block text-primary">{typed || "\u00a0"}</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg">
                Desenvolvedor full-stack em formação, focado em experiências
                simples, rápidas e funcionais. Busco uma oportunidade de estágio
                para crescer criando produtos que façam diferença.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-3 font-semibold text-dark shadow-lg shadow-primary/25"
                  onClick={() => handleScroll("projects")}
                >
                  Ver projetos
                </button>
                <button
                  className="rounded-full border border-black/20 dark:border-white/10 px-5 py-3 font-semibold text-slate-900 dark:text-slate-100 hover:bg-black/10 dark:hover:bg-white/10"
                  onClick={() => handleScroll("contact")}
                >
                  Falar comigo
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <a
                  className="inline-flex items-center gap-2 hover:text-secondary"
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconGithub />
                  <span>GitHub</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 hover:text-secondary"
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconLinkedIn />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[40px] border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-glow">
                <img
                  src="/profile.png"
                  alt="Gabriel em frente ao computador"
                  className="w-full rounded-2xl"
                />

                <div className="absolute right-6 top-6 rounded-2xl bg-black/70 px-4 py-3 text-sm text-slate-100">
                  <p className="font-semibold">
                    +{experienceYears} anos de código
                  </p>
                  <p className="text-slate-300">Full-stack & UX minded</p>
                </div>

                <div className="absolute -left-3 bottom-6 rounded-2xl bg-gradient-to-r from-primary/80 to-secondary/80 px-5 py-3 text-sm text-dark">
                  <p className="font-semibold">15+ projetos pessoais</p>
                  <p className="text-black/70">Aprendizado contínuo</p>
                </div>
              </div>
            </div>
          </section>

          {/* SOBRE */}
          <section
            id="about"
            className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-8 shadow-glow"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-secondary uppercase tracking-[0.2em] text-xs">
                  Quem sou
                </p>
                <h2 className="text-3xl font-semibold">Sobre mim</h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Sou Gabriel, desenvolvedor em formação e apaixonado por
                  resolver problemas reais com código. Gosto de unir design
                  estratégico, arquitetura limpa e métricas de produto para
                  construir experiências digitais que sejam memoráveis e fáceis
                  de usar.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Curioso",
                    "Colaborativo",
                    "Focado em resultados",
                    "Orientado a UX",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-black/5 dark:bg-white/10 px-4 py-2 text-sm text-slate-800 dark:text-slate-100"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-md space-y-4">
                <h3 className="font-semibold text-lg">Habilidades</h3>
                <div className="space-y-3">
                  {skills.map(({ name, level }) => (
                    <div key={name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                        <span>{name}</span>
                        <span>{level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-black/10 dark:bg-white/10">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROJETOS */}
          <section id="projects" className="space-y-6">
            <div className="flex flex-col gap-2">
              <p className="text-secondary uppercase tracking-[0.2em] text-xs">
                Portfólio
              </p>
              <h2 className="text-3xl font-semibold">Projetos em destaque</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-3xl">
                Uma seleção dos projetos e estudos que refletem meu foco em
                entregar valor rápido, com código legível, atenção à experiência
                do usuário e aprendizado contínuo.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group flex flex-col rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 shadow-glow transition hover:-translate-y-1 hover:border-secondary/40"
                >
                  <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <span className="rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 text-xs text-slate-900 dark:text-slate-200">
                        {project.stack[0]}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-black/5 dark:bg-black/30 px-3 py-1 text-xs text-slate-800 dark:text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2 text-sm font-semibold">
                      <a
                        href={project.code}
                        className="flex-1 rounded-full border border-black/20 dark:border-white/10 px-4 py-2 text-center hover:bg-black/10 dark:hover:bg-white/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver código
                      </a>

                      {project.demo === project.code ? (
                        <button
                          disabled
                          className="flex-1 rounded-full px-4 py-2 text-center bg-gray-400/40 dark:bg-gray-600/30 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                        >
                          Demo indisponível
                        </button>
                      ) : (
                        <a
                          href={project.demo}
                          className="flex-1 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-center text-dark shadow-lg shadow-primary/30 hover:opacity-90"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CONTATO */}
          <section
            id="contact"
            className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-8 shadow-glow"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="text-secondary uppercase tracking-[0.2em] text-xs">
                  Vamos conversar
                </p>
                <h2 className="text-3xl font-semibold">Contato</h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Estou aberto para estágios, freelas e colaborações. Me conte
                  sobre a oportunidade e vamos construir algo marcante juntos.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-black/5 dark:bg-black/30 px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
                    <IconMail />
                    <a className="hover:text-secondary" href={socials.email}>
                      gabriel.h.demarchi@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-black/5 dark:bg-black/30 px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
                    <IconLocation />
                    <span>São Paulo · Remoto ou presencial</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-black/5 dark:bg-black/30 px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
                    <IconLinkedIn />
                    <a
                      className="hover:text-secondary"
                      href={socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn: /gabriel-herrera-demarchi
                    </a>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-black/5 dark:bg-black/30 px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
                    <IconGithub />
                    <a
                      className="hover:text-secondary"
                      href={socials.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub: @gaherrera00
                    </a>
                  </div>
                </div>
              </div>

              <form
                className="space-y-4 rounded-2xl bg-black/5 dark:bg-black/30 p-6 text-sm text-slate-800 dark:text-slate-200"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-2">
                  <label className="block" htmlFor="name">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    className="w-full rounded-2xl border border-black/20 dark:border-white/10 bg-white/70 dark:bg-black/40 px-4 py-3 outline-none focus:border-secondary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-2xl border border-black/20 dark:border-white/10 bg-white/70 dark:bg-black/40 px-4 py-3 outline-none focus:border-secondary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block" htmlFor="message">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Fale sobre sua oportunidade"
                    className="w-full rounded-2xl border border-black/20 dark:border-white/10 bg-white/70 dark:bg-black/40 px-4 py-3 outline-none focus:border-secondary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-3 font-semibold text-dark shadow-lg shadow-primary/30"
                >
                  Enviar mensagem
                </button>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Formulário demonstrativo – você pode integrar com um backend,
                  serviço de email ou formulário externo futuramente.
                </p>
              </form>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="mt-12 flex flex-col items-center gap-2 border-t border-black/10 dark:border-white/10 py-6 text-sm text-slate-600 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} Gabriel Herrera Demarchi. Todos os
            direitos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              className="inline-flex items-center gap-2 hover:text-secondary"
              href={socials.github}
              target="_blank"
              rel="noreferrer"
            >
              <IconGithub />
              <span>GitHub</span>
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-secondary"
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <IconLinkedIn />
              <span>LinkedIn</span>
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-secondary"
              href={socials.email}
            >
              <IconMail />
              <span>Email</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
