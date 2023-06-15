import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import FolderInfoComponent from 'renderer/components/FolderInfoComponent';
import CompressImageComponent from 'renderer/components/CompressImageComponent';
import SearchInFolderComponent from 'renderer/components/SearchInFolderComponent';
import SubfolderExtractorComponent from 'renderer/components/SubfolderExtractorComponent';
import PagesLayout from './PagesLayout';
import Homepage from './Homepage';

export default function App() {
  return (
    <Router>
      <header className="header">
        <Link to="/">Folder Service Utility App</Link>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/info"
            element={<PagesLayout Component={FolderInfoComponent} />}
          />
          <Route
            path="/compress"
            element={<PagesLayout Component={CompressImageComponent} />}
          />
          <Route
            path="/search"
            element={<PagesLayout Component={SearchInFolderComponent} />}
          />
          <Route
            path="/bundle"
            element={<PagesLayout Component={SubfolderExtractorComponent} />}
          />
        </Routes>
      </main>
    </Router>
  );
}
