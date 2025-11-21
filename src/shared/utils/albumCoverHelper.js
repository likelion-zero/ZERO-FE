/**
 * 텍스트가 캔버스 경계(패딩 포함)를 벗어나지 않는지 확인
 */
const isWithinBounds = (rect, containerSize, padding) => {
  return (
    rect.x >= padding &&
    rect.y >= padding &&
    rect.x + rect.width <= containerSize.width - padding &&
    rect.y + rect.height <= containerSize.height - padding
  );
};

/**
 * 두 사각형(단어) 간의 충돌 확인 (padding을 주어 글자 간 간격 확보)
 */
const checkCollision = (rect1, rect2, gap = 4) => {
  return !(
    rect1.x + rect1.width + gap < rect2.x ||
    rect1.x > rect2.x + rect2.width + gap ||
    rect1.y + rect1.height + gap < rect2.y ||
    rect1.y > rect2.y + rect2.height + gap
  );
};

/**
 * 텍스트의 실제 렌더링 크기 측정
 */
export const measureTextSize = (text, fontSize, fontWeight = 'bold', fontFamily = 'Inter') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);

  return {
    width: metrics.width,
    height: fontSize * 0.85, // 텍스트 높이 보정 (baseline 고려)
    actualHeight: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  };
};

/**
 * 위치 유효성 검사 통합 함수
 */
export const isValidPosition = (newRect, existingRects, containerSize, padding) => {
  // 1. 화면 밖으로 나가는지 검사
  if (!isWithinBounds(newRect, containerSize, padding)) return false;

  // 2. 기존 단어들과 겹치는지 검사
  return !existingRects.some((existing) => checkCollision(newRect, existing));
};

/**
 * 영역별 랜덤 위치 생성기
 * zone: 'right' | 'bottom-left' | 'any'
 */
export const getZonePosition = (zone, containerSize, itemSize, padding) => {
  const { width: cW, height: cH } = containerSize;
  const { width: iW, height: iH } = itemSize;

  // 안전한 랜덤 범위 계산 함수
  const randomRange = (min, max) => Math.random() * (max - min) + min;

  let x, y;

  switch (zone) {
    case 'right': // 우측 영역 (세로 배치 용이)
      x = randomRange(cW * 0.7, cW - padding - iW);
      y = randomRange(padding, cH - padding - iH);
      break;
    case 'bottom-left': // 좌측 하단 영역 (짧은 단어)
      x = randomRange(padding, cW * 0.5 - iW);
      y = randomRange(cH * 0.6, cH - padding - iH);
      break;
    default: // 전체 영역
      x = randomRange(padding, cW - padding - iW);
      y = randomRange(padding, cH - padding - iH);
      break;
  }

  return { x, y };
};
