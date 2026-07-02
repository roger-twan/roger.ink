import getPosts from '../journal/journal.data';
import getProjects from '../projects/projects.data';
import AssistantSection from './assistant-section';
import ContactCtaSection from './contact-cta-section';
import CurrentFocusSection from './current-focus-section';
import FeaturedProjectSection from './featured-project-section';
import HeroSection from './hero-section';
import JournalPreviewSection from './journal-preview-section';
import RevealOnScroll from './reveal-on-scroll';
import SelectedWorkSection from './selected-work-section';

export default async function Home() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const selectedProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="w-full overflow-hidden bg-white">
      <RevealOnScroll />
      <HeroSection />
      <AssistantSection />
      <FeaturedProjectSection project={selectedProjects[0]} />
      <CurrentFocusSection />
      <SelectedWorkSection projects={selectedProjects} />
      <JournalPreviewSection posts={latestPosts} />
      <ContactCtaSection />
    </div>
  );
}
