import { BrowserRouter, Routes, Route } from 'react-router';
import Album from './features/MusicChart/components/Album';
import AlbumStack from './features/MusicChart/components/AlbumStack';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
