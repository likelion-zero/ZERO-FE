
import Album from './Album';
const AlbumStack = () => {
  const albums = [
    { id: 1, title: 'fruits song', genre: '동요 | 신나는' },
    { id: 2, title: 'summer vibes', genre: '팝 | 경쾌한' },
    { id: 3, title: 'night jazz', genre: '재즈 | 차분한' },
  ];

  return(
    <div className="relative w-full h-screen flex justify-center items-center">
      {albums.map((album, index) => (
        <div
          key={album.id}
          className="absolute"
          style={{
            transform: `translateY(${index%2 ? index * 30 : index * -20}px) scale(${1 - index * 0.05})`,
            zIndex: albums.length - index,
          }}
        >
          <Album {...album} />
        </div>
        
      ))}
      <div className="relative w-70 h-70 bg-orange-100 rounded-2xl translate-y-30" />
    </div>
  )
};

export default AlbumStack;