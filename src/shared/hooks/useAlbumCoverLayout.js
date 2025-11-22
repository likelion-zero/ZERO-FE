import { useState, useEffect } from 'react';
import { measureTextSize, isValidPosition, getZonePosition } from '@/shared/utils/albumCoverHelper';

export const useAlbumCoverLayout = (words, containerSize = { width: 0, height: 0 }, padding = 12) => {
  const [positions, setPositions] = useState([]);
  const [isCalculating, setIsCalculating] = useState(true);

  const width = containerSize?.width ?? 0;
  const height = containerSize?.height ?? 0;
  const hasWords = Array.isArray(words) && words.length > 0;

  useEffect(() => {
    let cancelled = false;

    if (!hasWords || width === 0 || height === 0) {
      const frame = requestAnimationFrame(() => {
        if (cancelled) return;
        setPositions([]);
        setIsCalculating(false);
      });

      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
      };
    }

    const calculateLayout = () => {
      if (cancelled) return;
      setIsCalculating(true);

      const sortedWords = [...words].sort((a, b) => b.text.length - a.text.length);

      const placedItems = [];
      const maxAttempts = 200;
      const container = { width, height };

      sortedWords.forEach((word, index) => {
        const fontSize = word.fontSize || (index < 2 ? 32 : index > 6 ? 20 : 24);
        const fontWeight = word.fontWeight || (index === 0 ? '900' : '700');
        const size = measureTextSize(word.text, fontSize, fontWeight);

        let bestPos = null;
        let isRotated = false;

        if (index === 0) {
          isRotated = true;
        } else if (index >= sortedWords.length - 3) {
          isRotated = false;
        } else {
          isRotated = Math.random() > 0.7;
        }

        const currentWidth = isRotated ? size.height : size.width;
        const currentHeight = isRotated ? size.width : size.height;
        const itemSize = { width: currentWidth, height: currentHeight };

        for (let i = 0; i < maxAttempts; i++) {
          let pos;

          if (index === 0) {
            pos = getZonePosition('right', container, itemSize, padding);
          } else if (index >= sortedWords.length - 3) {
            pos = getZonePosition('bottom-left', container, itemSize, padding);
          } else {
            pos = getZonePosition('any', container, itemSize, padding);
          }

          const rect = { x: pos.x, y: pos.y, width: itemSize.width, height: itemSize.height };

          if (isValidPosition(rect, placedItems, container, padding)) {
            bestPos = rect;
            break;
          }
        }

        if (!bestPos) {
          for (let i = 0; i < maxAttempts; i++) {
            const pos = getZonePosition('any', container, itemSize, padding);
            const rect = { x: pos.x, y: pos.y, width: itemSize.width, height: itemSize.height };
            if (isValidPosition(rect, placedItems, container, padding)) {
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
            color: '#000000',
          });
        } else {
          console.warn(`Could not place word: ${word.text}`);
        }
      });

      if (cancelled) {
        return;
      }

      setPositions(placedItems);
      setIsCalculating(false);
    };

    const timer = setTimeout(calculateLayout, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [hasWords, height, padding, width, words]);

  return { positions, isCalculating };
};
