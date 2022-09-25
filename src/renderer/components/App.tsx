import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';

export default function App() {
  return (
    <Router>
      <header className="header">Folder Utils App</header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
    </Router>
  );
}
