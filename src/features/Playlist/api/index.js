import { get, del } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const getPlaylist = async (userId) => {
  return await get(ENDPOINTS.PLAYLIST(userId));
};

export const deleteSong = async (userId, SongId) => {
  return await del(ENDPOINTS.DELETE_SONG(userId, SongId));
};
