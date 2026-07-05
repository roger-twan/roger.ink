import { Metadata } from 'next';
import RevealOnScroll from '@/components/RevealOnScroll';
import AboutHeroSection from './about-hero-section';
import BackgroundSection from './background-section';
import CapabilitySection from './capability-section';
import ExperienceSection from './experience-section';
import LearningSection from './learning-section';
import PrinciplesSection from './principles-section';
import WorkflowSection from './workflow-section';

export const metadata: Metadata = {
  title: 'About | Roger Twan',
  description:
    'How Roger Twan works across AI-assisted product building, full-stack engineering, UX, and reliable software delivery.',
};

export default function About() {
  return (
    <div className="w-full bg-white">
      <RevealOnScroll />
      <AboutHeroSection />
      <WorkflowSection />
      <PrinciplesSection />
      <CapabilitySection />
      <ExperienceSection />
      <BackgroundSection />
      <LearningSection />
    </div>
  );
}
