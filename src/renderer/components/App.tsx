import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';

export default function App() {
  return (
    <Router>
      <header className="header"><Link to="/">Folder Utils App</Link></header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
    </Router>
  );
}
