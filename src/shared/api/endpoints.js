export const ENDPOINTS = {
  // 곡 정보 입력
  CREATE_WORDLY: () => `/api/create/song/`,
  // 단어 뜻 조회
  GET_MEANING: (word) => `/api/create/meaning/${word}/`,
  // 곡 생성
  CREATE_SONG: (songId) => `/api/create/${songId}/`,
  // 곡 재생 정보 조회
  GET_SONG_INFO: (songId) => `/api/playlist/play/${songId}/`,
  // 곡 목록 조회
  PLAYLIST: (userId) => `/api/playlist/${userId}/`,
  // 곡 삭제
  ELETE_SONG: (userId, songId) => `/api/playlist/${userId}/del/${songId}/`,
  // 곡 추천 목록 조회
  GET_CHART: (userId) => `/api/chart/${userId}`,
};
