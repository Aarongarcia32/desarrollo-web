import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginForm } from './components/LoginForm';
import { HomeView } from './components/HomeView';
import { SubjectsView } from './components/SubjectsView';
import { TeachersView } from './components/TeachersView';
import { HistoryView } from './components/HistoryView';
import ReactPlayer from 'react-player';

import UsuariosList from './components/UsuariosList';
import './index.css';



// Mock video data
const mockVideos = [
  {
    id: '1',
    title: 'Introducción al Cálculo Diferencial - Límites y Derivadas',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    // URL de ejemplo reproducible (MP4 público) para pruebas locales
    url: 'https://res.cloudinary.com/da4a9k7qi/video/upload/v1763953894/PERRITO_BAILANDO_NO_NO_NO_EL_COCO_NO_bastux.mp4',
    teacher: 'Dr. Carlos Mendoza',
    teacherAvatar: 'https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?w=400',
    views: '15K',
    duration: '24:15',
    uploadDate: 'hace 2 días',
    category: 'Matemáticas',
  },
  {
    id: '2',
    title: 'Química Orgánica: Hidrocarburos y sus Propiedades',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    teacher: 'Dra. María González',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    views: '12K',
    duration: '18:45',
    uploadDate: 'hace 3 días',
    category: 'Ciencias',
  },
  {
    id: '3',
    title: 'La Revolución Francesa: Causas y Consecuencias',
    thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
    teacher: 'Prof. Juan Ramírez',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    views: '8.5K',
    duration: '32:10',
    uploadDate: 'hace 5 días',
    category: 'Historia',
  },
  {
    id: '4',
    title: 'Python para Principiantes: Variables y Tipos de Datos',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    teacher: 'Ing. Roberto López',
    teacherAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    views: '25K',
    duration: '28:30',
    uploadDate: 'hace 1 semana',
    category: 'Programación',
  },
  {
    id: '5',
    title: 'English Grammar: Present Perfect vs Simple Past',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    teacher: 'Prof. David Smith',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    views: '18K',
    duration: '15:20',
    uploadDate: 'hace 4 días',
    category: 'Inglés',
  },
  {
    id: '6',
    title: 'Teoría de Conjuntos y Lógica Matemática',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
    teacher: 'Dr. Carlos Mendoza',
    teacherAvatar: 'https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?w=400',
    views: '9.2K',
    duration: '21:45',
    uploadDate: 'hace 6 días',
    category: 'Matemáticas',
  },
  {
    id: '7',
    title: 'Física: Cinemática y Movimiento Rectilíneo Uniforme',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800',
    teacher: 'Dra. María González',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    views: '14K',
    duration: '26:00',
    uploadDate: 'hace 1 semana',
    category: 'Ciencias',
  },
  {
    id: '8',
    title: 'Literatura Latinoamericana: Realismo Mágico',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    teacher: 'Lic. Ana Torres',
    teacherAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    views: '7.8K',
    duration: '35:15',
    uploadDate: 'hace 2 semanas',
    category: 'Lengua y Literatura',
  },
  {
    id: '9',
    title: 'JavaScript Avanzado: Async/Await y Promises',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
    teacher: 'Ing. Roberto López',
    teacherAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    views: '31K',
    duration: '42:20',
    uploadDate: 'hace 3 días',
    category: 'Programación',
  },
  {
    id: '10',
    title: 'Técnicas de Dibujo: Perspectiva y Composición',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
    teacher: 'Mtra. Laura Fernández',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    views: '6.5K',
    duration: '19:50',
    uploadDate: 'hace 1 semana',
    category: 'Arte',
  },
  {
    id: '11',
    title: 'Álgebra Lineal: Matrices y Determinantes',
    thumbnail: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800',
    teacher: 'Dr. Carlos Mendoza',
    teacherAvatar: 'https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?w=400',
    views: '11K',
    duration: '29:30',
    uploadDate: 'hace 5 días',
    category: 'Matemáticas',
  },
  {
    id: '12',
    title: 'Historia del Arte: Renacimiento Italiano',
    thumbnail: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
    teacher: 'Prof. Juan Ramírez',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    views: '9.8K',
    duration: '38:00',
    uploadDate: 'hace 1 semana',
    category: 'Historia',
  },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [videoHistory, setVideoHistory] = useState<any[]>([]);
  const [playingVideo, setPlayingVideo] = useState<any | null>(null);
  const Player: any = ReactPlayer;

  // Probar conexión con el backend al montar el componente
  useEffect(() => {
    fetch('/api/usuario') // Cambia la ruta si tu backend usa otra
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => {
        console.log('Conexión exitosa con backend:', data);
      })
      .catch(err => {
        console.error('Error al conectar con backend:', err);
      });
  }, []);
  
  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  const handleVideoClick = (videoId: string) => {
    const video = mockVideos.find((v) => v.id === videoId);
    console.log('handleVideoClick called for id:', videoId, 'found video:', video);
    if (video) {
      // Add to history if not already there
      const existingIndex = videoHistory.findIndex((v) => v.id === videoId);
      if (existingIndex === -1) {
        const now = new Date();
        const historyItem = {
          ...video,
          watchedDate: now.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          watchedPercentage: Math.floor(Math.random() * 100), // Random progress for demo
        };
        setVideoHistory([historyItem, ...videoHistory]);
      } else {
        // Move to top of history
        const updatedHistory = [...videoHistory];
        const [item] = updatedHistory.splice(existingIndex, 1);
        setVideoHistory([item, ...updatedHistory]);
      }
      // Open player modal if the video has a playable URL
      const url = (video as any).url || (video as any).src;
      if (url) {
        try {
          if (Player && typeof Player.canPlay === 'function') {
            if (Player.canPlay(url)) {
              console.log('Opening player for', url);
              setPlayingVideo(video);
              return;
            }
            console.warn('ReactPlayer cannot play this URL:', url);
            // intentar abrir en nueva pestaña como fallback
            window.open(url, '_blank', 'noopener');
            return;
          }
        } catch (err) {
          console.error('Error comprobando si ReactPlayer puede reproducir la URL', err);
        }
        // Si no hay check disponible, intentamos abrir el modal de todos modos
        setPlayingVideo(video);
        return;
      }
    }
    // If no playable URL, fallback to a simple alert or navigation
    alert(`Reproduciendo: ${video?.title}`);
  };

  const handleRemoveFromHistory = (videoId: string) => {
    setVideoHistory(videoHistory.filter((v) => v.id !== videoId));
  };

  const closePlayer = () => setPlayingVideo(null);

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-20'
          }`}
        >
          {activeView === 'home' && (
            <HomeView videos={mockVideos} onVideoClick={handleVideoClick} />
          )}
          {activeView === 'trending' && (
            <HomeView
              videos={[...mockVideos].sort((a, b) => {
                const viewsA = parseInt(a.views.replace('K', '000'));
                const viewsB = parseInt(b.views.replace('K', '000'));
                return viewsB - viewsA;
              })}
              onVideoClick={handleVideoClick}
            />
          )}
          {activeView === 'subjects' && <SubjectsView />}
          {activeView === 'teachers' && <TeachersView />}
          {activeView === 'history' && (
            <HistoryView
              history={videoHistory}
              onVideoClick={handleVideoClick}
              onRemoveFromHistory={handleRemoveFromHistory}
            />
          )}
          {activeView === 'library' && (
            <HomeView videos={mockVideos} onVideoClick={handleVideoClick} />
          )}
          {/* Integración de UsuariosList como nueva vista */}
          {activeView === 'usuarios' && <UsuariosList />}
          {activeView === 'playerdemo' && <PlayerDemo />}
        </main>
      </div>
      {/* Quick test button to open PlayerDemo */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveView('playerdemo')}>
        Abrir PlayerDemo
      </button>

      {/* Player modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={closePlayer}>
          <div className="w-[90%] max-w-4xl bg-black" onClick={(e) => e.stopPropagation()}>
            <Player url={(playingVideo as any).url || (playingVideo as any).src} controls width="100%" />
            <div className="text-right p-2">
              <button className="px-4 py-2 bg-white rounded" onClick={closePlayer}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//Componente de prueba del reproductor
export function PlayerDemo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Demo del Reproductor</h2>
      
      <div className="bg-black rounded-lg overflow-hidden mb-4">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=DQJ8JX17J58"
          controls
          playing={playing}
          width="100%"
          height="500px"
          config={{
            youtube: {
              playerVars: { 
                showinfo: 1,
                modestbranding: 1
              }
            }
          }}
          onReady={() => console.log('Player listo')}
          onError={(e) => console.error('Error:', e)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setPlaying(!playing)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {playing ? 'Pausar' : 'Reproducir'}
        </button>
        
        <button 
          onClick={() => setPlaying(false)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Detener
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Tipos de URLs soportadas:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>YouTube: https://www.youtube.com/watch?v=...</li>
          <li>MP4 directo: https://ejemplo.com/video.mp4</li>
          <li>HLS: https://ejemplo.com/video.m3u8</li>
        </ul>
      </div>
    </div>
  );
}