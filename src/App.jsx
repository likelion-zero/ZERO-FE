import { BrowserRouter, Routes, Route } from 'react-router';
import Album from './features/MusicChart/components/Album';
import AlbumStack from './features/MusicChart/components/AlbumStack';
import LoadingPage from './pages/LoadingPage';
import VocabularyPage from './pages/VocabularyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<VocabularyPage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
