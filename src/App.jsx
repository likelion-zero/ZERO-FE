import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Album from './features/MusicChart/components/Album';
import AlbumStack from './features/MusicChart/components/AlbumStack';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loading" element={<LoadingPage />} />
        
        {/* 404주소 home으로 리다이렉팅 */}
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
