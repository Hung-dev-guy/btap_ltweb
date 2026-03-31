import { Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
    </Routes>
  );
}

export default App;
