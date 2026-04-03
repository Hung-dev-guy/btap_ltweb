1. Add a New Blog Post

File: 

backend/index.js
Task: Find the const blogs = [...] array and manually add a new blog object (id: 7) about a topic of your choice (e.g., TypeScript or TailwindCSS).
Goal: Save the file, verify nodemon restarts your server automatically, and check http://localhost:8080/api/blogs in your browser to make sure the 7th blog appears.
2. Create a "Search by Author" Endpoint

File: 

backend/index.js
Task: Add a new route: app.get('/api/blogs/author/:authorName', (req, res) => { ... }). Inside the route, use .filter() to find all blogs that match req.params.authorName and send them back using res.json().
Goal: Test it in your browser by visiting http://localhost:8080/api/blogs/author/Alice Nguyen.
Level 2: Medium (Frontend Only)
3. Format the Dates

Files: 

frontend/src/pages/BlogList.jsx
 and 

frontend/src/pages/BlogDetail.jsx
Task: Right now, the createdAt date comes from the database looking like "2024-01-15T08:00:00Z", which is ugly. Modify your React components to make it look like "Jan 15, 2024".
Hint: You can use standard JavaScript in your JSX like this: new Date(blog.createdAt).toLocaleDateString()
4. Add a "Back" Button to the Blog Detail Page

File: 

frontend/src/pages/BlogDetail.jsx
Task: Add a <button>← Back to all blogs</button> at the top of the detail page.
Hint: Use React Router! Import the useNavigate hook from react-router-dom, initialize it inside your component (const navigate = useNavigate();), and add an onClick={() => navigate('/')} to the button.