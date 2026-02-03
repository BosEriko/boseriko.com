import Template from "@template";
import experience from "../../data/experience.json";

export default function Resume() {
  return (
    <Template.Resume>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Bos Eriko Reyes</h1>
        <p className="text-gray-600">
          Full Stack Developer & Software Engineer
        </p>
      </div>

      {/* Work Experience */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Work Experience
        </h2>

        <ul className="space-y-6">
          {experience.map((job, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg shadow ${
                !job.date?.end || job.active
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">
                  {job.position} at {job.company}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(job.date.start).toLocaleDateString()} -{" "}
                  {!job.date?.end || job.active
                    ? "Present"
                    : new Date(job.date.end).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{job.location}</p>
              <ul className="list-disc list-inside space-y-1">
                {job.responsibilities.map((task, i) => (
                  <li key={i} className="text-gray-700">
                    {task}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </Template.Resume>
  );
}
