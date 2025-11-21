import { useRef, useEffect, useState, useMemo } from 'react';
import { useAlbumCoverLayout } from '@/shared/hooks/useAlbumCoverLayout';

const AlbumImage = ({ words = null }) => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  // 더미 데이터 (9개 고정)
  const defaultWords = useMemo(() => [
    { text: 'apple' },
    { text: 'banana' },
    { text: 'orange' },
    { text: 'pineapple' }, // 긴 단어 -> 자동 sorting 되어 우측 배치 예정
    { text: 'cherry' },
    { text: 'grape' },
    { text: 'kiwi' },
    { text: 'lemon' },
    { text: 'strawberry' }, // 긴 단어
  ], []);

  // 1. 상수 정의
  // Tailwind w-67 = 16.75rem = 268px.
  // 고해상도(Retina) 대응을 위해 2배수로 렌더링하고 CSS로 줄이는 방법도 있지만,
  // 성능을 위해 1:1 매핑인 268px로 설정합니다.
  const CANVAS_SIZE = 268;
  const PADDING_PX = 12; // p-3

  const containerSize = useMemo(() => ({ width: CANVAS_SIZE, height: CANVAS_SIZE }), []);

  // 2. 레이아웃 계산 Hook 호출
  const targetWords = words && words.length === 9 ? words : defaultWords;
  const { positions, isCalculating } = useAlbumCoverLayout(
    targetWords,
    containerSize,
    PADDING_PX
  );

  // 3. 캔버스 그리기 및 이미지 변환
  useEffect(() => {
    if (isCalculating || positions.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 배경 초기화
    ctx.fillStyle = '#d9d9d9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 텍스트 렌더링
    positions.forEach((item) => {
      ctx.save();

      ctx.font = `${item.fontWeight} ${item.fontSize}px Inter, sans-serif`;
      ctx.fillStyle = item.color || '#000000';
      ctx.textBaseline = 'top';

      // 회전 처리
      if (item.rotation) {
        // 회전 중심점 계산
        const centerX = item.x + item.width / 2;
        const centerY = item.y + item.height / 2;

        ctx.translate(centerX, centerY);
        ctx.rotate((item.rotation * Math.PI) / 180);
        // 회전 후에는 width/height가 뒤바뀐 상태의 중심이므로 반대로 offset
        ctx.fillText(item.text, -item.height / 2, -item.width / 2);
      } else {
        ctx.fillText(item.text, item.x, item.y);
      }

      ctx.restore();
    });

    // Blob 또는 DataURL로 변환하여 이미지 소스로 사용
    const dataUrl = canvas.toDataURL('image/png');
    setImageUrl(dataUrl);

  }, [positions, isCalculating]);

  // 4. 렌더링
  // w-67 h-67 클래스는 기본 사이즈를 잡아주지만,
  // 실제 사용시에는 부모 div의 크기를 따라가도록 w-full h-full을 이미지에 적용합니다.
  return (
    <div className="relative w-67 h-67 bg-[#d9d9d9] rounded-xl overflow-hidden shrink-0">
      {/* 로딩 상태 */}
      {isCalculating && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#d9d9d9]">
          <span className="text-sm text-gray-500 animate-pulse">Drawing...</span>
        </div>
      )}

      {/* 완성된 이미지 (반응형 대응) */}
      {!isCalculating && imageUrl && (
        <img
          src={imageUrl}
          alt="Album Cover"
          className="w-full h-full object-cover rounded-xl block"
          draggable="false"
        />
      )}

      {/* 히든 캔버스 (실제 그리기는 여기서 발생) */}
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="hidden" // 화면엔 보이지 않고 메모리 상에서만 작업
        aria-hidden="true"
      />
    </div>
  );
};

export default AlbumImage;