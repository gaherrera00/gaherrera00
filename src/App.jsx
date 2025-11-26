import { useEffect, useMemo, useState } from 'react';

const heroPhrases = [
  'Desenvolvedor Full-Stack',
  'Criador de experiências web',
  'Apaixonado por UX e performance',
];

const skills = [
  { name: 'JavaScript (ES6+)', level: 90 },
  { name: 'React & Next.js', level: 88 },
  { name: 'Node.js', level: 82 },
  { name: 'SQL & NoSQL', level: 78 },
  { name: 'UX Research & UI', level: 76 },
  { name: 'Git & Automação', level: 84 },
];

const projects = [
  {
    title: 'Projeto Integrador - Barbearia',
    description: 'Sistema full-stack com fluxo de agendamento e UX intuitiva.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
    code: 'https://github.com/gaherrera00/GHG-Barbearia-projeto-barbearia-',
    demo: 'https://github.com/gaherrera00/GHG-Barbearia-projeto-barbearia-',
    image: '/img/project1.svg',
  },
  {
    title: 'Agenda de Contatos CLI',
    description: 'CRUD em Node.js focado em organização e clareza de comandos.',
    stack: ['Node.js', 'Inquirer', 'ESM'],
    code: 'https://github.com/gaherrera00/agenda-contatos-node',
    demo: 'https://github.com/gaherrera00/agenda-contatos-node',
    image: '/img/project2.svg',
  },
  {
    title: 'Assistência Técnica Zelus',
    description: 'Plataforma React + Node para registrar e acompanhar chamados.',
    stack: ['React', 'Node.js', 'MongoDB'],
    code: 'https://github.com/gaherrera00/zelus-assistencia-tecnica',
    demo: 'https://github.com/gaherrera00/zelus-assistencia-tecnica',
    image: '/img/project3.svg',
  },
  {
    title: 'Dashboard em Tempo Real',
    description: 'Visualizações de métricas com atualização contínua e filtros.',
    stack: ['React', 'D3.js', 'APIs'],
    code: '#',
    demo: '#',
    image: '/img/project4.svg',
  },
  {
    title: 'Landing Page Conversão',
    description: 'Copy clara e animações suaves pensando em SEO e velocidade.',
    stack: ['Vite', 'Tailwind', 'GSAP'],
    code: '#',
    demo: '#',
    image: '/img/project5.svg',
  },
  {
    title: 'Assistente de Estudos',
    description: 'Ferramenta web para organizar materiais, prazos e rotinas.',
    stack: ['Python', 'Flask', 'SQL'],
    code: '#',
    demo: '#',
    image: '/img/project6.svg',
  },
];

const socials = {
  github: 'https://github.com/gaherrera00',
  linkedin: 'https://www.linkedin.com/in/gabriel-herrera-demarchi-532844338/',
  email: 'mailto:gabrielherrerademarchi@gmail.com',
};

const gradientBg =
  'bg-[radial-gradient(circle_at_10%_20%,rgba(124,93,255,0.16),transparent_25%),_radial-gradient(circle_at_90%_10%,rgba(34,211,238,0.18),transparent_30%),_linear-gradient(120deg,#0c1021,#0a0e1b,#0c1021)]';

function useTypingEffect(strings, speed = 120, pause = 1200) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('forward');

  useEffect(() => {
    const current = strings[index % strings.length];
    const isDeleting = direction === 'backward';

    const timeout = setTimeout(() => {
      const nextLength = text.length + (isDeleting ? -1 : 1);
      const nextText = current.slice(0, nextLength);
      setText(nextText);

      if (!isDeleting && nextText === current) {
        setTimeout(() => setDirection('backward'), pause);
      } else if (isDeleting && nextText === '') {
        setDirection('forward');
        setIndex((prev) => (prev + 1) % strings.length);
      }
    }, isDeleting ? speed / 1.5 : speed);

    return () => clearTimeout(timeout);
  }, [text, direction, strings, index, speed, pause]);

  return text;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const typed = useTypingEffect(heroPhrases, 110, 1400);
  const isDark = theme === 'dark';

  const experienceYears = useMemo(() => new Date().getFullYear() - 2022, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${gradientBg} transition-colors duration-300 dark:bg-dark dark:text-slate-100`}> 
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <header className="sticky top-0 z-50 backdrop-blur bg-black/20 dark:bg-black/30 border-b border-white/5">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow" />
              <div>
                <p className="text-sm text-slate-400">Portfólio</p>
                <p className="font-semibold">Gabriel Herrera Demarchi</p>
              </div>
            </div>
            <nav className="flex items-center gap-4 text-sm font-medium">
              {['home', 'about', 'projects', 'contact'].map((id) => (
                <button
                  key={id}
                  className="rounded-full px-3 py-2 text-slate-200 hover:bg-white/10 transition"
                  onClick={() => handleScroll(id)}
                >
                  {id === 'home'
                    ? 'Início'
                    : id === 'about'
                    ? 'Sobre'
                    : id === 'projects'
                    ? 'Projetos'
                    : 'Contato'}
                </button>
              ))}
              <button
                aria-label="Alternar tema"
                className="rounded-full border border-white/10 p-2 hover:bg-white/10"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
              >
                {isDark ? '🌙' : '☀️'}
              </button>
            </nav>
          </div>
        </header>

        <main className="space-y-16">
          <section id="home" className="grid gap-10 pt-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="uppercase tracking-[0.3em] text-secondary text-xs">Disponível para estágio</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Olá, sou <span className="text-secondary">Gabriel Herrera</span> —
                <span className="block text-primary">{typed || '\u00a0'}</span>
              </h1>
              <p className="text-slate-300 text-lg">
                Desenvolvedor full-stack com foco em experiências simples, rápidas e funcionais. Busco uma oportunidade de
                estágio para crescer criando produtos que façam diferença.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-3 font-semibold text-dark shadow-lg shadow-primary/25"
                  onClick={() => handleScroll('projects')}
                >
                  Ver projetos
                </button>
                <button
                  className="rounded-full border border-white/10 px-5 py-3 font-semibold text-slate-100 hover:bg-white/10"
                  onClick={() => handleScroll('contact')}
                >
                  Falar comigo
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <a className="hover:text-secondary" href={socials.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="hover:text-secondary" href={socials.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="hover:text-secondary" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
                <img src="/img/dev-placeholder.svg" alt="Gabriel codando" className="w-full" />
                <div className="absolute right-6 top-6 rounded-2xl bg-black/60 px-4 py-3 text-sm text-slate-100">
                  <p className="font-semibold">+{experienceYears} anos de código</p>
                  <p className="text-slate-400">Full-stack & UX minded</p>
                </div>
                <div className="absolute -left-3 bottom-6 rounded-2xl bg-gradient-to-r from-primary/80 to-secondary/80 px-5 py-3 text-sm text-dark">
                  <p className="font-semibold">15+ projetos pessoais</p>
                  <p className="text-black/70">Aprendizado contínuo</p>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glow">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-secondary uppercase tracking-[0.2em] text-xs">Quem sou</p>
                <h2 className="text-3xl font-semibold">Sobre mim</h2>
                <p className="text-slate-300">
                  Sou Gabriel, desenvolvedor em formação e apaixonado por resolver problemas reais com código. Gosto de unir
                  design estratégico, arquitetura limpa e métricas de produto para construir experiências digitais que sejam
                  memoráveis.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Curioso', 'Colaborativo', 'Focado em resultados', 'Orientado a UX'].map((pill) => (
                    <span key={pill} className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
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
                      <div className="flex items-center justify-between text-sm text-slate-300">
                        <span>{name}</span>
                        <span>{level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
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

          <section id="projects" className="space-y-6">
            <div className="flex flex-col gap-2">
              <p className="text-secondary uppercase tracking-[0.2em] text-xs">Portfólio</p>
              <h2 className="text-3xl font-semibold">Projetos em destaque</h2>
              <p className="text-slate-300 max-w-3xl">
                Uma seleção dos trabalhos e estudos mais recentes que refletem meu foco em entregar valor rápido, com código
                legível e atenção aos detalhes de UX.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow transition hover:-translate-y-1 hover:border-secondary/40"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{project.stack[0]}</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="rounded-full bg-black/30 px-3 py-1 text-xs text-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2 text-sm font-semibold">
                      <a
                        href={project.code}
                        className="flex-1 rounded-full border border-white/10 px-4 py-2 text-center hover:bg-white/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver código
                      </a>
                      <a
                        href={project.demo}
                        className="flex-1 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-center text-dark"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glow">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="text-secondary uppercase tracking-[0.2em] text-xs">Vamos conversar</p>
                <h2 className="text-3xl font-semibold">Contato</h2>
                <p className="text-slate-300">
                  Estou aberto para estágios, freelas e colaborações. Conte-me sobre a oportunidade e vamos construir algo
                  marcante juntos.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-black/30 px-4 py-3 text-sm text-slate-200">
                    <span>📧</span>
                    <a className="hover:text-secondary" href={socials.email}>
                      gabrielherrerademarchi@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-black/30 px-4 py-3 text-sm text-slate-200">
                    <span>📍</span>
                    <span>Brasil · Remoto ou presencial</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-black/30 px-4 py-3 text-sm text-slate-200">
                    <span>🔗</span>
                    <a className="hover:text-secondary" href={socials.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn: /gabriel-herrera-demarchi
                    </a>
                  </div>
                </div>
              </div>
              <form
                className="space-y-4 rounded-2xl bg-black/30 p-6 text-sm text-slate-200"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="space-y-2">
                  <label className="block text-slate-300" htmlFor="name">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-secondary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-slate-300" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-secondary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-slate-300" htmlFor="message">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Fale sobre sua oportunidade"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-secondary"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-3 font-semibold text-dark shadow-lg shadow-primary/30"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer className="mt-12 flex flex-col items-center gap-2 border-t border-white/10 py-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Gabriel Herrera Demarchi. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a className="hover:text-secondary" href={socials.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="hover:text-secondary" href={socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="hover:text-secondary" href={socials.email}>
              Email
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
