import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Album from '@/features/MusicChart/components/Album';
import AlbumStack from '@/features/MusicChart/components/AlbumStack';
import LoadingPage from '@/pages/LoadingPage';
import ChartPage from '@/pages/ChartPage';
import VocabularyPage from '@/pages/VocabularyPage';
import PlayListPage from '@/pages/PlayListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 404주소 home으로 리다이렉팅 */}
        <Route path="*" element={<Navigate to="/" replace />}/>

        <Route path="/" element={<VocabularyPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/playlist" element={<PlayListPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
