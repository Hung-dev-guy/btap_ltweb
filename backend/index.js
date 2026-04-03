const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// ─── Hardcoded Blog Data ───────────────────────────────────────────────────
const blogs = [
  {
    id: 1,
    title: "Getting Started with React in 2024",
    slug: "getting-started-with-react-2024",
    author: "Alice Nguyen",
    createdAt: "2024-01-15T08:00:00Z",
    summary:
      "A comprehensive beginner guide to React — from setting up your first project with Vite to understanding components, JSX, and state management.",
    content: `
      <h2>Introduction</h2>
      <p>React is one of the most popular JavaScript libraries for building user interfaces. It was developed by Facebook and has a huge ecosystem that makes it a go-to choice for modern web development.</p>
      
      <h2>Setting Up Your Environment</h2>
      <p>The fastest way to start a new React project is using <strong>Vite</strong>:</p>
      <pre><code>npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev</code></pre>
      
      <h2>Understanding Components</h2>
      <p>React apps are built from <strong>components</strong> — reusable pieces of UI. A simple functional component looks like this:</p>
      <pre><code>function Greeting({ name }) {
  return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
}</code></pre>

      <h2>State and Props</h2>
      <p>Use <code>useState</code> to manage local state inside a component. <strong>Props</strong> allow you to pass data from parent to child components.</p>

      <h2>Conclusion</h2>
      <p>React's component model makes it easy to build complex UIs from simple, reusable building blocks. Start small, practice building components, and you'll be productive in no time!</p>
    `,
  },
  {
    id: 2,
    title: "Mastering CSS Flexbox and Grid",
    slug: "mastering-css-flexbox-and-grid",
    author: "Bob Tran",
    createdAt: "2024-02-03T09:30:00Z",
    summary:
      "Deep-dive into the two most powerful CSS layout systems — Flexbox and Grid — with real-world examples and visual breakdowns.",
    content: `
      <h2>Why Layout Matters</h2>
      <p>Two decades ago, CSS layout meant floats and clearfixes. Today we have two powerful, purpose-built systems: <strong>Flexbox</strong> and <strong>CSS Grid</strong>.</p>

      <h2>Flexbox in a Nutshell</h2>
      <p>Flexbox is a one-dimensional layout model. Apply it with:</p>
      <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
      <p>Use Flexbox for navigation bars, card rows, and any linear arrangement of items.</p>

      <h2>CSS Grid in a Nutshell</h2>
      <p>Grid is two-dimensional — rows <em>and</em> columns at the same time.</p>
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}</code></pre>

      <h2>When to Use Which</h2>
      <ul>
        <li>Use <strong>Flexbox</strong> for components (menus, toolbars, button groups)</li>
        <li>Use <strong>Grid</strong> for page-level layouts (header / sidebar / main / footer)</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Both systems complement each other. Understanding both unlocks virtually any layout you can imagine.</p>
    `,
  },
  {
    id: 3,
    title: "Node.js REST API Design Best Practices",
    slug: "nodejs-rest-api-design-best-practices",
    author: "Clara Pham",
    createdAt: "2024-03-10T11:00:00Z",
    summary:
      "Learn the best practices for designing clean, scalable, and maintainable REST APIs using Node.js and Express — from routing to error handling.",
    content: `
      <h2>A Good API Is a Happy API</h2>
      <p>A well-designed REST API is predictable, consistent, and easy to consume. Here are the key principles.</p>

      <h2>Use Meaningful Resource Names</h2>
      <p>Always use nouns (not verbs) for endpoints, and use plural form for collections:</p>
      <pre><code>GET  /api/blogs        → list all blogs
GET  /api/blogs/:id   → get one blog
POST /api/blogs        → create a blog
PUT  /api/blogs/:id   → update a blog
DELETE /api/blogs/:id → delete a blog</code></pre>

      <h2>Return Proper HTTP Status Codes</h2>
      <ul>
        <li><code>200</code> — OK</li>
        <li><code>201</code> — Created</li>
        <li><code>400</code> — Bad Request</li>
        <li><code>404</code> — Not Found</li>
        <li><code>500</code> — Internal Server Error</li>
      </ul>

      <h2>Centralized Error Handling</h2>
      <p>Use Express error middleware to catch all errors in one place:</p>
      <pre><code>app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});</code></pre>

      <h2>Conclusion</h2>
      <p>Consistent naming, proper status codes, and centralized error handling are the foundation of a great REST API.</p>
    `,
  },
  {
    id: 4,
    title: "JavaScript Async/Await Explained",
    slug: "javascript-async-await-explained",
    author: "David Le",
    createdAt: "2024-04-22T14:15:00Z",
    summary:
      "Finally understand Promises, async/await, and how to handle asynchronous JavaScript without callback hell.",
    content: `
      <h2>The Problem with Callbacks</h2>
      <p>Early JavaScript relied on callbacks to handle asynchronous operations. This led to deeply nested, hard-to-read code — often called <em>"callback hell"</em>.</p>

      <h2>Promises to the Rescue</h2>
      <p>A <code>Promise</code> represents a value that will be available in the future:</p>
      <pre><code>fetch('/api/blogs')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));</code></pre>

      <h2>async / await — Syntactic Sugar</h2>
      <p><code>async/await</code> lets you write asynchronous code that looks synchronous:</p>
      <pre><code>async function loadBlogs() {
  try {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to load blogs:', err);
  }
}</code></pre>

      <h2>Error Handling</h2>
      <p>Always wrap <code>await</code> calls in <code>try/catch</code> blocks to handle rejection gracefully.</p>

      <h2>Conclusion</h2>
      <p><code>async/await</code> is the modern standard for handling asynchronous JavaScript. Embrace it!</p>
    `,
  },
  {
    id: 5,
    title: "Introduction to Git and Version Control",
    slug: "introduction-to-git-and-version-control",
    author: "Emma Hoang",
    createdAt: "2024-05-08T07:45:00Z",
    summary:
      "A practical beginner guide to Git — commits, branches, merges, and collaboration workflows with GitHub.",
    content: `
      <h2>Why Version Control?</h2>
      <p>Version control lets you track changes over time, collaborate with a team, and safely experiment with new features without fear of breaking things.</p>

      <h2>Core Git Concepts</h2>
      <ul>
        <li><strong>Repository</strong> — a project tracked by Git</li>
        <li><strong>Commit</strong> — a snapshot of your changes</li>
        <li><strong>Branch</strong> — an independent line of development</li>
        <li><strong>Merge</strong> — combining two branches</li>
      </ul>

      <h2>Essential Commands</h2>
      <pre><code>git init              # initialize a repo
git add .             # stage all changes
git commit -m "msg"   # save a snapshot
git branch feature    # create a branch
git checkout feature  # switch to branch
git merge feature     # merge into current branch
git push origin main  # push to GitHub</code></pre>

      <h2>The Feature Branch Workflow</h2>
      <p>Work on each new feature in its own branch, then open a Pull Request to merge it into <code>main</code> after code review.</p>

      <h2>Conclusion</h2>
      <p>Git is an essential tool for every developer. Start using it from day one — even on solo projects!</p>
    `,
  },
  {
    id: 6,
    title: "Understanding SQL vs NoSQL Databases",
    slug: "understanding-sql-vs-nosql-databases",
    author: "Frank Dinh",
    createdAt: "2024-06-19T10:00:00Z",
    summary:
      "Compare SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases — when to use each and their core trade-offs.",
    content: `
      <h2>The Database Landscape</h2>
      <p>Choosing the right database is a critical architectural decision. The two main categories are <strong>SQL</strong> (relational) and <strong>NoSQL</strong> (non-relational).</p>

      <h2>SQL Databases</h2>
      <p>SQL databases store data in structured tables with fixed schemas. Examples: <strong>PostgreSQL</strong>, <strong>MySQL</strong>, <strong>SQLite</strong>.</p>
      <ul>
        <li>✅ ACID transactions</li>
        <li>✅ Strong consistency</li>
        <li>✅ Powerful JOINs</li>
        <li>❌ Harder to scale horizontally</li>
      </ul>

      <h2>NoSQL Databases</h2>
      <p>NoSQL databases are schema-flexible and come in many forms: document (MongoDB), key-value (Redis), column (Cassandra), graph (Neo4j).</p>
      <ul>
        <li>✅ Horizontal scaling</li>
        <li>✅ Flexible schema</li>
        <li>✅ High write throughput</li>
        <li>❌ Weaker consistency guarantees</li>
      </ul>

      <h2>Which Should You Choose?</h2>
      <p>Use <strong>SQL</strong> for structured data with relationships (e-commerce, finance). Use <strong>NoSQL</strong> for unstructured data at scale (social media, real-time analytics).</p>

      <h2>Conclusion</h2>
      <p>There's no universal answer — it depends on your data model, scale, and consistency requirements.</p>
    `,
  },
];

// ─── API Routes ────────────────────────────────────────────────────────────

// GET /api/blogs — return all blogs (summary view)
app.get("/api/blogs", (req, res) => {
  const summaries = blogs.map(
    ({ id, title, slug, summary, author, createdAt }) => ({
      id,
      title,
      slug,
      summary,
      author,
      createdAt,
    })
  );
  res.json(summaries);
});

// GET /api/blogs/slug/:slug — MUST come before /api/blogs/:id to avoid conflict
app.get("/api/blogs/slug/:slug", (req, res) => {
  const blog = blogs.find((b) => b.slug === req.params.slug);
  if (!blog) {
    return res
      .status(404)
      .json({ error: `Blog with slug "${req.params.slug}" not found.` });
  }
  res.json(blog);
});

// GET /api/blogs/:id — get blog by numeric id
app.get("/api/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Blog id must be a number." });
  }
  const blog = blogs.find((b) => b.id === id);
  if (!blog) {
    return res.status(404).json({ error: `Blog with id ${id} not found.` });
  }
  res.json(blog);
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅  Blog API running at http://localhost:${PORT}`);
  console.log(`   GET /api/blogs`);
  console.log(`   GET /api/blogs/:id`);
  console.log(`   GET /api/blogs/slug/:slug`);
});
