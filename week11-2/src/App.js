import { useState } from "react";
import "./App.css";

// Data flows down: App owns the project list and the active filter.
const projects = [
  {
    id: "portfolio-gallery",
    title: "Portfolio Gallery",
    description:
      "A responsive React portfolio that presents projects through reusable card components and technology filters.",
    tech: ["React", "CSS"],
    github: "https://github.com/mrabubakrkamolov/portfolio-gallery",
    demo: "https://mrabubakrkamolov.github.io/portfolio-gallery/",
  },
  {
    id: "react-shopping-cart",
    title: "React Shopping Cart",
    description:
      "An interactive storefront with product cards, quantities, totals and a cart built from small React components.",
    tech: ["React", "CSS", "JavaScript"],
    github: "https://github.com/mrabubakrkamolov/react-shopping-cart",
    demo: "https://mrabubakrkamolov.github.io/react-shopping-cart/",
  },
  {
    id: "webpro-book-search",
    title: "Book Search",
    description:
      "A book finder that requests data from a public API and renders results with accessible cards and loading states.",
    tech: ["JavaScript", "CSS", "HTML"],
    github: "https://github.com/mrabubakrkamolov/webpro-book-search",
    demo: "https://mrabubakrkamolov.github.io/webpro-book-search/",
  },
  {
    id: "counter-strike2",
    title: "Counter-Strike 2 Landing",
    description:
      "A dark, comic-styled landing page with layered gradients, responsive navigation and hover interactions.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/mrabubakrkamolov/Counter-Strike2",
    demo: "https://mrabubakrkamolov.github.io/Counter-Strike2/",
  },
];

const technologies = [
  "All",
  ...Array.from(new Set(projects.flatMap((project) => project.tech))).sort(),
];

/** Child component: only displays the props it receives. */
function ProjectCard({ title, description, tech, github, demo }) {
  return (
    <article className="project-card">
      <div className="card-accent" aria-hidden="true" />

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <ul className="tech-list" aria-label="Technologies used">
          {tech.map((item) => (
            <li key={item} className="tech-tag">
              {item}
            </li>
          ))}
        </ul>

        <div className="card-actions">
          <a className="button button-primary" href={github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {demo && (
            <a className="button button-secondary" href={demo} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Child component: maps data to keyed cards and uses conditional rendering. */
function ProjectList({ projects: items, activeFilter }) {
  const visibleProjects =
    activeFilter === "All"
      ? items
      : items.filter((project) => project.tech.includes(activeFilter));

  if (visibleProjects.length === 0) {
    return <p className="empty-state">No projects use {activeFilter} yet.</p>;
  }

  return (
    <div className="project-grid">
      {visibleProjects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}

/** Child component: reports the chosen technology back up through a callback prop. */
function FilterBar({ technologies: options, activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter projects by technology">
      {options.map((technology) => (
        <button
          key={technology}
          type="button"
          className={`filter-button${activeFilter === technology ? " is-active" : ""}`}
          aria-pressed={activeFilter === technology}
          onClick={() => onFilterChange(technology)}
        >
          {technology}
        </button>
      ))}
    </div>
  );
}

function PageHeader({ total }) {
  return (
    <header className="page-header">
      <span className="eyebrow">Week 11-2 · React Props</span>
      <h1>Portfolio Gallery</h1>
      <p>
        Reusable components, one-way props, keyed lists and filtering —
        showing <strong>{total}</strong> projects.
      </p>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="page-footer">
      <p>Built with React by Abubakr · Web Programming K0126_002</p>
    </footer>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="app-shell">
      <PageHeader total={projects.length} />

      <main className="main-content">
        <FilterBar
          technologies={technologies}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <ProjectList projects={projects} activeFilter={activeFilter} />
      </main>

      <PageFooter />
    </div>
  );
}
