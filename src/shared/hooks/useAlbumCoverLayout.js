import { useState, useEffect } from 'react';
import { measureTextSize, isValidPosition, getZonePosition } from '@/shared/utils/albumCoverHelper';

export const useAlbumCoverLayout = (words, containerSize, padding = 12) => {
  const [positions, setPositions] = useState([]);
  const [isCalculating, setIsCalculating] = useState(true);

  useEffect(() => {
    if (!words || words.length === 0) return;

    setIsCalculating(true);

    // 비동기로 처리하여 UI 블로킹 방지
    const calculateLayout = () => {
      // 1. 단어 정렬: 길이 순 (긴 단어부터 배치해야 공간 확보 유리)
      const sortedWords = [...words].sort((a, b) => b.text.length - a.text.length);

      const placedItems = [];
      const maxAttempts = 200;

      sortedWords.forEach((word, index) => {
        // 폰트 사이즈 동적 할당 (긴 단어는 조금 작게, 짧은건 크게 등 디자인적 요소 가미 가능)
        // 여기서는 기본값 유지하되, index에 따라 변형 가능
        const fontSize = word.fontSize || (index < 2 ? 32 : index > 6 ? 20 : 24); // 예시 로직
        const fontWeight = word.fontWeight || (index === 0 ? '900' : '700');

        // 텍스트 크기 측정
        const size = measureTextSize(word.text, fontSize, fontWeight);

        let bestPos = null;
        let isRotated = false;

        // --- 배치 전략 수립 ---
        // 전략 1: 가장 긴 단어(index 0)는 우측에 세로로 배치 시도
        if (index === 0) {
          isRotated = true; // 세로 모드
        }
        // 전략 2: 아주 짧은 단어들(마지막 3개)은 좌측 하단 배치 시도
        else if (index >= sortedWords.length - 3) {
          isRotated = false;
        }
        // 전략 3: 나머지는 랜덤 회전 (30% 확률)
        else {
          isRotated = Math.random() > 0.7;
        }

        // 회전 시 width/height 스왑하여 계산
        const currentWidth = isRotated ? size.height : size.width;
        const currentHeight = isRotated ? size.width : size.height;
        const itemSize = { width: currentWidth, height: currentHeight };

        // --- 위치 찾기 시도 ---
        for (let i = 0; i < maxAttempts; i++) {
          let pos;

          // 구역 설정
          if (index === 0) {
            pos = getZonePosition('right', containerSize, itemSize, padding);
          } else if (index >= sortedWords.length - 3) {
            pos = getZonePosition('bottom-left', containerSize, itemSize, padding);
          } else {
            pos = getZonePosition('any', containerSize, itemSize, padding);
          }

          const rect = { x: pos.x, y: pos.y, width: itemSize.width, height: itemSize.height };

          if (isValidPosition(rect, placedItems, containerSize, padding)) {
            bestPos = rect;
            break;
          }
        }

        // 구역 배치 실패 시, 전체 영역에서 다시 시도 (Fallback)
        if (!bestPos) {
          for (let i = 0; i < maxAttempts; i++) {
            const pos = getZonePosition('any', containerSize, itemSize, padding);
            const rect = { x: pos.x, y: pos.y, width: itemSize.width, height: itemSize.height };
            if (isValidPosition(rect, placedItems, containerSize, padding)) {
              bestPos = rect;
              break;
            }
          }
        }

        if (bestPos) {
          placedItems.push({
            text: word.text,
            x: bestPos.x,
            y: bestPos.y,
            width: bestPos.width,
            height: bestPos.height,
            rotation: isRotated ? 90 : 0,
            fontSize,
            fontWeight,
            color: '#000000' // 추후 색상 변경 가능
          });
        } else {
          console.warn(`Could not place word: ${word.text}`);
        }
      });

      setPositions(placedItems);
      setIsCalculating(false);
    };

    // 브라우저 렌더링 틱 확보를 위해 setTimeout 사용
    const timer = setTimeout(calculateLayout, 0);
    return () => clearTimeout(timer);

  }, [words, containerSize, padding]);

  return { positions, isCalculating };
};
