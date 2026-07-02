import Link from 'next/link';
import IconArrowRight from '@public/icons/arrow-right.svg';
import IconChatbot from '@public/icons/chatbot.svg';
import IconGithub from '@public/icons/github.svg';
import ClientImage from '@/components/ClientImage';
import getProjects from '../projects/projects.data';
import getPosts from '../journal/journal.data';
import ChatModule from './chat';

const focusItems = [
  {
    title: 'Agent workflows',
    text: 'Designing tool-using systems with clear status, memory, and human control.',
  },
  {
    title: 'RAG systems',
    text: 'Building retrieval flows that make personal and product knowledge useful.',
  },
  {
    title: 'AI-native UX',
    text: 'Shaping streaming, citations, context, and approvals into product experiences.',
  },
  {
    title: 'Workflow automation',
    text: 'Connecting full-stack products with practical AI-powered operations.',
  },
];

const assistantCapabilities = [
  'RAG-backed answers',
  'Project context',
  'Streaming chat',
  'Personal knowledge base',
];

const projectProof = [
  'AI workflow',
  'Product UI',
  'Architecture',
  'Deployment',
];

const SectionHeader = ({
  eyebrow,
  title,
  description,
  theme = 'light',
}: {
  eyebrow: string;
  title: string;
  description: string;
  theme?: 'light' | 'dark';
}) => (
  <div className="mx-auto mb-10 max-w-3xl text-center">
    <p
      className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${
        theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`text-3xl font-semibold tracking-tight md:text-4xl ${
        theme === 'dark' ? 'text-white' : 'text-neutral-950'
      }`}
    >
      {title}
    </h2>
    <p
      className={`mt-4 text-base leading-7 md:text-lg ${
        theme === 'dark' ? 'text-white/60' : 'text-neutral-600'
      }`}
    >
      {description}
    </p>
  </div>
);

const ProductSurface = () => (
  <div className="relative mx-auto w-full max-w-2xl rounded-[2rem] border border-white/10 bg-neutral-950 p-3 shadow-2xl shadow-cyan-950/20">
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-cyan-400" />
          <span className="h-2 w-20 rounded-full bg-white/25" />
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-2 w-10 rounded-full bg-white/15" />
          <span className="h-2 w-14 rounded-full bg-white/15" />
          <span className="h-2 w-8 rounded-full bg-lime-300/80" />
        </div>
      </div>

      <div className="grid min-h-[420px] grid-cols-1 gap-0 lg:grid-cols-[64px_1fr_220px]">
        <div className="hidden border-r border-white/10 bg-black/35 p-4 lg:block">
          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <span
                key={index}
                className="block size-7 rounded-lg border border-white/10 bg-white/[0.06]"
              />
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <span className="block h-2 w-24 rounded-full bg-white/20" />
              <span className="mt-2 block h-2 w-36 rounded-full bg-white/10" />
            </div>
            <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-200">
              live
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="mb-5 flex items-center justify-center">
              <div className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3">
                <span className="block h-2 w-24 rounded-full bg-cyan-200/70" />
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-3">
              {['tool', 'code', 'search'].map((item, index) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <span
                    className={`mb-3 block size-6 rounded-lg ${
                      index === 1 ? 'bg-lime-300/80' : 'bg-cyan-300/70'
                    }`}
                  />
                  <span className="block h-2 rounded-full bg-white/25" />
                  <span className="mt-2 block h-2 w-2/3 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <span className="h-px w-3/4 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <span className="block h-2 w-16 rounded-full bg-white/20" />
                  <span className="mt-3 block h-2 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {['cyan', 'lime', 'amber'].map((color, index) => (
              <div
                key={color}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
              >
                <span className="block h-2 w-12 rounded-full bg-white/20" />
                <span
                  className={`mt-4 block h-1.5 rounded-full ${
                    index === 0
                      ? 'bg-cyan-300'
                      : index === 1
                        ? 'bg-lime-300'
                        : 'bg-amber-300'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/25 p-4 lg:border-l lg:border-t-0">
          <div className="mb-4 flex items-center justify-between">
            <span className="h-2 w-20 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-lime-300" />
          </div>
          <div className="space-y-3">
            {assistantCapabilities.map((item, index) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${
                      index % 2 ? 'bg-lime-300' : 'bg-cyan-300'
                    }`}
                  />
                  <span className="text-xs font-medium text-white/80">
                    {item}
                  </span>
                </div>
                <span className="block h-2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default async function Home() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const selectedProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const featuredProject = selectedProjects[0];

  return (
    <div className="w-full overflow-hidden bg-white">
      <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-white pt-28 text-neutral-950 lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_38%_42%,rgba(163,230,53,0.10),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

        <div className="container mx-auto grid min-h-[720px] items-center gap-12 px-4 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:pb-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm font-medium text-neutral-700 shadow-sm">
              <span className="size-2 rounded-full bg-lime-400" />
              Currently building AI-native products and workflows
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
              AI Product Engineer building AI-native applications.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl">
              I combine full-stack engineering, product taste, and RAG-powered
              systems to build agent workflows, AI assistants, and polished
              modern interfaces.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-950/10 transition hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                View Projects
                <IconArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700"
              >
                <IconChatbot className="mr-2 size-5" />
                Chat with AI Assistant
              </Link>
              <a
                href="https://github.com/rogertwan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-400"
              >
                <IconGithub className="mr-2 size-5" />
                GitHub
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {projectProof.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-white/80 p-3 shadow-sm"
                >
                  <p className="text-sm font-semibold text-neutral-950">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ProductSurface />
        </div>
      </section>

      <section className="bg-neutral-950 py-16 text-white md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              AI Assistant
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Talk directly to the RAG system behind this site.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              The assistant is not a decorative demo. It is connected to my
              knowledge base, projects, technical notes, and portfolio context,
              so visitors can ask questions instead of only reading static
              pages.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ChatModule />
              <Link
                href="/chat"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Open full chat page
                <IconArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {assistantCapabilities.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <span
                  className={`mb-5 block size-3 rounded-full ${
                    index % 2 ? 'bg-lime-300' : 'bg-cyan-300'
                  }`}
                />
                <h3 className="font-semibold text-white">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Built to make the site feel like an interactive AI product,
                  not a static resume.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredProject && (
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader
              eyebrow="Featured project"
              title="Product proof before technology lists."
              description="The homepage should lead with a showcase that feels inspectable: screenshots, workflow, architecture, and a clear reason the product exists."
            />

            <div className="grid overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-50 shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
              <div className="min-h-[320px] bg-neutral-950 p-3">
                <ClientImage
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="h-full min-h-[320px] rounded-[1.5rem] bg-neutral-900"
                />
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-5 flex flex-wrap gap-2">
                  {featuredProject.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-semibold tracking-tight text-neutral-950">
                  {featuredProject.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-neutral-600">
                  {featuredProject.description}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {projectProof.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-neutral-200 bg-white p-4"
                    >
                      <p className="text-sm font-semibold text-neutral-950">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {featuredProject.links.map((link) => (
                    <a
                      key={link.type}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      {link.type}
                      <IconArrowRight className="ml-2 size-4" />
                    </a>
                  ))}
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:border-neutral-400"
                  >
                    View all projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Current focus"
            title="What I am building toward now."
            description="This section gives the site builder energy: it makes the AI product direction feel current, specific, and alive."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {focusItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mb-6 block h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-lime-300" />
                <h3 className="text-lg font-semibold text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Selected AI work"
            title="A tighter project shelf, curated for product signal."
            description="Only the strongest projects should be pulled forward on the homepage, with screenshots and proof links doing more work than a badge wall."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {selectedProjects.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <ClientImage
                  src={project.image}
                  alt={project.title}
                  className="h-56 bg-neutral-100"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-950">
                    {project.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-neutral-400"
            >
              Explore Projects
              <IconArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Journal"
            title="Notes from building AI-native products."
            description="A quieter home for AI product notes, architecture decisions, UX tradeoffs, and reflections from building."
            theme="dark"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.07]"
              >
                <p className="text-sm text-cyan-200">{post.date}</p>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/60">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/journal"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Read Journal
              <IconArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 text-center shadow-sm md:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
              Work together
            </p>
            <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
              Building an AI-native product or workflow?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              I am interested in full-stack AI product builds, RAG systems,
              agent workflows, and polished interfaces that turn model
              capability into useful product experience.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-950/10 transition hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Contact Roger
                <IconArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-neutral-400"
              >
                More about how I work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
