type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  theme?: 'light' | 'dark';
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  theme = 'light',
}: SectionHeaderProps) {
  return (
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
}
