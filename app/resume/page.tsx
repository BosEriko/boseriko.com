import Template from "@template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import experience from "../../data/experience.json";

export default function Resume() {
  return (
    <Template.Resume>
      {/* Header */}
      <div className="text-left mb-5">
        <h1 className="text-4xl font-bold mb-2">Bos Eriko Reyes</h1>
        <p className="text-gray-600 mb-5">
          Full Stack Developer & Software Engineer
        </p>
        <div className="flex items-center text-sm text-gray-700">
          <div className="flex items-center gap-2 flex-1">
            <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
            <span>www.boseriko.com</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            <span>github.boseriko.com</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
            <span>linkedin.boseriko.com</span>
          </div>
        </div>
      </div>

      <hr />

      {/* Objective */}
      <div className="my-5">
        <h4 className="text-2xl font-bold mb-2">🏁 Objective</h4>
        <p className="text-justify">
          I am seeking employment with a company where I can use my skills and
          also grow as a person. I want to work in an environment where I can
          learn more knowledge related to my skill set. I want to excel and be
          the best that I can be at programming and also be crucial to any team
          that I can be a part of.
        </p>
      </div>

      <hr />

      {/* Work Experience */}
      <section>
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
