import { useEffect, useRef, useState } from "react";
import "./App.css";

const REACT_DOCS = "https://react.dev/learn/state-a-components-memory";
const NOTE_KEY = "week11-2-quick-note";

function ExerciseCard({ id, title, hint, children }) {
  const titleId = `${id.toLowerCase()}-title`;

  return (
    <article className="exercise-card" aria-labelledby={titleId}>
      <div className="exercise-meta">
        <span className="exercise-badge">{id}</span>
        <span className="exercise-kicker">Week 11-2 · React State &amp; Events</span>
      </div>
      <h2 id={titleId}>{title}</h2>
      <p className="exercise-hint">{hint}</p>
      <div className="exercise-content">{children}</div>
      <a className="example-link" href={REACT_DOCS} target="_blank" rel="noreferrer">
        View React example <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

/* E1 — functional state updates */
function CounterExercise() {
  const [count, setCount] = useState(0);

  return (
    <ExerciseCard
      id="E1"
      title="Update state with a counter"
      hint="Use a functional state update so each click uses the latest count."
    >
      <output className="counter-value" aria-live="polite">
        {count}
      </output>
      <div className="button-row">
        <button type="button" className="button button-secondary" onClick={() => setCount((value) => value - 1)}>
          Decrease
        </button>
        <button type="button" className="button button-primary" onClick={() => setCount((value) => value + 1)}>
          Add one
        </button>
        <button type="button" className="button button-ghost" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </ExerciseCard>
  );
}

/* E2 — controlled input */
function ControlledInputExercise() {
  const [name, setName] = useState("");

  return (
    <ExerciseCard
      id="E2"
      title="Keep an input in sync"
      hint="A controlled input stores its value in state and updates a preview as you type."
    >
      <label className="field-label" htmlFor="student-name">
        Your name
      </label>
      <input
        id="student-name"
        className="text-input"
        type="text"
        value={name}
        placeholder="Type your name"
        onChange={(event) => setName(event.target.value)}
      />
      <p className="preview-text" aria-live="polite">
        Hello, {name.trim() || "there"}!
      </p>
    </ExerciseCard>
  );
}

/* E3 — immutable array updates + form submit */
const starterTasks = [
  { id: 1, text: "Review component props" },
  { id: 2, text: "Practice state updates" },
  { id: 3, text: "Build something small" },
];

function TaskListExercise() {
  const [tasks, setTasks] = useState(starterTasks);
  const [draft, setDraft] = useState("");
  const nextId = useRef(4);

  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setTasks((current) => [...current, { id: nextId.current, text }]);
    nextId.current += 1;
    setDraft("");
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <ExerciseCard
      id="E3"
      title="Add and remove list items"
      hint="Update arrays immutably, give each item a stable ID, and handle form submission."
    >
      <form className="inline-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="new-task">
          New task
        </label>
        <div className="button-row">
          <input
            id="new-task"
            className="text-input"
            type="text"
            value={draft}
            placeholder="Add a task"
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className="button button-primary">
            Add
          </button>
        </div>
      </form>

      <ul className="item-list">
        {tasks.map((task) => (
          <li key={task.id} className="item-row">
            <span>{task.text}</span>
            <button type="button" className="button button-small" onClick={() => removeTask(task.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </ExerciseCard>
  );
}

/* E4 — boolean state + accessible disclosure */
function ToggleExercise() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExerciseCard
      id="E4"
      title="Show and hide content"
      hint="Use a boolean state value to reveal optional content and expose the control state accessibly."
    >
      <button
        type="button"
        className="button button-primary"
        aria-expanded={isOpen}
        aria-controls="details-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "Hide details" : "Show details"}
      </button>

      {isOpen && (
        <p id="details-panel" className="details-panel">
          State is a component's memory. An event handler updates it, and React re-renders the UI.
        </p>
      )}
    </ExerciseCard>
  );
}

/* E5 — object updates + filtering */
const starterTodos = [
  { id: 1, text: "Read the React lesson", done: false },
  { id: 2, text: "Try the counter", done: true },
  { id: 3, text: "Update the task list", done: false },
];

const filters = ["All", "Active", "Done"];

function TodoFilterExercise() {
  const [todos, setTodos] = useState(starterTodos);
  const [filter, setFilter] = useState("All");

  const visibleTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.done;
    if (filter === "Done") return todo.done;
    return true;
  });

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.done));
  }

  return (
    <ExerciseCard
      id="E5"
      title="Complete and filter tasks"
      hint="Use object updates to mark tasks complete, then filter the list by status."
    >
      <div className="filter-bar" role="group" aria-label="Filter tasks by status">
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            className={`filter-button${filter === option ? " is-active" : ""}`}
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <ul className="item-list todo-list">
        {visibleTodos.map((todo) => (
          <li key={todo.id} className="item-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark ${todo.text} as complete`}
              />
              <span className={todo.done ? "done-text" : ""}>{todo.text}</span>
            </label>
          </li>
        ))}
      </ul>

      <button type="button" className="button button-secondary" onClick={clearCompleted}>
        Clear completed
      </button>
    </ExerciseCard>
  );
}

/* E6 — one object for several controlled fields */
function ProfileFormExercise() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = profile.name.trim();
    const email = profile.email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !isValidEmail) {
      setMessage("Please enter a name and a valid email address.");
      return;
    }

    setMessage(`Saved ${name} (${email}).`);
  }

  return (
    <ExerciseCard
      id="E6"
      title="Validate a controlled form"
      hint="Keep two fields in one object and show a simple message after submission."
    >
      <form className="stacked-form" onSubmit={handleSubmit} noValidate>
        <label className="field-label" htmlFor="profile-name">
          Name
        </label>
        <input
          id="profile-name"
          name="name"
          className="text-input"
          type="text"
          value={profile.name}
          onChange={handleChange}
        />

        <label className="field-label" htmlFor="profile-email">
          Email
        </label>
        <input
          id="profile-email"
          name="email"
          className="text-input"
          type="email"
          value={profile.email}
          onChange={handleChange}
        />

        <button type="submit" className="button button-primary">
          Save profile
        </button>
      </form>

      <p className="form-message" role="status" aria-live="polite">
        {message}
      </p>
    </ExerciseCard>
  );
}

/* E7 — effect + localStorage */
function NoteExercise() {
  const [note, setNote] = useState(() => {
    try {
      return window.localStorage.getItem(NOTE_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(NOTE_KEY, note);
    } catch {
      // Storage may be unavailable; the app still works in memory.
    }
  }, [note]);

  return (
    <ExerciseCard
      id="E7"
      title="Save a note in the browser"
      hint="Use an effect to save state with localStorage whenever the note changes."
    >
      <label className="field-label" htmlFor="quick-note">
        Quick note
      </label>
      <textarea
        id="quick-note"
        className="text-input note-input"
        value={note}
        placeholder="Write something..."
        onChange={(event) => setNote(event.target.value)}
      />

      <p className="save-status" aria-live="polite">
        {note.trim() ? "Saved in this browser" : "Nothing saved yet"}
      </p>

      <button type="button" className="button button-secondary" onClick={() => setNote("")}>
        Clear
      </button>
    </ExerciseCard>
  );
}

export default function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a
          className="brand"
          href="https://mrabubakrkamolov.github.io/Assigment/"
          target="_blank"
          rel="noreferrer"
        >
          AB<span>.</span>
        </a>
        <nav aria-label="Week 11-2 navigation">
          <a href="#main-content">Practice</a>
          <a href="./index.html">Week 11-1</a>
        </nav>
        <a
          className="portfolio-link"
          href="https://github.com/mrabubakrkamolov/Assigment/tree/main/week11-2"
          target="_blank"
          rel="noreferrer"
        >
          Source ↗
        </a>
      </header>

      <main id="main-content" className="main">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Week 11_2 / React State &amp; Events</p>
          <h1 id="page-title">Make the interface respond.</h1>
          <p className="lede">
            Practice updating the screen from user input with React state and event handlers.
          </p>
        </section>

        <div className="exercise-grid">
          <CounterExercise />
          <ControlledInputExercise />
          <TaskListExercise />
          <ToggleExercise />
          <TodoFilterExercise />
          <ProfileFormExercise />
          <NoteExercise />
        </div>
      </main>

      <footer className="site-footer">
        <p>Week 11-2 · React State &amp; Events · Abubakr</p>
        <p>
          <span>WEEK 11_2</span> · REACT STATE &amp; EVENTS
        </p>
      </footer>
    </div>
  );
}
