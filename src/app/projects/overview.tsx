import getProjects, { Category, CategoryObj } from './projects.data';

interface ProjectsOverviewProps {
  heading?: string;
}

export default async function ProjectsOverview({
  heading,
}: ProjectsOverviewProps) {
  const projects = await getProjects();

  return (
    <>
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">{heading}</h2>
        <p className="text-lg text-center max-w-2xl">
          I specialize in creating innovative digital solutions across multiple
          platforms. My work spans from responsive web applications to mobile
          apps, with a focus on user experience and modern design principles.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="bg-blue-50 rounded-lg shadow p-6 text-center">
          <h3 className="text-blue-600 font-bold text-3xl">
            {projects.length}
          </h3>
          <p className="text-gray-600">Projects Completed</p>
        </div>
        {Object.entries(CategoryObj).map(([key, value]) => (
          <div
            key={key}
            className={`${value.backgroundColor} rounded-lg shadow p-6 text-center`}
          >
            <h3 className={`${value.textColor} font-bold text-3xl`}>
              {
                projects.filter((item) =>
                  item.categories.includes(key as Category),
                ).length
              }
            </h3>
            <p className="text-gray-600">{`${value.name}`}s</p>
          </div>
        ))}
      </div>
    </>
  );
}
