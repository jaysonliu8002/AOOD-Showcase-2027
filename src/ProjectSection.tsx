import { useEffect, useState } from "react";
import Project from "./Project";
import { loadProjects, type Project as ProjectData } from "./projects";

type Status =
  | { state: "loading" }
  | { state: "error" }
  | { state: "ready"; projects: ProjectData[] };

const ProjectSection = () => {
  const [status, setStatus] = useState<Status>({ state: "loading" });

  useEffect(() => {
    let ignore = false;

    loadProjects()
      .then((projects) => {
        if (!ignore) setStatus({ state: "ready", projects });
      })
      .catch((error) => {
        console.error(error);
        if (!ignore) setStatus({ state: "error" });
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (status.state === "loading") {
    return (
      <section className="showcase">
        <p className="count">Loading projects…</p>
      </section>
    );
  }

  if (status.state === "error") {
    return (
      <section className="showcase">
        <p className="count">Couldn't load projects right now. Try refreshing the page.</p>
      </section>
    );
  }

  const { projects } = status;

  return (
    <section className="showcase">
      <p className="count">
        {projects.length === 0
          ? "No projects yet — check back soon!"
          : `${projects.length} ${projects.length === 1 ? "project" : "projects"}`}
      </p>

      <div className="project-grid">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
