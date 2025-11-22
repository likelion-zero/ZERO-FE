import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import LoadingPage from '@/pages/LoadingPage';
import ChartPage from '@/pages/ChartPage';
import VocabularyPage from '@/pages/VocabularyPage';
import PlayListPage from '@/pages/PlayListPage';
import PlayerPage from '@/pages/PlayerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VocabularyPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/playlist" element={<PlayListPage />} />
        <Route path="/player/:songId" element={<PlayerPage />} />

        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
