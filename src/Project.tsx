import type { Project as ProjectData } from "./projects";

const Project = ({ title, description, authors, tags, url }: ProjectData) => {
  return (
    <article className="project">
      <div className="project-body">
        <h2>{title}</h2>
        <p className="authors">{authors.join(", ")}</p>
        <p className="description">{description}</p>
      </div>

      <div className="project-footer">
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {url && (
          <a className="project-link" href={url} target="_blank" rel="noreferrer">
            View project
          </a>
        )}
      </div>
    </article>
  );
};

export default Project;
